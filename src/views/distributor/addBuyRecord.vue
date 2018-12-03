<template>
    <div>
        <input  type="file" ref="upload" accept=".xls,.xlsx" class="outputlist_upload">
        <button class="btn1" @click="tableSubmit">保存</button>
        <can-edit-table refs="table2" v-model="outputTable" :columns-list="showTable"></can-edit-table>
    </div>
</template>

<script>
    import XLSX from 'xlsx'
    import axios from 'axios'
    import canEditTable from '../tables/components/canEditTable.vue';
    export default {
        name: "addBuyRecord",
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
                showTable: [
                    {
                        title: '序号',
                        width: '80px',
                        align: 'center',
                        type: 'index'
                    },
                    {
                        title: '客户名',
                        align: 'center',
                        key: 'vendName'
                    },
                    {
                        title: '日期',
                        align: 'center',
                        key: 'date'
                    },
                    {
                        title: '产品名',
                        align: 'center',
                        key: 'potName'
                    },
                    {
                        title: '数量',
                        align: 'center',
                        key: 'prodtypeNum'
                    },
                    {
                        title: '单价/元',
                        align: 'center',
                        key: 'priceSingle'
                    },
                    {
                        title: '成交额/万元',
                        align: 'center',
                        key: 'priceAll'

                    }
                ],
                outputTable: [],
                vendorNameList: [],
                vendorNameList1: [],
            }
        },
        methods: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
            },
            getVendorsName() {
                axios.get(`api/material/vendors`).then((res) =>{
                    // console.log(res.data.data);
                    for(var i=0; i<res.data.data.length; i++) {
                        this.vendorNameList.push({
                            vendId: res.data.data[i].vendId,
                            vendName: res.data.data[i].vendName
                        });
                        this.vendorNameList1.push(res.data.data[i].vendName)
                    }
                    // console.log(this.vendorNameList1);
                })
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
                        // console.log(workbook);
                        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容

                        this.outputTable = ws;
                        // console.log(this.outputTable.th);
                        for(var i=0; i<ws.length; i++) {
                            // console.log("项目数1" + ws.length);
                            // ws[i].date = this.computeLeap(ws[i].date);
                            if(ws[i].date == null) {
                                // console.log("空项");
                                ws[i].date = null;
                            }else {
                                ws[i].date = this.computeLeap(ws[i].date);
                                // console.log("转换" + i);
                            }
                        }
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
                this.checkVendors();
                axios.post(`api/material/history_buy_group_submit`,this.outputTable).then((res) => {
                    // console.log(res);
                    alert("上传成功");
                    this.$router.go(0);
                })
            },
            computeLeap(i) {
                var year = parseInt(i / 365);
                // console.log(year);
                let leapYear = 0;
                var k = 1900 +year;
                for(var p=1900; p<k+1; p++) {
                    this.relYear = 1900 + p;
                    if(((this.relYear%4==0)&&(this.relYear%100!=0))||(this.relYear%400==0)) {
                        // alert("闰年")
                        leapYear ++;
                    }
                }
                // console.log("闰年数" + leapYear);
                const outputYear = 1900 + year;
                var remainDay = i - (leapYear * 366 + (year - leapYear) * 365)-1;
                // console.log(remainDay);
                if(((outputYear%4==0)&&(outputYear%100!=0))||(outputYear%400==0)){
                    // console.log("执行闰年");
                    for(var k=0; k<this.justfyDay1.length;k++) {
                        this.outputMonth = k + 1;
                        if(remainDay <= this.justfyDay1[k]) {
                            if(remainDay <= 31) {
                                this.outputDay = remainDay;
                                break
                            }else {
                                this.outputDay = remainDay - this.justfyDay1[k-1];
                                break
                            }
                        }
                    }
                }else {
                    for(var k=0; k<this.justfyDay2.length;k++) {
                        this.outputMonth = k + 1;
                        if(remainDay <= this.justfyDay2[k]) {
                            if(remainDay <= 31) {
                                this.outputDay = remainDay;
                                break
                            }else {
                                this.outputDay = remainDay - this.justfyDay2[k-1]-1;
                                if(this.outputDay === 0) {
                                    this.outputMonth --;
                                    this.outputDay = this.justfyDay2[k-1] - this.justfyDay2[k-2];
                                }
                                break
                            }
                        }
                    }
                }
                return outputYear +"-" + this.outputMonth + "-" + this.outputDay
            },
            checkVendors() {
                for(var i=0; i<this.outputTable.length; i++) {
                    var k = this.vendorNameList1.indexOf(this.outputTable[i].vendName);
                    if( k< 0) {
                        alert("暂无经销商" +"“" + this.outputTable[i].vendName+ "”" + "的信息，" + "请先添加！！！");
                        this.$router.go(0);
                        break;
                    }else {
                        this.outputTable[i].vendId = this.vendorNameList[k].vendId
                    }
                }
            },
            checkColumns() {
                var j = 0;
                var k = ["vendName","date","potName","prodtypeNum","priceSingle","priceAll"];
                var k1 = ["客户名","日期","产品名","数量","单价","成交额"];
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
            });
            this.getVendorsName();
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






