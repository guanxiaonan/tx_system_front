<template>
    <div>
        <!--<card style="height: 515px">-->
        <card style="height: auto">
            <Table :columns="columns1" :data="data"></Table>
        </card>
        <div class="foot">
            <p>Copyright © 2018 中国·天喜控股</p>
        </div>
    </div>
</template>

<script>
    import expandRow from './expandRow1'
    import axios from 'axios';
    export default {
        name: "listDisplay",
        components: {
            expandRow
        },
        data () {
            return {
                columns1: [
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
                        title: '序列',
                        type: 'index',
                        align: 'center',
                        width: '100',
                    },
                    {
                        title: '产品名',
                        align: 'center',
                        key: 'potName'
                    },
                    {
                        title: '产品类型',
                        align: 'center',
                        key: 'potModel'
                    },
                    {
                        title: '保修期/年',
                        align: 'center',
                        key: 'warranty'
                    }
                ],
                data: [],
            }
        },
        methods: {
            getData () {
                axios.get('/api/material/production').then((res) => {
                    this.data = res.data.data;
                    // console.log(this.data[0])
                });
            },
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style scoped>

</style>