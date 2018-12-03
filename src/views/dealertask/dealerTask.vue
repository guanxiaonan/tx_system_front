<template>
    <div>
        <!--<Table :columns="column" :data="repairRecord"></Table>-->
        <can-edit-table refs="table2" v-model="repairRecord" :columns-list="column"></can-edit-table>
    </div>
</template>

<script>
    import axios from 'axios';
    import Cookies from 'js-cookie'
    import expandNews from './component/expandNews'
    import changeSts from './component/changeSts1'
    import canEditTable from '../tables/components/canEditTable.vue';
    import {formatDate} from "../common/formatDate";

    export default {
        name: "dealerTask",
        components: {
            expandNews,
            canEditTable
        },
        data() {
            return {
                vendId: Cookies.get('loginId'),
                repairRecord: [],
                repairRecord1: [],
                column: [
                    {
                        type: 'expand',
                        width: 30,
                        render: (h,params)=>{
                            return h(expandNews,{
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '序号',
                        type: 'index',
                        // key: 'id',
                        width: 80,
                        align: 'center'
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
                    // {
                    //     title: '报修次数',
                    //     align: 'center',
                    //     key: 'time'
                    // },
                    {
                        title: '处理状态（双击改变）',
                        align: 'center',
                        key: 'mailState',
                        render: (h, params) => {
                            const row = params.row;
                            row.stateId =params.row.stateId ;
                            //row.workStatus = 1;
                            if(row.stateId===2)
                                return h(changeSts,{
                                    props: {
                                        stateId: true,
                                        stsColor: 'red',
                                        id: params.row.id
                                    },
                                });
                            if(row.stateId===3)
                                return h(changeSts,{
                                    props: {
                                        stateId: false,
                                        stsColor: 'green'
                                    },
                                });
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 190,
                        key: 'handle',
                        handle: [ 'delete']
                    }
                ],
            }
        },
        methods: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
            },
            getData() {
                console.log(this.vendId);
                axios.get(`/api/material/repair_handle_vend/${this.vendId}`).then((res) => {
                    var j = 0;
                    for(var i=0;i<res.data.data.length;i++){
                        if(res.data.data[i].stateId !== 1){
                            res.data.data[i].date = this.formatDate(res.data.data[i].date);
                            this.repairRecord1[j] = res.data.data[i];
                            j++
                        }
                    }
                    this.repairRecord = this.repairRecord1;

                });
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style scoped>

</style>