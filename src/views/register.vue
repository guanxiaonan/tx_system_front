<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="person"></Icon>
                    欢迎注册
                </p>
                <Select  v-model="loadType" placeholder="请选择注册类型">
                    <Option v-for="(item ,index) in loadTypeList"  v-bind:value="item.id" :key="index">
                        {{ item.loadTypeName}}
                    </Option>
                </Select>
                <div class="form-con" v-if="loadType === 1">
                    <Form ref="formreg" :model="formreg" :label-width="100" :rules="rules">
                        <FormItem label="用户姓名：" prop="name">
                            <Input v-model="formreg.username" placeholder="请输入用户名"></Input>
                        </FormItem>
                        <FormItem label="用户密码：">
                            <Input type="password" v-model="formreg.userpwd" placeholder="请输入密码"></Input>
                        </FormItem>
                        <FormItem label="确认密码：" prop="checkPwd">
                            <Input v-model="newPwd" placeholder="请再次输入新密码" ></Input>
                        </FormItem>



                        <FormItem label="性别：" prop="sex">
                          <input type="radio" id="man" value="男" v-model="formreg.sex">
                          <label for="man">男</label>
                          <input type="radio" id="women" value="女" v-model="formreg.sex">
                          <label for="women">女</label>
                        </FormItem>
                        <FormItem label="联系电话：" prop="phone">
                            <Input v-model="formreg.phone" placeholder="请输入电话"></Input>
                        </FormItem>
                        <FormItem label="邮箱：" prop="email">
                            <Input v-model="formreg.email" placeholder="请输入邮箱"></Input>
                        </FormItem>
                        <div style="margin-top:10px;text-align:center">
                            <!--<Button type="ghost" @click="cancelRegister">取消</Button>-->
                            <Button type="primary" long @click="registerSubmit($event)">提交注册申请</Button>
                        </div>
                    </Form>
                </div>
                <div v-if="loadType === 2">
                    <Form ref="formreg1" :model="formreg1" :label-width="100" :rules="rules">
                        <FormItem label="用户姓名：" prop="name">
                            <Input v-model="formreg1.vendName" placeholder="请输入用户名"></Input>
                        </FormItem>
                        <FormItem label="用户密码：">
                            <Input type="password" v-model="formreg1.userpwd" placeholder="请输入密码"></Input>
                        </FormItem>
                        <FormItem label="确认密码：" prop="checkPwd1">
                            <Input v-model="newPwd" placeholder="请再次输入新密码" ></Input>
                        </FormItem>

                        <FormItem label="联系电话：" prop="phone">
                            <Input v-model="formreg1.vendPhone" placeholder="请输入电话"></Input>
                        </FormItem>
                        <FormItem label="邮箱：">
                            <Input v-model="formreg1.vendEmail" placeholder="请输入邮箱"></Input>
                        </FormItem>
                        <FormItem label="邮编：">
                            <Input v-model="formreg1.vendCode" placeholder="请输入邮编"></Input>
                        </FormItem>
                        <FormItem label="经销地区：">
                            <Input v-model="formreg1.vendArea" placeholder="请输入···"></Input>
                        </FormItem>
                        <FormItem label="地址：">
                            <Input v-model="formreg1.vendAddress" placeholder="请输入···"></Input>
                        </FormItem>
                        <div style="margin-top:10px;text-align:center">
                            <!--<Button type="ghost" @click="cancelRegister">取消</Button>-->
                            <Button type="primary" long @click="registerSubmit($event)">提交注册申请</Button>
                        </div>
                    </Form>
                </div>
                <Button type="ghost" long @click="cancelRegister" style="background-color: #2D8CF0; color: white; margin-top: 5px">取消</Button>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import axios from 'axios';

export default {
    data () {
        const valideRePassword = (rule, value, callback) => {
            if (this.newPwd !== this.formreg.userpwd) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };

        const valideRePassword1 = (rule, value, callback) => {
            if (this.newPwd !== this.formreg1.userpwd) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };

        const valideName = (rule, value, callback) => {
            // console.log(rule);
            // console.log(value)
            // if (value.length>10 || value.length<3) {
            //     callback(new Error('字符长度应在4~9'));
            // } else {
            //     callback();
            // }
        };
        return {
            res1:[],
            status: 0,
            msg: '输入用户名和密码登录',
            submitType:'',
            loadType: '',
            newPwd: '',
            loadTypeList: [
                {
                    id: 1,
                    loadTypeName: '顾客',
                },
                {
                    id: 2,
                    loadTypeName: '经销商'
                },
            ],
            formreg: {
                username: '',
                userpwd: '',
                sex: '',
                phone: '',
                email: '',
                type: '',
                invoice: ''
            },
            formreg1: {
                vendName: '',
                userpwd: '',
                vendPhone: '',
                vendEmail: '',
                type: '',
                invoice: '',
                code: '',
                vendArea: '',
                vendAddress: ''
            },
            typeNameList: [],
            rules: {
                name: [
                    // { required: true, message: '账号不能为空', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    // { validator: valideName }
                ],
                pwd: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                checkPwd: [
                    // { required: true, message: '密码不能为空', trigger: 'blur' },
                    { validator: valideRePassword, trigger: 'blur' }
                ],

                checkPwd1: [
                    // { required: true, message: '密码不能为空', trigger: 'blur' },
                    { validator: valideRePassword1, trigger: 'blur' }
                ],
                area: [
                    { required: true, message: '此项必填', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        init () {
            // console.log("11111")
            //请求方法，根据实际情况使用
            axios.get('/api/material/type').then((res) => {
                console.log(res);
                this.typeNameList = res.data.data;
                // }

            });
        },
        // handleSubmit () {
        //     this.$refs.loginForm.validate((valid) => {
        //         if (valid) {
        //             Cookies.set('user', this.form.name);
        //             Cookies.set('password', this.form.pwd);
        //             this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
        //             if (this.form.name === 'iview_admin') {
        //                 Cookies.set('access', 0);
        //             } else {
        //                 Cookies.set('access', 1);
        //             }
        //             // this.$router.push({
        //             //     name: 'home_index'
        //             // });
        //         }
        //     });
        //
        //     this.msg = ''
        //     axios.post('/api/user/login', this.form,{
        //             headers: {
        //                     'Content-Type': 'application/json'
        //               }
        //           }).then((response)=> {
        //
        //             let code = response.data.code
        //             this.status = code
        //             if (code == 2000) {
        //                 console.log("success")
        //                 let name = response.data.data.name
        //                 let pwd = response.data.data.pwd
        //                 Cookies.set('user', name);
        //                 Cookies.set('password', pwd);
        //                 this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
        //                 if (name === 'admin') {
        //                     Cookies.set('access', 0);
        //                 } else {
        //                     Cookies.set('access', 1);
        //                 }
        //                 this.$router.push({
        //                     name: 'home_index'
        //                 });
        //             } else if (code == 3002){
        //                 this.msg = "用户不存在!"
        //                 console.log("用户不存在！")
        //             } else {
        //                 console.log("error")
        //             }
        //           }).catch((error) => {
        //             console.log(error);
        //           });
        // },
        registerSubmit: function($event){
            // console.log("123456");
            console.log(this.formreg);
            Cookies.set('register','pass');
            var k = 'formreg';
            if(this.loadType === 2) {
                k = 'formreg1'
            }
            this.$refs[k].validate((valid) => {
                if(valid) {
                    var subForm;
                    if(this.loadType === 1) {
                        //顾客注册
                        this.submitType = 'register';
                        subForm = this.formreg;
                    }else {
                        //经销商注册
                        this.submitType = 'register_vendor';
                        subForm = this.formreg1;
                    }

                    axios.post('/api/user/' + this.submitType, subForm,{
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                            console.log(response);
                            if (response.data.code === 2000) {
                                alert("注册成功！");
                                this.$router.push({
                                    name: 'login'
                                });
                            } else if(response.data.code === 3003) {
                                this.msg = "用户已存在!";
                                console.log("用户已存在！")
                            }

                        })
                        .catch(function (error) {
                            console.log('注册失败...');
                            console.log(error);
                        });
                }
            })
        },
        cancelRegister(){
          this.$router.push({
              name: 'login'
          });
        }
    },
    mounted () {
        this.init();
    }
};
</script>

<style>

</style>
