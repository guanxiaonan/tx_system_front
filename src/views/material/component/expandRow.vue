<style lang="less">
    .advanced-router{height:42px;}
</style>

<template>
    <div>
        <h3>{{"备注："}}{{row.handleRemark}}</h3>
    </div>
</template>
<script>

    export default {
        props: {
            row: Object
        },
        data() {
            return {

            }
        },
        methods: {
            init () {
            },
        },
        mounted() {
            this.init()
        }

    }
</script>