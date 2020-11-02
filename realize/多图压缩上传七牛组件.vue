<template>
    <div>
        <el-upload
            ref="upload"
            accept="image/*"
            list-type="picture-card"
            multiple
            :limit="limit"
            :data="qiniuData"
            :auto-upload="true"
            :action="QINIU_UP"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :on-exceed="onExceed"
            :on-error="onError">
            <i class="el-icon-plus"></i>
        </el-upload>
        <com-image-viewer ref="image" />
    </div>
</template>

<script>
import { queryQiniuToken } from '@/api/common'
export default {
    name: 'UploadMultiImage',
    props: {
        // 父组件的 v-model
        value: {
            type: Array,
            default: () => []
        },
        // 数量限制
        limit: {
            type: Number,
            default: 4
        },
        // size限制（单位M）
        sizeLimit: {
            type: Number,
            default: 6
        },
        // 图片地址格式化 是否需要加域名
        domain: {
            type: Boolean,
            default: true
        },
        // 像素限制
        pxLimit: {
            type: Number,
            default: 5000
        }
    },
    data() {
        return {
            // 上传需要的对象
            qiniuData: {
                token: "",
                key: ""
            },
            // 压缩范围 0.1 ~ 0.9
            imgQuality: 0.7,
            format: ['JPEG', 'PNG' , 'GIF'],
            // 静态图片列表用于父传值回显
            fileList: []
        }
    },
    watch: {
        // 图片回填
        value: {
            handler(newVal) {
                if (!this.qiniuData.key) {
                    this.fileList = newVal.map((key, index) => {
                        let url = this.getPicBaseUrl(key, this.domain)
                        return (this.fileList.find(_ => _.url === url) || { name: String(index), url })
                    })
                }
            },
            immediate: true
        }
    },
    async created() {
        // 因为每张图的token都是一样的 所以只有初始化拿一次即可
        let data = await queryQiniuToken()
        this.qiniuData.token = data.data.resultData.qiniuUpToken
    },
    methods: {
        // 点击已上传文件列表的钩子，传入链接展示大图
        onPreview(file) {
            file.url && this.$refs.image.preview(file.url)
        },
        // 校验图片size
        isSizeLimit(file) {
            let isSL = file.size / 1024 / 1024 > this.sizeLimit;
            if (isSL) {
                this.$message.closeAll()
                this.$message.warning(`请上传大小不超过${this.sizeLimit}M的图片，支持jpg、jpeg、png、gif`)
                return false
            }
            return true
        },
        // 校验图片像素
        isPixelLimit(width, height) {
            let isSL = width > this.pxLimit || height > this.pxLimit;
            if (isSL) {
                this.$message.closeAll()
                this.$message.warning(`请上传宽高不超过${this.pxLimit}像素的图片`)
                return false
            }
            return true
        },
        // 转blod文件
        dataURItoBlob(dataURI, type) {
            let binary = atob(dataURI.split(',')[1]);
            let array = [];
            for (let i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], {type: type});
        },
        // 上传前的准备工作（这里做了压缩） 钩子需要返回一个promise
        beforeUpload(param) {
            // 对图片进行压缩
            return new Promise((resolve, reject) => {
                let isSizeLimit = this.isSizeLimit(param)
                !isSizeLimit && reject()
                const reader = new FileReader()
                const image = new Image()
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    const width = image.width
                    const height = image.height
                    let isPixelLimit = this.isPixelLimit(width, height)
                    !isPixelLimit && reject()
                    canvas.width = width;
                    canvas.height = height;
                    // 绘制画布的大小从 fillRect 改为 clearRect 性能更好
                    context.clearRect(0, 0, width, height);
                    // 使用 drawImage() 方法将上传的图片画到 canvas 上，
                    // 注意：需要等到图片加载完成image.onload再画到画布上，否则有可能没画上去
                    context.drawImage(image, 0, 0, width, height);
                    const dataUrl = canvas.toDataURL(param.type || 'image/jpeg', this.imgQuality);
                    const blobData = this.dataURItoBlob(dataUrl, param.type);
                    // 设置图片对象的key
                    this.qiniuData.key = new Date().getTime() + Math.random().toString(16).slice(2);
                    resolve(blobData)
                }
                reader.onload = (e => {
                    image.src = e.target.result;
                });
                // 将读取内容转为base64编码
                reader.readAsDataURL(param);
            })
        },
        // 上传成功后的钩子
        onSuccess(res, file) {
            file.url = this.getPicBaseUrl(file.response.key, this.domain)
            let isSuccess = this.$refs.upload.uploadFiles.every(({ status }) => status === 'success');
            isSuccess && this.updateList()
        },
        // 删除文件后的钩子
        onRemove() {
            this.updateList()
        },
        // 更新传值
        updateList() {
            const urlList = this.$refs.upload.uploadFiles.map(({ url }) => url)
            this.$emit('input', urlList)
        },
        // 超过上传数量钩子
        onExceed() {
            this.$message.closeAll()
            this.$message.warning(`最多上传${this.limit}张图片`)
        },
        // 上传失败时的钩子
        onError() {
            this.$message.closeAll()
            this.$message.warning('上传功能出了点问题，请重试')
        }

    }
}
</script>
<style lang="less" scoped>
    /deep/ img.el-upload-list__item-thumbnail {
        width: auto;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
    .upload-tips {
        color: #bdbcbc;
    }
</style>
