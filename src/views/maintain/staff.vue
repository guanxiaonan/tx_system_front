<style lang="less">
    @import '../../styles/common.less';
    .advanced-router {
        &-tip-p {
            padding: 10px 0;
        }
    }
</style>

<template>
    <div>
        <card style="height: auto">
            <div>
                <row>
                    <!--<Table :columns="column" :data="data"></Table>-->
                    <can-edit-table-staff refs="table2" v-model="data" :columns-list="column" ></can-edit-table-staff>
                    <row>
                        <v-pagination  :total="total" :current-page='currentPage' v-bind:display="display"  @pagechange="pagechange"></v-pagination>
                    </row>
                </row>
                <div class="modal-mask" v-show="show">
                    <div class="modal-wrapper">
                        <div class="modal-container">
                            <li type="disc">{{"地址："}}{{this.showAddress}}</li>
                            <li type="disc">{{"部门："}}{{this.showDepartment}}</li>
                            <div class="modal-footer">
                                <slot name="footer">
                                    <button class="modal-default-button"
                                            @click="show = false">
                                        关闭
                                    </button>
                                </slot>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </card>
        <div class="foot">
            <p>Copyright © 2018 中国·天喜控股</p>
        </div>
    </div>
</template>

<script>
    import expandRow from './component/expandRow2.vue';
    import canEditTableStaff from './component/canEditTableStaff';
    import pagination from './component/pagination1.vue';
    import axios from 'axios';
    import {formatDate} from "../common/formatDate";

    export default {
        components: {
            expandRow,
            'v-pagination': pagination,
            canEditTableStaff
        },
        name: "staff",
        data () {
            return {
                total: 10,     // 记录总条数
                display: 8,   // 每页显示条数
                currentPage: 1,   // 当前的页数
                pagegroup: 12,
                show: false,
                showAddress: '',
                showDepartment: '',
                data: [],
                data1: [],
                data2: [],
                column: [
                    {
                        type: 'expand',
                        width: 30,
                        align: 'center',
                        render: (h,params)=> {
                            return h(expandRow,{
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '序号',
                        width: 80,
                        type: 'index',
                        align:'center',
                    },
                    {
                        title: '姓名',
                        align: 'center',
                        key: 'staffName',
                        editable: true
                    },
                    {
                        title: '性别',
                        width: 80,
                        align: 'center',
                        key: 'staffSex'
                    },
                    {
                        title: '员工编号',
                        align: 'center',
                        key: 'staffId',
                        editable: true
                    },
                    {
                        title: '联系方式',
                        align: 'center',
                        key: 'staffPhone',
                        editable: true
                    },
                    {
                        title: '职位',
                        align: 'center',
                        key: 'staffJob',
                        editable: true
                    },
                    {
                        title: '部门',
                        align: 'center',
                        key: 'staffDept',
                        editable: true
                    },
                    {
                        title: '入职时间',
                        align: 'center',
                        key: 'staffDate',
                    },
                    // {
                    //     title: '查询',
                    //     align: 'center',
                    //     render: (h,params)=>{
                    //         return h('button',{
                    //             props: {
                    //                 type: 'primary',
                    //             },
                    //             style: {
                    //                 width: '70px',
                    //                 height: '30px',
                    //                 color: '#FFFFFF',
                    //                 backgroundColor: '#1E90FF',
                    //                 borderRadius: '5px',
                    //                 border: 'none'
                    //             },
                    //             on: {
                    //                 click: () => {
                    //                     this.show = true;
                    //                     this.showAddress = params.address;
                    //                     this.showDepartment = params.department;
                    //                 }
                    //             }
                    //         },'记录')
                    //     }
                    // },
                    {
                        title: '操作',
                        align: 'center',
                        width: 190,
                        key: 'handle',
                        handle: ['edit', 'delete']
                    }
                ],
                k: [],
            }
        },
        methods: {
            init (){},
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
            },
            getData () {
                axios.get('/api/material/staff').then((res) => {
                    for(var i=0;i<res.data.data.length;i++){
                        res.data.data[i].staffDate = this.formatDate(res.data.data[i].staffDate);
                    }
                    this.total =  res.data.data.length;
                    if(this.display < this.total) {
                        for(var i = 0;i<this.display; i++) {
                            this.data1[i] = res.data.data[i];
                        }
                    }else{
                        for(var i = 0;i<this.total; i++) {
                            this.data1[i] = res.data.data[i];
                        }
                    }
                    this.data = this.data1

                });
            },
            getdata (curPage,disp) {
                axios.get('/api/material/staff').then((res) => {
                    var k = (curPage - 1) * disp;
                    var j = this.total - k;
                    if(j > this.display){
                        for(var i = 0;i<this.display; i++) {
                            this.data1[i] = res.data.data[k + i];
                        }
                        this.data = this.data1;
                        // console.log(this.data)
                    }else{
                        for(var i = 0;i<j; i++) {
                            this.data2[i] = res.data.data[k + i];
                            // console.log(k + i)
                        }
                        this.data = this.data2;
                        // console.log(this.data2)
                    }
                });
            },
            pagechange (page) {
                this.currentPage = page;
                this.data = [];
                this.getdata(page,this.display)
                // this.getdata(this.currentPage,this.display);
            }
        },
        mounted () {
            this.init();
            this.getData()
            // this.getdata(this.currentPage,this.display);
        },
        watch: {
            '$route' () {
                this.init();
            },
        }
    }
</script>
