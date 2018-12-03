<template>
    <div>
        <row>
            <Col span="16">
                <div>
                    <card>
                        <p slot="title">订购记录：</p>
                        <!--<li type="disc">{{this.data1.createTime}}</li>-->
                        <div v-if="shoppingRecord.length === 0">{{"暂无记录"}}</div>
                        <div v-else>
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
                            <div v-if="repairRecordDone.length === 0">{{"暂无记录"}}</div>


                            <div v-else >
                                <div v-for="item in repairRecordDone" style="border-bottom: solid 1px">
                                    <ul>
                                        <li type="disc" style="color: #2D8CF0">{{item.date}}</li>
                                        <p style="padding-left: 20px;">{{"产品名："}}{{item.potName}}</p>
                                        <p style="padding-left: 20px">{{"问题描述："}}{{item.describe}}</p>
                                    </ul>
                                </div>
                            </div>
                            <div v-else>{{"暂无记录"}}</div>
                        </div>

                        <div style="border-top: solid 1px">
                            <h3>进行中：</h3>
                            <div v-if="repairRecordDoing.length === 0">{{"暂无记录"}}</div>
                            <div v-else>
                                <div v-for="item in repairRecordDoing" style="border-bottom: solid 1px">
                                    <ul>
                                        <li type="disc" style="color: #2D8CF0">{{item.date}}</li>
                                        <p style="padding-left: 20px;">{{"产品名："}}{{item.potName}}</p>
                                        <p style="padding-left: 20px">{{"问题描述："}}{{item.describe}}</p>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </card>
                </div>
            </Col>
        </row>
    </div>

</template>

<script>
    import axios from 'axios'
    import {formatDate} from '../../common/formatDate.js';
    export default {
        name: "detailINews",

        data() {
            return {
                data1: this.$route.params,
                vendId:this.$route.params.vendId,
                data2: [],
                shoppingRecordMaterial: [],
                shoppingRecord: [],
                repairRecordMaterialDoing: [],
                repairRecordMaterialDone: [],
                repairRecordDone: [],
                repairRecordDoing: [],
                // shoppingRecord1: [
                //     {
                //         date: '2018-1-1',
                //         priceAll: 10000,
                //         content: [
                //             {
                //                 potName: '蒸锅',
                //                 prodtypeNum: '222',
                //                 priceSingle: 30
                //             },
                //             {
                //                 potName: '煎锅',
                //                 prodtypeNum: '123',
                //                 priceSingle: 40
                //             },
                //             {
                //                 potName: '平底锅',
                //                 prodtypeNum: '34',
                //                 priceSingle: 40
                //             },
                //         ]
                //     },
                //     {
                //         date: '2030-10-13',
                //         priceAll: 10000,
                //         content: [
                //             {
                //                 productName: '高汤锅',
                //                 prodtypeNum: '5',
                //                 priceSingle: 30
                //             },
                //             {
                //                 productName: '压力锅',
                //                 prodtypeNum: '42',
                //                 priceSingle: 140
                //             },
                //             {
                //                 productName: '深煎锅',
                //                 prodtypeNum: '68',
                //                 priceSingle: 400
                //             },
                //         ]
                //     },
                // ],
                repairRecord: [
                    {
                        time: '2011-8-9',
                        potType: '蒸锅',
                        describe: "插头"
                    },
                    {
                        time: '2011-8-9',
                        potType: '蒸锅',
                        describe: "插头"
                    },
                ]
            }
        },
        methods: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
            },

            getDataById() {
                axios.get(`/api/material/vendor_order/${this.vendId}`).then((res)=> {
                    this.shoppingRecordMaterial = res.data.data;
                    for(var i=0;i<res.data.data.length;i++){
                        res.data.data[i].date = this.formatDate(res.data.data[i].date);
                    }
                    this.dataDeal();
                })
            },

            getDataDealing() {
                axios.get(`/api/material/repair_handle_vend/${this.vendId}`).then((res) => {
                    var j = 0;
                    var k = 0;
                    for(var i=0;i<res.data.data.length;i++){
                        res.data.data[i].date = this.formatDate(res.data.data[i].date);
                        if(res.data.data[i].stateId === 2) {
                            this.repairRecordMaterialDoing[j] = res.data.data[i];
                            j++
                        }else if(res.data.data[i].stateId === 3) {
                            this.repairRecordMaterialDone[k] = res.data.data[i];
                            k++
                        }
                    }
                    this.repairRecordDone = this.repairRecordMaterialDone;
                    this.repairRecordDoing = this.repairRecordMaterialDoing;
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
            }
        },
        mounted() {
          this.getDataById();
          this.getDataDealing();
        },
        watch:{
            '$route'(){
                this.data1 = this.$route.params
            }
        }
    }
</script>

<style scoped>

</style>