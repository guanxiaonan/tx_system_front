<style lang="less">
    @import './own-space.less';
</style>

<template>
    <div>
        <div v-if="access === `0`">
            <h1 align="center">管理员无法修改！！！</h1>
        </div>
        <div v-else>
            <Card>
                <p slot="title">
                    <Icon type="person"></Icon>
                    个人信息
                </p>
                <div>
                    <Form
                            ref="userForm"
                            :model="userForm"
                            :label-width="100"
                            label-position="right"
                            :rules="inforValidate"
                    >
                        <FormItem label="用户姓名：" prop="name">
                            <div style="display:inline-block;width:300px;">
                                <Input v-model="userForm.name" ></Input>
                            </div>
                        </FormItem>
                        <FormItem label="用户手机：" prop="phone" >
                            <div style="display:inline-block;width:204px;">
                                <Input v-model="userForm.phone" ></Input>
                                <!--@on-keydown="hasChangePhone"-->
                            </div>

                            <!--<div style="display:inline-block;position:relative;">-->
                            <!--<Button @click="getIdentifyCode" :disabled="canGetIdentifyCode">{{ gettingIdentifyCodeBtnContent }}</Button>-->
                            <!--<div class="own-space-input-identifycode-con" v-if="inputCodeVisible">-->
                            <!--<div style="background-color:white;z-index:110;margin:10px;">-->
                            <!--<Input v-model="securityCode" placeholder="请填写短信验证码" ></Input>-->
                            <!--<div style="margin-top:10px;text-align:right">-->
                            <!--<Button type="ghost" @click="cancelInputCodeBox">取消</Button>-->
                            <!--<Button type="primary" @click="submitCode" :loading="checkIdentifyCodeLoading">确定</Button>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->
                        </FormItem>
                        <FormItem label="邮箱：">
                            <div style="display:inline-block;width:300px;">
                                <Input v-model="userForm.email" ></Input>
                            </div>
                        </FormItem>
                        <FormItem label="地址：">
                            <div style="display:inline-block;width:300px;">
                                <Input v-model="userForm.address" ></Input>
                            </div>
                        </FormItem>
                        <!--<FormItem label="邮箱：">-->
                        <!--<span>{{ userForm.email }}</span>-->
                        <!--</FormItem>-->
                        <FormItem label="性别：">
                            <span>{{ userForm.sex }}</span>
                        </FormItem>
                        <FormItem label="登录密码：">
                            <Button type="text" size="small" @click="showEditPassword">修改密码</Button>
                        </FormItem>
                        <div>
                            <Button type="text" style="width: 100px;" @click="cancelEditUserInfor">取消</Button>
                            <Button type="primary" style="width: 100px;" :loading="save_loading" @click="saveEdit">保存</Button>
                        </div>
                    </Form>
                </div>
            </Card>
            <Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500">
                <h3 slot="header" style="color:#2D8CF0">修改密码</h3>
                <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="passwordValidate">
                    <FormItem label="原密码" prop="oldPass" :error="oldPassError">
                        <Input v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码" ></Input>
                    </FormItem>
                    <FormItem label="新密码" prop="newPass">
                        <Input v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符" ></Input>
                    </FormItem>
                    <FormItem label="确认新密码" prop="rePass">
                        <Input v-model="editPasswordForm.rePass" placeholder="请再次输入新密码" ></Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="text" @click="cancelEditPass">取消</Button>
                    <Button type="primary" :loading="savePassLoading" @click="saveEditPass">保存</Button>
                    <!--<Button type="primary" @click="saveEditPass">保存</Button>-->
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
export default {
    name: 'ownspace_index',
    data () {
        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if (!re.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };
        const valideRePassword = (rule, value, callback) => {
            if (value !== this.editPasswordForm.newPass) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };

        const valideOddPassword = (rule, value, callback) => {
            if (value !== this.userForm.userpwd) {
                callback(new Error('与原密码不一致'));
            } else {
                callback();
            }
        };

        return {
            data: [],
            submitType: '',
            subType: '',
            access:'',
            userForm: {
                id: Cookies.get('loginId'),
                userpwd: '',
                name: '',
                phone: '',
                sex: '',
                email: '',
                address: '',
            },
            uid: '',  // 登录用户的userId
            securityCode: '',  // 验证码
            phoneHasChanged: false,  // 是否编辑了手机
            save_loading: false,
            identifyError: '',  // 验证码错误
            editPasswordModal: false, // 修改密码模态框显示
            savePassLoading: false,
            oldPassError: '',
            identifyCodeRight: false,  // 验证码是否正确
            hasGetIdentifyCode: false,  // 是否点了获取验证码
            canGetIdentifyCode: false,  // 是否可点获取验证码
            checkIdentifyCodeLoading: false,
            inforValidate: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号码' },
                    { validator: validePhone }
                ]
            },
            editPasswordForm: {
                oldPass: '',
                newPass: '',
                rePass: ''
            },
            passwordValidate: {
                oldPass: [
                    { required: true, message: '请输入原密码', trigger: 'blur' },
                    { validator: valideOddPassword, trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
                    { max: 32, message: '最多输入32个字符', trigger: 'blur' }
                ],
                rePass: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: valideRePassword, trigger: 'blur' }
                ]
            },
            inputCodeVisible: false, // 显示填写验证码box
            initPhone: '',
            gettingIdentifyCodeBtnContent: '获取验证码'  // “获取验证码”按钮的文字
        };
    },
    methods: {
        init () {
            this.access = Cookies.get('access');
            },

        getData() {
            if(this.access !== `0`) {
                if (this.access === `1`) {
                    this.submitType = 'customer';
                    this.subType = `update_customer`
                } else if (this.access === `2`) {
                    this.submitType = 'vendor';
                    this.subType = `update_vendor`
                }
                console.log(Cookies.get('loginId'));
                axios.get(`api/material/` + this.submitType + `/${Cookies.get('loginId')}`).then((res) => {
                    console.log(res.data.data);
                    this.data = res.data.data;
                    if(this.access === `1`) {
                        this.userForm = {
                            id: Cookies.get('loginId'),
                            userpwd: this.data.userpwd,
                            name: this.data.username,
                            phone: this.data.phone,
                            email: this.data.email,
                            sex: this.data.sex,
                            address: this.data.address,
                        }
                    }else {
                        this.userForm = {
                            id: Cookies.get('loginId'),
                            userpwd: this.data.userpwd,
                            name: this.data.vendName,
                            phone: this.data.vendPhone,
                            email: this.data.vendEmail,
                            vendArea: this.data.vendArea,
                            address: this.data.vendAddress,
                            vendCode: this.data.vendCode
                        }
                    }
                })
            }
        },


        getIdentifyCode () {
            this.hasGetIdentifyCode = true;
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    this.canGetIdentifyCode = true;
                    let timeLast = 60;
                    let timer = setInterval(() => {
                        if (timeLast >= 0) {
                            this.gettingIdentifyCodeBtnContent = timeLast + '秒后重试';
                            timeLast -= 1;
                        } else {
                            clearInterval(timer);
                            this.gettingIdentifyCodeBtnContent = '获取验证码';
                            this.canGetIdentifyCode = false;
                        }
                    }, 1000);
                    this.inputCodeVisible = true;
                    // you can write ajax request here
                }
            });
        },
        showEditPassword () {
            this.editPasswordModal = true;
        },
        cancelEditUserInfor () {
            this.$store.commit('removeTag', 'ownspace_index');
            localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList);
            let lastPageName = '';
            if (this.$store.state.app.pageOpenedList.length > 1) {
                lastPageName = this.$store.state.app.pageOpenedList[1].name;
            } else {
                lastPageName = this.$store.state.app.pageOpenedList[0].name;
            }
            this.$router.push({
                name: lastPageName
            });
        },
        saveEdit () {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    var userForm1 = {};
                    if(this.access === `2`) {
                        userForm1 = {
                            vendId: Cookies.get('loginId'),
                            userpwd: this.userForm.userpwd,
                            vendName: this.userForm.name,
                            vendPhone: this.userForm.phone,
                            vendEmail: this.userForm.email,
                            vendAddress: this.userForm.address,
                            vendArea: this.userForm.vendArea,
                            vendCode: this.userForm.vendCode,
                        }
                    }else {
                        userForm1 = this.userForm
                    }
                    console.log(userForm1);
                    axios.put(`api/material/` + this.subType,userForm1).then((res) => {
                        console.log(res);
                        console.log(11111111111111)
                    });
                    // if (this.phoneHasChanged && this.userForm.cellphone !== this.initPhone) {  // 手机号码修改过了而且修改之后的手机号和原来的不一样
                    //     if (this.hasGetIdentifyCode) { // 判断是否点了获取验证码
                    //         if (this.identifyCodeRight) {  // 判断验证码是否正确
                    //             this.saveInfoAjax();
                    //         } else {
                    //             this.$Message.error('验证码错误，请重新输入');
                    //         }
                    //     } else {
                    //         this.$Message.warning('请先点击获取验证码');
                    //     }
                    // } else {
                    //     this.saveInfoAjax();
                    // }
                    this.saveInfoAjax();
                }
            });
        },
        cancelEditPass () {
            this.editPasswordModal = false;
        },
        saveEditPass () {
            console.log("执行");
            this.$refs['editPasswordForm'].validate((valid) => {
                if (valid) {
                    this.savePassLoading = true;
                    this.userForm.userpwd = this.editPasswordForm.rePass;
                    console.log(this.userForm.userpwd);
                    this.editPasswordModal = false
                    // axios.put(`api/material/update_customer`,this.userForm).then((res) => {
                    //     console.log(res);
                    //     console.log(11111111111111);
                    //     this.editPasswordModal = false
                    // })
                    // you can write ajax request here
                }
            });
        },
        // submit() {
        //     axios.put(`api/material/update_customer`,this.userForm).then((res) => {
        //         console.log(res);
        //
        //     })
        // },

        cancelInputCodeBox () {
            this.inputCodeVisible = false;
            this.userForm.cellphone = this.initPhone;
        },
        submitCode () {
            let vm = this;
            vm.checkIdentifyCodeLoading = true;
            if (this.securityCode.length === 0) {
                this.$Message.error('请填写短信验证码');
            } else {
                setTimeout(() => {
                    this.$Message.success('验证码正确');
                    this.inputCodeVisible = false;
                    this.checkIdentifyCodeLoading = false;
                }, 1000);
            }
        },
        hasChangePhone () {
            this.phoneHasChanged = true;
            this.hasGetIdentifyCode = false;
            this.identifyCodeRight = false;
        },
        saveInfoAjax () {
            this.save_loading = true;
            setTimeout(() => {
                this.$Message.success('保存成功');
                this.save_loading = false;
            }, 1000);
        }
    },
    mounted () {
        this.init();
        this.getData()
    }
};
</script>
