<template>
    <div>
        <p>{{"投诉内容："}}{{this.row.comDescribe}}</p>
    </div>
</template>

<script>
    export default {
        name: "expandHandle",
        props: {
            row: Object
        }
    }
</script>

<style scoped>

</style>