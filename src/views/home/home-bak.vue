<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row>
            <Col span="8">
                <Row>
                    <Card>
                        <Row type="flex" class="user-infor">
                            <Col span="8">
                                <Row class-name="made-child-con-middle" type="flex" align="middle">
                                    <img class="avator-img" :src="avatorPath" />
                                </Row>
                            </Col>
                            <Col span="16" style="padding-left:6px;">
                                <Row class-name="made-child-con-middle" type="flex" align="middle">
                                    <div>
                                        <b class="card-user-infor-name">Admin</b>
                                        <p>super admin</p>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                        <div class="line-gray"></div>
                        <Row class="margin-top-8">
                            <Col span="8"><p class="notwrap">上次登录时间:</p></Col>
                            <Col span="16" class="padding-left-8">2017.09.12-13:32:20</Col>
                        </Row>
                        <Row class="margin-top-8">
                            <Col span="8"><p class="notwrap">上次登录地点:</p></Col>
                            <Col span="16" class="padding-left-8">北京</Col>
                        </Row>
                    </Card>
                </Row>
            </Col>
            <Col span="16" class-name="padding-left-5 margin-top-100">
                <Row>
                    <Col span="12" class-name="padding-left-5">
                        <infor-card
                            id-name="user_created_count"
                            :end-val="count.user"
                            iconType="android-person-add"
                            color="#2d8cf0"
                            intro-text="今日用户服务调用量"
                        ></infor-card>
                    </Col>
                    <Col span="12" class-name="padding-left-5">
                        <infor-card
                            id-name="visit_count"
                            :end-val="count.material"
                            iconType="ios-eye"
                            color="#64d572"
                            :iconSize="50"
                            intro-text="今日物料服务调用量"
                        ></infor-card>
                    </Col>
                    <Col span="12" class-name="padding-left-5">
                        <infor-card
                            id-name="collection_count"
                            :end-val="count.inventory"
                            iconType="upload"
                            color="#ffd572"
                            intro-text="今日库存服务调用量"
                        ></infor-card>
                    </Col>
                    <Col span="12" class-name="padding-left-5">
                        <infor-card
                            id-name="transfer_count"
                            :end-val="count.task"
                            iconType="shuffle"
                            color="#f25e43"
                            intro-text="今日生产任务服务调用量"
                        ></infor-card>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    上周每日服务调用量(万)
                </p>
                <div class="line-chart-con">
                    <service-requests></service-requests>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
import serviceRequests from './components/serviceRequests.vue';
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';
import axios from 'axios';
export default {
    name: 'home',
    components: {
        serviceRequests,
        countUp,
        inforCard
    },
    data () {
        return {
            count: {
                user: 0,
                material: 0,
                task: 0,
                inventory: 0
            }
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        //{"serviceName":"dmx-material-service","callCount":8},{"serviceName":"dmx-produce-task-service","callCount":5},{"serviceName":"dmx-user-service","callCount":2}
        initData() {
            //请求方法，根据实际情况使用
            axios.get('/api/monitor')
            .then((res) => {
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
                        console.log(list[i])
                    }
                }
                //this.total = res.data.data.length
                console.log(result)        

            }).catch(function (error) {
                console.log(error);
            });;    
        }

    },
    mounted() {
        //请求第一页数据
        this.initData();
        //this.getList()
        //this.getData(this.currentPage,this.display);
    }, 
};
</script>
