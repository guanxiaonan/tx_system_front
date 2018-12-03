<template>
    <div>
        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "dealer",
        data() {
            return {
                data1: [],
                columns1: [
                    {
                        title: '序号',
                        width: '80px',
                        align: 'center',
                        type: 'index'
                    },
                    {
                        title: '名称',
                        align: 'center',
                        key: 'vendName'
                    },
                    {
                        title: '联系方式',
                        align: 'center',
                        key: 'vendPhone'
                    },
                    {
                        title: '地址',
                        align: 'center',
                        key: 'vendAddress'
                    },
                    {
                        title: '经销地区',
                        align: 'center',
                        key: 'vendArea'
                    },
                    {
                        title: 'Email',
                        align: 'center',
                        key: 'vendEmail'
                    },
                    {
                        title: '邮编',
                        align: 'center',
                        key: 'vendCode'
                    },

                    {
                        title: ' ',
                        render: (h, params) => {
                            return h('button',{
                                style: {
                                    width: 'auto',
                                    height: '30px',
                                    color: 'black',
                                    backgroundColor: 'skyBlue',
                                    borderRadius: '5px',
                                    border: 'none'
                                },
                                on: {
                                    click: () => {
                                        // let news = params;
                                        this.$router.push({
                                            name: 'detailNews',
                                            params: params.row
                                        })
                                    }
                                }}, '查看详细信息'
                            )
                        }
                    }
                ],
            }
        },
        methods: {
            getData () {
                axios.get('/api/material/vendors').then((res) => {
                    this.data1 = res.data.data;
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