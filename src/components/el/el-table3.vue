<script>
import { Table } from 'element-ui';
export default {
    extends: Table,
    mounted () {
        this.$nextTick(() => {
            let thead =  this.$el.querySelector('.el-table__header-wrapper thead');
            let theadNew = thead.cloneNode(true);
            this.$el.querySelector('.el-table__body-wrapper table').appendChild(theadNew);
        });
    }
};
</script>

<style lang="scss" scoped>
.template-area {
    background-color: #fff;
    height: 100%;
    .el-table /deep/ .el-table__body-wrapper table thead {
        display: none;
    }
    @media print {
        .el-table /deep/ .el-table__body-wrapper table thead {
            display: table-header-group;
        }
        .el-table /deep/ .el-table__header-wrapper {
            display: none;
        }
    }
}
</style>
