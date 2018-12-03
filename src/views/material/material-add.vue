<style>
    .search-order {
        text-align: center;
        height: 150px;
    }
    .search-order-form {
        text-align: center;
        height: 270px;
    }

</style>




<template>
    <div>
        <Row>
            <Card >
                <p slot="title">
                    <Icon type="compose"></Icon>
                    进度查询
                </p>
                 <p >
                <Icon type="mouse"></Icon>
                点击查询进行查找
                </p>
                <div style="margin-top: 70px"></div>
                <div class="search-order" >
                    <Input v-model="searchConName3" placeholder="请输入订单号······" style="width: 200px;height:50px" />
                    <div style="margin-top: 0px"></div>
                    <span @click="handleSearch3" style="margin: 0 10px;"><Button type="primary" icon="search">查询</Button></span>
                </div>
                <div> <Row class="margin-top-20"></Row></div>
                <div class="search-order-form">
                    <Steps :current="currentStep" :status="status">
                        <Step v-for="item in stepList1" :title="item.title" :content="item.describe" :key="item.title"></Step>
                    </Steps>
                </div>
            </Card>
        </Row>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        name: 'material-add',
        data () {
            return {
                searchConName3:'',
                stepList1: [],
                currentStep: 2,
                status: 'wait'
            }
        },
        methods: {
            handleSearch3 () {

            }
        },
        mounted () {
            // this.init();
            this.stepList1 = [
                {
                    title: '提交申请',
                    describe: '客户在平台填写并提交报修申请表'
                },
                {
                    title: '受理',
                    describe: '工作人员处理申请表并指派人员处理'
                },
                {
                    title: '开始维修',
                    describe: '技师维修'
                },
                {
                    title: '维修完成',
                    describe: '检查产品'
                },
                {
                    title: '派件',
                    describe: ''
                }
            ];
        },
    }
</script>