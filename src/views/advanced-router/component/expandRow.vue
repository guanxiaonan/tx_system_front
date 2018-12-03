<style>
    .search-order-form{
        height: 7px;
    }
</style>

<template>
    <div class="search-order-form">
        <Steps :current="currentStep" :status="status">
            <Step v-for="item in stepList1" :title="item.title" :content="item.describe" :key="item.title"></Step>
        </Steps>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        },
        data () {
            return {
                searchConName3:'',
                stepList1: [],
                currentStep: 2,
                status: 'wait'
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

    };
</script>