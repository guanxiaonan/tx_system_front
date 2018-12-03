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
                        愿望单
                    </p>
                    <Table :columns="orderColumns" :data="shoppingData" size="small" ref="tableCsv"></Table>
                </Card>
            </Col>
        </Row>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'mutative-router',
        data () {
            return {
                shoppingData: [],
                orderColumns: [
                    {
                        type: 'index',
                        title: '锅名',
                        width: 60,
                        key: 'potName',
                    },
                    {
                        title: '类型',
                        key: 'potType',
                        align: 'center'
                    },
                    {
                        title: '添加日期',
                        key: 'date',
                        align: 'center'
                    },


                    {
                        title: '详情',
                        key: 'show_more',
                        align: 'center',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        let argu = { order_id: params.row.order_id };
                                        this.$router.push({
                                            name: 'order_info',
                                            params: argu
                                        });
                                    }
                                }
                            }, '了解详情');
                        }
                    }
                ],
            };
        },
        methods:{
            init(){
            },
            getData(){
            axios.get('/api/material/pot_product')
            .then((res) => {
                this.shoppingData = res.data.data;
                console.log(res.data.data);
        });
        },
        computed: {
            avatorImage () {
                return localStorage.avatorImgPath;
            }
        }
    },
        mounted(){
            this.init();
            this.getData();
        }
    }

</script>
