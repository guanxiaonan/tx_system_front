<template>
    <div>
        <card style="height: 580px">
            <p slot="title"><Icon type="compose"></Icon>报修信息填写</p>
            <row>
                <Col span='12' class="padding-right1">
                    <!--<div><p slot="title">{{"用 户 名:"}}{{this.$route.params.customer}}</p><br></div>-->
                    <Form :model="formItem" :label-width="80" style="width:100%;dispaly:block;">
                        <!--<FormItem label="经销商">-->
                            <!--<Select v-model="formItem.dealer">-->
                                <!--<Option v-for="item in dealerNameList" v-bind:value="item.id">-->
                                    <!--{{ item.dealer }}-->
                                <!--</Option>-->
                            <!--</Select>-->
                        <!--</FormItem>-->
                        <FormItem label="联系电话" style="width: 300px">
                            <Input v-model="formItem.phone" placeholder="请输入..."></Input>
                        </FormItem>
                        <FormItem label="地址"> <al-cascader v-model="addressArray" />
                            <Input v-model="formItem.moreAddress" placeholder="请输入详细地址..."></Input>
                        </FormItem>
                        <Form-item label="损坏部位">
                            <Checkbox-group v-model="positionArray">
                                <Checkbox label="部位1"></Checkbox>
                                <Checkbox label="部位2"></Checkbox>
                                <Checkbox label="部位3"></Checkbox>
                                <Checkbox label="部位4"></Checkbox>
                            </Checkbox-group>
                        </Form-item>
                        <row>
                            <Col span="6">
                                <FormItem label="锅名" style="width: 300px">
                                    <Select v-model="formItem.potNameId" @change = "choosePic">
                                        <Option v-for="(item ,index) in potNameList"  v-bind:value="item.id" :key="index">
                                            {{ item.potName }}
                                        </Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="4">
                                <FormItem style="margin-left: 200px">
                                    <Button @click="choosePic">查看图片</Button>
                                </FormItem>
                            </Col>
                        </row>
                        <!--<FormItem label="锅名" style="width: 300px">-->
                            <!--<Select v-model="formItem.potNameId" @change = "choosePic">-->
                                <!--<Option v-for="item in potNameList"  v-bind:value="item.id" >-->
                                    <!--{{ item.potName }}-->
                                <!--</Option>-->
                            <!--</Select>-->
                        <!--</FormItem>-->

                        <FormItem label="损坏描述"><Input v-model="formItem.describe" placeholder="请输入..."></Input>
                        </FormItem>
                        <FormItem label="备注">
                            <Input v-model="formItem.applyRemark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                        </FormItem>
                        <div >
                            <Row type="flex" justify="center">
                                <Upload multiple action="//jsonplaceholder.typicode.com/posts/">
                                    <Button type="ghost" icon="ios-cloud-upload-outline" style="margin-left: -130px">上传文件</Button>
                                </Upload>
                            </Row>
                        </div>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit()" >提交</Button>
                        </FormItem>
                    </form>
                </col>
                <Col span='4' class="padding-right2">
                    <col span="3">
                        <row>
                            <div ><img class="goodPic" :src="showPic"></div>
                        </row>
                </col>
                <Col span="8">
                    <h4>常见问题及解决：</h4>
                    <div class="commonProblem">
                        <div v-for="(i,index) in problemDescribe">
                            <ul>
                                <li><a @click="showProblem(index)">{{i.title}}</a></li>
                            </ul>
                        </div>
                        <div class="modal-mask" v-show="show" transition="modal">
                            <div class="modal-wrapper">
                                <div class="modal-container">
                                    <div v-for="product in k">
                                        <ul>
                                            <li><h3>{{product.title}}</h3></li>
                                            <div v-for="item in product.describe" >
                                                <ul>
                                                    <li type="disc">{{item}}</li>
                                                </ul>
                                            </div>
                                        </ul>
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
            <row>
            </row>
        </card>
        <div class="foot">
            <p>Copyright © 2018 中国·天喜控股</p>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import iviewArea from 'iview-area';
    import axios from 'axios';
    import Cookies from 'js-cookie';
    Vue.use(iviewArea);
    export default {
        name: 'material-add',
        data () {
            return {
                show: false,
                formItem: {
                    dealer: '',
                    potNameId: 0,
                    address: '',
                    position: '',
                    describe: '',
                    phone: '',
                    applyRemark: ''
                },
                k: [],
                problemDescribe: {
                    airFryingPan: {
                        title: "光波炉"
                    },
                    LightWaveFurnace: {
                        title: "空气炸锅"
                    },
                    DoubleSteamer: {
                        title: "双层蒸锅"
                    }
                },
                LightWaveFurnace: {
                    problem1: {
                        title: "1.容器选择",
                        describe: {
                            describe1: "在光波炉内可使用多种耐高温容器，但如果选择了微波烹调火力，最好不要使用金属或带金属的容器。因为金属对微波有反射作用，不仅使食物较难熟，被反射的微波还会损坏光波炉的部件，影响使用寿命。",
                        }
                    },
                    problem2: {
                        title: "2.注意事项",
                        describe: {
                            describe1: "忌用光波炉加热密封的罐装、袋装食品，这容易造成密封品爆炸破裂，但特殊标明的微波食品除外。如果为防止水分蒸发，在装食物的容器上加上保鲜膜，应刺上一些小孔。",
                            describe2: "忌用光波炉油炸食品。油炸食品一般要求缓缓加热进行，而光波和微波加热速度都很快，容易发生危险。",
                            describe3: "若时间和温度没有调节好，刚开始用光波炉的时候，建议不要走开，看到食物颜色转深，立刻切断电源。",
                            describe4: "蒸食物最重要是盖上锡纸或者用厨宝在食物表面加覆盖。另外需要在下层放一小碟子水，或者在炉子里面撒一点水，增加水分。",
                        }
                    },
                    problem3: {
                        title: "3.清洗",
                        describe: {
                            describe1: "底座和玻璃是分开的，做完饭，等玻璃缸冷却后，拿出来清洗，很简单。注意炉头不要用水冲洗，因为电机就在炉头里面，用干净湿抹布擦拭即可。",
                        }
                    },
                },
                airFryingPan: {
                    problem1: {
                        title: "问题一：空气炸锅不工作",
                        describe: {
                            describe1: "产品中电源插头没有插上或接触不良，处理方法：检查插头是否松动，将插头接入有地线的电源插座。",
                            describe2: "你还没有设置定时器。处理方法：将定时器旋钮转到所需烹饪时间，以便电源工作。"
                        }

                    },
                    problem2: {
                        title: "问题二：食物在炸锅中未得到均匀的煎炸",
                        describe: {
                            describe1: "炸蓝中的食物量太多，处理方法：将食物分成小批放入炸蓝，分成小份可以使煎炸更均匀。",
                            describe2: "炸锅温度设定太低。处理方法：将温度控制旋钮重新调节到需要的温度3、烹调时间不够。处理方法：延长定时器时间。"
                        }
                    },
                    problem3: {
                        title: "问题三：食材没有全熟",
                        describe: {
                            describe1: "某些食材需要在烹饪中途进行翻动。处理方法：如果某些食材处于最上面，或者与其它食材重叠，需要在烹饪过程中翻动下。",
                        }
                    },
                },
                DoubleSteamer: {
                    problem1: {
                        title: "问题一：插电不工作",
                        describe: {
                            describe1: "电源电路没有接通或者灯泡坏了，使用过程中要检查电源是否接通。",
                            describe2: "熔断器烧断。",
                            describe3: "发热盘故障。",
                            describe4: "电路故障。"
                        }
                    },
                    problem2: {
                        title: "问题二：食物在炸锅中未得到均匀的煎炸",
                        describe: {
                            describe1: "炸蓝中的食物量太多，处理方法：将食物分成小批放入炸蓝，分成小份可以使煎炸更均匀。",
                            describe2: "炸锅温度设定太低。处理方法：将温度控制旋钮重新调节到需要的温度3、烹调时间不够。处理方法：延长定时器时间。"
                        }
                    },
                    problem3: {
                        title: "问题三：食材没有全熟",
                        describe: {
                            describe1: "某些食材需要在烹饪中途进行翻动。处理方法：如果某些食材处于最上面，或者与其它食材重叠，需要在烹饪过程中翻动下。",
                        }
                    },
                },
                customer: '',
                username: '',
                loginName: '',
                dealerNameList: [],
                potNameList: [],
                addressArray: [],
                positionArray: [],
                addr: '',
                pos: '',
                moreAddress: '',
                // pot: '',
                pot: '天喜',
                showPic: require('../commodity/images/天喜.jpg')
            };
        },
        methods: {
            init () {
                this.loginName = Cookies.get('user');
                this.username = this.$route.params.customer;
                //console.log(this.username);
                // 请求方法，根据实际情况使用
                axios.get('/api/material/dealerList').then((res) => {
                    //console.log(res);
                    if (res.data.code === 4004) {
                        this.$router.push({
                            name: 'login'
                        });
                    } else {
                        // res 为成功回调的响应
                        this.dealerNameList = res.data.data;
                    }
                });
                //获取用户信息
                axios.get('/api/user/show_customer').then((res) => {
                    //console.log(res);
                    for(var i = 0;i<res.data.data.length;i++) {
                        if (this.loginName === res.data.data[i].username){
                            this.customerList = res.data.data[i];
                        }
                    }
                    this.formItem.phone = this.customerList.phone;
                    // console.log("登录用户信息：",this.customerList);
                });

                //获取锅名
                axios.get('/api/material/potNameList').then((res) => {
                    //console.log(res);
                    if (res.data.code === 4004) {
                        this.$router.push({
                            name: 'login'
                        });
                    } else {
                        // res 为成功回调的响应
                        this.potNameList = res.data.data;
                    }
                });

            },
            choosePic() {
                if(this.formItem.potNameId.length === 0 ){
                    this.pot = "天喜"
                }else{
                    this.pot = this.potNameList[this.formItem.potNameId - 1].potName;
                }
                var j = this.pot;
                this.showPic =  require('../commodity/images/'+ j +'.jpg')

                // if(this.formItem.potNameId.length === 0 ){
                //     this.pot = "天喜"
                // }else{
                //     this.pot = this.formItem.potNameId
                // }
                // var j = this.pot;
                // this.showPic =  require('./images/'+ j +'.jpg')
            },
            // handleSubmit (name) {
            //     this.$refs[name].validate((valid) => {
            //         if (valid) {
            //             this.$Message.success('提交成功!');
            //         } else {
            //             this.$Message.error('表单验证失败!');
            //         }
            //     });
            // },
            showProblem (val) {
                this.show = true;
                if(val === "airFryingPan"){
                    this.k = this.airFryingPan
                }else if(val === "LightWaveFurnace") {
                    this.k = this.LightWaveFurnace
                }else{
                    this.k = this.airFryingPan
                }
            },
            handleSubmit: function () {
                console.log("锅名是：",this.formItem.potNameId);
                // console.log("123456");
                console.log(this.addressArray);
                console.log(this.positionArray);
                this.formItem.customer = this.loginName;
                for (this.addr in this.addressArray) {
                    // console.log('地址名是：', this.addr);
                    this.formItem.address = this.formItem.address + this.addressArray[this.addr].name;
                }
                this.formItem.address = this.formItem.address + this.formItem.moreAddress;
                for (var i = 0; i < this.positionArray.length; i++) {
                    // console.log('部位名是：', this.pos);
                    if (i < this.positionArray.length - 1) {
                        this.formItem.position = this.formItem.position + this.positionArray[i] + ',';
                    } else {
                        this.formItem.position = this.formItem.position + this.positionArray[i];
                    }
                }
                console.log('地址是：', this.formItem.address);
                console.log('部位是：', this.formItem.position);
                // console.log(this.formItem.position);
                axios.post('/api/material/repair_submit', this.formItem, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    console.log(response);
                    alert("提交成功");
                        this.$router.push({
                            name: 'argument-page'
                        });
                }).catch(function (error) {
                    console.log(error);
                });
            },

        },
        mounted () {
            this.init();
        },
        watch: {
            '$route'() {
                this.init();
            },
        }
    };
</script>
<style>
    .padding-right1{
        float:left;
    }
    .padding-right2{
        padding-left: 50px;
    }
    .goodPic{
        position: relative;
        left: -40px;
        top: 70px;
        vertical-align: middle;
        display: block;
        width: 150px;
        height: 150px;
        opacity: 1;
    }
    .foot {
        width: 500px;
        height: 30px;
        margin-top: -30px;
        text-align: center;
    }
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 700px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        /*background: #2D8CF0;*/
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-default-button {
        float: right;
        width:50px;
        height:25px;
        color:#FFFFFF;
        border: none;
        background-color: #1E90FF ;
        border-radius: 5px;
        position: relative;
        bottom: 5px;
    }
    .modal-enter, .modal-leave {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    h3{
        color: black;
    }
</style>
