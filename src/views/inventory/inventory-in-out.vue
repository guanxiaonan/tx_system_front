<style>
.successMsg {
    margin-left: 100px;
    display: inline-block;
    color: green;
    font-size: 1.5em;
    display:none;
}
.errorMsg {
    margin-left: 100px;
    display: inline-block;
    color: red;
    font-size: 1.5em;
}
</style>

<template>
    <div>
        <Row>
            <Card>
                <p slot="title">
                    <Icon type="compose"></Icon>
                    入库/出库
                </p>
                <Form :model="formItem" :label-width="80" style="width:50%;dispaly:block;">
                    
                    <FormItem label="物料名称">
                        <Select v-model="formItem.materialId">
                            <Option v-for="item in typeNameList" v-bind:value="item.id">
                                {{ item.name }}
                            </Option>
                        </Select>
                        
                    </FormItem>
                    <FormItem label="数量">
                        <Input v-model="formItem.number" placeholder="Enter number"></Input>
                    </FormItem>
                    <FormItem label="进/出货">
                        <Select v-model="formItem.type">
                            <Option v-bind:value="1">进货</Option>
                            <Option v-bind:value="2">出货</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注">
                        <Input v-model="formItem.createDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter desc..."></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="submitForm($event)">Submit</Button>
                        <Button type="ghost" style="margin-left: 8px">Cancel</Button>
          <!--               <Row id="tipMsg" class="errorMsg" v-if="msg">
                            <span v-if="ok">Yes</span>
                            <span v-else>No</span>
                        </Row> -->
                    </FormItem>
                </Form>
            </Card>
        </Row>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        name: 'inventory-in',
        data () {
            return {
                // msg: false,
                // ok: false,
                formItem: {
                    id: '',
                    materialId: '',
                    number: '',
                    type: '',
                    createDesc: ''
                },
                typeNameList:[]
            }
        },
        methods: {
            init () {
                //请求方法，根据实际情况使用
                axios.get('/api/material/nameList').then((res) => {
                    //res 为成功回调的响应
                    this.typeNameList = res.data.data;
                    this.formItem = {}
                    console.log("init..")
                });
            },
            submitForm: function($event) {  
                console.log("123456");  
                console.log(this.formItem);  
                axios.post('/api/inventory-record', this.formItem,{
                    headers: {
                            'Content-Type': 'application/json'
                      }
                  }).then(function (response) {

                    
                    let code = response.data.code
                    if (code == 2000) {
                        console.log("success")
                        alert("success")
                    } else {
                        console.log("error")
                        alert("error")
                    }

                    console.log(response);
                    console.log(response.data.code);
                  }).catch(function (error) {
                    console.log(error);
                  }); 
                  this.init()
            },
            result: function() {
                console.log("hello!")
            }
        },
        mounted () {
            this.init();
        }
    }
</script>