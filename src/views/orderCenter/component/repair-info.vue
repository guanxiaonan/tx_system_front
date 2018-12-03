<template>
    <div>
        <card>
            <p slot="title"><Icon type="compose"></Icon>报修信息填写</p>
            <row>
                <Col span='10' class="padding-right1">
                    <Form :model="formItem" :label-width="80" style="width:100%;dispaly:block;">

                        <FormItem label="经销商">
                            <Select v-model="formItem.type">
                                <Option v-for="item in typeNameList" v-bind:value="item.id">
                                    {{ item.typeName }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="所在地区"> <al-cascader v-model="formItem.add" />
                        </FormItem>
                        <FormItem label="详细地址"><Input v-model="formItem.addDetail" placeholder="请输入..." />
                        </FormItem>
                        <Form-item label="损坏部位">
                            <Checkbox-group v-model="formItem.pos">
                                <Checkbox label="部位1"></Checkbox>
                                <Checkbox label="部位2"></Checkbox>
                                <Checkbox label="部位3"></Checkbox>
                                <Checkbox label="部位4"></Checkbox>
                            </Checkbox-group>
                        </Form-item>
                        <FormItem label="损坏描述"><Input v-model="formItem.name" placeholder="请输入..." />
                        </FormItem>
                        <FormItem label="联系电话">
                            <Input v-model="formItem.barCode" placeholder="请输入..."></Input>
                        </FormItem>
                        <FormItem label="备注">
                            <Input v-model="formItem.detail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                        </FormItem>
                        <div class="height-120px">
                            <Row type="flex" justify="center" align="middle" class="height-100">
                                <Upload multiple action="//jsonplaceholder.typicode.com/posts/">
                                    <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                                </Upload>
                            </Row>
                        </div>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit(formDynamic)" >提交</Button>
                            <Modal v-model="modal" title="提交信息" @ok-ok="ok" @on-cancel="cancel">
                                <p>提交成功</p>
                            </Modal>
                            <Button type="ghost" @click="handleReset" style="margin-left: 8px">取消</Button>
                        </FormItem>
                    </form>
                </col>
                <Col span='7' class="padding-right2">
                    <col span="3"><row><div class="goodPic"><img src="./goodPic.png"></div>
                    <row>商品信息{{this.$route.params.id}}{{ this.$route.params.potName}}{{this.$route.params.customer}}{{id}}</row>
                    <row class="tips">
                        <Alert show-icon>
                            Main tips
                            <Icon type="ios-lightbulb-outline" slot="icon"></Icon>
                            <template slot="desc">
                            </template>
                        </Alert>
                        <template>
                            <Alert>tips2</Alert>
                            <Alert type="success">tips3</Alert>
                            <Alert type="warning">tips4</Alert>
                            <Alert type="error">tips5</Alert>
                        </template></row></row>
                </col><col span="3" class="goodDet">productDetail
            </row>
            <row>
            </row>
        </card>
    </div>
</template>
<script>
    import Vue from 'vue';
    import iviewArea from 'iview-area';
    Vue.use(iviewArea);
    import axios from 'axios';
    export default {
        name: 'material-add',
        data () {
            return {
                modal: false,
                formItem: {
                    name: '',
                    pos: [],
                    type: '',
                    code: '',
                    barCode: '',
                    detail: '',
                    add: '',
                    addDetail: ''
                },
                data9: [],
                data10: [],
                empty: {
                    name: '',
                    pos: [],
                    type: '',
                    code: '',
                    barCode: '',
                    detail: '',
                    add: ''
                },
                shoppingColumns: [],
                shoppingData: [],
                typeNameList:[],
                tableTobe: []
            };
        },
        methods: {
            init() {
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
            getdata () {
                axios.get('/api/material/pot_product').then((res) => {
                    this.shoppingData = res.data.data;
                //this.data10=this.data9[0];
                // this.tableTobe=this.search(this.shoppingData, {id: this.id});
                console.log(this.initTable3);
                //this.data10=JSON.parse(JSON.stringify(this.data10));
            });
            },
            ok () {
                this.modal = false,
                    this.$Message.info('点击了确定');
            },
            // getData () {
            //     //请求方法，根据实际情况使用
            //     axios.get(`/api/material/pot_product`)
            //         .then((res) => {
            //         console.log("列表数据");
            //     this.shoppingData = res.data.data;
            //     this.initTable3=this.shoppingData;
            // });
            // },
            // getData () {
            //     axios.get('/api/material/pot_product').then((res) => {
            //         this.data10 = res.data.data;
            //     //this.data10=this.data9[0];
            //     this.data11=this.search(this.data10, {name: this.id});
            //     console.log(this.data11);
            //     //this.data10=JSON.parse(JSON.stringify(this.data10));
            //     this.id=this.id;
            // });
            // },
            cancel () {
                this.$Message.info('点击了取消');
            },
            // init () {
            //     //请求方法，根据实际情况使用
            //     axios.get('/api/material/type').then((res) => {
            //         console.log(res)
            //         if (res.data.code === 4004) {
            //             this.$router.push({
            //                 name: 'login'
            //             });
            //         } else {
            //             //res 为成功回调的响应
            //             this.typeNameList = res.data.data;
            //         }
            //     });
            // },
            handleSubmit (name) {
                this.modal=true;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
            }
            });
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        mounted () {
            this.init();
            this.getdata();
        },
        watch: {
            '$route'() {
                this.init();
            },
        }
    };
</script>
<style>
    .padding-right1{
        float:left;
    }
    .padding-right2{
        padding-left: 50px;
    }
    .goodDet{
        float:right;
        padding-left: 50px;
    }
    .tips{
    }
</style>
