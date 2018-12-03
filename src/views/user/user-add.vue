<style lang="less">
    @import '../my-components/area-linkage/area-linkage.less';
    @import '../../styles/common.less';
</style>
<template>
    <Row>
    <Col span="12">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="姓名" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入用户姓名"></Input>
            </FormItem>
            <FormItem label="邮箱" prop="mail">
                <Input v-model="formValidate.mail" placeholder="请输入用户邮箱"></Input>
            </FormItem>
            <FormItem label="居住城市" prop="city">
                <al-cascader
                        v-model="res1"
                        style="margin-top:20px;width:50%;"
                />
            </FormItem>
            <FormItem label="出生日期">
                <Row>
                    <Col span="11">
                    <FormItem prop="date">
                        <DatePicker type="date" placeholder="请输入出生日期" v-model="formValidate.date"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="2">---</Col>
                    <Col span="11">
                    <FormItem prop="time">
                        <TimePicker type="time" placeholder="选择时间" v-model="formValidate.time"></TimePicker>
                    </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="性别" prop="gender">
                <RadioGroup v-model="formValidate.gender">
                    <Radio label="male" >男</Radio>
                    <Radio label="female">女</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="爱好" prop="interest">
                <CheckboxGroup v-model="formValidate.interest">
                    <Checkbox label="吃"></Checkbox>
                    <Checkbox label="睡觉"></Checkbox>
                    <Checkbox label="跑步"></Checkbox>
                    <Checkbox label="看电影"></Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="描述" prop="desc">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="其他..."></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Col>
    </Row>
</template>
<script>
    import Vue from 'vue';
    import iviewArea from 'iview-area';
    Vue.use(iviewArea);
    export default {
        data () {
            return {
                res1: [],
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: 'male',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'date', message: 'Please select time', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
