<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="name">
                            <Input v-model="form.username" placeholder="请输入用户名">
                            <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="pwd">
                            <Input type="password" v-model="form.userpwd" placeholder="请输入密码">
                            <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem style="margin-bottom: -5px">
                            <!--<label style="font-size: 15px;color: #0C25F1;">选择登陆类别：</label>-->
                            <Select  v-model="loadType" placeholder="请选择登陆身份">
                                <Option v-for="(item ,index) in loadTypeList"  v-bind:value="item.id" :key="index">
                                    {{ item.loadTypeName}}
                                </Option>
                            </Select>
                            <Button v-if="loadType" type="primary" long @click="handleSubmitTest" style="margin-top: 20px">登陆</Button>
                            <!--<Button v-if="!bx" @click="handleSubmit" type="primary" long>顾客登录</Button>-->
                            <!--<Button v-if="bx" @click="handleSubmit2" type="primary" long>工作人员登录</Button>-->
                        </FormItem>
                        <FormItem>
                            <!--<row>-->
                                <!--<label for="5">顾客</label>-->
                                <!--<input type="radio" v-model="bx" id="5" value="">-->
                                <!--<label for="6">工作人员</label>-->
                                <!--<input type="radio" v-model="bx" id="6" value="true">-->
                            <!--</row>-->
                            <a v-on:click="toRegister">没有账号？马上注册</a>
                            <p class="login-tip" v-if="status == 3002" style="color:red">
                                {{ msg }}
                            </p>
                            <p class="login-tip" v-if="status != 3002">
                                {{ msg }}
                            </p>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    import axios from 'axios';
    import FormItem from "iview/src/components/form/form-item";
    export default {
        components: {FormItem},
        data () {
            return {
                bx: '',
                status: 0,
                msg: '输入用户名和密码登录',
                submitType:'',
                loadType: '',
                loadTypeList: [
                    {
                        id: 1,
                        loadTypeName: '顾客',
                    },
                    {
                        id: 2,
                        loadTypeName: '经销商'
                    },
                    {
                        id: 3,
                        loadTypeName: '管理员'
                    }
                ],
                form: {
                    username: '',
                    userpwd: ''
                },
                formStaff: {
                    staffName: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    userpwd: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            handleSubmitTest() {
                if(this.loadType ===3) {
                    //管理员
                    this.submitType = 'administrator'
                } else if(this.loadType ===1 ) {
                    //顾客
                    this.submitType = 'customer'
                } else if(this.loadType === 2) {
                    //经销商
                    this.submitType = 'vendor'
                } else {
                    return 404
                }
                console.log(this.form);
                axios.post('/api/user/login/'+ this.submitType, this.form,{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response)=> {
                    console.log(response);
                    let code = response.data.code;
                    this.status = code;
                    if (code === 2000) {
                        let name = response.data.data.username;
                        let pwd = response.data.data.userpwd;
                        let loginId = response.data.data.id;
                        console.log(response.data.data);
                        Cookies.set('user', name);
                        Cookies.set('pwd', pwd);
                        Cookies.set('loginId', loginId);
                        this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                        if (this.loadType ===3) {
                            //管理员
                            Cookies.set('access', 0);
                        } else if (this.loadType ===2) {
                            //经销商
                            let loginId = response.data.data.vendId;
                            Cookies.set('loginId', loginId);
                            Cookies.set('access', 2);
                        } else if(this.loadType ===1){
                            //顾客
                            Cookies.set('access', 1);
                        }

                        this.$router.push({
                            name: 'home_index'
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            toRegister(){
                this.$router.push({ path: '/register' })
            }
        }
    };
</script>

<style>

</style>
