<style lang="less">
    @import '../../styles/common.less';
    .advanced-router {
        &-tip-p {
            padding: 10px 0;
        }
    }
</style>
<style>
    .btn1 {
        text-align: center;
        width:50px;
        height:28px;
        color:#FFFFFF;
        border: none;
        background-color: #1E90FF ;
        border-radius: 5px;
    }
</style>
<template>
 <div>
     <card>
         <div>
            <row>
                <div>
                    <h3>
                        <Icon type="compose"></Icon>报修受理
                    </h3>
                    <div> <Row class="margin-top-10"></Row></div>
                </div>
                <row>
                    <Col span="14">
                        <p >
                            <Icon type="mouse"></Icon>
                            点击搜索进行查找
                        </p>
                    </Col>
                    <Col span="10">
                        <p >
                            <Icon type="mouse"></Icon>
                            选择日期范围
                        </p>
                    </Col>
                </row>
                <Row>
                    <Col span="9">
                        <Input v-model="searchConName3" placeholder="请输入用户名······" style="width: 200px" />
                        <span @click="handleSearch3" @keyup.enter="handleSearch3"  style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
                        <Button @click="handleCancel3" type="ghost">取消</Button>
                    </Col>
                    <Col span="5">
                            <span style="margin-right: 16px;"><Button type="primary" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出当前显示数据</Button></span>
                            <!--<Button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> 导出排序和过滤后的数据</Button>-->
                    </Col>
                    <Col span="10">
                        <!--<p>111</p>-->
                        <Form>
                            <date-picker
                                    v-model="filters.column.create_start_date"
                                    type="date"
                                    :picker-options="pickerBeginDateBefore"
                                    format="yyyy-MM-dd"
                                    placeholder="起始日">
                            </date-picker>
                            <span style="padding-left: 2px;padding-right: 2px">——</span>
                            <date-picker
                                    v-model="filters.column.create_end_date"
                                    type="date"
                                    format="yyyy-MM-dd"
                                    :picker-options="pickerBeginDateAfter"
                                    placeholder="终止日">
                            </date-picker>
                            <button class="btn1" @click="dayin">查询</button>
                        </Form>

                    </Col>
                </Row>
                <div class="margin-bottom-10"></div>
                    <Table ref="tableCsv" :columns="columns10" :data="data11"></Table>
                <!--<row>-->
                    <!--<v-pagination   :total="total" :current-page='currentPage' v-bind:display="display"  @pagechange="pagechange"></v-pagination>-->
                <!--</row>-->
            </row>
         </div>
     </card>
     <div class="foot">
         <p>Copyright © 2018 中国·天喜控股</p>
     </div>
 </div>
</template>

<script>
    import expandRow from './component/expandRow.vue';
    import pagination from './component/pagination.vue';
    import ExportCsv from '../../../node_modules/iview/src/components/table/export-csv';
    import Csv from '../../../node_modules/iview/src/utils/csv';
    import axios from 'axios';
    import {formatDate} from '../common/formatDate.js';
    export default {
        name: 'material-list',
        components: {
            expandRow,
            'v-pagination': pagination
        },
        data () {
            return {
                numDayin: false,
                selection: '',
                initTable3: [],
                searchConName3: '',
                total: 10,     // 记录总条数
                display: 5,   // 每页显示条数
                currentPage: 1,   // 当前的页数
                pagegroup: 12,
                columns10: [
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
                        type: 'index',
                        width: 80,
                        align: 'center'
                    },

                    {
                        title: '报修受理号',
                        align: 'center',
                        key: 'id'
                    },

                    {
                        title: '用户',
                        align: 'center',
                        key: 'customer'
                    },
                    {
                        title: '联系方式',
                        align: 'center',
                        key: 'phone'
                    },
                    {
                        title: '提交时间',
                        align: 'center',
                        key: 'date'
                    },
                    {
                        title: '报修次数',
                        align: 'center',
                        key: 'time'
                    },
                    {
                        title: '报修状态',
                        align: 'center',
                        // key: 'state',
                        width: 200,
                        filters: [
                            {
                                label: '未处理',
                                value: 0
                            },
                            {
                                label: '正在处理',
                                value: 1
                            },
                            {
                                label: '处理完成',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                            filterMethod (value,row) {
                                if (value === 0) {
                                    return row.stateId === 1;
                                } else if (value === 1) {
                                    return row.stateId === 2;
                                } else if (value === 2) {
                                    return row.stateId === 3;
                                }
                            },
                        render: (h, params) => {
                            const stateId = parseInt(params.row.stateId);
                            if(stateId === 1) {
                                return h('div', [
                                    h('Tag', {
                                        props: {
                                            type: 'dot',
                                            color: "red"
                                        }
                                    }, "未处理"),
                                ])
                            } else if(stateId === 2) {
                                return h('div', [
                                    h('Tag', {
                                        props: {
                                            type: 'dot',
                                            color: "blue"
                                        }
                                    }, "处理中"),
                                ])
                            }else if(stateId === 3){
                                return h('div', [
                                    h('Tag', {
                                        props: {
                                            type: 'dot',
                                            color: "green"
                                        }
                                    }, "处理完成"),
                                ])
                            }else{
                                alert(0)
                            }
                        }
                    },
                    {
                        title: ' ',
                        width: 100,
                        render: (h, params) => {
                            return h('div', [
                                h('button', {
                                    props: {
                                        type: 'primary',
                                    },
                                    style: {
                                        width: '70px',
                                        height: '30px',
                                        color: '#FFFFFF',
                                        backgroundColor: '#1E90FF',
                                        borderRadius: '5px',
                                        border: 'none'
                                    },
                                    on: {
                                        click: () => {
                                            let argu = {
                                                id: params.row.id,
                                                customerId: params.row.customerId,
                                                time: params.row.time,
                                                customer: params.row.customer,
                                                phone: params.row.phone,
                                                address: params.row.address,
                                                potName: params.row.potName,
                                                describe: params.row.describe,
                                                handleRemark: params.row.handleRemark
                                            };
                                            this.$router.push({
                                                name: 'deal',
                                                params: argu,
                                            });
                                        }
                                    }

                                }, '点击处理')
                            ])
                        }
                    }
                ],
                columnsCsv: [],
                data9:[],
                data10:[],
                data11:[],
                data12: [],
                data13: [],
                data14: [],
                filters: {
                    column: {
                        create_start_date: '',
                        create_end_date: ''
                    },
                },
                pickerBeginDateBefore:{
                    disabledDate: (time) => {
                        let beginDateVal = this.filters.column.create_end_date;
                        if (beginDateVal) {
                            return time.getTime() > beginDateVal;
                        }

                    }
                },
                pickerBeginDateAfter:{
                    disabledDate: (time) => {
                        let beginDateVal = this.filters.column.create_start_date;
                        if (beginDateVal) {
                            return time.getTime() < beginDateVal;
                        }
                    }
                }
            };
        },
        methods: {

            init () {

            },
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
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
            getTotal() {
                axios.get(`/api/material/totalNum`).then((res) => {
                    // console.log(res.data.data);
                    this.total = res.data.data;
                });
            },

            getData () {
                axios.get('/api/material/repair_handle').then((res) => {
                    // console.log(res.data.data);

                    this.data13 = res.data.data;
                    for(var i=0;i<res.data.data.length;i++){
                        res.data.data[i].date = this.formatDate(res.data.data[i].date);
                    }
                    // console.log(res.data.data);
                    this.data11 = res.data.data;
                    this.data12 = res.data.data;
                    this.total = res.data.data.length;
                });
            },
            handleSearch3 () {
                if (this.searchConName3.length === 0){
                    return this.data9 = this.data10;
                }else{
                this.data11 = this.search(this.data12, {customer: this.searchConName3});
                }
                // console.log(1)
            },
            handleCancel3 () {
                this.data11 = this.data12;
            },
            pagechange (page) {
                this.currentPage = page;
                this.data9 = [];
                this.getdata(this.currentPage,this.display);
                // console.log("page:" + page);
                // console.log("display:" + this.display)
            },
            exportData (type) {
                if (type === 1) {
                    this.$refs.tableCsv.exportCsv({
                        filename: '原始数据'
                    });
                }
                // } else if (type === 2) {
                //     this.$refs.tableCsv.exportCsv({
                //         filename: '排序和过滤后的数据',
                //         original: false
                //     });
                // } else if (type === 3) {
                //     this.$refs.tableCsv.exportCsv({
                //         filename: this.csvFileName,
                //         columns: this.columnsCsv.filter((col, index) => index >= this.selectMinCol - 1 && index <= this.selectMaxCol - 1),
                //         data: this.csvData.filter((data, index) => index >= this.selectMinRow - 1 && index <= this.selectMaxRow - 1)
                //     });
                // }
            },
            exportCsv (params) {
                if (params.filename) {
                    if (params.filename.indexOf('.csv') === -1) {
                        params.filename += '.csv';
                    }
                } else {
                    params.filename = 'table.csv';
                }

                let columns = [];
                let datas = [];
                if (params.columns && params.data) {
                    columns = params.columns;
                    datas = params.data;
                } else {
                    columns = this.columns;
                    if (!('original' in params)) params.original = true;
                    datas = params.original ? this.data : this.rebuildData;
                }

                let noHeader = false;
                if ('noHeader' in params) noHeader = params.noHeader;

                const data = Csv(columns, datas, params, noHeader);
                if (params.callback) params.callback(data);
                else ExportCsv.download(params.filename, data);
            },
            dayin () {
                var j = 0;
                console.log(this.data13[0].date);

                for(var i=0; i<this.data13.length; i++) {
                    var goalDate = Date.parse(this.data13[i].date);
                    var startDate = Date.parse(this.filters.column.create_start_date);
                    var endDate = Date.parse(this.filters.column.create_end_date);
                    if(goalDate >= startDate) {
                        // console.log("下线");
                        if(goalDate <= endDate) {
                            // console.log("上线");
                            this.data14[j] = this.data13[i];
                            j ++
                        }
                    }
                }
                console.log(this.data14[0].date);
                for(var i=0;i<this.data14.length;i++){
                    this.data14[i].date = this.formatDate(this.data14[i].date);
                }
                // console.log( "测试"+ this.data14);
                this.data11 = this.data14;
                this.numDayin = true;

            }
        },
        mounted () {
            this.init();
            //this.getdata(this.currentPage,this.display);
            this.getData();
            // this.dayin();
        },
        created:function(){
                // 主页添加键盘事件,注意,不能直接在焦点事件上添加回车
            var lett=this;
            document.onkeydown=function(e){
                var key=window.event.keyCode;
                if(key==13){
                    lett.handleSearch3();
                }
            }
        },
        watch: {
            '$route' () {
                this.init();
                this.getData();
                // this.$router.go(0)
            },
            data14: {
                handler(val) {
                    console.log("监听");
                    console.log(this.filters.column.create_start_date);
                    console.log(this.filters.column.create_end_date);
                    this.data11 = this.data14
//                    console.log(this.comment[0].reply.length)
                },
                deep: true
            },
        }
    };
</script>
