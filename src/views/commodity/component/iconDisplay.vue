<style lang="less">
    @import "../../home/home.less";
    @import "../../../styles/common.less";
</style>

<style scoped>
    .top-icon{
        height: 100%;
    }
    .icon{
        float: left;
        width: 48%;
        height: 180px;
        padding:20px;
        margin-right: 20px;
        margin-bottom: 20px;
        box-shadow: 0 0 1px #ddd;
    }
</style>
<template>
    <div>
        <card class="top-icon">
            <row>
                <card class="icon" v-for="(item,index) in data1" :key="item.id">
                    <ul>
                        <li>
                            <row>
                                 <Col span="6">
                                     <img :src="item.potName" width="120px" height="120px">
                                 </Col>
                                <Col>
                                    <h3>{{"商品名称："}}{{item.potName1}}</h3>
                                    <h4>{{"产品类型："}}{{item.potModel}}</h4>
                                    <h4>{{"产品介绍："}}{{item.potDescrible}}</h4>
                                    <h4>{{"售价："}}{{item.advicePrice}}</h4>
                                    <h4>{{"保修期："}}{{item.warranty}}</h4>
                                </Col>
                            </row>
                        </li>
                    </ul>
                </card>
            </row>
            <!--<row>-->
                <!--<v-pagination-->
                        <!--:total="total"-->
                        <!--:current-page='currentPage'-->
                        <!--v-bind:display="display"-->
                        <!--@pagechange="pagechange">-->
                <!--</v-pagination>-->
            <!--</row>-->
        </card>
        <div class="foot">
            <p>Copyright © 2018 中国·天喜控股</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import pagination from '../../material/component/pagination.vue';
    export default {
        name: "iconDisplay",
        components: {
            'v-pagination': pagination,
        },
        data () {
            return {
                total: 10,
                currentPage: 1,   // 当前的页数
                display: 6,   // 每页显示条数
                pagegroup: 12,
                data: [],
                data1: [],
                data2: [],
                data3: []
            }
        },
        methods: {
            init () {
            },
            search (data, argumentObj) {
                let res = data;
                let dataClone = data;
                for (let argu in argumentObj) {
                    if (argumentObj[argu].length > 0) {
                        res = dataClone.filter(d => {
                            return d[argu].indexOf(argumentObj[argu]) > -1;
                        });
                        dataClone = res;
                    }
                }
                return res;
            },
            // getdata (currentPage,display) {
            //     axios.get(`/api/material/repairHandlePage/${currentPage}/${display}`)
            //         .then((res) => {
            //             this.data1 = res.data.data;
            //             for(var i = 0;i<this.data1.length;i++){
            //                 var j= this.data1[i].describe;
            //                 this.data1[i].address = j;
            //                 this.data1[i].describe = require('../images/'+j+'.jpg');
            //             }
            //         });
            // },
            getData () {
                axios.get('/api/material/production').then((res) => {
                    this.data1 = res.data.data;
                    this.data2 = res.data.data;
                    //console.log(res.data.data);
                    for(var i = 0;i<this.data1.length;i++){
                        var j= this.data1[i].potName;
                        this.data1[i].potName1 = j;
                        this.data1[i].potName = require('../images/'+j+'.jpg');
                    }
                    this.total = res.data.data.length;
                });
            },
            // pagechange (page) {
            //     this.currentPage = page;
            //     this.data1 = [];
            //     this.getdata(this.currentPage,this.display);
            // },
        },
        mounted () {
            this.init();
            this.getData();
            // this.getdata(this.currentPage,this.display);
        },
    }
</script>

<style scoped>

</style>