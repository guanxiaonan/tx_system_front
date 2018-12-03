<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<style>
    .divLeft {
         width: 70%;
        float:left;
     }
    .divRight {
        width: auto;
        position: absolute;
        right: 0px;
    }
    .userName{
        color: #2137ff;
    }
</style>
<template>
    <div class="home-main">
        <Col span="16">
                    <Row>
                        <Card>
                            <Row type="flex" class="user-infor">
                                <Col span="4">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <img class="avator-img" :src="avatorPath" />
                                    </Row>
                                </Col>
                                <Col span="16" style="padding-left:0px;">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <div>
                                            <b class="card-user-infor-name">亲爱的{{userName}}</b>
                                            <div v-if="score<100">嗨~亲爱的天喜会员，欢迎来到天喜售后服务平台！</div>
                                            <div v-else>嗨~尊贵的天喜会员，欢迎来到天禧售后服务平台！</div>
                                            <p class="userName">{{userName}}</p>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                            <div class="line-gray"></div>
                            <Row class="margin-top-8">
                                <Col span="4"><p class="notwrap">上次登录时间:</p></Col>
                                <Col span="6" class="padding-left-8">2017.09.12-13:32:20</Col>
                                <Col span="14" class="padding-left-8">积分|{{score}}</Col>
                            </Row>
                            <div><Row class="margin-top-8">
                                <Col span="4"><p class="notwrap">本次登录地点:</p></Col>
                                <Col span="16" class="padding-left-8"><iframe name="weather_inc" src="http://i.tianqi.com/index.php?c=code&id=1" width="305" height="35" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe></Col>
                            </Row>
                                </div>
                        </Card>
                    </Row>
            <row class="empty"></row>
                <!--<Col span="2">-->
                    <!--<vue-calendar></vue-calendar>-->
                <!--</Col>-->
                    <row>
                        <Card><row>
                            <h2 class="orderCard">最近的订单<router-link class="link1" :to="{path:'../commodity/index'}">产品信息</router-link>
                                <router-link class="link2" :to="{path:'../orderCenter/bought'}">处理进度</router-link>
                                <router-link class="link3" :to="{path:'../material/material-list'}">待处理</router-link>
                            </h2>
                        </row>
                        </Card>
                    </row>
                    <row>
                        <card><div class="err_msg" v-if="usercart"><p>最新的报修处理状况。{{user.cart}}~~~~</p>
                            <p>
                                <a class="err_msg" ></a>
                            </p></div>

                            <div class="err_msg" v-else><p>您还没有订单</p>
                                <p>
                                    <a class="err_msg" href="https://tianxijj.tmall.com/view_shop.htm?spm=a220m.1000858.0.0.52221ffe3FwOKp&sho
                                    p_id=65507151&rn=44e41d317f7477bfaabd11712154ed08">现在就去选购></a>
                                </p></div>
                        </card>
                        <row class="empty"></row>
                        <Card :bordered="false">
                            <h2 class="orderCard">我的收藏
                                <router-link class="link4":to="{path:'../orderCenter/wishList'}">查看全部</router-link>
                                <!--<a href="http://www.baidu.com" class="link4">查看全部</a>-->
                            </h2>
                            <div class="line-gray"></div>
                            <div class="err_msg" v-if="userlike"><p>您的收藏如下：最近的添加{{}}</p></div>
                            <div  v-else>
                                <p class="err_msg">你还没有收藏的商品</p><p class="err_msg"><router-link class="err_msg" :to="{path:'../commodity/index'}">快去产品中心逛逛吧!</router-link></p></div>
                        </Card>
                    </row>
            <row class="empty"></row>
            <card>
                <row style="height: 57px">
                    <div class="foot">Copyright © 2018 中国·天喜控股</div>
                    </row>
            </card>
                    <!--<row>-->
                        <!--<Card :bordered="false">-->
                            <!--<h2 class="orderCard">我的收藏-->
                                <!--<router-link class="link4":to="{path:'../orderCenter/wishList'}">查看全部</router-link>-->
                                <!--&lt;!&ndash;<a href="http://www.baidu.com" class="link4">查看全部</a>&ndash;&gt;-->
                            <!--</h2>-->
                            <!--<div class="line-gray"></div>-->
                            <!--<div class="err_msg" v-if="userlike"><p>您的收藏如下：likeinfo{{}}</p></div>-->
                            <!--<div  v-else>-->
                                <!--<p class="err_msg">你还没有收藏的商品</p><p class="err_msg"><router-link class="err_msg" :to="{path:'../commodity/index'}">快去产品中心逛逛吧!</router-link></p></div>-->
                        <!--</Card>-->
                    <!--</row>-->
            <row>
            </row>
        <div class="divRight">
        </div>
    </Col>
        <Col span="8">
            <card>
                <div class="font1">人气商品</div>
                <div class="line-gray"></div>
                <a href="http://www.chinacooker.com/chanpin/show.asp?i=52"><img src="./renqi1.jpg"></a>
            </card>
            <card>
                <a href="http://www.chinacooker.com/chanpin/show.asp?i=112"><img src="./renqi2.jpg"></a>
            </card>
            <card>
                <a href="http://www.chinacooker.com/chanpin/show.asp?i=119"><img src="./renqi3.jpg"></a>
            </card>
        </Col>

    </div>
</template>

<script>
    import serviceRequests from './components/serviceRequests.vue';
    import countUp from './components/countUp.vue';
    import inforCard from './components/inforCard.vue';
    import aboutTianxi from './aboutTianxi';
    import axios from 'axios';
    import VueCalendar from './components/VueCalendar';
    import Cookies from 'js-cookie';
    export default {
        name: 'home',
        components: {
            name: 'fullScreen',
            VueCalendar,
            serviceRequests,
            countUp,
            inforCard
        },
        data () {
            return {
                user:[],
                userinfo: [],
                userlike: '',
                usercart: '',
                userName: '',
                usertype: '',
                score:100,
                count: {
                    user: 0,
                    material: 0,
                    task: 0,
                    inventory: 0,
                }
            };
        },
        computed: {
            avatorPath () {
                return localStorage.avatorImgPath;
            }
        },
        methods: {
            init(){
                this.userName = Cookies.get('user');
            },
            //{"serviceName":"dmx-material-service","callCount":8},{"serviceName":"dmx-produce-task-service","callCount":5},{"serviceName":"dmx-user-service","callCount":2}
            initData() {
                //请求方法，根据实际情况使用
                axios.get('/api/monitor')
                    .then((res) => {
                        // console.log('home start')
                    //res 为成功回调的响应
                    let list = res.data.data;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].serviceName == 'dmx-material-service') {
                        this.count.material = list[i].callCount
                    } else if (list[i].serviceName == 'dmx-user-service') {
                        this.count.user = list[i].callCount
                    } else if (list[i].serviceName == 'dmx-produce-task-service') {
                        this.count.task = list[i].callCount
                    } else if (list[i].serviceName == 'dmx-inventory-service') {
                        this.count.inventory = list[i].callCount
                    } else {
                        // console.log(list[i])
                    }
                }
                //this.total = res.data.data.length
                // console.log(result)
            }).catch(function (error) {
                    console.log(error);
                });;
            },
            getData () {
                //请求方法，根据实际情况使用
                axios.get('/api/user').then((res) => {
                    //res 为成功回调的响应
                    this.user = res.data.data;
            });
            },
            getUser(){
                axios.get('/api/user').then((res) =>{
                    this.userinfo = res.data.data;
                    // console.log(this.userinfo);
                })
            }

        },
        mounted() {
            //请求第一页数据
            // this.initData();
            this.init();
            // this.getData();
            // this.getUser();
            //this.getList()
            //this.getData(this.currentPage,this.display);
        },
    };
</script>
<style>
.font1{
    font-size: 18px;
    color:deepskyblue;
}
    .empty{
        padding-top: 15px;
    }
    .link1{
        position: relative;
        left:400px;
        font-size:12px;
    }
    .link3{
        position: relative;
        left:400px;
        font-size:12px;
}
    .link2{
        position: relative;
        left:550px;
        font-size:12px;
}
.link4{
    position: relative;
    left:620px;
    font-size:12px;
}
.link5{
    padding-left: 320px;
    font-size:12px;
    color:lightsteelblue;
}
    .orderCard{

    }
    .err_msg{
        text-align: center;
        color:#999;
    }
.err_msg1{
    text-align: center;
    color:#999;
    padding-top: 8px;
}
    .foot{
        position: relative;
        left:295px;
        top:25px;
        color:#999;
    }
</style>
