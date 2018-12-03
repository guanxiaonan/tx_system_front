<template>
    <div>
        <card style="height: 580px">
        <div>
            <div class="topic">
                <h1 style="text-align: center">建议留言板</h1>
            </div>
            <br></br>
            <Row>
                <Col span="12" >
                    <div style="" class="doc-header">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" label-position="right">
                            <Form-item label="姓名" prop="name">
                                <Input v-model="formValidate.name" placeholder="请输入姓名" style="width: 150px;"></Input>
                            </Form-item>
                            <Form-item label="邮箱" prop="mail">
                                <Input v-model="formValidate.mail" placeholder="请输入邮箱" style="width: 250px;"></Input>
                            </Form-item>
                            <Form-item label="建议模块" prop="city">
                                <Select v-model="formValidate.city" placeholder="请选择建议的服务类型" style="width: 350px;">
                                    <Option value="huadong">锅具制造</Option>
                                    <Option value="huanan">售卖流程</Option>
                                    <Option value="huabei">售后服务</Option>
                                    <Option value="xibu">广告宣传</Option>
                                    <Option value="zhongbu">网站服务</Option>
                                </Select>
                            </Form-item>
                            <Form-item label="选择日期">
                                <Row>
                                    <Col span="11">
                                        <Form-item prop="date">
                                            <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date"></Date-picker>
                                        </Form-item>
                                    </Col>
                                    <Col span="2" style="text-align: center">-</Col>
                                </Row>
                            </Form-item>
                            <Form-item label="性别" prop="gender">
                                <Radio-group v-model="formValidate.gender">
                                    <Radio label="male">男</Radio>
                                    <Radio label="female">女</Radio>
                                </Radio-group>
                            </Form-item>
                            <Form-item label="爱好" prop="interest">
                                <Checkbox-group v-model="formValidate.interest">
                                    <Checkbox label="吃饭"></Checkbox>
                                    <Checkbox label="睡觉"></Checkbox>
                                    <Checkbox label="跑步"></Checkbox>
                                    <Checkbox label="看电影"></Checkbox>
                                </Checkbox-group>
                            </Form-item>
                            <Form-item label="建议" prop="desc">
                                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 9}" placeholder="请输入..."
                                       style="width: 550px;"></Input>
                            </Form-item>
                            <Form-item>
                                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                            </Form-item>
                        </Form>
                    </div>
                </Col>
                <Col span="12" >
                    <div  class="doc-header">
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            历史评价
                        </p>
                         <a href="#" slot="extra" @click.prevent="changeLimit">
                            <Icon type="ios-loop-strong"></Icon>
                            换一换
                         </a>
                        <ul>
                             <li v-for="item in randomMovieList">
                                <a :href="item.url" target="_blank">{{ item.name }}</a>
                                <span>
                                    <Icon type="ios-star" v-for="n in 4" :key="n" color="#ffac2d"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5" color="#ffac2d"></Icon><Icon type="ios-star-half" v-else color="#ffac2d"></Icon>
                                    {{ item.rate }}
                                </span>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </div>
        </card>
        <div class="foot">
            <p>Copyright © 2018 中国·天喜控股</p>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                movieList: [
                    {
                        name: '锅具制造',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
                    },
                    {
                        name: '售卖流程',
                        url: 'https://movie.douban.com/subject/1295644/',
                        rate: 9.4
                    },
                    {
                        name: '售后服务',
                        url: 'https://movie.douban.com/subject/1291546/',
                        rate: 9.5
                    },
                    {
                        name: '售后服务',
                        url: 'https://movie.douban.com/subject/1292720/',
                        rate: 9.4
                    },
                    {
                        name: '广告宣传',
                        url: 'https://movie.douban.com/subject/1292063/',
                        rate: 9.5
                    },
                    {
                        name: '网站服务',
                        url: 'https://movie.douban.com/subject/1291561/',
                        rate: 9.2
                    },
                    {
                        name: '广告宣传',
                        url: 'https://movie.douban.com/subject/1295124/',
                        rate: 9.4
                    },
                    {
                        name: '锅具制造',
                        url: 'https://movie.douban.com/subject/1292001/',
                        rate: 9.2
                    },
                    {
                        name: '网站服务',
                        url: 'https://movie.douban.com/subject/2131459/',
                        rate: 9.3
                    },
                    {
                        name: '网站服务',
                        url: 'https://movie.douban.com/subject/3541415/',
                        rate: 9.2
                    }
                ],
                randomMovieList: [],
                formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: ''
                },
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                },
                formLeft: {
                    input1: '',
                    input2: '',
                    input3: ''
                },
                formRight: {
                    input1: '',
                    input2: '',
                    input3: ''
                },
                formTop: {
                    input1: '',
                    input2: '',
                    input3: ''
                },
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                },
                formDynamic: {
                    items: [
                        {
                            value: ''
                        }
                    ]
                },
            }
        },//data
        methods: {
            changeLimit () {
                function getArrayItems(arr, num) {
                    const temp_array = [];
                    for (let index in arr) {
                        temp_array.push(arr[index]);
                    }
                    const return_array = [];
                    for (let i = 0; i<num; i++) {
                        if (temp_array.length>0) {
                            const arrIndex = Math.floor(Math.random()*temp_array.length);
                            return_array[i] = temp_array[arrIndex];
                            temp_array.splice(arrIndex, 1);
                        } else {
                            break;
                        }
                    }
                    return return_array;
                }
                this.randomMovieList = getArrayItems(this.movieList, 5);
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
            }
            })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAdd () {
                this.formDynamic.items.push({
                    value: ''
                });
            },
            handleRemove (index) {
                this.formDynamic.items.splice(index, 1);
            },

        },
        mounted () {
            this.changeLimit();
        }

    }
</script>
<style scoped>
    .foot {
        width: 500px;
        height: 30px;
        margin-top: -10px;
        text-align: center;
    }
</style>