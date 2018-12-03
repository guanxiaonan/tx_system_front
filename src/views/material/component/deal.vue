<style lang="less">
    @import '../../../styles/common.less';
    @import '../../advanced-router/advanced-router.less';
    .goodsPicture{
        display: block;
        width: 20px;
        height: 20px;
        opacity: 1;
    }
</style>
<style scoped>
    .chuLi {
        height: auto;
    }
    .div1 {
        height: 330px
    }
    .div2 {
        height: 400px
    }
    .div3 {
        height: 330px
    }
    .basicinfor {
        height: 200px
    }
    .editTextarea {

        width: 400px;
        height: 90px;
        /*background-image: url(http://d.lanrentuku.com/down/tupian/1605/312245385.gif);*/
        color: #000000;
        border: solid 1px #999;
        padding: 3px 0px 0px 5px;
        border-radius: 10px;
    }
    .isDiv-con {
         margin-left: 30px;
     }
    .isDiv-con1 {
        margin-left: 30px;
        width: 80px;
    }

    .btn1-con {
        position: absolute;
        top: -23px;
        right: 230px;
        width:60px;
        height:32px;
        font-size: 13px;
        color:#666;
        border-top:solid 1px #b766e5;
        border-left:solid 1px #b766e5;
        border-bottom:solid 1px #4b1561;
        border-right:solid 1px #4b1561;
    }
    .btn1 {
        text-align: center;
        width:70px;
        height:35px;
        color:#FFFFFF;
        border: none;
        background-color: #1E90FF ;
        border-radius: 5px;
    }
    .btn2 {
        text-align: center;
        position: absolute;
        right: 1000px;
        width:80px;
        height:35px;
        color:#666;
        border-radius: 5px;
        border-top:solid 1px #b766e5;
        border-left:solid 1px #b766e5;
        border-bottom:solid 1px #4b1561;
        border-right:solid 1px #4b1561;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>

<template>
    <div>
        <card>
            <p slot="title">基本信息</p>
            <div class="basicinfor">
                <row>
                    <Col span="18">
                        <div>
                            <!--<p slot="title">{{"编号:"}}{{id}}</p><br>-->
                            <p slot="title">{{"用 户 名:"}}{{dataName}}</p><br>
                            <p slot="title">{{"联系方式:"}}{{dataTell}}</p><br>
                            <p slot="title">{{"地址:"}}{{dataAddress}}</p><br>
                            <p slot="title">{{"问题描述："}}{{dataProblem}}</p><br>
                        </div>
                    </Col>
                    <Col span="6">
                        <div>
                            <row>
                                <img :src="paramsPic" width="200px" height="200px">
                            </row>
                            <row>
                                <!--<button class="btn1-con" type="file" @click="downLoad" >附件下载</button>-->
                                <button class="btn1-con" type="primary" @click="downs">附件下载</button>

                            </row>
                        </div>
                    </Col>
                </row>
            </div>
        </card>
        <div> <Row class="margin-top-10"></Row></div>
        <div class="chuLi">
            <card>
                <label for="top"></label>
                <p slot="title" type="text" id="top" @click="divChoose(1)">处理方式:</p>
                    <form >
                        <row>
                            <Col span="12">
                                <div class="sortChoose">
                                    <label for="1">远程指导</label>
                                    <input class="sortChoose" type="radio" v-model="service" id="1" @click="divChoose(1)" value="1"><br><br>
                                    <label for="3">派送零件</label>
                                    <input class="sortChoose" type="radio" v-model="service" id="3" @click="divChoose(2)"  value="3"><br><br>
                                    <label for="4">调回维修</label>
                                    <input class="sortChoose" type="radio" v-model="service" id="4" @click="divChoose(3)" value="4"><br><br>
                                    <label for="2">经销商处理</label>
                                    <input class="sortChoose" type="radio" v-model="service" id="2" @click="divChoose(4)" value="2"><br><br>
                                    <div v-if="isbx">
                                        <label for="5">保修期内</label>
                                        <input type="radio" v-model="bx" id="5" @click="setIsfault(1)" value="保修">
                                        <label for="6">非保修期</label>
                                        <input type="radio" v-model="bx" id="6" @click="setIsfault(2)" value="不保修">
                                        <div v-if="isFault">
                                            <label for="q">正常损坏</label>
                                            <input type="radio" v-model="isbxnormal" id="q" value="正常损坏">
                                            <label for="w">非正常损坏</label>
                                            <input type="radio" v-model="isbxnormal" id="w" value="非正常损坏">
                                        </div>
                                    </div>
                                    <label for="7">备注:</label><br>
                                    <textarea v-model="handleRemark" class="editTextarea" rows="5" cols="60" name="infor" id="7" wrap="hard"></textarea>
                                </div>
                            </Col>
                            <Col span="12" >
                                <transition name="fade">
                                    <div class="div1" v-if="isDiv1">
                                    <row><h3>小贴士:</h3></row>
                                        <row>
                                        <h4>
                                            <ul>
                                                <li type="disc">选择之前与报修客户电话联系以确定处理方式以及处理内容</li>
                                                <li type="disc">选择任一方式提交后，该报修申请的处理状态将变为处理中</li>
                                                <li type="disc">附件下载包含客户上传的产品损坏、发票信息</li>
                                                <li type="disc">客户维修问题解决后点击处理完成，该报修申请处理结束</li>
                                                <li type="disc">若与客户约定时间进行处理或作特别说明，于备注作记录</li>
                                            </ul>
                                        </h4>
                                    </row>
                                </div>
                                </transition>

                                <transition name="fade">
                                    <div class="div2" v-if="isDiv2">
                                        <Form :model="formItemIn">
                                            <row>
                                                <Col span="8">
                                                    <FormItem label="寄件人：" style="margin-top: -5px">
                                                        <Input v-model="formItemIn.sendName" type="text" font-size="10px"/>
                                                    </FormItem>
                                                </Col>
                                                <Col span="8">
                                                    <FormItem class="isDiv-con" label="寄件人电话：" style="margin-top: -5px">
                                                        <Input v-model="formItemIn.sendPhone" type="text" font-size="10px"/>
                                                    </FormItem>
                                                </Col>
                                            </row>
                                            <row>
                                                <Col span="16">
                                                    <FormItem label="始发地：" style="margin-top: -20px">
                                                        <al-cascader v-model="sendAddressArray" level="3"/>
                                                    </FormItem>
                                                </Col>
                                                <Col span="8">
                                                    <FormItem class="isDiv-con" label="详细地址：" style="margin-top: -20px">
                                                        <Input type="text" v-model="sendDetailAddress"/>
                                                    </FormItem>
                                                </Col>
                                            </row>
                                            <row>
                                                <Col span="8">
                                                    <FormItem label="收件人：" style="margin-top: -20px">
                                                        <Input v-model="formItemIn.receiveName" type="text" font-size="10px"/>
                                                    </FormItem>
                                                </Col>
                                                <Col span="8">
                                                    <FormItem class="isDiv-con" label="收件人电话：" style="margin-top: -20px">
                                                        <Input v-model="formItemIn.receivePhone" type="text" font-size="10px"/>
                                                    </FormItem>
                                                </Col>
                                                <Col span="4">
                                                    <FormItem class="isDiv-con1" label="邮编：" style="margin-top: -20px">
                                                        <Input v-model="formItemIn.postCode"type="text" font-size="100px"/>
                                                    </FormItem>
                                                </Col>
                                            </row>
                                            <row>
                                                <Col span="16">
                                                    <FormItem label="收件人地址："style="margin-top: -20px">
                                                        <al-cascader v-model="receiveAddressArray" level="3"/>
                                                    </FormItem>
                                                </Col>
                                                <Col span="8">
                                                    <FormItem class="isDiv-con" label="详细地址：" style="margin-top: -20px">
                                                        <Input type="text" v-model="receiveDetailAddress"/>
                                                    </FormItem>
                                                </Col>
                                            </row>
                                            <!--<Button @click="mailSumbit" type="primary">提交</Button>-->
                                            <button class="btn1" @click="mailsumbit" >提交</button>
                                        </Form>
                                    </div>
                                </transition>

                                <transition name="fade">
                                    <div class="div3" v-if="isDiv3">
                                        <order-staff v-on:setOrderStaff="orderStaff"></order-staff>
                                    </div>
                                </transition>

                                <transition name="fade">
                                    <div class="div4" v-if="isDiv4">
                                        <order-dealer v-on:setOrderDealer="orderDealer"></order-dealer>
                                        <!--<order-staff :repairId="id"></order-staff>-->
                                    </div>
                                </transition>
                            </Col>
                        </row>
                        <row>
                            <div style="margin-top: 30px">
                                <button class="btn1" type="primary" @click="handleSubmit(2)" >提交</button>
                                <button class="btn2" type="primary" @click="handleComplete(3)">处理完成</button>
                            </div>
                        </row>
                    </form>

                </card>
            <div class="foot">
                <p>Copyright © 2018 中国·天喜控股</p>
            </div>
        </div>
    </div>
   </template>

<script>
    import Vue from 'vue';
    import expandRow from './expandRow.vue';
    import orderStaff from './orderStaff.vue'
    import orderDealer from './orderDealer'
    import alCascader from '../../my-components/area-linkage/components/al-cascader.vue';
    import App from '../../error-page/component/app.vue';
    import tagsPageOpened from './tags-page-opened1.vue';
    import iviewArea from 'iview-area';
    import axios from 'axios';
    import VueI18n from 'vue-i18n';
    Vue.use(VueI18n);
    Vue.use(iviewArea);
    export default {
        name: 'deal',
        components: {
            expandRow,orderStaff,alCascader,App,tagsPageOpened,orderDealer
        },

        data() {
            return {
                stateInformation:{
                    id: this.$route.params.id,
                    stateId: 0,
                    handleRemark: '',
                    vendId: ''
                },
                stateInformation2:{
                    id: this.$route.params.id,
                    stateId: 0,
                    time: 0
                },
                formItemIn:{
                    sendName:'',
                    sendPhone: '',
                    sendAddress: '',
                    receiveAddress: '',
                    receiveName:'',
                    receivePhone: '',
                    postCode: ''
                },
                sendAddressArray: ['浙江省', '丽水市', '缙云县', '壶镇镇'],
                sendDetailAddress: '西二路1号',
                receiveAddressArray: [],
                receiveDetailAddress:'',
                isFault: false,
                handleRemark: '',
                isDiv1: true,
                isDiv2: false,
                isDiv3: false,
                isDiv4: false,
                isHide: false,
                isFinished: false,
                isbx: false,
                bx: '',
                time: this.$route.params.time,
                isbxnormal: '',
                service: '',
                paramsPic: '',
                id: this.$route.params.id,
                customerId: this.$route.params.customerId,
                dataName: this.$route.params.customer,
                dataTell: this.$route.params.phone,
                dataAddress: this.$route.params.address,
                dataProblem: this.$route.params.describe,
                currentPageName: this.$route.name,
                // tagBodyLeft: 0,
                // refsTag: [],
                // tagsCount: 1,
                // pageTagsList: this.$store.state.app.pageOpenedList
            }
        },
        methods: {
            init() {
                // console.log(this.$route.params.potName)
            },
            setIsfault (i) {
                if(i === 1){
                    return this.isFault = true
                }else if(i === 2) {
                    return this.isFault = false
                }

            },

            orderDealer(val) {
                console.log("接收成功：" + val);
                this.stateInformation.vendId = val
            },
            orderStaff(val) {
                console.log("接收成功：" + val);
                this.stateInformation.staffId = val
            },
            mailsumbit () {

            },
            handleSubmit(i){
                this.stateInformation.stateId = i;
                this.stateInformation.handleRemark = this.handleRemark;
                // console.log(this.stateInformation.handleRemark);
                axios.put('/api/material/update_repairHandle', this.stateInformation, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    // console.log(response);
                    alert("提交！");
                    var name = "deal";
                    // console.log(1111111111,name);
                    this.$store.commit('removeTag', name);
                    this.$store.commit('closePage', name);
                }).catch(function (error) {
                    console.log(error);
                });

                if(this.service === 3) {
                    console.log(this.service);
                    for (var i = 0; i < this.sendAddressArray.length; i++) {
                        // console.log(this.sendAddressArray[i].name);
                        if(this.sendAddressArray[i].name != null) {
                            this.formItemIn.sendAddress = this.formItemIn.sendAddress + this.sendAddressArray[i].name;
                        } else {
                            this.formItemIn.sendAddress = this.formItemIn.sendAddress + this.sendAddressArray[i];
                        }
                    }
                    this.formItemIn.sendAddress = this.formItemIn.sendAddress + this.sendDetailAddress;
                    // console.log(this.formItemIn.sendAddress);
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
                    // console.log(this.formItemIn.receiveAddress);
                    // console.log("===========xx===========",this.formItemIn);
                    axios.post('/api/material/mail_submit', this.formItemIn, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        console.log(response);
                        // alert("数据提交成功！");
                    }).catch(function (error) {
                        console.log(error);
                    });
                }

            },
            handleComplete(i){
                this.stateInformation2.stateId = i;
                this.stateInformation2.time = this.$route.params.time + 1;
                axios.put('/api/material/update_repairHandle', this.stateInformation2, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    alert("处理完成！");
                    var name = "deal";
                    // console.log(1111111111,name);
                    this.$store.commit('removeTag', name);
                    this.$store.commit('closePage', name);
                    // console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
            },
            reloadPic () {
                var j = this.$route.params.potName;
                this.paramsPic =  require('../../commodity/images/'+ j +'.jpg')
            },
            // downLoad () {
            //     let aTag = document.createElement('btn1-con');
            //     // let blob = new Blob (['../../../images/logo.jpg'],{type: "text"});　　// 这个content是下载的文件内容，自己修改
            //     let blob = new Blob (['logo.jpg'],{type:"Files"});
            //
            //     // aTag.href = URL.createObjectURL(blob);
            //     aTag.href = require('../../commodity/images/Work.jpg');
            //     // aTag.href = '../../commodity/images/Work.jpg';
            //     console.log(aTag.href);
            //     aTag.download = 'Work';　　　　　　// 下载的文件名
            //     aTag.click();
            //     console.log(1);
            //     // URL.revokeObjectURL(blob);
            //     // console.log(blob)
            // },


            downloadIamge(imgsrc, name) {//下载图片地址和图片名
                var image = new Image();
                // 解决跨域 Canvas 污染问题
                image.setAttribute("crossOrigin", "anonymous");
                image.onload = function() {
                    var canvas = document.createElement("canvas");
                    canvas.width = image.width;
                    canvas.height = image.height;
                    var context = canvas.getContext("2d");
                    context.drawImage(image, 0, 0, image.width, image.height);
                    var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

                    var a = document.createElement("a"); // 生成一个a元素
                    var event = new MouseEvent("click"); // 创建一个单击事件
                    a.download = name || "photo"; // 设置图片名称
                    a.href = url; // 将生成的URL设置为a.href属性
                    a.dispatchEvent(event); // 触发a的单击事件
                };
                image.src = imgsrc;
            },
            downs(){
                let a = require('../../commodity/images/低汤锅.jpg');
                this.downloadIamge(a, 'pic')
            },

            divChoose (k) {
                if(k ===1){
                    this.isDiv1 = true;
                    this.isDiv2 = false;
                    this.isDiv3 = false;
                    this.isDiv4 = false;
                    this.isbx = false;
                }else if(k === 2){
                    this.isDiv1 = false;
                    this.isDiv2 = true;
                    this.isDiv3 = false;
                    this.isDiv4 = false;
                    this.isbx = true;
                }else if(k === 3) {
                    this.isDiv1 = false;
                    this.isDiv2 = false;
                    this.isDiv3 = true;
                    this.isDiv4 = false;
                    this.isbx = true;
                }else if(k === 4) {
                    this.isDiv1 = false;
                    this.isDiv2 = false;
                    this.isDiv3 = false;
                    this.isDiv4 = true;
                    this.isbx = false;
                }

            },
        },
        computed: {
            pk() {
                var j = this.$route.params.potName;
                this.paramsPic =  require('../../commodity/images/'+ j +'.jpg');
                return this.paramsPic
            }
        },
        mounted() {
            this.init();
            this.reloadPic();

        },
        // beforeRouteEnter(to,from,next) {
        //
        //
        // },
        beforeRouteLeave(to,from,next) {
            var name = "deal";
            this.$store.commit('removeTag', name);
            this.$store.commit('closePage', name);
            next()
        },
        watch: {
            '$route'() {
                this.init();
            },
        },
    }
</script>

