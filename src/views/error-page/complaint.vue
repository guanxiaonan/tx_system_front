<style>
    .btn{
        float: left
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
            <p slot="title"><Icon type="compose"></Icon>填写信息</p>
            <Form class="step-form" ref="step" :model="step" :rules="stepRules" :label-width="100">
                <row>
                    <Col span="6">
                        <FormItem label="客户名称：" required>
                            <Input :disabled="hasSubmit" v-model="formValidate.postName" type="text" font-size="50px"/>
                        </FormItem>
                    </Col>
                    <Col span="7">
                        <FormItem label="联系电话：" required>
                            <Input :disabled="hasSubmit" v-model="formValidate.cusPhone" type="text" font-size="50px"/>
                        </FormItem>
                    </Col>
                </row>
                <FormItem label="地址：">
                    <Col span="12">
                      <al-cascader v-model="res1" level="3"/>
                    </Col>
                </FormItem>
                <FormItem label="详细地址：">
                    <Col span="12">
                        <Input v-model="res2" level="3"/>
                    </Col>
                </FormItem>
                <row>
                    <Col span="8">
                        <FormItem label="电子邮箱：" >
                           <Input :disabled="hasSubmit" v-model="formValidate.postEmail" type="text" font-size="50px"/>
                        </FormItem>
                    </Col>
                    <Col span="5">
                        <FormItem label="邮编：" >
                          <Input :disabled="hasSubmit" v-model="formValidate.postCode" type="text" font-size="50px"/>
                        </FormItem>
                    </Col>
                </row>
                <FormItem label="类型：" required>
                    <label for="5">建议</label>
                    <input type="radio" v-model="formValidate.comType" id="5" @click="setValue(1)" value="1">
                    <label for="6">投诉</label>
                    <input type="radio" v-model="formValidate.comType" id="6" @click="setValue(0)" value="0">
                </FormItem>
                <row>
                    <Col span="13">
                        <FormItem label="内容简述：" required>
                            <Input :disabled="hasSubmit" v-model="formValidate.comDescribe" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入意见" />
                        </FormItem>
                    </Col>
                </row>
                <row>
                    <Form-item label="投诉日期">
                        <Row>
                            <Col span="11">
                                <Form-item prop="date">
                                    <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date"></Date-picker>
                                </Form-item>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                        </Row>
                    </Form-item>
                </row>
                <!--<FormItem label="是否通过：" required>-->
                    <!--<RadioGroup v-model="step.pass">-->
                        <!--<Radio :disabled="hasSubmit" label="通过"></Radio>-->
                        <!--<Radio :disabled="hasSubmit" label="不通过"></Radio>-->
                    <!--</RadioGroup>-->
                <!--</FormItem>-->
                <row>
                    <FormItem>
                        <Button class="btn" :disabled="hasSubmit" @click="handleSubmit" style="width:100px;" type="primary">提交</Button>
                    </FormItem>
                </row>
            </Form>
        </card>
        <div class="foot">
            <p>Copyright © 2018 中国·天喜控股</p>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios'
    import Cookies from 'js-cookie'
    import alCascader from '../my-components/area-linkage/components/al-cascader.vue';
    import App from './component/app.vue';
    import iviewArea from 'iview-area';
    Vue.use(iviewArea);
    export default {
        components: {
                alCascader, App
            },
        data () {
            return {
                bx:'',
                res1: [],
                res2: '',
                hasSubmit: false,
                step: {
                    opinion: '',
                    remark: '',
                    pass: '通过'
                },
                stepRules: {
                    opinion: [
                        { required: true, message: '请填写意见', trigger: 'blur' }
                    ]
                },
                formValidate: {
                    compId: Number,
                    cusId: '',
                    cusPhone: '',
                    comDescribe: '',
                    comType: Number,
                    compDate: '',
                    compState: 1,
                    postName: null,
                    postEmail: '',
                    postCode: '',
                    postAddress: '',
                },
            }
        },
        methods: {
            init() {
            },
            setValue(i) {
                if(i === 0) {
                    this.formValidate.comType = 0
                }else {
                    this.formValidate.comType = 1
                }
                console.log(this.formValidate.comType);
            },
            handleSubmit () {
                for (var i = 0; i < this.res1.length; i++) {
                    if(this.res1[i] != null) {
                        this.formValidate.postAddress =  this.formValidate.postAddress + this.res1[i].name;
                    }
                }
                this.formValidate.postAddress = this.formValidate.postAddress +this.res2;
                    axios.post(`api/material/complaint_submit`,this.formValidate).then((res) => {
                        console.log(res);
                        alert("提交成功");
                        this.formValidate = {

                            cusId: Cookies.get('loginId'),
                            cusPhone: '',
                            comDescribe: '',
                            comType: Number,
                            compDate: '',
                            compState: 1,
                            postName: '',
                            postEmail: '',
                            postCode: '',
                            postAddress: '',
                        };
                    })
            }
        },
        mounted() {
            this.init();
        }
    }
</script>
