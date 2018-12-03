<template>
    <div>
        <Row>
            <Card>
                <p slot="title">
                    <Icon type="compose"></Icon>
                    售出商品登记
                </p>
                <Form :model="formItem" :label-width="80" style="width:50%;dispaly:block;">
                    <FormItem label="订单号">
                    <Input v-model="formItem.id" placeholder="Enter something..."></Input>
                </FormItem>
                    <FormItem label="商品名称">
                        <Input v-model="formItem.potName" placeholder="Enter something..."></Input>
                    </FormItem>
                    <Form-item label="销售日期" prop="date">
                        <Date-picker type="date" placeholder="选择时间" v-model="formItem.date"></Date-picker>
                    </Form-item>
                    <FormItem label="编码">
                        <Input v-model="formItem.code" placeholder="Enter something..."></Input>
                    </FormItem>
                    <FormItem label="买家ID">
                        <Input v-model="formItem.userId" placeholder="Enter something..."></Input>
                    </FormItem>
                    <FormItem label="买家电话">
                        <Input v-model="formItem.barCode" placeholder="Enter something..."></Input>
                    </FormItem>
                    <FormItem label="交易数量">
                        <Input v-model="formItem.count" placeholder="Enter something..."></Input>
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
        </Row>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data () {
            return {
                formItem: {
                    id: '',
                    potName: '',
                    date: '',
                    code: '',
                    userId: '',
                    barCode: '',
                    detail: ''
                },
            }
        },
        methods: {
            // init () {
            //     //请求方法，根据实际情况使用
            //     axios.get('/api/material/type').then((res) => {
            //         //console.log(res)
            //         if (res.data.code === 4004) {
            //             this.$router.push({
            //                 name: 'login'
            //             });
            //         } else {
            //             //res 为成功回调的响应
            //             this.typeNameList = res.data.data;
            //         }
            //
            //     });
            // },
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
    }
</script>