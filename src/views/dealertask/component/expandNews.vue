
<style scoped>

</style>
<template>
    <div>
        <Row>
            <Col span="12">
                <h2>地址：</h2>
                <p>{{row.address}}</p>
            </Col>
            <Col span="12">
                <h2>问题描述：</h2>
                <p>{{row.describe}}</p>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object,
        }
    }
</script>