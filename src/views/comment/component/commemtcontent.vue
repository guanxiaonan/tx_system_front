<style>
    .comment_input {
        /*height: 80px;*/
        height: auto;
        padding: 10px 15px;
        text-align: center;
        background-color: #ededed;
        border-top: solid 1px #e1e1e1;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .comment_input input {

        width: 30%;
        height: 30px;
        border: 1px solid rgba(102, 102, 102, 0.8);
        border-radius: 30px;
        background-color: rgba(255, 255, 255, 0.8);
        padding: 0 10px;
    }

    .comment_input p {
        padding: 5px 10px;
        color: #fc6700;
        line-height: 30px;
        display: inline-block;
    }

    .follow_clickcolor:not(.weui_btn_disabled):active {
        background-color: #e1e1e1;
    }

    /*回复*/
    .good a {
        float: right;
        color: #808080;
    }
    .comment:after {
        clear: both;
        content: '';
        display: block;
        width: 0;
        height: 0;
        visibility: hidden;
    }
    .comment {
        *zoom: 1;
        padding: 5px 0;
        /*border-top: 1px solid #eee;*/
    }



    .comment-left img {
        width: 30px;
        height: 30px;
    }

    .comment-right {
        float: left;
        width: 100%;
    }

    .comment-text {
        line-height: 18px;
    }

    .comment-text span {
        color: #eb7350;
    }
    .Line{
        float: left;
        width: 0.1em;
        height: 5em;
        margin-right: 1em;
        background: #d4c4c4;
    }
    .fade-enter-active,.fade-leave-active{
        transition: all 0.8s ease-out;
    }
    /* 进入开始 */
    .fade-enter{
        transform: translateY(-50px);
        opacity: 0;
    }
    /* 出去终点 */
    .fade-leave-active{
        transform: translateY(-50px);
        opacity: 0;
    }
</style>
<template>
    <div class="commentBox" style="margin-bottom: 50px;margin-right: 13px">
        <p v-if="comment.length==0">暂无评论，我来发表第一篇评论！</p>
        <div v-else>
            <card class="comment weui-comment-item"
                  style="background-color: #F2F2F2;margin-top: -15px;margin-left: -15px;width: auto"
                  v-for="(item,index) in comment" v-bind:index="index" :key="index">
                <row>
                    <Col span="4">
                        <div class="userinfo">
                            <Row>
                                <img src="../../../images/logo-min.jpg">
                            </Row>
                            <Row>
                                <strong class="nickname">{{item.name}}</strong>
                            </Row>
                        </div>
                    </Col>
                    <Col span="20">
                        <div style="border-left:1px solid #BDBDBD;">
                            <row>
                                <div class="comment" style="padding-left: 10px">
                                    <p><a style="width: 500px;overflow: auto;color: black" v-html="item.content" @click="changeCommenter(item.responderId,index,0,item.positionId)"></a></p>
                                </div>
                            </row>
                            <row>
                                <br>
                                <br>
                                <br>
                                <row>
                                    <div v-if="userId === 'admin1'" style="float: right">
                                        <a @click="deleteComment(item.positionId,deleteLayer)">删除</a>
                                    </div>
                                    <div v-if="userId === item.name && userId!== 'admin1'" style="float: right">
                                        <a @click="deleteComment(item.positionId,deleteLayer)">删除</a>
                                    </div>
                                </row>
                                <row>
                                    <div style="float: right;">
                                        <span class="time" style="font-size: 10px;margin-right: 20px;">{{item.time}}</span>
                                        <span style="font-size: 10px;" class="follow_clickcolor" @click="changeReply(index)">
                                            <a v-if="item.reply.length > 0 && isReply ">回复</a>
                                            <a v-else="item.reply.length = 0 || isReply">回复</a>
                                            <a style="color: blue">{{"("}}{{b[index]}}{{")"}}</a>
                                        </span>
                                        <!--changeCommenter(reply.responder,index)-->
                                    </div>
                                </row>
                            </row>
                            <row>
                                <transition name="fade">
                                    <card style="width: 500px;margin-left: 100px;background-color: #EEEDED" v-show="item.reply.length > 0 && !a[index]">
                                        <div class="comment-list reply" style="padding-left: 10px" v-for="(reply,replyIndex) in item.reply">
                                            <div class="comment" user="self">
                                                <div class="comment-right" style="border-bottom:1px dotted #A4A4A4;">
                                                    <div class="comment-text" v-if="reply.reviewers !== null">
                                                        <row>
                                                            <a class="user" @click="changeCommenter(reply.responderId,index,0,reply.positionId)">{{reply.responder}}</a>
                                                            <span style="color: #333333">回复</span>
                                                            <a class="user" @click="changeCommenter(reply.reviewerId,index,0,reply.positionId)">{{reply.reviewers}}</a>：
                                                            <!--<span class="user">{{reply.responder}}<span style="color: #333333">回复</span>{{reply.reviewers}}:</span>-->
                                                            <span style="color: black" v-html="reply.content"></span>
                                                        </row>
                                                        <row>
                                                            <div v-if="userId === 'admin1'" style="float: right;font-size: 5px">
                                                                <a @click="deleteComment(reply.positionId,deleteSingle)">删除</a>
                                                            </div>
                                                        </row>
                                                        <row>
                                                            <p style="float: right;font-size: 5px">{{reply.time}}{{" "}}
                                                                <a v-if="reply.responder === userId " @click="deleteComment(reply.positionId)">撤销</a>
                                                            </p>
                                                        </row>
                                                    </div>
                                                    <div class="comment-text" v-else>
                                                        <row>
                                                            <a class="user">{{reply.responder}}</a>：
                                                            <span style="color: black" v-html="reply.content"></span>
                                                        </row>
                                                        <row>
                                                            <div v-if="userId === 'admin1'" style="float: right">
                                                                <a @click="deleteComment(reply.positionId,deleteSingle)">删除</a>
                                                            </div>
                                                        </row>
                                                        <row>
                                                            <p style="float: right;font-size: 5px">{{reply.time}}{{" "}}
                                                                <a v-if="reply.responder === userId " @click="deleteComment(reply.positionId,deleteSingle)">撤销</a>
                                                            </p>
                                                        </row>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </card>
                                </transition>
                            </row>
                            <row>
                                <a style="float: right" @click="changeCommenter(0,index,0,-index)">评论</a>
                            </row>

                        </div>
                    </Col>
                </row>
            </card>
        </div>

    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        props: ['comment'],
        data () {
            return {
                userId: '',
                isReply: false,
                a: [],
                b: [],
                deleteSingle: 0,
                deleteLayer: 1
            }
        },
        methods: {
            init() {
                // console.log("111111" +document.cookie);
                this.getCookie();
                for(var i = 0;i<this.comment.length;i++){
                    this.b[i] = this.comment[i].reply.length;
                }

            },

            getCookie:function () {
                if (document.cookie.length>0) {
                    var arr=document.cookie.split('; ');
                    for(var i=0; i<arr.length; i++) {
                        if(arr[i].indexOf("user")!== -1) {
                            // console.log(i);
                            this.userId = arr[i].substring(arr[i].indexOf("=")+1);
                            break;
                        }
                    }
                    // console.log(this.userId);
                }
            },
            canelComment: function() {
                this.$emit("canel");
                this.commentText = "";
            },
            changeCommenter: function(name,index,layer,positionId) {

                // if(this.userId !== name) {
                    if(name === 0){
                        name = "";
                        this.$emit("change",name,index,layer,positionId);
                    } else {
                        this.$emit("change",name,index,layer,positionId);
                    }
                // }

            },
            changeReply(i) {
                this.isReply = !this.isReply;
                this.a[i] = !this.a[i];
            },
            deleteComment(index,deleteType) {
                this.$emit("deleteCom",index,deleteType);
            },
            remark(index) {

            }
        },
        mounted() {
            this.init();
        },
        beforeCreate() {
            this.$nextTick(function () {
                for(var i = 0;i<this.comment.length;i++){
                    this.a[i] = false;
                    this.b[i] = this.comment[i].reply.length
                }
            });
        },
        created() {
            // for(var i = 0;i<this.comment.length;i++) {
            // }
        },

        watch: {
            comment: {
                handler(val) {
                    for(var i = 0;i<this.comment.length;i++){
                        this.b[i] = this.comment[i].reply.length
                    }
                    // console.log("content内容")
                },
                deep: true
            },
        }
    }
</script>