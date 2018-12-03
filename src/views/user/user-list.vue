<style lang="less">
    @import '../../styles/common.less';
    .advanced-router{
        &-tip-p{
            padding: 10px 0;
        }
    }
</style>

<template>
    <div>
        <Row>
            <Card>
                <p slot="title">
                    <Icon type="compose"></Icon>
                    用户列表
                </p>
                <Table :columns="columns10" :data="data9"></Table>
            </Card>
        </Row>
    </div>
</template>

<script>
    import expandRow from './component/expandRow.vue';
    import axios from 'axios';
    export default {
        name: 'user-list',
        components: {
            expandRow
        },
        data () {
            return {
                columns10: [
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
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '岗位',
                        key: 'postName'
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        render: (h, params) => {
                            console.log(h)
                            console.log(params)

                            const gender = params.row.gender === 1? '男' : '女';
                            console.log(gender)


                            return gender;
                    }
                    }
                ],
                data9: [
                    {
                        name: '王小明',
                        postName: '大数据研发工程师',
                        email: '1110@qq.com',
                        phone: '15924162290',
                        gender: 1,
                        flag: '是',
                        birthday: '1991-05-14',
                        createTime: '2018-03-01 10:00:23',
                        updateTime: '2018-03-01 10:00:23',
                        lastLoginTime: '2018-03-01 10:00:23',
                        loginCount: 7,
                        detail: 'detail....'
                    }
                ]
            };
        },
        methods: {
            init () {

            },
            getData () {
                //请求方法，根据实际情况使用
                axios.get('/api/user').then((res) => {
                    //res 为成功回调的响应
                    this.data9 = res.data.data;
                });
            },
        },
        mounted () {
            this.init();
            this.getData();
        },
        watch: {
            '$route' () {
                this.init();
            }
        }
    };
</script>
