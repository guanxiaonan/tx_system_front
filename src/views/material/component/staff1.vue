<style lang="less">
    @import '../../../styles/common.less';
    .advanced-router {
        &-tip-p {
            padding: 10px 0;
        }
    }
</style>

<template>
    <div>
        <row>
            <Table :columns="column" :data="staffData"></Table>
            <!--<row>-->
                <!--<v-pagination   :total="total" :current-page='currentPage' v-bind:display="display"  @pagechange="pagechange"></v-pagination>-->
            <!--</row>-->
        </row>

    </div>
</template>

<script>
    import expandRow from './expandRow1.vue';
    import pagination from './pagination.vue';
    import axios from 'axios';
    export default {
        components: {
            expandRow,
            'v-pagination': pagination
        },
        name: "staff",
        props: ['repairId'],
        data () {
            return {
                total: 10,     // 记录总条数
                display: 5,   // 每页显示条数
                currentPage: 1,   // 当前的页数
                pagegroup: 12,
                data: [],
                data1: [],
                staffData: [],
                column: [
                    {
                        title: '派工',
                        type: 'expand',
                         width: 60,
                        align: 'center',
                        render: (h,params)=> {
                            return h(expandRow,{
                                props: {
                                    row: params.row,
                                    repairId: this.repairId
                                }
                            })
                        }
                    },
                    // {
                    //     title: '序号',
                    //     width: 80,
                    //     type: 'index',
                    //     align:'center',
                    // },
                    {
                        title: '姓名',
                        align: 'center',
                        key: 'staffName',
                    },
                    {
                        title: '员工编号',
                        align: 'center',
                        key: 'id',
                    },
                    {
                        title: '联系方式',
                        align: 'center',
                        key: 'phone'
                    },
                    {
                        title: '工作',
                        align: 'center',
                        key: 'work'
                    },
                ]
            }
        },
        methods: {
            init (){
                console.log(this.repairId)
            },
            getTotal() {
                axios.get(`/api/material/totalNum`).then((res) => {
                    this.total = res.data.data;
                    // console.log("total-all:" + this.total)
                });
            },
            getdata (currentPage,display) {

                this.getTotal();
                //请求方法，根据实际情况使用
                axios.get(`/api/material/page/${currentPage}/${display}`)
                    .then((res) => {
                        this.data = res.data.data;
                        this.data1=res.data.data;
                    });
            },
            getData () {
                // axios.get('/api/material').then((res) => {
                //     this.data = res.data.data;
                // });
                axios.get('/api/user/show_companyStaff').then((res) => {
                    //console.log(res);
                    console.log(res.data.data);
                    this.staffData = res.data.data;
                    console.log(res.data.data);
                });
            },
            pagechange (page) {
                this.currentPage = page;
                this.data = [];
                // this.getdata(this.currentPage,this.display);
            }
        },
        mounted () {
            this.init();
            // this.getdata(this.currentPage,this.display);
            this.getData();
        },
        watch: {
            '$route' () {
                this.init();
            },
        }
    }
</script>
