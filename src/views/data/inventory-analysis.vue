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
                    物料列表
                </p>
                <Table :columns="columns10" :data="data9"></Table>
            </Card>
        </Row>
    </div>
</template>

<script>
    import expandRow from '../user/component/expandRow.vue';
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
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    }
                ],
                data9: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居',
                        job: '数据工程师',
                        interest: '羽毛球',
                        birthday: '1991-05-14',
                        book: '乔布斯传',
                        movie: '致命魔术',
                        music: 'I Cry'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗',
                        job: '数据科学家',
                        interest: '排球',
                        birthday: '1989-03-18',
                        book: '我的奋斗',
                        movie: '罗马假日',
                        music: 'My Heart Will Go On'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道',
                        job: '数据产品经理',
                        interest: '网球',
                        birthday: '1992-01-31',
                        book: '赢',
                        movie: '乔布斯',
                        music: 'Don’t Cry'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道',
                        job: '数据分析师',
                        interest: '桌球，跑步',
                        birthday: '1988-7-25',
                        book: '红楼梦',
                        movie: '倩女幽魂',
                        music: '演员'
                    }
                ]
            };
        },
        methods: {
            init () {

            }
        },
        mounted () {
            this.init();
        },
        watch: {
            '$route' () {
                this.init();
            }
        }
    };
</script>
