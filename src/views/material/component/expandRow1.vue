<style lang="less">
    .advanced-router{height:42px;}
</style>
<style scoped>
    .editTextarea {
        width: 400px;
        height: 50px;
        color: #000000;
        border: solid 1px #999;
        padding: 3px 0px 0px 5px;
        border-radius: 10px;
    }
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
            <textarea class="editTextarea" placeholder="请输入派工信息"></textarea>
            <button class="btn1" type="submit">保存</button>
            <h1>{{this.repairId}}</h1>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object,
            repairId: Number
        }
    }
</script>