<style lang="less">
    .advanced-router{height:42px;}
</style>

<template>
    <div>
        <Row class="advanced-router">
                <h3 class="expand-key">产品描述：</h3>
                <span class="expand-value">{{row.potDescrible}}</span>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    }
</script>