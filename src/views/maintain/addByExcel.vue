<template>
    <div>
        <input  type="file" ref="upload" accept=".xls,.xlsx" class="outputlist_upload">
        <button class="btn1" @click="tableSubmit">保存</button>
        <!--<Table :columns="showTable" :data="outputTable"></Table>-->
        <can-edit-table refs="table2" v-model="outputTable" :columns-list="showTable"></can-edit-table>
    </div>
</template>

<script>
    import XLSX from 'xlsx'
    import axios from 'axios'
    import canEditTable from '../tables/components/canEditTable.vue';
    export default {
        name: "reload",
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
                formItem: {
                    staffId: '',
                    staffName: '',
                    staffSex: '',
                    staffPhone: '',
                    staffJob: '',
                    staffDept: '',
                    staffDate: '',
                    remarks: ''
                },
                showTable: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 65,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        align: 'center',
                        key: 'staffName',
                        editable: true

                    },
                    {
                        title: '员工编号',
                        align: 'center',
                        key: 'staffId',
                        editable: true
                    },
                    {
                        title: '性别',
                        align: 'center',
                        key: 'staffSex',
                        editable: true
                    },
                    {
                        title: '联系方式',
                        align: 'center',
                        key: 'staffPhone',
                        editable: true
                    },
                    {
                        title: '工作内容',
                        align: 'center',
                        key: 'staffJob',
                        overflow: 'ellipsis',
                        editable: true
                    },
                    {
                        title: "部门",
                        align: 'center',
                        key: 'staffDept',
                        editable: true

                    },
                    {
                        title: '入职时间',
                        align: 'center',
                        key: 'staffDate',
                        editable: true
                    },
                    {
                        title: '备注',
                        align: 'center',
                        key: 'remarks',
                        overflow: 'ellipsis',
                        editable: true
                    },
                    // {
                    //     title: '操作',
                    //     align: 'center',
                    //     width: 190,
                    //     key: 'handle',
                    //     handle: ['edit', 'delete']
                    // }

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
                        // console.log(workbook);
                        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容
                        for(var i=0; i<ws.length; i++) {
                            ws[i].staffDate = this.computeLeap(ws[i].staffDate)
                        }
                        // console.log("测试" + ws[0].data);
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
                axios.post(`/api/material/staff_add_group`,this.outputTable).then((res) => {
                    console.log(res)
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
                                // console.log(this.outputDay);
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
            checkColumns() {
                var j = 0;
                var k = ["staffName","staffId","staffSex","staffPhone","staffJob","staffDept","staffDate","remarks"];
                var k1 = ["姓名","员工编号","性别","联系方式","工作内容","部门","入职时间","备注"];
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
