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
    .foot {
        width: 500px;
        height: 30px;
        margin-top: -10px;
        text-align: center;
    }
</style>


<template>
    <div>
        <card style="height: 580px">
            <row>
                <Col span="12">
                    <card style="height: 563px">
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
                            <div v-if="!isScan" style="height: 478px">
                                <Form :model="formItemIn">
                                    <row>
                                        <Col span="8">
                                            <FormItem label="寄件人：" >
                                                <Input v-model="formItemIn.sendName" type="text" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem class="isDiv-con" label="寄件人电话：" >
                                                <Input v-model="formItemIn.sendPhone" type="text" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                    </row>
                                    <row>
                                        <Col span="8">
                                            <FormItem label="邮寄单号：" >
                                                <Input type="text" v-model="formItemIn.mailCheckId" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem class="isDiv-con" label="报修受理号：" >
                                                <Input type="text" v-model="formItemIn.mailRepairId" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                        <!--<Col span="8">-->
                                            <!--<FormItem class="isDiv-con" label="包裹类型：" >-->
                                                <!--<Input type="text" v-model="formItemIn.mailType" font-size="10px"/>-->
                                            <!--</FormItem>-->
                                        <!--</Col>-->
                                    </row>
                                    <row>
                                        <Col span="16">
                                            <FormItem label="始发地：">
                                                <al-cascader v-model="sendAddressArray" level="3"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem class="isDiv-con" label="详细地址：" >
                                                <Input type="text" v-model="sendDetailAddress"/>
                                            </FormItem>
                                        </Col>
                                    </row>
                                    <row>
                                        <Col span="8">
                                            <FormItem label="收件人：" >
                                                <Input v-model="formItemIn.receiveName" type="text" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem class="isDiv-con" label="收件人电话：" >
                                                <Input v-model="formItemIn.receivePhone" type="text" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="4">
                                            <FormItem class="isDiv-con1" label="邮编：" >
                                                <Input v-model="formItemIn.postCode"type="text" font-size="100px"/>
                                            </FormItem>
                                        </Col>
                                    </row>
                                    <row>
                                        <Col span="16">
                                            <FormItem label="收件人地址：">
                                                <al-cascader v-model="receiveAddressArray" level="3"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem class="isDiv-con" label="详细地址：" >
                                                <Input type="text" v-model="receiveDetailAddress"/>
                                            </FormItem>
                                        </Col>
                                    </row>
                                    <Button @click="mailSumbit()" type="primary">提交</Button>
                                </Form>
                            </div>
                            <!--新建-->
                            <div v-if="isScan" style="height: 478px">
                                <Form>
                                    <row>
                                        <Col span="8">
                                            <FormItem label="寄件人：" >
                                                <Input type="text" v-model="formItem.sendName" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem class="isDiv-con" label="寄件人电话：" >
                                                <Input type="text" v-model="formItem.sendPhone" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                    </row>
                                    <row>
                                        <Col span="8">
                                            <FormItem label="邮寄单号：" >
                                                <Input type="text" v-model="formItem.mailCheckId" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem class="isDiv-con" label="报修受理号：" >
                                                <Input type="text" v-model="formItem.mailRepairId" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                        <!--<Col span="8">-->
                                            <!--<FormItem class="isDiv-con" label="包裹类型：" >-->
                                                <!--<Input type="text" v-model="formItem.mailType" font-size="10px"/>-->
                                            <!--</FormItem>-->
                                        <!--</Col>-->
                                    </row>
                                    <row>
                                        <FormItem label="收件人地址：">
                                            <Input type="text" v-model="formItem.sendAddress"/>
                                        </FormItem>
                                    </row>
                                    <row>
                                        <Col span="8">
                                            <FormItem label="收件人：" >
                                                <Input v-model="formItem.receiveName" type="text" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem class="isDiv-con" label="收件人电话：" >
                                                <Input type="text" v-model="formItem.receivePhone" font-size="10px"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="4">
                                            <FormItem class="isDiv-con1" label="邮编：" >
                                                <Input type="text" v-model="formItem.postCode" font-size="100px"/>
                                            </FormItem>
                                        </Col>
                                    </row>
                                    <row>
                                        <FormItem label="收件人地址：">
                                            <Input type="text" v-model="formItem.receiveAddress"/>
                                        </FormItem>
                                    </row>
                                    <Button v-if="isModify" @click="mailSave()" type="primary">保存</Button>
                                    <!--<input v-if="isModify" class="btn1" type="primary" size="100px" value="保存">-->
                                </Form>
                            </div>
                            <!--查看-->
                        </card>
                    </div>
                </Col>
            </row>
        </card>
        <div class="foot">
            <p>Copyright © 2018 中国·天喜控股</p>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import changeSts from  './component/changeSts'
    import App from '../error-page/component/app.vue';
    import pagination from './component/pagination.vue';
    import alCascader from '../my-components/area-linkage/components/al-cascader.vue';
    import iviewArea from 'iview-area';
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
                display: 8,   // 每页显示条数
                currentPage: 1,   // 当前的页数
                pagegroup: 12,
                isScan: false,
                isModify: true,
                data: [],
                data1: [],
                data2: [],
                formItemIn:{
                    id:'',
                    mailRepairId: '',
                    mailCheckId: '',
                    mailType: '',
                    sendName:'天喜集团',
                    sendPhone: '',
                    sendAddress: '',
                    receiveAddress: '',
                    receiveName:'',
                    receivePhone: '',
                    postCode: ''
                },
                formItem: {
                    id:'',
                    mailRepairId: '',
                    mailCheckId: '',
                    mailType: '',
                    sendName: '',
                    sendPhone: '',
                    sendAddress: '',
                    receiveAddress: '',
                    receiveName: '',
                    receivePhone: '',
                    postCode: '',
                },
                // sendAddressArray: ['浙江省', '丽水市', '缙云县', '壶镇镇'],
                // sendDetailAddress: '西二路1号',
                sendAddressArray: ['浙江省', '丽水市', '缙云县', '壶镇镇'],
                sendDetailAddress: '西二路1号',
                receiveAddressArray: [],
                receiveDetailAddress:'',
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
                        key: 'receiveName',
                    },
                    {
                        title: '包裹类型',
                        align: 'center',
                        key: 'mailStyle',
                    },

                    {
                        title: '寄件状态',
                        width: 120,
                        align: 'center',
                        key: 'mailState',
                        render: (h, params) => {
                            const row = params.row;
                            row.mailStateId =params.row.mailStateId ;
                            //row.workStatus = 1;
                            if(row.mailStateId===1)
                                return h(changeSts,{
                                    props: {
                                        mailStateId: true,
                                        stsColor: 'red',
                                        id: params.row.id
                                    },
                                });
                            if(row.mailStateId===2)
                                return h(changeSts,{
                                    props: {
                                        mailStateId: false,
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
                                            if(params.row.mailStateId === 1){
                                                this.isModify = true
                                            }else if(params.row.mailStateId === 2){
                                                this.isModify = false
                                            }
                                            this.isScan = true;
                                            this.formItem.sendName = params.row.sendName;
                                            this.formItem.sendPhone = params.row.sendPhone;
                                            this.formItem.sendAddress = params.row.sendAddress;
                                            this.formItem.receiveName = params.row.receiveName;
                                            this.formItem.receivePhone = params.row.receivePhone;
                                            this.formItem.receiveAddress = params.row.receiveAddress;
                                            this.formItem.postCode = params.row.postCode;
                                            this.formItem.mailRepairId = params.row.mailRepairId;
                                            this.formItem.mailCheckId = params.row.mailCheckId;
                                            this.formItem.id = params.row.id;
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
            init (){},

            //获取所有mail
            getData () {
                axios.get('/api/material/mail').then((res) => {
                    // console.log(res.data.data);
                    this.total =  res.data.data.length;
                    if(this.display < this.total) {
                        for(var i = 0;i<this.display; i++) {
                            this.data1[i] = res.data.data[i];
                        }
                    }else{
                        for(var i = 0;i<this.total; i++) {
                            this.data1[i] = res.data.data[i];
                        }
                    }


                    // console.log(this.data1);
                    this.data = this.data1
                    // this.data = res.data.data;
                    // console.log(this.data);

                });
            },
            //分页
            getdata (curPage,disp) {
                axios.get('/api/material/mail').then((res) => {
                    var k = (curPage - 1) * disp;
                    var j = this.total - k;
                    if(j > this.display){
                        for(var i = 0;i<this.display; i++) {
                            this.data1[i] = res.data.data[k + i];
                        }
                        this.data = this.data1;
                        // console.log(this.data)
                    }else{
                        for(var i = 0;i<j; i++) {
                            this.data2[i] = res.data.data[k + i];
                            // console.log(k + i)
                        }
                        this.data = this.data2;
                        // console.log(this.data2)
                    }
                });
            },

            pagechange (page) {
                this.currentPage = page;
                this.data = [];
                this.getdata(page,this.display)
                // this.getdata(this.currentPage,this.display);
            },
            newMail () {
                return this.isScan = false
            },
            mailSumbit () {

                for (var i = 0; i < this.sendAddressArray.length; i++) {
                    // console.log(this.sendAddressArray[i].name);
                    if(this.sendAddressArray[i].name != null) {
                        this.formItemIn.sendAddress = this.formItemIn.sendAddress + this.sendAddressArray[i].name;
                    } else {
                        this.formItemIn.sendAddress = this.formItemIn.sendAddress + this.sendAddressArray[i];
                    }
                }
                this.formItemIn.sendAddress = this.formItemIn.sendAddress + this.sendDetailAddress;
                console.log(this.formItemIn.sendAddress);
                //收件地址
                for (var i = 0; i < this.receiveAddressArray.length; i++) {
                    // console.log(this.receiveAddressArray[i].name);
                    if(this.receiveAddressArray[i].name != null) {
                        this.formItemIn.receiveAddress = this.formItemIn.receiveAddress + this.receiveAddressArray[i].name;
                    } else {
                        this.formItemIn.receiveAddress = this.formItemIn.receiveAddress + this.receiveAddressArray[i];
                    }
                }
                this.formItemIn.receiveAddress = this.formItemIn.receiveAddress + this.receiveDetailAddress;
                console.log(this.formItemIn.receiveAddress);
                console.log(this.formItemIn);
                axios.post('/api/material/mail_submit', this.formItemIn, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    console.log(response);
                    alert("数据提交成功！");
                    this.$router.go(0)
                }).catch(function (error) {
                    console.log(error);
                });
            },
            mailSave() {
                // console.log(this.formItem.id);
                axios.put(`api/material/update_mail`,this.formItem,{
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                    alert("数据提交成功！");
                    this.$router.go(0)
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
        mounted () {
            this.init();
            // this.getdata(this.currentPage,this.display);
            this.getData();
            this.newMail();
        },
        watch: {
            '$route' () {
                this.init();
                // this.$router.go(0)
            },
        }
    }
</script>
