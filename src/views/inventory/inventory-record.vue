<style lang="less">
    @import '../../styles/common.less';
    @import './component/table.less';
</style>

<template>
<!--     <div>
        <Row class="margin-top-10">
            <Col span="20">
                <Card>
                    <p slot="title">
                        <Icon type="android-remove"></Icon>
                        可编辑单元行
                    </p>
                    <div class="edittable-table-height-con">
                        <can-edit-table refs="table2" v-model="editInlineData" :columns-list="editInlineColumns"></can-edit-table>
                    </div>
                </Card>
            </Col>
        </Row>
    </div> -->
        <Row class="margin-top-10">
            <Col span="20">
                <Card>
                    <p slot="title">
                        <Icon type="android-remove"></Icon>
                        库存记录 
                    </p>
                    <div style="margin-bottom: 10px;"> 库存记录总数: <span style="color:orange;">{{total}}</span> </div>
            <div class="list edit-h">
                <div class="edittable-table-height-con">
                    <can-edit-table refs="table2" v-model="editInlineData" :columns-list="editInlineColumns"></can-edit-table>

                <v-pagination :total="total" :current-page='currentPage' @pagechange="pagechange"></v-pagination>
                </div>
            </div>
            </Card>
        </Col>
    </Row>
</template>
    

<script>
import canEditTable from './component/canEditTable.vue';
import tableData from './component/table_data.js';
import axios from 'axios';
import pagination from './component/pagination'
export default {
    name: 'editable-table',
    components: {
        canEditTable,
        'v-pagination': pagination,
    },
    data () {
        return {
            tableData: [],
            editInlineColumns: [],
            editInlineData: [],
            total: 5,     // 记录总条数
            display: 5,   // 每页显示条数
            currentPage: 0,   // 当前的页数
            items : [],
            pagegroup: 12
        };
    },
    methods: {
        getTotal() {
            axios.get(`/api/inventory-record/totalNum`).then((res) => {
                //res 为成功回调的响应
                console.log("res:"+res)
                this.total = res.data.data;
                console.log("total-all:" + this.total)       

            });   
        },
        initData () {
            //请求方法，根据实际情况使用
            this.getTotal() 

            //this.tableData = tableData.table1Data;
            this.editInlineColumns = tableData.editInlineColumns;
        },
        getData (currentPage,display) {
            console.log("getData")

            this.getTotal()
            //请求方法，根据实际情况使用
            axios.get(`/api/inventory-record/page/${currentPage}/${display}`).then((res) => {
                //res 为成功回调的响应
                this.editInlineColumns = tableData.editInlineColumns;

                this.editInlineData = res.data.data;
                //this.total = res.data.data.length
                console.log(this.editInlineData)        

            });    

            //this.tableData = tableData.table1Data;
            //this.editInlineColumns = tableData.editInlineColumns;
            //this.editInlineData = tableData.editInlineData;
        },
        //获取数据
        getList () {
            //模拟
            // let url = `/api/list/?display=${this.display}&currentPage=${this.currentPage}`
            // this.$http.get(url)
            // .then(({body}) => {

            //     //子组件监听到count变化会自动更新DOM
            //     this.count = body.count
            //     this.items = body.list
            // })
            //请求方法，根据实际情况使用
            //${this.currentPage}/${this.display}
            axios.get('/api/inventory-record/page/1/6').then((res) => {
                //res 为成功回调的响应
                //this.editInlineData = res.data.data;
                this.items = res.data.data
                console.log(res)    
            });


        },

        //从page组件传递过来的当前page
        pagechange (page) {
            this.currentPage = page
            this.getData(this.currentPage,this.display)
            console.log("page:" + page)
            console.log("display:" + this.display)

        }
    },
    mounted() {
        //请求第一页数据
        //this.initData();
        //this.getList()
        this.getData(this.currentPage,this.display);
    }, 
    created () {
        //this.getData();
        //this.initData();
    }
};
</script>
