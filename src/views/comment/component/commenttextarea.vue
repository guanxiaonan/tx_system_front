<style scoped>
    .textArea{
        margin-left: 200px;
        width: 300px;
        height: 35px;
        border-radius: 7px;
        padding-top: 6px;
        margin-bottom: -12px
    }
</style>
<template>
    <div class="commentBox" v-if="inputSts">
        <card >
            <div class="comment_input" style="background-color: #E6E6E6">
                <div>
                    <row>
                        <Col span="16">
                        <quill-editor style="width: 300px;margin-left: 550px"
                                      v-model="commentText"
                                      ref="myQuillEditor"
                                      :options="editorOption"
                                      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                                      @change="onEditorChange($event)">
                        </quill-editor>
                        </Col>
                        <Col span="8">
                                <button class="btn1" style="margin-top: 15px" @click="addComment" @keyup.enter="addComment">发送</button>
                                <br>
                                <button class="btn1"  style="margin-top: 10px" @click="canelComment">取消</button>
                        </Col>
                    </row>

                    <!--<textarea class="textArea" type="text" v-model="commentText" placeholder="请输入你想说的话..."></textarea>-->


                </div>
                <div style="margin-top: 5px">
                    <b style="margin-left: 100px;" v-if="type">你回复&nbsp;{{name}}</b>
                    <span style="margin-left: 100px;color: #848484;font-size: 5px" v-else="type">Copyright © 2018 中国·天喜控股</span>
                </div>
                <!--<div style="padding-left: 200px">-->
                    <!--<p style="color: #848484;font-size: 5px">Copyright © 2018 中国·天喜控股</p>-->
                <!--</div>-->
            </div>
        </card>
    </div>
</template>
<script>
    import { quillEditor } from 'vue-quill-editor'
    import  Quill from 'quill'  //引入编辑器
    import { ImageDrop } from 'quill-image-drop-module';//quill图片可拖拽上传
    //    import ImageResize from 'quill-image-resize-module'//quill图片可改变大小
    //    Quill.register('modules/imageResize', ImageResize);
    Quill.register('modules/imageDrop', ImageDrop);
    export default {
        props: ['type','name','inputSts'],
        data () {
            return {
                commentText:"",
                content:null,
                editorOption:{
                    modules:{
                        toolbar:[
                            ['image'],
                        ],
                        imageDrop:true,
                    },
                    theme:'snow',
                }
            }
        },
        methods: {
            addComment: function() {
                if(this.commentText.length === 0){
                    alert("发送不能为空!");
                    this.$emit("canel");
                }else {
                    this.$emit("submit",this.commentText);
                    this.commentText = "";
                }
            },
            canelComment: function() {
                this.$emit("canel");
                this.commentText = "";
            },
            onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
            }
        },
        created:function(){
            // 主页添加键盘事件,注意,不能直接在焦点事件上添加回车
            var lett=this;
            document.onkeydown=function(e){
                var key=window.event.keyCode;
                if(key==13){
                    lett.addComment();
                }
            }
        },
    }
</script>