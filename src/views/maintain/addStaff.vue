<style scoped>
    .foot {
        width: 500px;
        height: 30px;
        margin-top: -10px;
        text-align: center;
    }
</style>


<template>
    <div>
        <row>
            <card style="width: 100%;height: 580px;">
                <p slot="title"><Icon type="compose"></Icon>添加员工</p>
                <Form :model="formItem" :rules="stepRules" :label-width="80" style="width:100%;dispaly:block;">
                    <row>
                        <Col span="4">
                            <FormItem  label="姓名：" style="width: 200px" prop="staffName">
                                <Input v-model="formItem.staffName" type="text" font-size="10px"/>
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem  label="电话：" style="width: 200px">
                                <Input v-model="formItem.staffPhone" type="text" font-size="10px"/>
                            </FormItem>
                        </Col>
                    </row>
                    <row>
                        <Col span="5">
                            <FormItem label="性别：" >
                                <!--<label for="5">男/label>-->
                                <tag><input type="radio" v-model="formItem.staffSex" value="男">男</tag>
                                <!--<label for="6">女</label>-->
                                <tag><input type="radio" v-model="formItem.staffSex" value="女">女</tag>
                            </FormItem>
                        </Col>

                    </row>
                    <row>
                        <Col span="4">
                            <FormItem label="所属部门：" style="width: 200px" >
                                <Input v-model="formItem.staffDept" type="text" font-size="10px"/>
                            </FormItem>
                        </Col>
                        <Col span="7">
                            <FormItem label="员工编号：" style="width: 200px" prop="staffId" required>
                                <Input v-model="formItem.staffId" type="text" font-size="10px"/>
                            </FormItem>
                        </Col>

                    </row>
                    <!--<FormItem label="家乡：">-->
                        <!--<al-cascader v-model="sendAddressArray" level="3" style="width: 420px"/>-->
                    <!--</FormItem>-->
                    <FormItem label="工作内容：" style="width: 500px">
                        <Input v-model="formItem.staffJob" type="text" font-size="10px"/>
                    </FormItem>
                    <Form-item label="入职日期">
                        <Row>
                            <Col span="11">
                                <FormItem prop="date">
                                    <Date-picker type="date" placeholder="选择日期" v-model="formItem.staffDate" format="yyyy-mm-dd"></Date-picker>
                                </FormItem>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                        </Row>
                    </Form-item>
                    <FormItem label="备注" style="width: 500px">
                        <Input v-model="formItem.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem>
                        <Button style="float: left" @click="handleSubmit" type="primary">提交</Button>
                    </FormItem>
                </Form>
            </card>
            <div class="foot">
                <p>Copyright © 2018 中国·天喜控股</p>
            </div>
        </row>

    </div>
</template>

<script>
    import Vue from 'vue';
    import alCascader from '../my-components/area-linkage/components/al-cascader.vue';
    import iviewArea from 'iview-area';
    import axios from 'axios';

    const valide = (rule, value, callback) => {
        if (value ===null || value.length === 0) {
            callback(new Error('此项必填'));
        } else {
            callback();
        }
    };

    Vue.use(iviewArea);
    export default {
        name: "addStaff",
        components: {
            alCascader,
        },
        data() {
            return {
                formItem: {
                    staffId: '',
                    staffName: '',
                    staffSex: '',
                    staffPhone: '',
                    staffJob: '',
                    staffDept: '',
                    staffDate: '',
                    remarks: ''
                },
                stepRules: {
                    staffName: [
                        { required: true, message: '此项必填', trigger: 'blur' },
                        // {validator: valide, trigger: 'blur'}
                    ],
                    staffId: [
                        { required: true, message: '此项必填', trigger: 'blur' },
                        // {validator: valide, trigger: 'blur'}
                    ]
                },
                sendAddressArray: [],
            }
        },
        methods: {
            handleSubmit() {
                axios.post(`/api/material/staff_add`,this.formItem).then((res) => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped>

</style>