import Vue from 'vue';
import iView from 'iview';
import Vuex from 'vuex'
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import VRouter from 'vue-router'
import  VueQuillEditor from 'vue-quill-editor'
import {DatePicker} from 'element-ui'
import echarts from 'echarts'



// import VueI18n from 'vue-i18n'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import util from '@/libs/util';
Vue.component(DatePicker.name, DatePicker);
Vue.use(iView);
Vue.use(Vuex);
Vue.use(VRouter);
Vue.use(VueQuillEditor);
Vue.prototype.$echarts = echarts;

// const i18n = new VueI18n({
//     locale: 'en', // set locale
//     messages: 'translations' // set locale messages
// });



// const store = new Vuex.Store({
//     state: {
//         count: 0,
//         color: ['#325B69', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769']
//     }
// });

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: '',
        // eventHub: new Vue(),
        // charts: []
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        //util.checkUpdate(this);
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
