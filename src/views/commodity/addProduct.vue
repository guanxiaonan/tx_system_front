<template>
    <div>
        <Card style="height: 580px">
            <p slot="title">
                <Icon type="compose"></Icon>
                添加物料
            </p>
            <Form :model="formItem" :label-width="80" style="width:50%;dispaly:block;">
                <FormItem label="商品名称">
                    <Input v-model="formItem.name" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="分类">
                    <Select v-model="formItem.type">
                        <Option v-for="item in typeNameList" v-bind:value="item.id" :key="index">
                            {{ item.typeName }}
                        </Option>
                    </Select>

                </FormItem>
                <FormItem label="编码">
                    <Input v-model="formItem.code" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="条形码">
                    <Input v-model="formItem.barCode" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="formItem.detail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="submitForm($event)">Submit</Button>
                    <Button type="ghost" style="margin-left: 8px">Cancel</Button>
                </FormItem>
            </Form>
        </Card>
        <div class="foot">
            <p>Copyright © 2018 中国·天喜控股</p>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        name: "addProduct",
        data () {
            return {
                formItem: {
                    name: '',
                    type: '',
                    code: '',
                    barCode: '',
                    detail: ''
                },
                typeNameList:[]
            }
        },
        methods: {
            init () {
                //请求方法，根据实际情况使用
                // axios.get('/api/material/type').then((res) => {
                //     //console.log(res)
                //     if (res.data.code === 4004) {
                //         this.$router.push({
                //             name: 'login'
                //         });
                //     } else {
                //         //res 为成功回调的响应
                //         this.typeNameList = res.data.data;
                //     }
                //
                // });
            },
            submitForm: function($event) {

                console.log("123456");
                console.log(this.formItem);
                axios.post('/api/material', this.formItem,{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((response) => {
                        console.log(response)
                        if (response.data.code === 4004) {
                            this.$router.push({
                                name: 'login'
                            });
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted () {
            this.init();
        }
    }
</script>