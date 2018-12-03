<style lang="less">
    @import './editable-table.less';
</style>

<template>
    <div>
        <Table :ref="refs" :columns="columnsList" :data="thisTableData" border disabled-hover></Table>
    </div>
</template>

<script>
const incellEditBtn = (vm, h, param) => {
    if (vm.hoverShow) {
        return h('div', {
            'class': {
                'show-edit-btn': vm.hoverShow
            }
        }, [
            h('Button', {
                props: {
                    type: 'text',
                    icon: 'edit'
                },
                on: {
                    click: (event) => {
                        vm.edittingStore[param.index].edittingCell[param.column.key] = true;
                        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                    }
                }
            })
        ]);
    } else {
        return h('Button', {
            props: {
                type: 'text',
                icon: 'edit'
            },
            on: {
                click: (event) => {
                    vm.edittingStore[param.index].edittingCell[param.column.key] = true;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                }
            }
        });
    }
};

const cellInput = (vm, h, param, item) => {
    return h('Input', {
        props: {
            type: 'text',
            value: vm.edittingStore[param.index][item.key]
        },
        on: {
            'on-change' (event) {
                let key = item.key;
                vm.edittingStore[param.index][key] = event.target.value;
            }
        }
    });
};
import axios from 'axios';
import {formatDate} from '../../common/formatDate.js';
export default {

    name: 'canEditTable',
    props: {
        refs: String,
        columnsList: Array,
        value: Array,
        url: String,
        editIncell: {
            type: Boolean,
            default: false
        },
        hoverShow: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            columns: [],
            thisTableData: [],
            edittingStore: []
        };
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            let vm = this;
            let editableCell = this.columnsList.filter(item => {
                if (item.editable) {
                    if (item.editable === true) {
                        return item;
                    }
                }
            });
            let cloneData = JSON.parse(JSON.stringify(this.value));
            let res = [];
            res = cloneData.map((item, index) => {
                let isEditting = false;
                if (this.thisTableData[index]) {
                    if (this.thisTableData[index].editting) {
                        isEditting = true;
                    } else {
                        for (const cell in this.thisTableData[index].edittingCell) {
                            if (this.thisTableData[index].edittingCell[cell] === true) {
                                isEditting = true;
                            }
                        }
                    }
                }
                
                console.log('else')

                let date = new Date(item.createTime);
                let time = formatDate(date, 'yyyy-MM-dd hh:mm:ss');
                item.createTime = time
                this.$set(item, 'editting', false);
                let edittingCell = {};
                editableCell.forEach(item => {
                    edittingCell[item.key] = false;
                });
                this.$set(item, 'edittingCell', edittingCell);
                return item;
                
            });
            this.thisTableData = res;
            this.edittingStore = JSON.parse(JSON.stringify(this.thisTableData));
            console.log(123111)
            console.log(this.thisTableData)
        }
    },
    watch: {
        value (data) {
            this.init();
        }
    }
};
</script>
