<style lang="less">
    .advanced-router{height:42px;}
</style>

<template>
    <div>
        <Row class="advanced-router">
            <Col span="6">
                <span class="expand-key">经销商：</span>
                <span class="expand-value">{{row.dealer}}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">经销商联系方式：</span>
                <span class="expand-value">{{ row.phone }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">保修期截至：</span>
                <span class="expand-value">{{ row.date | formatDate}}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    import {formatDate} from '../../common/formatDate.js';
    export default {
        data(){
            return{
                data11:[]
            }
        },
        getData () {
            //请求方法，根据实际情况使用
            axios.get(`/api/material/pot_product`)
                .then((res) => {
                    this.data11=res.data.data;
                    console.log("NIHAO");
                });
        },
                filters: {
                    formatDate(time) {
                    var date = new Date(time);
                    return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
            }
        },
        props: {
            row: Object
        }
    }
</script>