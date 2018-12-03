export const table2csvData = [
    {
        'materialName': '推广名称1',
        'number': 0,
        'flag': 1
    },
    {
        'materialName': '推广名称2',
        'number': 0,
        'flag': 0
    },
    {
        'materialName': '推广名称3',
        'number': 0,
        'flag': 1
    }
];

export const csvColumns = [
    {
        'title': '物料名称',
        'key': 'materialName',
        'fixed': 'left',
        'width': 200
    },
    {
        'title': '库存',
        'key': 'number',
        'width': 150,
        'sortable': true,
        filters: [
            {
                label: '大于100',
                value: 1
            },
            {
                label: '小于100',
                value: 2
            }
        ],
        filterMultiple: false,
        filterMethod (value, row) {
            if (value === 1) {
                return row.number > 100;
            } else if (value === 2) {
                return row.number < 100;
            }
        }
    },
    {
        'title': '是否可用',
        'key': 'flag',
        'width': 150,
        'sortable': false
    }
];
