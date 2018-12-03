<style lang="less">
    @import '../../styles/common.less';
    .advanced-router {
        &-tip-p {
            padding: 10px 0;
        }
    }
</style>

<style scoped>
    .isDiv-con {
        margin-left: 30px;
    }
    .isDiv-con1 {
        margin-left: 30px;
        width: 80px;
    }

    .btn1 {
        text-align: center;
        padding: 10px;
        width:80px;
        height:42px;
        color:#FFFFFF;
        background-color: #1E90FF;
        border: none;
        border-radius: 5px;
    }
    .table {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>


<template>
    <div>
        <card style="height: 615px">
            <row>
                <Col span="12">
                    <card>
                        <p slot="title">寄件表<span style="color: dodgerblue">（双击未寄修改状态）</span></p>
                        <Table class="table" :columns="column" :data="data" ></Table>
                        <row style="height: 40px">
                            <v-pagination   :total="total" :current-page='currentPage' v-bind:display="display"  @pagechange="pagechange"></v-pagination>
                        </row>
                    </card>
                </Col>
                <Col span="12">
                    <div style="padding-left: 5px">
                        <card>
                            <label for="load" ></label>
                            <p slot="title" id = 'load'>寄件信息
                                <span v-if="!isScan">（录入）</span>
                                <span v-if="isScan">
                                    <button style="border: none;color: #0C25F1;box-shadow: #FFFFFF;border-radius: 10px" @click="newMail">(点击新建)</button>
                                </span>
                            </p>
                            <div v-if="!isScan" style="height: 513px">
                                <Form>
                                    <row>
                                        <Col span="8">
                                            <FormItem label="寄件人：" >
                                                <Input type="text" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem class="isDiv-con" label="寄件人电话：" >
                                                <Input type="text" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                    </row>
                                    <row>
                                        <Col span="16">
                                            <FormItem label="始发地：">
                                                <al-cascader v-model="res1" level="3"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem class="isDiv-con" label="详细地址：" >
                                                <Input type="text" v-model="detailAddress2"/>
                                            </FormItem>
                                        </Col>
                                    </row>
                                    <row>
                                        <Col span="8">
                                            <FormItem label="收件人：" >
                                                <Input type="text" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem class="isDiv-con" label="收件人电话：" >
                                                <Input type="text" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="4">
                                            <FormItem class="isDiv-con1" label="邮编：" >
                                                <Input type="text" font-size="100px"/>
                                            </FormItem>
                                        </Col>
                                    </row>
                                    <row>
                                        <Col span="16">
                                            <FormItem label="收件人地址：">
                                                <al-cascader v-model="res2" level="3"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem class="isDiv-con" label="详细地址：" >
                                                <Input type="text" v-model="detailAddress3"/>
                                            </FormItem>
                                        </Col>
                                    </row>
                                    <input class="btn1" type="primary" size="100px" value="提交">
                                </Form>
                            </div>
                            <!--新建-->
                            <div v-if="isScan" style="height: 513px">
                                <Form>
                                    <row>
                                        <Col span="8">
                                            <FormItem label="寄件人：" >
                                                <Input type="text" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem class="isDiv-con" label="寄件人电话：" >
                                                <Input type="text" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                    </row>
                                    <row>
                                        <Col span="16">
                                            <FormItem label="始发地：">
                                                <al-cascader v-model="res1" level="3"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem class="isDiv-con" label="详细地址：" >
                                                <Input type="text" v-model="detailAddress"/>
                                            </FormItem>
                                        </Col>
                                    </row>
                                    <row>
                                        <Col span="8">
                                            <FormItem label="收件人：" >
                                                <Input v-model="mail_name" type="text" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem class="isDiv-con" label="收件人电话：" >
                                                <Input type="text" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="4">
                                            <FormItem class="isDiv-con1" label="邮编：" >
                                                <Input type="text" font-size="100px"/>
                                            </FormItem>
                                        </Col>
                                    </row>
                                    <row>
                                        <FormItem label="收件人地址：">
                                            <Input type="text" v-model="detailAddress1"/>
                                        </FormItem>
                                    </row>
                                    <input class="btn1" type="primary" size="100px" value="保存">
                                </Form>
                            </div>
                            <!--查看-->
                        </card>
                    </div>
                </Col>
            </row>
        </card>
    </div>
</template>

<script>
    import Vue from 'vue';
    import alCascader from '../my-components/area-linkage/components/al-cascader.vue';
    import changeSts from  './component/changeSts'
    import App from '../error-page/component/app.vue';
    import iviewArea from 'iview-area';
    import pagination from './component/pagination.vue';
    import axios from 'axios';
    Vue.use(iviewArea);
    export default {
        name: 'mail',
        components: {
            'v-pagination': pagination,
            alCascader,
            App,
            changeSts
        },
        data () {
            return {
                total: 10,     // 记录总条数
                display: 9,   // 每页显示条数
                currentPage: 1,   // 当前的页数
                pagegroup: 12,
                isScan: false,
                data: [],
                data1: [],
                res1: ['浙江省', '丽水市', '缙云县', '壶镇镇'],
                detailAddress: '西二路1号',
                res2: [],
                mail_name: '',
                detailAddress1: '',
                detailAddress2: '',
                detailAddress3: '',
                column: [
                    {
                        title: '序号',
                        width: 60,
                        type: 'index',
                        align:'center',
                    },
                    {
                        title: '收件人',
                        align: 'center',
                        width: 150,
                        key: 'describe',
                    },
                    {
                        title: '包裹类型',
                        align: 'center',
                        key: 'describe',
                    },

                    {
                        title: '寄件状态',
                        width: 120,
                        align: 'center',
                        key: 'workStatus',
                        render: (h, params) => {
                            const row = params.row;
                             row.workStatus =Math.floor(Math.random() * 2 + 1) ;
                            //row.workStatus = 1;
                            if(row.workStatus===1)
                                return h(changeSts,{
                                    props: {
                                        workStatus: true,
                                        stsColor: 'red'
                                    },
                                });
                            if(row.workStatus===2)
                                return h(changeSts,{
                                    props: {
                                        workStatus: false,
                                        stsColor: 'green'
                                    },
                                });

                        }
                    },
                    {
                        title: ' ',
                        width: 90,
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
                                            this.isScan = true;
                                            this.detailAddress1 = params.row.address;
                                            this.mail_name = params.row.address;
                                        }
                                    }
                                }, '点击查看')
                            ])
                        }
                    }
                ]
            }
        },
        methods: {
            init (){
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
                axios.get(`/api/material/repairHandlePage/${currentPage}/${display}`)
                    .then((res) => {
                        //console.log(res.data.data);
                        this.data = res.data.data;
                        this.data1=res.data.data;
                    });
            },
            pagechange (page) {
                this.currentPage = page;
                this.data = [];
                this.getdata(this.currentPage,this.display);
            },
            newMail () {
                return this.isScan = false
            }
        },
        mounted () {
            this.init();
            this.getdata(this.currentPage,this.display);
            this.newMail();
        },
        watch: {
            '$route' () {
                this.init();
            },
        }
    }
</script>
