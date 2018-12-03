<style lang="less">
    .advanced-router{height:auto}
</style>
<style scoped>
    .btn1 {
        position: absolute;
        bottom: 2px;
        right: 30px;
        width:50px;
        height:32px;
        color:#666;
    }
</style>
<template>
    <div>
        <Row class="advanced-router">
            <Col span="3">
                <h3>正在处理：</h3>
            </Col>
            <Col span="21">
                <ul>
                    <li type="disc" v-for="item in repairRecord">
                        <span>{{item.id}}</span>
                        <span style="padding-left: 100px">{{item.describe}}</span>
                        <a style="float: right">{{item.date}}</a>
                        <!--<a>{{row.staffName}}</a>-->
                    </li>
                </ul>
            </Col>

            <!--<button class="btn1" type="submit">保存</button>-->
        </Row>
        <!--<row>-->
            <!--<div style="border-top:1px dotted #A4A4A4;padding-top: 10px">-->
                <!--<Col span="3">-->
                    <!--<h3>新增派工信息:</h3>-->
                <!--</Col>-->
                <!--<Col span="21">-->
                    <!--<textarea class="textArea"-->
                              <!--style="border-radius: 8px;width: 300px;margin-top: 5px;padding-top: 10px;padding-left: 20px"-->
                              <!--placeholder="请输入............">-->
                    <!--</textarea>-->
                    <!--<button class="btn1" type="primary" style="float: right;" @click="getData">保存</button>-->
                <!--</Col>-->
            <!--</div>-->

        <!--</row>-->
    </div>
</template>
<script>
    import axios from 'axios'
    import {formatDate} from "../../common/formatDate";

    export default {
        name: 'expandRow',
        props: {
            row: Object
        },
        data() {
            return {
                repairRecord: [],
                repairRecord1: [],
            }
        },
        methods: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
            },
            getData() {
                axios.get(`api/material/repair_handle_staff/${this.row.staffId}`).then((res) => {
                    var j =0;
                    for(var i=0; i<res.data.data.length; i++) {
                        if(res.data.data[i].stateId === 2) {
                            res.data.data[i].date = this.formatDate(res.data.data[i].date);
                            this.repairRecord1[j] = res.data.data[i];
                            j ++
                        }
                    }
                    this.repairRecord = this.repairRecord1;
                    // console.log(this.repairRecord)
                })
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>