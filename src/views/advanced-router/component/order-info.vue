<style lang="less">
    @import '../../../styles/common.less';
    @import '../advanced-router.less';
    .goodsPicture{
        display: block;
        width: 300px;
        height: auto;
        opacity: 1;
    }
</style>
<style>
    .btn1 {
        width:80px;
        height:42px;
        color:#666;
        border-top:solid 1px #b766e5;
        border-left:solid 1px #b766e5;
        border-bottom:solid 1px #4b1561;
        border-right:solid 1px #4b1561;
    }
    .btn2 {
        margin-left:1100px;
        width:80px;
        height:42px;
        color:#666;
        border-top:solid 1px #b766e5;
        border-left:solid 1px #b766e5;
        border-bottom:solid 1px #4b1561;
        border-right:solid 1px #4b1561;
    }
</style>

<template>
    <div>
        <card>
            <p slot="title">基本信息
                <!--<Icon type="compose"></Icon>-->
            </p>
            <div>
                <row>
                    <Col span="16">
                        <div>
                            <p slot="title">{{"用 户 名:"}}{{dataName}}</p><br>
                            <p slot="title">{{"联系方式:"}}{{dataTell}}</p><br>
                            <p slot="title">{{"地址:"}}{{dataAddress}}</p><br>
                            <p slot="title">{{"问题描述："}}{{dataProblem}}</p><br>
                            <!--参照搜索代码-->
                        </div>
                    </Col>
                    <Col span="8">
                        <div>
                            <img class="goodsPicture" src="../../../images/cropper-test.png" alt="无附件上传">
<pre>               <button class="btn1" type="file" @click="downLoad" >附件下载</button></pre>
                            <!--<pre>               <a v-show="!isPicture" href="/" download="cropper-test.png">附件下载</a></pre>-->
                        </div>
                    </Col>
                </row>
            </div>
        </card>
        <div> <Row class="margin-top-10"></Row></div>
        <div>
            <card>
                <p slot="title" type="text">处理方式:</p>
                <card>
                    <form >
                        <row>
                            <Col span="16">
                                <div class="sortChoose">
                                    <label for="1">远程服务</label>
                                    <input class="sortChoose" type="radio" v-model="service" id="1" value="1"><br><br>
                                    <label for="2">上门服务</label>
                                    <input class="sortChoose" type="radio" v-model="service" id="2" value="1"><br><br>
                                    <label for="3">派送零件</label>
                                    <input class="sortChoose" type="radio" v-model="service" id="3" value="1"><br><br>
                                    <label for="4">调回</label>
                                    <input class="sortChoose" type="radio" v-model="service" id="4" value="1"><br><br>
                                    <div>
                                        <label for="5">保修期内</label>
                                        <input type="radio" v-model="bx" id="5" value="true">
                                        <label for="6">非保修期</label>
                                        <input type="radio" v-model="bx" id="6" value="">
                                        <div v-show="bx">
                                            <label for="q">正常损坏</label>
                                            <input type="radio" v-model="isbxnormal" id="q" value="3">
                                            <label for="w">非正常损坏</label>
                                            <input type="radio" v-model="isbxnormal" id="w" value="4">
                                        </div>
                                        <!--<div v-show="bx">-->
                                            <!--<label for="8">正常损坏</label>-->
                                            <!--<input type="radio" v-model="isbxnormal" id="8" value="3">-->
                                            <!--<label for="9">非正常损坏</label>-->
                                            <!--<input type="radio" v-model="isbxnormal" id="9" value="3">-->
                                        <!--</div>-->
                                    </div>
                                    <label for="7">站内消息:</label><br>
                                    <textarea rows="12" cols="60" name="infor" id="7" wrap="hard"></textarea>
                                    <div> <Row class="margin-top-10"></Row></div>
                                </div>
                            </Col>
                            <Col span="8" >
                                <row><h3>小贴士:</h3></row>
                                <row>
                                    <h4>
                                        <ul>
                                            <li type="disc">选择之前可与报修客户电话联系以确定处理方式</li>
                                            <li type="disc">选择任一方式提交后，该报修申请的处理状态将变为处理中</li>
                                            <li type="disc">附件下载包含客户上传的产品损坏、发票信息</li>
                                        </ul>
                                    </h4>
                                </row>
                            </Col>
                        </row>
                        <row>
                            <input class="btn1" type="submit" size="100px" value="提交">
                            <input class="btn2" type="submit" size="100px" value="处理完成">
                        </row>
                    </form>
                </card>
            </card>
        </div>
    </div>
   </template>

<script>
import expandRow from './expandRow.vue';
import axios from 'axios';
export default {
    name: 'order-info',
    components: {
        expandRow
    },
    data() {
        return {
            bx: '',
            isbxnormal: '',
            service: '',
            bxValue: false,
            dataName:[],
            dataTell:[],
            dataAddress:[],
            dataProblem:[],
            showInfo: false,
            order_col: [
                {
                    title: '订单号',
                    key: 'order_id',
                    align: 'center'
                },
                {
                    title: '买家',
                    key: 'buyer',
                    align: 'center'
                },
                {
                    title: '地址',
                    key: 'addr',
                    align: 'center'
                },
                {
                    title: '下单时间',
                    key: 'time',
                    align: 'center'
                },
                {
                    title: '交易状态',
                    key: 'state',
                    align: 'center'
                }
            ],
            order_data: [],
            columns10: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                row: params.row
                            }
                        });
                    }
                },
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '地址',
                    key: 'address'
                }
            ],
            data9: [
                {
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居',
                    job: '数据工程师',
                    interest: '羽毛球',
                    birthday: '1991-05-14',
                    book: '乔布斯传',
                    movie: '致命魔术',
                    music: 'I Cry'
                },
                {
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗',
                    job: '数据科学家',
                    interest: '排球',
                    birthday: '1989-03-18',
                    book: '我的奋斗',
                    movie: '罗马假日',
                    music: 'My Heart Will Go On'
                },
                {
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道',
                    job: '数据产品经理',
                    interest: '网球',
                    birthday: '1992-01-31',
                    book: '赢',
                    movie: '乔布斯',
                    music: 'Don’t Cry'
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道',
                    job: '数据分析师',
                    interest: '桌球，跑步',
                    birthday: '1988-7-25',
                    book: '红楼梦',
                    movie: '倩女幽魂',
                    music: '演员'
                }
            ]
        };
    },
    methods: {
        init() {},
        rebackbx () {
            return this.bx
        },
        downLoad () {
            var xhr = new XMLHttpRequest();
            xhr.open('GET','../../../src/images/logo.jpg');
            xhr.responseType = 'blob';
            xhr.onload = function(){
                //blob:http://127.0.0.1/539ae798-70db-44db-b216-fc932b358285
                console.log(xhr.response);
            };
            xhr.send(null);
             xhr.download = 'logo.jpg';
             xhr.href = URL.createObjectURL(blob);
            // xhr.click();
            // URL.revokeObjectURL(xhr.response);

            // let aTag = document.createElement('a');
            // let blob = new Blob (['../../../src/images/']);　　// 这个content是下载的文件内容，自己修改
            // aTag.download = 'logo.jpg';　　　　　　// 下载的文件名
            // aTag.href = URL.createObjectURL(blob);
            // aTag.click();
            // URL.revokeObjectURL(blob);
        },
        getDataName () {
            //请求方法，根据实际情况使用
            axios.get('/api/material/name').then((res) => {
                //res 为成功回调的响应
                this.dataName = res.data.data;
            });
        },
        getDataTell () {
            //请求方法，根据实际情况使用
            axios.get('/api/material/tell').then((res) => {
                //res 为成功回调的响应
                this.dataTell = res.data.data;
            });
        },
        getDataAddress () {
            //请求方法，根据实际情况使用
            axios.get('/api/material/address').then((res) => {
                //res 为成功回调的响应
                this.dataAddress = res.data.data;
            });
        },
        getDataProblem () {
            //请求方法，根据实际情况使用
            axios.get('/api/material/address').then((res) => {
                //res 为成功回调的响应
                this.dataProblem = res.data.data;
            });
        },
        mounted() {
            this.init();
            this.getDataName();
            getDataTell ();
            getDataAddress ();
            getDataProblem ();
            rebackbx ()

        },
        watch: {
            '$route'() {
                this.init();
            }
        }
    }
}
</script>

