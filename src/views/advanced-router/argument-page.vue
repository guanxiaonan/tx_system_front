<style lang="less">
    /*@import './orderCenter.less';*/
    @import '../../styles/common.less';
    .advanced-router{
        &-tip-p{
            padding: 10px 0;
        }
    }
</style>
<style scoped>

</style>
<template>
    <div>
        <Card style="height: 580px">
            <p slot="title">
                <Icon type="ios-list"></Icon>
                维修列表(已购买锅具）</p>
            <div style="margin-bottom: 10px;">
                <!--<table :columns="shoppingColumns" :data="shoppingData1"></table>-->
                <Table :columns="shoppingColumns" :data="shoppingData1"></Table>
            </div>
        </Card>
        <div class="foot">
            <p>Copyright © 2018 中国·天喜控股</p>
        </div>
    </div>
</template>

<script>
    import pagination from './component/pagination';
    import expandRow from './component/expandRow.vue';
    import {formatDate} from '../common/formatDate.js';
    import Cookies from 'js-cookie';
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
                loginName: '',
                pagegroup: [],
                searchConName1: '',
                searchConName3: '',
                data9: [],
                initTable3: [],
                csvFileName: '',
                shoppingData: [],
                shoppingData1: [],
                shoppingColumns: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                },
                                style: {
                                    height: '70px'
                                }
                            });
                        }
                    },
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center',

                    },
                    {
                        title: '问题',
                        align: 'center',
                        key: 'describe'
                    },
                    {
                        title: '锅名',
                        key: 'potName',
                        align: 'center',

                    },
                    {
                        title: '报修次数',
                        align: 'center',
                        key: 'time'
                    },

                    {
                        title: ' ',
                        key: 'show_more',
                        align: 'center',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type:'primary',
                                },
                                on: {
                                    click: () => {
                                        let argu = {
                                            id: params.row.id,
                                            customer: params.row.customer,
                                            potName: params.row.potName,
                                            potNameId: params.row.potNameId,
                                            address: params.row.address,
                                            phone: params.row.phone
                                        };
                                        this.$router.push({
                                            name: 'shopping',
                                            params: argu
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
                this.loginName = Cookies.get('user');
                // console.log(this.loginName);
            },
            exportData (type) {
                if (type === 1) {
                    this.$refs.tableCsv.exportCsv({
                        filename: '原始数据'
                    });
                }
            },
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
            },
            getData () {
                //请求方法，根据实际情况使用
                axios.get('/api/material/repair_handle')
                    .then((res) => {
                        for(var i=0;i<res.data.data.length;i++){
                            res.data.data[i].date = this.formatDate(res.data.data[i].date);
                        }
                        this.shoppingData = res.data.data;
                        this.shoppingData1 = this.search(this.shoppingData, {customer: this.loginName});
                        // console.log(this.shoppingData1);

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
            // handleSearch3 () {
            //     this.shoppingData = this.search(this.shoppingData, {name: this.searchConName3});
            // },
            // handleCancel3 () {
            //     this.shoppingData = this.initTable3;
            // },

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
        }
    }
</script>
