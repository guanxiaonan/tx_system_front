<template>
    <div>
        <input  type="file" ref="upload" accept=".xls,.xlsx" class="outputlist_upload">
        <button class="btn1" @click="tableSubmit">上传</button>
        <!--<Table :columns="showTable" :data="outputTable"></Table>-->
        <can-edit-table refs="table2" v-model="outputTable" :columns-list="showTable"></can-edit-table>
    </div>
</template>

<script>
    import XLSX from 'xlsx'
    import axios from 'axios'
    import canEditTable from '../tables/components/canEditTable.vue';
    export default {
        name: "addDealer",
        components: {
            canEditTable
        },
        data () {
            return {
                justfyDay1: [31,60,91,121,152,182,213,244,274,305,335,366],
                justfyDay2: [31,59,90,120,151,181,212,243,273,304,334,365],
                relYear: '',
                outputDay: '',
                outputMonth: '',
                errorWarn: [],
                errorWarn1: [],
                // testColumnsList: [
                //     'name',
                //     'phone',
                //     'address',
                //     'sex',
                //     'department',
                //     'data'
                // ],
                showTable: [
                    {
                        title: '序号',
                        width: '80px',
                        align: 'center',
                        type: 'index'
                    },
                    {
                        title: '名称',
                        align: 'center',
                        key: 'vendName'
                    },
                    {
                        title: '联系方式',
                        align: 'center',
                        key: 'vendPhone'
                    },
                    {
                        title: '邮箱',
                        align: 'center',
                        key: 'vendEmail'
                    },
                    {
                        title: '邮编',
                        align: 'center',
                        key: 'vendCode'
                    },
                    {
                        title: '经销地区',
                        align: 'center',
                        key: 'vendArea'
                    },
                    {
                        title: '地址',
                        align: 'center',
                        key: 'vendAddress'
                    },
                ],
                outputTable: []
            }
        },
        methods: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
            },
            readExcel(e) {//表格导入
                var that = this;
                const files = e.target.files;
                // console.log(files);
                if(files.length<=0){//如果没有文件名
                    return false;
                }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
                    this.$Message.error('上传格式不正确，请上传xls或者xlsx格式');
                    return false;
                }

                const fileReader = new FileReader();
                fileReader.onload = (ev) => {
                    try {
                        const data = ev.target.result;
                        const workbook = XLSX.read(data, {
                            type: 'binary'
                        });
                        const wsname = workbook.SheetNames[0];//取第一张表
                        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容
                        this.outputTable = ws;
                        this.checkColumns();
                        if(this.errorWarn.length > 0) {
                            alert("excel表格中"+ "“" + this.errorWarn + "”"  + "列名错误" + "，" + "请分别修改为" + this.errorWarn1);
                            this.$router.go(0)
                        }
                    } catch (e) {
                        return false;
                    }
                };
                fileReader.readAsBinaryString(files[0]);
            },
            tableSubmit() {
                axios.post(`api/material/vendors_group_add`,this.outputTable).then((res) => {
                    console.log(res);
                    alert("上传成功");
                    this.outputTable = []
                })
            },
            checkColumns() {
                var j = 0;
                var k = ["vendName","vendPhone","vendEmail","vendCode","vendArea","vendAddress"];
                var k1 = ["名称","联系方式","邮箱","邮编","经销地区","地址"];
                var i0 = 0;
                for(var i in this.outputTable[0]) {
                    if(k.indexOf(i)<0) {
                        this.errorWarn[j] = k1[i0];
                        this.errorWarn1[j] = k[i0];
                        j ++
                    }
                    i0 ++;
                }
            }
        },
        mounted() {
            this.$refs.upload.addEventListener('change', e => {//绑定监听表格导入事件
                this.readExcel(e);
            })
        },
        // watch: {
        // },
        created () {

        }
    }
</script>


<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>



