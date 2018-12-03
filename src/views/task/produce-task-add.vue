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
.sales-board-line {
    width: 20%;
    float: left;
}
.plus-btn{
    margin-top: 27px;
    margin-left: 4.2em;
}
button.ivu-btn.ivu-btn-info {
    width: 100px;
    height: 32px;
}
i.ivu-icon.ivu-icon-plus {
    font-size: 1.8em;
    width: 50px;
}
.material {
    margin: 12px auto 12px 0px;
    border: 1px solid;
}
</style>

<template>
    <div>
        <Row>
            <Card>
                <p slot="title">
                    <Icon type="compose"></Icon>
                    添加生产任务
                </p>
                <Form :model="formItem" :label-width="80" style="width:50%;dispaly:block;">
                                      
                    <FormItem label="输入物料" class="material">
                      <div class="sales-board-line">
                          <div class="">
                              物料名称：
                          </div>
                          <div class="select-input">
                              <v-selection :selections="typeNameList" @on-change="onParamChange('item', $event)"></v-selection>
                          </div>
                      </div>
                      <div class="sales-board-line">
                          <div class="">
                              所需数量：
                          </div>
                          <div class="">
                            <v-counter @on-change="onParamChange('num', $event)"></v-counter>
                          </div>
                      </div>
                      <div class="sales-board-line plus-btn">
                            <Button type="info" @click="addItem($event)"><Icon type="plus"></Icon></Button>
                      </div>
                    </FormItem>
                    <FormItem label="">
                        <Input v-model="formItem.input" placeholder="Enter Input"></Input>
                    </FormItem>
                    <FormItem label="输出物料" style="width:30%;dispaly:block;">
                        <Select v-model="formItem.outputMaterial">
                            <Option v-for="item in typeNameList" v-bind:value="item.name">
                                {{ item.name }}
                            </Option>
                        </Select>
                        <Input v-model="formItem.outputNum" placeholder="Enter number"></Input>
                    </FormItem>
                    <FormItem label="定时规则">
                        <Select v-model="cronDemo" @on-change="onCronChange('cronDemo', $event)">
                            <Option v-for="item in cronDemoList" v-bind:value="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                        <Input v-model="formItem.cron" placeholder="Enter Input"></Input>
                    </FormItem> 
                    <FormItem label="报警邮箱">
                        <Input v-model="formItem.email" placeholder="Enter email"></Input>
                    </FormItem> 
                    <FormItem label="备注">
                        <Input v-model="formItem.createDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter desc..."></Input>
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
    import VSelection from './component/selection'
    import VCounter from './component/counter'
    export default {
        name: 'inventory-in',
        components: {
            VSelection,
            VCounter
          },
        data () {
            return {
                // msg: false,
                value: '',
                item: '',
                num: 0,
                cronDemo: '',
                formItem: {
                    outputMaterial: '',
                    outputNum: '',
                    cron: '',
                    input: '',
                    email: '',
                    createDesc: ''
                },
                typeNameList:[],
                cronDemoList:[
                    {
                      label: '每20s触发一次',
                      value: '0/20 * * * * ?'
                    },
                    {
                      label: '每天10点触发一次',
                      value: '0 0 10 * * ?'
                    },
                    {
                      label: '周一至周五的上午10:00触发',
                      value: '0 0 10 ? * MON-FRI'
                    },           
                    {
                      label: '周六至周日上午10:00触发',
                      value: '0 0 10 ? * SAT,SUN'
                    },
                    {
                      label: '每月1号上午9点半',
                      value: '0 30 9 1 * ?'
                    }
                ]
            }
        },
        methods: {
            init () {
                //请求方法，根据实际情况使用
                axios.get('/api/material/nameList').then((res) => {
                    //res 为成功回调的响应
                    this.typeNameList = res.data.data;
                    console.log("init..")
                });
            },
            flush () {
                this.formItem = {}
                this.num = 0
                this.item = ''
                this.cronDemo = ''
                console.log('flush finish')
            },
            onParamChange (attr, val) {
              this[attr] = val
              console.log("attr:"+attr)
              console.log('val:')
              console.log(val)
              if (val.name) {
                this.item = val.name
              } else {
                this.num = val
              }
              
            },
            onCronChange (attr, val) {
              this[attr] = val
              console.log("attr:"+attr)
              console.log(val)
              this.formItem.cron = val
            },
            addItem: function($event) {  
                console.log("123456");  
                console.log(this.formItem); 
                console.log(this.item); 
                console.log(this.num); 
                if (!this.item) {
                    return
                }

                let item = this.item + 'x' + this.num
                if (!this.formItem.input) {
                    this.formItem.input = item
                } else {
                    this.formItem.input = this.formItem.input + '+' + item
                }
                console.log("this.formItem.input:"+this.formItem.input)

            },
            submitForm: function($event) {  
                console.log("123456");  
                console.log(this.formItem);  
                axios.post('/api/produce-task', this.formItem,{
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
                  this.flush()
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