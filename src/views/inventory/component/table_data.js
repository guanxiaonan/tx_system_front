export const editInlineColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '物料名称',
        align: 'center',
        key: 'materialName',
        width: 90
    },
    {
        title: '类型',
        align: 'center',
        key: 'typeName',
        width: 150,
        'sortable': true,
        filters: [
            {
                label: '出库',
                value: 1
            },
            {
                label: '入库',
                value: 2
            }
        ],
        filterMultiple: false,
        filterMethod (value, row) {
            console.log('row:')
            console.log(row)
            if (value === 1) {
                return row.typeName == '出库';
            } else if (value === 2) {
                return row.typeName == '入库';
            }
        }
    },
    {
        title: '数量',
        align: 'center',
        key: 'number',
        'sortable': true,
        width: 120
    },
    {
        title: '创建者',
        align: 'center',
        key: 'creatorId',
        width: 150
    },
    {
        title: '创建时间',
        align: 'center',
        key: 'createTime',
        width: 170,
        'sortable': true
    },
    {
        title: '创建详情',
        align: 'center',
        width: 220,
        key: 'createDesc'
    }

];
const tableData = {
    editInlineColumns: editInlineColumns
};

export default tableData;
