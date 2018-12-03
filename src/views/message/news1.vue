<style lang="less">
    @import '../../styles/common.less';
</style>
<template>
    <card>
        <row>
    <div class="index-right">
    <slide-show :slides="slides" :inv="invTime"></slide-show>
    <div class="index-board-list">
        <div
                class="index-board-item"
                v-for="(item,index) in boardList"
                :class="[{'line-last' : index % 2 !== 0}, 'index-board-' + item.id]">
            <div class="index-board-item-inner" >
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>
                <div class="index-board-button">
                    <router-link class="button" :to="{path: 'detail/' + item.toKey}">立即购买</router-link>
                </div>
            </div>
        </div>
    </div>
    </div>
        </row>
    </card>
</template>
<script>
    import SlideShow from "./slideShow";
    export default {
        components: {SlideShow},
        data(){
            return {
                invTime: 2000,
                slides: [
                    {
                        src: require('./images/pic1.jpg'),
                        title: 'xxx1',
                        href: 'http://www.baidu.com'
                    },
                    {
                        src: require('./images/pic2.jpg'),
                        title: 'xxx2',
                        href: 'http://www.taobao.com'
                    },
                    {
                        src: require('./images/pic3.jpg'),
                        title: 'xxx3',
                        href: 'http://http://xxx.xxx.com'
                    },
                    {
                        src: require('./images/pic4.jpg'),
                        title: 'xxx4',
                        href: 'http://detail/forecast'
                    }
                ],
                boardList: [
                    {
                        title: '开放产品',
                        description: '开放产品是一款开放产品',
                        id: 'car',
                        toKey: 'analysis',
                        saleout: false
                    },
                    {
                        title: '品牌营销',
                        description: '品牌营销帮助你的产品更好地找到定位',
                        id: 'earth',
                        toKey: 'count',
                        saleout: false
                    },
                    {
                        title: '使命必达',
                        description: '使命必达快速迭代永远保持最前端的速度',
                        id: 'loud',
                        toKey: 'forecast',
                        saleout: true
                    },
                    {
                        title: '勇攀高峰',
                        description: '帮你勇闯高峰，到达事业的顶峰',
                        id: 'hill',
                        toKey: 'publish',
                        saleout: false
                    }
                ],
            }
        }
    }

</script>
<style>
    .index-board-item {
        float: left;
        width: 400px;
        background: #fff;
        box-shadow: 0 0 1px #ddd;
        padding: 20px;
        margin-right: 100px;
        margin-bottom: 50px;
    }
    .index-board-button {
        margin-top: 20px;
    }
    .button {
        background: #4fc08d;
        color: #fff;
        display: inline-block;
        padding: 10px 20px;
        cursor: pointer;
    }
    .index-board-list {
        overflow: hidden;
    }
    .index-board-item-inner {
        min-height: 125px;
        padding-left: 120px;
    }
    .index-board-car .index-board-item-inner{
        background: url(./images/1.png) no-repeat;
    }
    .index-board-loud .index-board-item-inner{
        background: url(./images/2.png) no-repeat;
    }
    .index-board-earth .index-board-item-inner{
        background: url(./images/3.png) no-repeat;
    }
    .index-board-hill .index-board-item-inner{
        background: url(./images/4.png) no-repeat;
    }
    .index-right {
        padding-left: 150px;
        float: left;
        width: 1300px;
    }
</style>