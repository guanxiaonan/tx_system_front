<template>
    <div>
        <row>
            <Col span="16">
                <div>
                    <card>
                        <p slot="title">订购记录：<a @click="addRecord">（添加纪录）</A></p>
                        <!--<li type="disc">{{this.data1.createTime}}</li>-->
                        <div v-for="item in shoppingRecord" style="border-bottom: solid 1px">
                            <ul>
                                <li type="disc" style="color: #2D8CF0">{{item.date}}</li>
                                <div v-for="product in item.content" >
                                    <p style="padding-left: 50px;font-weight: bold;border-bottom: dot-dot-dash;">
                                        {{product.potName}}{{"："}}{{product.priceSingle}}{{"元/个"}}
                                        <span style="padding-left: 30px;float: right">{{"数量："}}{{product.prodtypeNum}}</span>
                                    </p>
                                </div>
                                <p >{{"成交额："}}<span style="color: red">{{item.priceAll}}</span>{{"元"}}</p>
                            </ul>
                        </div>
                    </card>
                </div>
            </Col>
            <Col span="8">
                <div>
                    <card>
                        <p slot="title">故障受理记录：</p>
                        <div>
                            <h3>已完成：</h3>
                            <div v-for="item in repairRecordDone" style="border-bottom: solid 1px">
                                <ul>
                                    <li type="disc" style="color: #2D8CF0">{{item.date}}</li>
                                    <p style="padding-left: 20px;">{{"产品名："}}{{item.potName}}</p>
                                    <p style="padding-left: 20px">{{"问题描述："}}{{item.describe}}</p>
                                </ul>
                            </div>
                        </div>

                        <div style="border-top: solid 1px">
                            <h3>进行中：</h3>
                            <div v-for="item in repairRecordDoing" style="border-bottom: solid 1px">
                                <ul>
                                    <li type="disc" style="color: #2D8CF0">{{item.date}}</li>
                                    <p style="padding-left: 20px;">{{"产品名："}}{{item.potName}}</p>
                                    <p style="padding-left: 20px">{{"问题描述："}}{{item.describe}}</p>
                                </ul>
                            </div>
                        </div>
                    </card>
                    <div class="modal-mask" v-show="show" transition="modal">
                        <div class="modal-wrapper">
                            <div class="modal-container">
                            <!--<Table :columns="column" :data="shoppingRecord"></Table>-->
                                <div v-if="shoppingRecordIn.length === 0">
                                    {{"请添加记录"}}
                                </div>
                                <div v-else>
                                    <table style="border: solid 1px">
                                        <tr><th style="width: 100px;">日期</th>
                                            <th style="width: 100px;">产品名</th>
                                            <th style="width: 100px;">单价/元</th>
                                            <th style="width: 100px;">数量/个</th>
                                            <th style="width: 100px;">总价/万元</th>
                                        </tr>

                                        <tr>
                                            <td :rowspan="rowspan" colspan="1" align="center" typeof="date">
                                                {{this.shoppingRecordIn[0].time}}
                                            </td>
                                            <td>
                                                {{""}}
                                            </td>
                                            <td>
                                                {{""}}
                                            </td>
                                            <td>
                                                {{""}}
                                            </td>
                                            <td :rowspan="rowspan" colspan="1" align="center">
                                                {{this.shoppingRecordIn[0].priceAll}}
                                            </td>
                                        </tr>
                                        <tr v-for="item  in shoppingRecordIn[0].content" align="center">
                                            <td>
                                                {{item.productName}}
                                            </td>
                                            <td>
                                                {{item.quantity}}
                                            </td>
                                            <td>
                                                {{item.price}}
                                            </td>
                                        </tr>

                                    </table>
                                    <button @click="contentReset" style="float: right">重置</button>
                                </div>
                                <!--<input v-model="">-->
                                <!--<Date-picker style="margin-top: 10px;margin-bottom: 10px"-->
                                             <!--type="date" placeholder="选择日期" v-model="itemElement.time">-->
                                <!--</Date-picker><br>-->
                                <Date-picker format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="date"></Date-picker>

                                <div>
                                    <row>
                                        <Col span="12">
                                            <div style="margin-top: 10px">
                                                <span>锅名：</span>
                                                <!--<input id="2" style="margin-left: 38px" v-model="productName"><br>-->
                                                <Select  v-model="prodNameId" style="width: 138px;margin-left: 50px" >
                                                    <Option v-for="(item ,index) in potNameList"  v-bind:value="item.id" :key="index">
                                                        {{ item.potName }}
                                                    </Option>
                                                </Select>
                                            </div>

                                            <label for="3">数量：</label>
                                            <input id="3" style="margin-left: 50px" v-model="quantity"><br>

                                            <label for="4">单价：</label>
                                            <input id="4" style="margin-left: 50px" v-model="price"><br>

                                            <div style="margin-top: 10px">
                                                <label for="1">总价：</label>
                                                <input id="1" style="margin-left: 50px" v-model="itemElement.priceAll">
                                                <!--<span style="margin-left: 100px;color: red">该项为某日所有订购产品的总价</span>-->
                                                <br>
                                            </div>
                                        </Col>
                                        <Col span="8">
                                            <div style="color: #2D8CF0">
                                                <h2 style="color: red">注意：</h2>
                                                <li>总价为某一天所有订购产品总价</li>
                                                <li>先添加，后上传</li>
                                                <li>每次仅上传某一天的记录</li>
                                            </div>
                                        </Col>
                                    </row>
                                </div>



                                <div style="margin-top: 20px">
                                    <button @click="addElement">添加</button>
                                    <button style="margin-left: 100px" @click="subRecord">上传</button>
                                    <!--<span style="color: red">(每次仅能上传某一天的记录)</span>-->
                                </div>
                                <div class="modal-footer">
                                    <slot name="footer">
                                        <button class="modal-default-button"
                                                @click="show = false">
                                            关闭
                                        </button>
                                    </slot>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </row>
    </div>

</template>

<script>
    // import  trPart from  './component/trPart'
    import axios from 'axios'
    import Cookies from 'js-cookie'
    import {formatDate} from "../common/formatDate";

    export default {
        name: "historyBuy",
        components: {
            // trPart
        },
        data() {
            return {
                vendId: Cookies.get('loginId'),
                INDEX: 0,
                oldTime: '',
                data: [],
                column: [
                    {
                        title: '序号',
                        width: '80px',
                        align: 'center',
                        type: 'index'
                    },
                    {
                        title: '名称',
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: '日期',
                        align: 'center',
                        key: 'date'
                    },
                    {
                        title: '内容',
                        align: 'center',
                        key: 'content'
                    },
                    {
                        title: '数量',
                        align: 'center',
                        key: 'quantity'
                    },
                    {
                        title: '成交额',
                        align: 'center',
                        key: 'priceAll'

                    }
                ],
                potNameList: [],
                show: false,
                // data1: this.$route.params,
                repairRecordDone: [],
                repairRecordDoing: [],
                shoppingRecordMaterial: [],
                recordSubmit: [],
                shoppingRecordIn: [],
                date: Date,
                itemElementTime: {
                    year: '',
                    month: '',
                    day: ''
                },
                itemElement: {
                    time: '',
                    priceAll: '',
                    content: []
                },
                prodNameId: '',
                productName: '',
                quantity: '',
                price: '',
                shoppingRecord: [],
                repairRecord: []
            }
        },
        computed: {
            rowspan() {
                return this.shoppingRecordIn[0].content.length + 1
            }
        },
        methods: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
            },
            getPotNameList() {
                axios.get(`/api/material/potNameList`).then((res)=> {
                    this.potNameList = res.data.data;
                    // console.log(res.data.data)
                })
            },
            getDataById() {
                axios.get(`/api/material/vendor_order/${this.vendId}`).then((res)=> {
                    this.shoppingRecordMaterial = res.data.data;
                    for(var i=0;i<res.data.data.length;i++){
                        res.data.data[i].date = this.formatDate(res.data.data[i].date);
                    }
                    this.dataDeal();
                    // console.log(res.data.data[0])
                })
            },
            getDataDealing(){
                axios.get(`api/material/repair_handle_vend/${this.vendId}`).then((res) => {
                    console.log(res.data.data);
                    var j = 0;
                    var k = 0;
                    var rmd1 = [];
                    var rmd2 = [];
                    for(var i=0;i<res.data.data.length;i++){
                        res.data.data[i].date = this.formatDate(res.data.data[i].date);
                        if(res.data.data[i].stateId === 2) {
                            // console.log(11111);
                            this.repairRecordMaterialDoing[j] = res.data.data[i];
                            j++
                        }else if(res.data.data[i].stateId === 3) {
                            // console.log(2222);
                            rmd2[k] = res.data.data[i];
                            k++
                        }
                    }
                    this.repairRecordDoing = rmd1;
                    this.repairRecordDone = rmd2;
                    // console.log( this.repairRecordDoing);
                    // console.log(this.repairRecordDone);
                    // this.repairRecordDoing = res.data.data;
                    // this.repairRecordDone = res.data.data;
                })

            },
            dataDeal() {
                var level1 = 0;
                for(var i=0; i<this.shoppingRecordMaterial.length; i++) {
                    if(i === 0) {
                        this.shoppingRecord.push(
                            {
                                date: this.shoppingRecordMaterial[i].date,
                                priceAll: this.shoppingRecordMaterial[i].priceAll,
                                content: [
                                    {
                                        potName: this.shoppingRecordMaterial[i].potName,
                                        prodtypeNum: this.shoppingRecordMaterial[i].prodtypeNum,
                                        priceSingle: this.shoppingRecordMaterial[i].priceSingle
                                    },
                                ]
                            }
                        );
                        // console.log(this.shoppingRecord[0].date)
                    }else {
                        if(this.shoppingRecordMaterial[i].date === this.shoppingRecord[level1].date) {
                            this.shoppingRecord[level1].content.push(
                                {
                                    potName: this.shoppingRecordMaterial[i].potName,
                                    prodtypeNum: this.shoppingRecordMaterial[i].prodtypeNum,
                                    priceSingle: this.shoppingRecordMaterial[i].priceSingle
                                },
                            );
                        }else {
                            level1 ++;
                            this.shoppingRecord.push(
                                {
                                    date: this.shoppingRecordMaterial[i].date,
                                    priceAll: this.shoppingRecordMaterial[i].priceAll,
                                    content: [
                                        {
                                            potName: this.shoppingRecordMaterial[i].potName,
                                            prodtypeNum: this.shoppingRecordMaterial[i].prodtypeNum,
                                            priceSingle: this.shoppingRecordMaterial[i].priceSingle
                                        },
                                    ]
                                }
                            )

                        }
                    }
                }
            },
            search (data, argumentObj) {
                let res;
                // let dataClone = data;
                for (let argu in data) {
                    if(data[argu].id === argumentObj) {
                        return res = data[argu].potName;
                    }
                }
            },
            addRecord() {
                this.show = true;
                this.getPotNameList();
            },

            // addElement() {
            //     console.log(this.potNameId);
            //     console.log()
            // },

            addElement() {
                this.productName = this.search(this.potNameList,this.prodNameId);
                this.itemElement.time = this.formatDate(this.date);
                this.itemElement.content.push(
                    {
                        productName: this.productName,
                        quantity: this.quantity,
                        price: this.price,
                    }
                );
                if(this.INDEX === 0) {
                    this.shoppingRecordIn.push(this.itemElement);
                }

                this.recordSubmit.push({
                    vendId:Cookies.get('loginId'),
                    date: this.date,
                    priceAll: 10000,
                    prodNameId: this.prodNameId,
                    potName: this.productName,
                    prodtypeNum: this.quantity,
                    priceSingle: this.price,
                })
            },
            subRecord() {
                if(confirm("上传后将无法修改，不再核查一遍吗？")) {
                    axios.post(`/api/material/history_buy_group_submit`,this.recordSubmit).then((res) => {
                        this.recordSubmit = [];
                        this.shoppingRecord = [];
                        // console.log(res);
                        this.getDataById()
                    });

                    // this.shoppingRecord.push(this.shoppingRecordIn[0]);
                    this.contentReset();
                }
            },
            contentReset() {
                this.productName = '';
                this.quantity = '';
                this.price = '';
                this.itemElement = {
                    time: '',
                    priceAll: '',
                    content: []
                };
                this.itemElementTime= {
                    year: '',
                    month: '',
                    day: ''
                };
                this.shoppingRecordIn = [];
            }
        },
        mounted() {
            this.getDataById();
            this.getDataDealing();
        }
        // watch:{
        //     '$route'(){
        //         this.data1 = this.$route.params
        //     }
        // }
    }
</script>

<style scoped>
 .modal-container{

 }

</style>
