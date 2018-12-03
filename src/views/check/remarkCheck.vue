
<template>
    <div>
        <!--<h3>{{this.str}}</h3>-->
        <card style="width: auto;height: auto">
            <div slot="title" style="height: auto">
                <input  type="file" ref="upload" accept=".xls,.xlsx" class="outputlist_upload">
                <div style="float: right;margin-right: 10px">
                    <input v-model="addShieldData" style="border-radius: 2px">
                    <button class="btn1" style="width: 80px; margin-left: 15px;" @click="addShield">添加屏蔽词</button>
                </div>
            </div>

            <Row>
                <Col span="8">
                    <h3>屏蔽关键词总览：</h3>
                    <input  style="width: 100px; border-radius: 4px" v-model="input1" placeholder="快速查找">
                    <div v-if="this.shieldData.length === 0">暂无屏蔽词</div>
                    <div v-else style="width: 200px" >
                        <a v-for="(item,index) in shieldData" style="active: true" @click="editShield(index,item.id)" :class="{selected:index == tabIndex}">
                            <ul>
                                <li type="disc">
                                    <div class="item" v-if="getword(item.shield)">
                                        <p class="title" v-html="setColor(item.shield,input1)"></p>
                                    </div>
                                </li>
                            </ul>
                        </a>
                    </div>
                </Col>
                <Col span="8">
                    <h3>文件内容预览：</h3>
                    <div v-if="this.previewData.length === 0">未选择文件</div>
                    <div v-else style="width: 200px">
                        <a v-for="(item,index) in previewData" >
                            <ul>
                                <li type="disc">
                                    <!--<p class="title" v-html="setColor(item,input1)"></p>-->
                                    <p>{{item}}</p>
                                </li>
                            </ul>
                        </a>
                        <button class="btn1" @click="submitData">上传</button>
                    </div>
                </Col>
            </Row>
            <div class="modal-mask" v-show="show" transition="modal">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <input type="text" v-model="miniStore">
                        <button type="primary" style="margin-left: 5px" @click="saveShieldCell">保存</button>
                        <button type="primary" @click="deleteShieldCell">删除</button>
                        <button class="btn1" style="margin-top: 10px;float: right"
                                @click="show = false">
                            关闭
                        </button>
                    </div>
                </div>
            </div>
            <br>


        </card>

    </div>
</template>

<script>
    import axios from 'axios'
    import XLSX from 'xlsx'
    import canEditTable from '../tables/components/canEditTable.vue';
    export default {
        name: "remarkCheck",
        components: {
            canEditTable
        },
        data () {
            return {
                shortPosition: Number,
                input1: '',
                tabIndex: Number,
                index: '',
                dataMaterial: [],
                outputTable: [],
                previewData: [],
                previewData1: [],
                editStatus: [],
                miniStore: '',
                shieldData: [],
                adjustData: [],
                addShieldData: '',
                newShieldData: [],
                show: false,
                active: '',
                data: [1,2,3,4,5,6,7,8,9],
                jiHe: []
            }
        },
        methods: {
            init() {
            },
            getData() {
                axios.get(`api/material/shield_word`).then((res)=>{
                    // for(var i=0; i<res.data.data.length; i++) {
                    //     this.dataMaterial[i] = res.data.data[i].shield
                    // }
                    // this.shieldData = this.dataMaterial
                    this.shieldData = res.data.data;
                })
            },
            addShield() {
                var shieldSub = {shield: this.addShieldData};

                axios.post(`api/material/shield_add`,shieldSub).then((res) => {
                    console.log(res);
                    this.addShieldData = '';
                    this.getData();
                });
                // var oldShielData = this.shieldData;
                // this.shieldData.splice(oldShielData.length,0,this.addShieldData);
                this.addShieldData = ''
            },
            editShield(i,position) {
                this.shortPosition = position;
                this.show =true;
                this.index = i;
                this.miniStore = this.shieldData[i].shield

            },
            readExcel(e) {//表格导入
                var that = this;
                const files = e.target.files;
                if(files.length<=0){//如果没有文件名
                    return false;
                }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
                    this.$Message.error('上传格式不正确，请上传xls或者xlsx格式');
                    return false;
                }

                const fileReader = new FileReader();
                fileReader.onload = (ev) => {
                    try {
                        const data = ev.target.result;
                        const workbook = XLSX.read(data, {
                            type: 'binary'
                        });
                        const wsname = workbook.SheetNames[0];//取第一张表
                        // console.log(workbook);
                        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容
                        if(ws[0].keyWord === undefined) {
                            alert("excel表格中" + "列名错误" + "，" + "请修改为" + "keyWord");
                            this.$router.go(0)
                        }
                        var j = 0;
                        // var previewData1 = [];
                        for(var i=0; i<ws.length; i++) {
                            this.outputTable[i] = ws[i].keyWord;
                            this.editStatus[i] = false;
                            this.previewData1[j] = {
                                shield: ws[i].keyWord
                            };
                            j++
                        }
                        this.previewData = this.outputTable
                    } catch (e) {
                        return false;
                    }
                };
                fileReader.readAsBinaryString(files[0]);
            },
            saveShieldCell() {
                var shield = {
                    id: this.shortPosition,
                    shield: this.miniStore
                };
                axios.put(`api/material/update_shield`,shield).then((res) => {
                    alert("修改成功");
                    this.getData();
                    this.show = false
                });
            },
            deleteShieldCell() {
                if(confirm("确定删除吗？")) {
                    axios.delete(`api/material/delete_shield/${this.shortPosition}`).then((res) => {
                        this.getData();
                        alert("删除成功");
                        this.show = false
                    });
                }

                // this.shieldData.splice(this.index,1);

            },

            setColor:function(item, val){
                return item.replace(new RegExp(val,'ig') ,
                    "<span style='color:#f00'>"+val+"</span>");
            },
            getword:function(item){
                if(item.indexOf(this.input1)>=0){
                    return true;
                }
            },
            submitData() {
                axios.post(`api/material/shield_group_add`,this.previewData1).then((res) => {
                    console.log(res);
                    this.previewData = [];
                    this.previewData1 = [];
                    this.$router.go(0)
                });
                console.log(this.previewData1);

            }
        },
        created:function(){
            // 主页添加键盘事件,注意,不能直接在焦点事件上添加回车
            var lett=this;
            document.onkeydown=function(e){
                var key=window.event.keyCode;
                if(key==13){
                    lett.addShield();
                }
            }
        },
        mounted() {
            this.$refs.upload.addEventListener('change', e => {//绑定监听表格导入事件
                this.readExcel(e);
            });
            this.getData()
        },

    }
</script>


<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<style scoped>
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
        width: 300px;
        height: 100px;
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
</style>