```js
<el-table :data="form.productList" empty-text="暂无商品" border :cell-class-name="rowClass" :max-height="fixHeight ? '200px' : 'auto'">
    <el-table-column label="产品编号" prop="productCode" :show-overflow-tooltip="overflowStatus" width="150">
        <template slot-scope="{ row, $index }">
            <el-form-item :prop="`productList[${$index}].productCode`" :rules="[{ validator: repeatValue(row, $index, '产品编号'), trigger: 'change' }, { validator: oneMustValue(row, $index, 'guor'), trigger: 'change' }]"></el-form-item>
        </template>
    </el-table-column>

    <el-table-column prop="count" min-width="90">
        <template slot-scope="{ row, $index }">
            <el-form-item :prop="`productList[${$index}].count`" :rules="{ validator: mustValue(row, $index, '数量'), trigger: 'blur' }"></el-form-item>
        </template>
    </el-table-column>

</el-table>
const repeatValue = (row, rowIndex, name) => {
    const isRepeat = this.form.productList.some((item, itemIndex) => {
        let isEqui =
            Object.is(row.productCode, item.productCode) &&
            Object.is(row.productName, item.productName) &&
            Object.is(row.boxSize, item.boxSize);

        if (rowIndex === itemIndex) {
            return false;
        } else if (isEqui) {
            return true;
        }
    });
    return (rule, value, callback) => {
        if (value !== "" && isRepeat) {
            callback(new Error(`${name}重复`));
            return;
        }
        callback();
    };
};
// eslint-disable-next-line
const mustValue = (row, rowIndex, name) => {
    return (rule, value, callback) => {
        if (!value) {
            callback(new Error(`${name}必填`));
            return;
        }
        callback();
    };
};
// eslint-disable-next-line
const oneMustValue = (row) => {
    return (rule, value, callback) => {
        if (!row.productCode && !row.productName) {
            callback(new Error(`号/名必填一个`));
            return;
        }
        callback();
    };
};

```
