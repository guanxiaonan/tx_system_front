
<template>
    <div>
        <!--style="height: 580px"-->
            <row>
                <Col span="4">
                    <card style="height: 580px;background-color: #E0ECF8">
                        <div class="main-left" >
                            <a @click="pubInput">发表评论</a>
                        </div>
                    </card>

                </Col>

                <Col span="16">
                    <card style="height: auto;background-color: #EFEFFB">
                        <div class="main">
                            <div class="container">
                                <div class="col-md-9 rightBox" id="comment">
                                    <commemt-content v-bind:comment="comment" v-on:change="changCommmer" v-on:deleteCom="deleteComment"></commemt-content>
                                </div>
                            </div>
                        </div>
                    </card>
                </Col>

                <Col span="4">
                    <card style="margin-left: 5px;height: 580px;background-color: #E0ECF8">
                        <div class="main-right">
                            <h3>TIP</h3>
                            <ul>
                                <li type="disc">点击用户回复</li>
                                <li type="disc">点击评论，在当前层发表评论</li>
                                <li type="disc">未点击用户或评论时，建立新一层评论</li>
                                <li type="disc">点击取消，建立新一层评论</li>
                            </ul>
                        </div>
                    </card>
                </Col>
            </row>
            <row>
                <div style="height: auto">
                    <comment-textarea v-bind:type="type" v-bind:inputSts="inputSts" v-bind:name="oldComment" v-on:submit="addComment"
                                      v-on:canel="canelCommit"></comment-textarea>
                </div>

            </row>
        <!--<row>-->
            <!--<div class="foot" style="margin-top: 20px; position: relative;margin-bottom: 0">-->
                <!--<p>Copyright © 2018 中国·天喜控股</p>-->
            <!--</div>-->
        <!--</row>-->

    </div>
</template>
<script>
    import {formatDate} from '../common/formatDate.js';
    import axios from 'axios'
    import commemtContent from './component/commemtcontent.vue'
    import commentTextarea from './component/commenttextarea.vue'
    import Cookie from 'js-cookie'
    export default {
        name: 'comment-share',
        components: {
            commentTextarea,
            commemtContent
        },
        data () {
            return {
                userId: '',
                img: [],
                commenter: "session",   //评论人，这里会从session拿
                type: 0,                //0为评论作者1为评论别人的评论
                inputSts: false,        //输入框显示
                oldComment: null,       //久评论者的名字
                chosedIndex: -1,        //被选中的评论的index
                layerMax: 0,
                chatIdMax: 0,
                dataMaterial: [],
                shieldData: [],
                chatMaterial: [],
                recordPosition: '',
                deliverChat: false,
                formItemIn: {
                    chatId: '',
                    layerId: '',
                    responderId: '',
                    reviewerId: '',
                    chatContent: "",
                    chatDate: new Date(),
                    topLayer: '',

                },
                comment: [
                    // {
                    //     name: "有毒的黄同学",
                    //     time: "2016-08-17",
                    //     content: "好,讲得非常好，good!好,讲得非常好，good!好,讲得非常好，good!好,讲得非常好，good!好,讲得非常好，good!好,讲得非常好，good!",
                    //     reply: [
                    //         {
                    //             responder: "admin",
                    //             reviewers: "傲娇的",
                    //             time: "2016-09-05",
                    //             content: "你说得对"
                    //         },
                    //         {
                    //             responder: "傲娇的",
                    //             reviewers: "有毒的黄同学",
                    //             time: "2016-09-05",
                    //             content: "很强"
                    //         },
                    //     ]
                    // },
                    // {
                    //     name: "Freedom小黄",
                    //     time: "2016-08-17",
                    //     content: "好,讲得非常好，good",
                    //     reply: []
                    // }
                ]   //评论内容

            }
        },
        methods: {
            init() {
                this.getCookie();
            },
            compareScore(x,y) {
                if(x >= y) {
                    return x
                }else {
                    return y
                }
            },
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
            },
            getData() {
                // axios.get(`api/material/chat_top_layer`).then((res) => {
                //     var j = 0;
                //     for(var i=0; i<res.data.data.length; i++) {
                //         this.comment[i]={
                //             positionId:j,
                //             name: this.chatMaterial[j].responderName,
                //             responderId: this.chatMaterial[j].responderId,
                //             time:  this.chatMaterial[j].chatDate,
                //             content:  this.chatMaterial[j].chatContent,
                //             reply: []
                //         };
                //         axios.get(`api/material/chat_top_layer`).then((res) => {
                //
                //         });
                //
                //
                //     }
                // })

                axios.get(`api/material/chat_table`).then((res) => {
                    if(res.data.data === null){
                        this.chatMaterial = []
                    }else {

                        for(var i=0;i<res.data.data.length;i++){
                            res.data.data[i].chatDate = this.formatDate(res.data.data[i].chatDate);
                        }
                        this.chatMaterial = res.data.data;
                        axios.get(`api/material/shield_word`).then((res)=>{
                            for(var i=0; i<res.data.data.length; i++) {
                                this.dataMaterial[i] = res.data.data[i].shield
                            }
                            this.shieldData = this.dataMaterial;
                            // console.log(this.shieldData);

                            //存在数据时替换关键词
                            // if(this.shieldData.length > 0) {

                            for(var j=0; j<this.chatMaterial.length; j++) {
                                this.layerMax = this.layerMax>this.chatMaterial[j].layerId? this.layerMax:this.chatMaterial[j].layerId;
                                this.chatIdMax = this.compareScore(this.chatIdMax,this.chatMaterial[j].chatId);
                                // console.log(j)
                                if(this.chatMaterial[j].topLayer === 1) {

                                    this.comment.push({
                                        positionId:j,
                                        name: this.chatMaterial[j].responderName,
                                        responderId: this.chatMaterial[j].responderId,
                                        time:  this.chatMaterial[j].chatDate,
                                        content:  this.chatMaterial[j].chatContent,
                                        reply: []
                                    });
                                }else {
                                    // console.log("添加reply");

                                    // console.log(this.comment[this.chatMaterial[j].layerId],this.chatMaterial[j].chatContent);
                                    this.comment[this.chatMaterial[j].layerId].reply.push({
                                        positionId: j,
                                        responder: this.chatMaterial[j].responderName,
                                        reviewerId: this.chatMaterial[j].reviewerId,
                                        responderId: this.chatMaterial[j].responderId,
                                        reviewers: this.chatMaterial[j].reviewerName,
                                        time: this.chatMaterial[j].chatDate,
                                        content: this.chatMaterial[j].chatContent
                                    })
                                }
                            }
                            this.adjustComment()
                            // }
                        })

                    }

                    // console.log(res.data.data);
                    // console.log(res.data.data[0].responderName);




                })
            },
            getShieldData() {
                axios.get(`api/material/shield_word`).then((res)=>{
                    for(var i=0; i<res.data.data.length; i++) {
                        this.dataMaterial[i] = res.data.data[i].shield
                    }
                    this.shieldData = this.dataMaterial;
                    // console.log(this.shieldData);

                    //存在数据时替换关键词
                    if(this.shieldData.length > 0) {
                        this.getData();
                        this.adjustComment()
                    }
                })
            },
            getCookie:function () {
                if (document.cookie.length>0) {
                    var arr=document.cookie.split('; ');
                    for(var i=0; i<arr.length; i++) {
                        if(arr[i].indexOf("user")!= -1) {
                            // console.log(i);
                            this.userId = arr[i].substring(arr[i].indexOf("=")+1);
                            break;
                        }
                    }
                    // console.log(this.userId);
                }
            },
            getTime() {
                var now = new Date();
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                var day = now.getDate();
                month.length < 2 ? "0" + month : month;
                day.length < 2 ? "0" + day : day;
                return year + "-" + month + "-" + day;
            },
            pubInput() {
                this.inputSts = true;
                this.type = 0;
                this.deliverChat = true

            },
            addComment: function (data) {
                // this.formItemIn = this.
                data = data.substring(3,data.length - 4);

                if(this.deliverChat) {
                    if(this.chatMaterial.length === 0) {
                        this.layerMax = -1
                    }
                    this.formItemIn = {
                        // chatId: this.dataMaterial.length + 1,
                        chatId: this.chatIdMax + 1,
                        layerId: this.layerMax + 1,
                        responderId: Cookie.get().loginId,
                        reviewerId: null,
                        chatContent: data,
                        chatDate: new Date(),
                        topLayer: 1,
                    };
                    this.deliverChat = false;
                }else {
                    // console.log(22222222222222222222);
                    if(this.recordPosition < 0) {
                        //不带旧评论者（点击评论按钮）
                        // console.log("评论");

                        this.formItemIn = {
                            chatId: this.chatIdMax + 1,
                            layerId: -this.recordPosition,
                            responderId: Cookie.get().loginId,
                            reviewerId: null,
                            chatContent: data,
                            chatDate: new Date(),
                            topLayer: 0,
                        };

                    }else {
                        // console.log("带有旧评论者");
                        // console.log(this.chatIdMax + 1);
                        //带有旧评论者
                        this.formItemIn = {
                            chatId: this.chatIdMax + 1,
                            layerId: this.chatMaterial[this.recordPosition].layerId,
                            responderId: Cookie.get().loginId,
                            reviewerId: this.oldComment,
                            chatContent: data,
                            chatDate: new Date(),
                            topLayer: 0,
                        };
                        // console.log(this.formItemIn)
                    }
                }
                // console.log(this.formItemIn);
                axios.post('/api/material/chat_submit', this.formItemIn, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    // console.log(response);
                    this.comment = [];
                    this.getData();
                    // alert("数据提交成功！");
                    // this.$router.go(0)
                }).catch(function (error) {
                    console.log(error);
                });
                this.inputSts = false;
            },
            changCommmer: function (name, index,layer,positionId) {

                // console.log(Cookie.get().loginId);

                this.formItemIn.layerId = layer;
                this.recordPosition = positionId;
                // console.log("recordPosition:" + this.recordPosition);
                // console.log(this.chatMaterial[this.recordPosition].reviewerName);
                this.oldComment = name;
                // console.log("reviewerName" + this.oldComment);
                this.chosedIndex = index;
                this.type = 1;
                this.inputSts = true
            },
            deleteComment(index,deleteType) {
                // console.log(index,deleteType);
                if(deleteType === 1) {
                    var deleteLayer = this.chatMaterial[index].layerId;
                    // console.log(deleteLayer);
                    axios.delete(`/api/material/delete_chat_all/${deleteLayer}`).then((res) => {
                        this.comment = [];
                        this.getData();
                    })
                }else {
                    var deleteSingle = this.chatMaterial[index].chatId;
                    axios.delete(`/api/material/delete_chat/${deleteSingle}`).then((res) => {
                        this.comment = [];
                        this.getData();
                    })
                }

                // if(confirm("确定删除吗")) {
                //     if(replyIndex !== -1){
                //         this.comment[index].reply.splice(replyIndex,1)
                //     }else {
                //         this.comment.splice(index,1)
                //     }
                // }
            },
            canelCommit: function () {
                this.type = 0;
                this.inputSts = false
            },
            adjustComment() {
                var arr = this.shieldData;
                // console.log("======="+ this.shieldData);
                // console.log(arr);

                for(var i = 0;i<this.comment.length; i ++){
                    // console.log("这是第" + i + "条信息");
                    this.comment[i].content = this.comment[i].content.replace(new RegExp(arr.join('|'),'img'),'*');
                    // console.log("测试：" + new RegExp(arr.join('|'),'img'));

                    for(var k = 0; k<this.comment[i].reply.length; k++) {
                        // console.log("这是" + k)
                        this.comment[i].reply[k].content =  this.comment[i].reply[k].content.replace(new RegExp(arr.join('|'),'img'),'*');
                    }
                }

            }
        },

        mounted() {
            this.init();
            this.getData();
            // this.getShieldData();
        },
        watch: {
            comment: {
                handler(val) {
                    var arr = this.shieldData;
                    for(var i = 0;i<this.comment.length;i++){
                        this.comment[i].content = this.comment[i].content.replace(new RegExp(arr.join('|'),'img'),'*');
                        for(var k = 0; k<this.comment[i].reply.length; k++) {
                            this.comment[i].reply[k].content =  this.comment[i].reply[k].content.replace(new RegExp(arr.join('|'),'img'),'*');
                        }
                    }
                },
                deep: true
            },
        }
    }
</script>