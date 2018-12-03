import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const registerRouter = {
    path: '/register',
    name: 'register',
    meta: {
        title: 'Register - 注册'
    },
    component: resolve => { require(['@/views/register.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: resolve => { require(['@/views/form/article-publish/preview.vue'], resolve); }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter =
    {
        path: '/',
        name: 'otherRouter',
        redirect: '/material',
        component: Main,
        children: [
            { path: 'home', title: 'home', name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
            { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } },
            { path: 'deal/:index', title: '处理方式', name: 'deal', component: resolve => { require(['@/views/material/component/deal.vue'], resolve);} },
            { path: 'listDisplay', title: '列表式', name: 'listDisplay', component: resolve => { require(['@/views/commodity/component/listDisplay.vue'], resolve); } },
            { path: 'iconDisplay', title: '列表式', name: 'iconDisplay', component: resolve => { require(['@/views/commodity/component/iconDisplay.vue'], resolve); } },
            { path: 'order/:order_id', title: '订单详情', name: 'order_info', component: resolve => { require(['@/views/advanced-router/component/order-info.vue'], resolve); } },  // 用于展示动态路由
            { path: 'shopping/:argu', title: '购物详情', name: 'shopping', component: resolve => { require(['@/views/advanced-router/component/shopping-info.vue'], resolve); } },  // 用于展示带参路由
            { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['@/views/message/message.vue'], resolve); } },
            { path: 'detailNews/:news', title: '详细信息', name: 'detailNews', component: resolve => { require(['@/views/distributor/component/detailNews.vue'], resolve);} },

        ]
    };

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/home',
        icon: 'android-home',
        name: 'home',
        title: '我的天喜',
        component: Main,
        children: [
            { path: 'home', title: '我的天喜', name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } }
        ]
    },

    // {
    //     path: '/access',
    //     icon: 'key',
    //     name: 'access',
    //     title: '权限管理',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限管理', name: 'access_index', component: resolve => { require(['@/views/access/access.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/access-test',
    //     icon: 'lock-combination',
    //     title: '权限测试页',
    //     name: 'accesstest',
    //     access: 0,
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: resolve => { require(['@/views/access/access-test.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/user',
    //     icon: 'social-buffer',
    //     name: 'user',
    //     title: '用户中心',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'user-list',
    //             icon: 'compose',
    //             name: 'user-list',
    //             title: '用户列表',
    //             component: resolve => { require(['@/views/user/user-list.vue'], resolve); }
    //         },
    //         {
    //             path: 'user-add',
    //             icon: 'pound',
    //             name: 'user-add',
    //             title: '添加用户',
    //             component: resolve => { require(['@/views/user/user-add.vue'], resolve); }
    //         },
    //         {
    //             path: 'user-edit',
    //             icon: 'crop',
    //             name: 'user-edit',
    //             title: '编辑用户',
    //             component: resolve => { require(['@/views/user/user-edit.vue'], resolve); }
    //         },
    //         {
    //             path: 'draggable-list',
    //             icon: 'arrow-move',
    //             name: 'draggable-list',
    //             title: '可拖拽列表',
    //             component: resolve => { require(['@/views/my-components/draggable-list/draggable-list.vue'], resolve); }
    //         },
    //         {
    //             path: 'area-linkage',
    //             icon: 'ios-more',
    //             name: 'area-linkage',
    //             title: '城市级联',
    //             component: resolve => { require(['@/views/my-components/area-linkage/area-linkage.vue'], resolve); }
    //         },
    //         {
    //             path: 'file-upload',
    //             icon: 'android-upload',
    //             name: 'file-upload',
    //             title: '文件上传',
    //             component: resolve => { require(['@/views/my-components/file-upload/file-upload.vue'], resolve); }
    //         },
    //         {
    //             path: 'count-to',
    //             icon: 'arrow-graph-up-right',
    //             name: 'count-to',
    //             title: '数字渐变',
    //             component: resolve => { require(['@/views/my-components/count-to/count-to.vue'], resolve); }
    //         },
    //         {
    //             path: 'clipboard-page',
    //             icon: 'clipboard',
    //             name: 'clipboard-page',
    //             title: '一键复制',
    //             component: resolve => { require(['@/views/my-components/clipboard/clipboard.vue'], resolve); }
    //         }
    //     ]
    // },
    {
        path: '/repairApply',
        icon: 'key',
        name: 'repairApply',
        title: '报修申请',
        access: 1,
        component: Main,
        children: [
            { path: 'index', title: '申请表', name: 'repairApply_index', component: resolve => { require(['@/views/applyrepair/repairApply.vue'], resolve); } },
            { path: 'argument-page', title: '报修查看', name: 'argument-page', icon: 'beaker', component: resolve => { require(['@/views/advanced-router/argument-page.vue'], resolve); } }
        ]
    },
    {
        path: '/material',
        icon: 'android-checkbox',
        name: 'material',
        title: '报修受理',
        access: 0,
        component: Main,
        children: [
            // { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: resolve => { require(['@/views/form/article-publish/article-publish.vue'], resolve); } },
            // { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: resolve => { require(['@/views/form/work-flow/work-flow.vue'], resolve); } },
            { path: 'material-list', title: '报修受理', name: 'material-list', icon: 'arrow-swap',access: 0, component: resolve => { require(['@/views/material/material-list.vue'], resolve); }},
            // { path: 'material-add', title: '报修进度查询', name: 'material-add', icon: 'arrow-swap', component: resolve => { require(['@/views/material/material-add.vue'], resolve); } },
            { path: 'mail', title: '寄件汇总', name: 'material-mail', icon: 'arrow-swap',access: 0, component: resolve => { require(['@/views/material/mail.vue'], resolve); } },
            // { path: 'material-edit', title: '编辑物料', name: 'material-edit', icon: 'arrow-swap', component: resolve => { require(['@/views/material/material-edit.vue'], resolve); } }
        ]
    },
    // {
    //     path: '/inventory',
    //     icon: 'android-checkbox',
    //     name: 'inventory',
    //     title: '库存中心',
    //     component: Main,
    //     children: [
    //         // { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: resolve => { require(['@/views/form/article-publish/article-publish.vue'], resolve); } },
    //         // { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: resolve => { require(['@/views/form/work-flow/work-flow.vue'], resolve); } }
    //         { path: 'inventory-in-out', title: '入库/出库', name: 'inventory-in-out', icon: 'compose', component: resolve => { require(['@/views/inventory/inventory-in-out.vue'], resolve); } },
    //         { path: 'inventory-record', title: '库存记录', name: 'inventory-record', icon: 'arrow-swap', component: resolve => { require(['@/views/inventory/inventory-record.vue'], resolve); } },
    //         { path: 'inventory-list', title: '库存列表', name: 'inventory-list', icon: 'arrow-swap', component: resolve => { require(['@/views/inventory/inventory-list.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/task',
    //     icon: 'android-checkbox',
    //     name: 'task',
    //     title: '生产任务中心',
    //     component: Main,
    //     children: [
    //         { path: 'produce-task-add', title: '添加生产任务', name: 'produce-task-add', icon: 'compose', component: resolve => { require(['@/views/task/produce-task-add.vue'], resolve); } },
    //         { path: 'inventory-record', title: '库存记录', name: 'inventory-record', icon: 'arrow-swap', component: resolve => { require(['@/views/inventory/inventory-record.vue'], resolve); } },
    //         { path: 'inventory-list', title: '库存列表', name: 'inventory-list', icon: 'arrow-swap', component: resolve => { require(['@/views/inventory/inventory-list.vue'], resolve); } },
    //         { path: 'produce-task-list', title: '生产任务列表', name: 'produce-task-list', icon: 'arrow-swap', component: resolve => { require(['@/views/task/produce-task-list.vue'], resolve); } }        ]
    // },
    // {
    //     path: '/log',
    //     icon: 'android-checkbox',
    //     name: 'log',
    //     title: '日志中心',
    //     component: Main,
    //     children: [
    //         { path: 'log-user', title: '用户日志', name: 'log-user', icon: 'compose', component: resolve => { require(['@/views/log/log-user.vue'], resolve); } },
    //         { path: 'log-material', title: '物料日志', name: 'log-material', icon: 'arrow-swap', component: resolve => { require(['@/views/log/log-material.vue'], resolve); } },
    //         { path: 'log-others', title: '其他日志', name: 'log-others', icon: 'arrow-swap', component: resolve => { require(['@/views/log/log-others.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/data',
    //     icon: 'android-checkbox',
    //     name: 'data',
    //     title: '数据分析',
    //     component: Main,
    //     children: [
    //         { path: 'user-analysis', title: '用户行为分析', name: 'user-analysis', icon: 'compose', component: resolve => { require(['@/views/data/user-analysis.vue'], resolve); } },
    //         { path: 'inventory-analysis', title: '库存分析', name: 'inventory-analysis', icon: 'compose', component: resolve => { require(['@/views/data/inventory-analysis.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') }},
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }}
    //
    //     ]
    // },
    // {
    //     path: '/tables',
    //     icon: 'ios-grid-view',
    //     name: 'tables',
    //     title: '表格',
    //     component: Main,
    //     children: [
    //         { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component: resolve => { require(['@/views/tables/dragable-table.vue'], resolve); } },
    //         { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: resolve => { require(['@/views/tables/editable-table.vue'], resolve); } },
    //         { path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search', component: resolve => { require(['@/views/tables/searchable-table.vue'], resolve); } },
    //         { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download', component: resolve => { require(['@/views/tables/exportable-table.vue'], resolve); } },
    //         { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: resolve => { require(['@/views/tables/table-to-image.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/advanced-router',
    //     icon: 'ios-infinite',
    //     name: 'advanced-router',
    //     title: '高级路由',
    //     component: Main,
    //     children: [
    //         { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: resolve => { require(['@/views/advanced-router/mutative-router.vue'], resolve); } },
    //         { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: resolve => { require(['@/views/advanced-router/argument-page.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '错误页面', name: 'errorpage_index', component: resolve => { require(['@/views/error-page/error-page.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '信息修改',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '修改', name: 'updata_index', component: resolve => { require(['@/views/inforupdata/inforupdata.vue.vue'], resolve); } }
    //     ]
    // },

    {
        path: '/commodity',
        icon: 'android-sad',
        title: '商品信息',
        name: 'commodity',
        component: Main,
        children: [
            {path: 'index',title: '商品',name: 'commodity_index',component: resolve => { require(['@/views/commodity/goods.vue'], resolve); } },
            {path: 'parts',title: '配件',name: 'commodity_parts',component: resolve => { require(['@/views/commodity/parts.vue'], resolve); } },
            {path: 'addProduct',title: '添加商品',name: 'commodity_addProduct',access: 0,component: resolve => { require(['@/views/commodity/addProduct.vue'], resolve); } },
            // {path: 'soldProduct',title: '售出商品登记',name: 'soldProduct',component: resolve => { require(['@/views/commodity/soldProduct.vue'], resolve); } },

        ]
    },
    {
        path: '/maintain',
        icon: 'ios-grid-view',
        title: '人员管理',
        name: 'maintain',
        access: 0,
        component: Main,
        children: [
            {path: 'staff',title: '人员管理',name: 'maintain-staff',access: 0,component: resolve => { require(['@/views/maintain/staff.vue'], resolve); } },
            {path: 'addStaff',title: '添加员工',name: 'maintain-addStaff',access: 0,component: resolve => { require(['@/views/maintain/addStaff.vue'], resolve); } },
            {path: 'addByExcel',title: '批量添加',name: 'addByExcel-staff',access: 0,component: resolve => { require(['@/views/maintain/addByExcel.vue'], resolve); } },
        ]
    },

    {
        path: '/distributor',
        icon: 'ios-grid-view',
        title: '经销商管理',
        name: 'distributor',
        access: 0,
        component: Main,
        children: [
            {path: 'dealer',title: '经销商管理',name: 'dealer',access: 0,component: resolve => { require(['@/views/distributor/dealer.vue'], resolve); } },
            {path: 'addDealer',title: '添加经销商',name: 'addDealer',access: 0,component: resolve => { require(['@/views/distributor/addDealer.vue'], resolve); } },
            {path: 'addBuyRecord',title: '添加购买记录',name: 'addBuyRecord',access: 0,component: resolve => { require(['@/views/distributor/addBuyRecord.vue'], resolve); } },
        ]
    },
    {
        path: '/historybuy',
        icon: 'ios-grid-view',
        title: '订购记录',
        name: 'historybuy',
        access: 2,
        component: Main,
        children: [
            {path: 'historyBuy',title: '客户报修',name: 'historyBuy',access: 2,component: resolve => { require(['@/views/historyBuy/historyBuy.vue'], resolve); } },
            // {path: 'addByExcel',title: '批量添加',name: 'addByExcel-staff',access: 0,component: resolve => { require(['@/views/maintain/addByExcel.vue'], resolve); } },
        ]
    },
    {
        path: '/dealertask',
        icon: 'ios-grid-view',
        title: '客户报修',
        name: 'dealertask',
        access: 2,
        component: Main,
        children: [
            {path: 'dealerTask',title: '客户报修',name: 'dealerTask',access: 2,component: resolve => { require(['@/views/dealertask/dealerTask.vue'], resolve); } },
            // {path: 'addByExcel',title: '批量添加',name: 'addByExcel-staff',access: 0,component: resolve => { require(['@/views/maintain/addByExcel.vue'], resolve); } },
        ]
    },

    // {
    //     path: '/advanced-router',
    //     icon: 'ios-cart',
    //     name: 'advanced-router',
    //     title: '订单中心',
    //     component: Main,
    //     children: [
    //         { path: 'mutative-router', title: '愿望单', name: 'mutative-router', icon: 'ios-paper',component: resolve => { require(['@/views/advanced-router/mutative-router.vue'], resolve); } },
    //     ]
    // },
    // {
    //     path: '/message',
    //     icon: 'ios-cloud-download',
    //     name: 'message',
    //     title: '商家推荐',
    //     component: Main,
    //     children: [
    //         { path: 'news1', title: '推荐页面1', name: 'news1', icon: 'beer',component: resolve => { require(['@/views/message/news1.vue'], resolve); } },
    //         { path: 'news2', title: '推荐页面2', name: 'news2', icon: 'android-send', component: resolve => { require(['@/views/message/news2.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '错误页面', name: 'errorpage_index', component: resolve => { require(['@/views/error-page/error-page.vue'], resolve); } }
    //     ]
    // },
    {
        path: '/comment',
        icon: 'android-chat',
        title: '用户交流中心',
        name: 'comment',
        component: Main,
        children: [
            { path: 'comment-share', title: '分享贴', name: 'comment-share', component: resolve => { require(['@/views/comment/comment-share.vue'], resolve); } }
        ]
    },
    // {
    //     path: '/common',
    //     icon: 'android-chat',
    //     title: '建议窗',
    //     name: 'suggestion',
    //     access: 1,
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '建议页面', name: 'suggestion_index',access: 1, component: resolve => { require(['@/views/common/suggestion.vue'], resolve); } }
    //     ]
    // },
    {
        path: '/error-page',
        icon: 'android-sad',
        title: '建议/投诉',
        name: 'errorpage',
        access: 1,
        component: Main,
        children: [
            { path: 'index', title: '投诉', name: 'complaint',access: 1, component: resolve => { require(['@/views/error-page/complaint.vue'], resolve); } }
        ]
    },
    {
        path: '/complaint-handle',
        icon: 'android-sad',
        title: '投诉处理',
        name: 'complaint-handle',
        access: 0,
        component: Main,
        children: [
            { path: 'complaint_handle', title: '投诉处理', name: 'complaint_handle',access: 0, component: resolve => { require(['@/views/complaint-handle/complaint_handle.vue'], resolve); } }
        ]
    },
    // {
    //     path: '/inforupdata',
    //     icon: 'android-sad',
    //     title:'信息修改',
    //     name: 'inforupdata',
    //     // access: 1,
    //     component: Main,
    //     children: [
    //         {path:'index',title: '修改',name: 'inforupdata_index',component:  resolve => { require(['@/views/inforupdata/reload.vue'], resolve); } }
    //     ]
    // },
    {
        path: '/analysis',
        icon: 'android-sad',
        title:'汇总分析',
        name: 'analysis',
        access: 0,
        component: Main,
        children: [
            {path:'repairAnalysis',title: '数据分析',name: 'repairAnalysis',access: 0,component:  resolve => { require(['@/views/analysis/repairAnalysis.vue'], resolve); } }
        ]
    },
    {
        path: '/check',
        icon: 'android-sad',
        title:'评论审核',
        name: 'check',
        access: 0,
        component: Main,
        children: [
            {path:'remarkCheck',title: '评论审核',name: 'remarkCheck',access: 0,component:  resolve => { require(['@/views/check/remarkCheck.vue'], resolve); } }
        ]
    },

];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    registerRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
