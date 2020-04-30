<template>
    <!--accept="image/*"-->
    <div>
        <el-upload
            ref="upload"
            :class="{ 'single-uploader': !styleBox, 'single-uploader-box': styleBox , 'large': large}"
            :action="QINIU_UP"
            name="file"
            accept="image/*"
            :disabled="disabled"
            :data="{token:'',key:''}"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="uploadChange"
            :on-error="uploadError"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload"
            :on-preview="picturePreview">
            <template>
                <img v-if="url.replace(QINIU_DOWNLOAD, '').replace(thumbnail,'')"
                    :src="url"
                    @click="imagePreview(url)"
                    class="single-img">
            </template>
            <i v-if="url.replace(QINIU_DOWNLOAD,'').replace(thumbnail,'') && !disabled" class="el-icon-plus single-uploader-icon"></i>
            <div v-else-if="!disabled" class="upload-prompt-mask">
                <div>
                    <img src="./../../assets/img/upload.png" alt="">
                    <p class="upload-tips">{{uploadTips}}</p>
                    <p class="upload-type">格式：{{uploadType.join('、')}}</p>
                </div>
            </div>
        </el-upload>
        <!-- <p class="upload-tips-size" v-if="+pictureSize > 0">
            {{`图片大小限制${pictureSize}MB`}}
        </p> -->
    </div>
</template>
<script>
    import {get} from '@/api/http';
    export default {
        // 声明 props
        props: {
            styleBox: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            large: {
                type: Boolean,
                default: false
            },
            uploadTips: {
                type: String,
                default: '请点击上传照片'
            },
            uploadType: {
                type: Array,
                default: () => ['png', 'jpg', 'jpeg']
            },
            pictureSize: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                data: null,
                url: '',
                thumbnail: '?imageMogr2/thumbnail/!160x100r/auto-orient/gravity/Center/crop/160x100'
            }
        },
        watch: {
            data() {
                let that = this
                that.url = that.QINIU_DOWNLOAD + that.data.replace(that.QINIU_DOWNLOAD, '') + that.thumbnail
                that.$emit('change', that.getKey(), that.getKey(true), 'CHANGE')
            }
        },
        methods: {
            setUrl(url) {
                let that = this
                url = url.replace(that.QINIU_DOWNLOAD, '').replace(/\?.*$/, '').replace(/^.+\//, '')
                that.url = that.QINIU_DOWNLOAD + url + that.thumbnail
                that.$emit('change', that.getKey(), that.getKey(true), 'SET_URL')
            },
            getKey(hasDomain) {
                let that = this
                let key = ''
                if (hasDomain) {
                    key = that.url.replace(/\?.*$/, '')
                } else {
                    key = that.url.replace(that.QINIU_DOWNLOAD, '').replace(/\?.*$/, '').replace(/^.+\//, '')
                }
                return key
            },
            setFormData(data, file) { // 把后端返回的七牛云的token和key 设置成当前文件的 token 和 key
                if (data && data.qiniuUpToken) {
                    this.$refs.upload.data.token = data.qiniuUpToken
                    let upKey = this.Crypto.md5([new Date().getTime(), Math.random()].join(''))
                    this.$refs.upload.data.key = upKey
                    if (file) {
                        file.UP_KEY = upKey
                    }
                }
            },
            uploadChange(file, fileList) { // 状态 成功 失败 改变时触发
                let bool = fileList.find((o) => {
                    return o.raw && o.uid === file.uid
                })
                if (bool && !file.UP_KEY) {
                    this.getUploadToken(file)
                }
            },
            uploadError() {
                this.$message.error('上传出错，请重新上传！');
            },
            uploadSuccess(res) { // 上传成功后 拼接 url 触发父组件事件
                let that = this
                if (res) {
                    that.url = that.QINIU_DOWNLOAD + res.key + that.thumbnail
                    that.$emit('change', that.getKey(), that.getKey(true), 'UPLOAD')
                }
            },
            beforeUpload(file) { // 返回一个布尔值  验证 格式/大小
                if (+this.pictureSize > 0) {
                    let isLt10M = file.size / 1024 / 1024 <= +this.pictureSize;
                    if (!isLt10M) {
                        this.$message.error(`图片大小限制${this.pictureSize}MB`);
                        return false
                    }
                }
                let isImg = /^image\/\w+$/i.test(file.type),
                    fileType = file.type.replace(/image\//, ''),
                    uploadType = [...this.uploadType]
                uploadType = uploadType.map(_ => _.toLowerCase())
                if (!isImg || !uploadType.includes(fileType)) {
                    this.$message.error(`只能上传 ${this.uploadType.join('、')} 格式!`);
                }
                return isImg && uploadType.includes(fileType)//isJPG && isLt2M;
            },
            picturePreview(file) {
                this.$emit('imagePreview', file.url)
            },
            imagePreview(url) { // 触发父组件事件
                this.$emit('imagePreview', url)
            },
            getUploadToken(file) { // 从后端拿到 七牛云的token和key
                let that = this
                get('user/system_config').then(function (res) {
                    // success callback
                    console.log(res)
                    let data = res.body || {}
                    if (res.succeed) {
                        that.setFormData(data, file)
                        setTimeout(function () {
                            that.$refs.upload.submit()
                        }, 100)
                    } else {
                        that.message.warning(that, data.resultMsg)
                    }
                    that.loading = false
                }).catch(function (res) {
                    // error callback
                    that.loading = false
                    that.querying = false
                    that.message.error(that)
                    console.log(res.config && res.config.url, res.response || res.message)
                })
            }
        }
    }
</script>
<style lang="less">
    .single-pic {
        .el-form-item__content {
            clear: both;
            margin: 0 0 0 15px !important;
        }
    }
    @image-height: 180px;
    .single-uploader-box {
        // width: 100%;
        // max-width: 160px;
        // height: 100px;
        width: 180px;
        height: @image-height;
        display: table;
        table-layout: fixed;
        &.large {
            width: 220px;
            height: 136px;
            .single-uploader-icon {
                line-height: 136px;
            }
        }
        .el-upload {
            width: 100%;
            height: @image-height;
            background-color: #fbfdff;
            border: 1px solid #d9d9d9;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            // display: table-cell;
            // text-align: center;
            // vertical-align: middle;
            .flex-center;
            border-radius:2px;
        }

        .el-upload:hover {
            border-color: #20a0ff;
            .single-img + .single-uploader-icon {
                color: #fff;
                background-color: rgba(0, 0, 0, .25);
                display: block;
            }
        }

        .single-img {
            height: 100%;
            width: auto;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        .single-img + .single-uploader-icon {
            display: none;
        }

        .single-uploader-icon {
            position: absolute;
            top: 0;
            left: 0;
            font-size: 20px;
            color: #8c939d;
            width: 100%;
            height: 100%;
            line-height: 180px;
        }
        .upload-prompt-mask {
            width: 100%;
            height: 100%;
            background-color: #f9f9f9;
            font-size:12px;
            line-height: 17px;
            .flex-center;
            .upload-tips {
                color: #999;
                padding-top: 5px;
            }
            .upload-type {
                color: #ccc;
                padding-top: 5px;
            }
            img {
                width: 60px;
                height: 54px;
            }
        }
    }
    // .upload-tips-size {
    //     color: red;
    //     font-size: 12px;
    // }
</style>
