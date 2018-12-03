<style lang="less">
    .advanced-router{height:42px;}
</style>

<template>
    <div>
        <Row class="advanced-router">
            <Col span="6">
                <span class="expand-key">手机号：</span>
                <span class="expand-value">{{ row.phone }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">出生时间：</span>
                <span class="expand-value">{{ row.birthday | formatDate }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">激活：</span>
                <span class="expand-value">{{ row.flag }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">创建时间：</span>
                <span class="expand-value">{{ row.createTime | formatDate }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                <span class="expand-key">更新时间：</span>
                <span class="expand-value">{{ row.updateTime | formatDate }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">最近一次登录时间：</span>
                <span class="expand-value">{{ row.lastLoginTime | formatDate }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">登录次数：</span>
                <span class="expand-value">{{ row.loginCount }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">其他：</span>
                <span class="expand-value">{{ row.detail }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    import {formatDate} from '../../common/formatDate.js';
    export default {
        filters: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
            }
        },
        props: {
            row: Object
        }
    };
</script>