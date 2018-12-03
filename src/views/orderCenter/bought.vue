<style lang="less">
    @import './orderCenter.less';
    @import '../../styles/common.less';
</style>

<template>
    <Row class="margin-top-10">
        <Col span="34">
            <Card>
                <p slot="title">
                    <Icon type="ios-list"></Icon>
                    维修列表(已购买锅具）</p>
                <div style="margin-bottom: 10px;"> 购买记录总数: <span style="color:orange;">{{total}}</span>
                    <Button @click="handleCancel3" style="float:right;">取消</Button>
                    <span @click="handleSearch3" style="margin: 0 10px;"><Button icon="search" style="float:right;">搜索</Button></span>
                    <Input v-model="searchConName3" placeholder="请输入锅名查找..." style="width: 300px;float:right;" @keyup.enter.native="handleSearch3" />
                </div>
                <Table :columns="shoppingColumns" :data="shoppingData" size="small" ref="tableCsv"></Table>
                <v-pagination style="padding-left: 0px" :total="total" :current-page='currentPage' @pagechange="pagechange"></v-pagination>
                <div class="exportable-table-download-con1">
                    <span style="margin-right: 16px;"><Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出原始数据</Button></span>
                </div>
            </Card>
        </Col>
    </Row>
</template>

<script>
    import pagination from './component/pagination';
    import expandRow from './component/expandRow.vue';
    import {formatDate} from '../common/formatDate.js';
    import axios from 'axios';
    export default {
        components: {
            'v-pagination': pagination,
        },
        name: 'argument-page',
        data () {
            return {
                total: 9,     // 记录总条数
                display: 3,   // 每页显示条数
                currentPage: 1,   // 当前的页数
                items: [],
                pagegroup: [],
                searchConName1: '',
                searchConName3: '',
                data9: [],
                initTable3: [],
                csvFileName: '',
                shoppingData: [],
                shoppingColumns: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            });
                        }
                    },
                    {
                        title: '订单号',
                        key: 'id',
                        align: 'center',
                        width: 150
                    },
                    {
                        title: '锅名',
                        key: 'potName',
                        align: 'center',
                        width:150,},
                    {
                        title: '型号',
                        key: 'potType',
                        align: 'center',
                        width:180
                    },
                    {
                        title: '购买日期',
                        key: 'date',
                        align: 'center',
                        width:180,
                    },
                    {
                        title: '报修次数',
                        key: 'time',
                        align: 'center',
                        width:150
                    },
                    {
                        title: '联系电话',
                        key: 'phone',
                        align: 'center',
                        width:150
                    },
                     {
                        title: '报修',
                        key: 'show_more',
                        align: 'center',
                        render: (h, params) => {
                                return h('Button', {
                                    props: {
                                        type:'primary',
                                      },
                                    on: {
                                        click: () => {
                                        console.log(params.row.id);
                                        this.$router.push({
                                        name: 'repair',
                                        params: {
                                        id: params.row.id,
                                        potName: params.row.potName,
                                        customer: params.row.customer
                                        }
                                        });
                                          }
                                          }
                                          }, '报修');
                                          }
                                          }
                ],
            };
        },
        methods: {
            init () {
            },
            exportData (type) {
                if (type === 1) {
                    this.$refs.tableCsv.exportCsv({
                        filename: '原始数据'
                    });
                }
            },
            // getData (currentPage, display) {
            //     console.log('getData')
            //     // this.getTotal()
            //     //请求方法，根据实际情况使用
            //     axios.get(`/api/inventory-record/page/${currentPage}/${display}`).then((res) => {
            //         //res 为成功回调的响应
            //         // this.editInlineColumns = tableData.editInlineColumns;
            //         this.shoppingData = res.data.data;
            //     //this.total = res.data.data.length
            //     console.log(this.shoppingData)
            // });
            //
            //     this.tableData = tableData.table1Data;
            //     this.editInlineColumns = tableData.editInlineColumns;
            //     this.editInlineData = tableData.editInlineData;
            // },
            //从page组件传递过来的当前page
            getData () {
                //请求方法，根据实际情况使用
                axios.get(`/api/material/pot_product`)
                    .then((res) => {
                        console.log("列表数据");
                        this.shoppingData = res.data.data;
                        this.initTable3=this.shoppingData;
                    });
            },
            search (data, argumentObj) {
                let res = data;
                let dataClone = data;
                for (let argu in argumentObj) {
                    if (argumentObj[argu].length > 0) {
                        res = dataClone.filter(d => {
                            return d[argu].indexOf(argumentObj[argu]) > -1;
                        });
                        dataClone = res;
                    }
                }
                return res;
            },
            handleSearch3 () {
                this.shoppingData = this.search(this.shoppingData, {name: this.searchConName3});
            },
            handleCancel3 () {
                this.shoppingData = this.initTable3;
            },
            pagechange (page) {
                this.currentPage = page;
                this.shoppingData = [];
                this.getdata(this.currentPage,this.display);
                console.log("page:" + page);
                console.log("display:" + this.display)
            }
        },
        mounted () {
            this.init();
            this.getData();
            //this.getData(this.currentPage,this.display);
        },
        watch: {
            '$route' () {
                this.init();
            },
        },
        filters: {
            formatDate(date) {
                var time = new Time(date);
                return formatDate(time, 'yyyy-MM-dd hh:mm:ss');
            }
        },
    }
</script>
