
<template>
    <div>
        <card style="height: 580px">
            <Table class="table" id="table1" style="" :columns="columns1" :data="data1"></Table>
            <div class="modal-mask" v-show="show" transition="modal">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div v-for="(item,index) in formItem">
                            <ul>
                                <li>
                                    {{index}}{{":"}}{{item}}
                                </li>
                            </ul>
                        </div>
                        <div class="modal-footer">
                            <slot name="footer">
                                <button class="modal-default-button"
                                        @click="show = false">
                                    关闭
                                </button>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </card>
        <div class="foot">
            <p>Copyright © 2018 中国·天喜控股</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import expandHandle from './component/expandHandle'
    import {formatDate} from '../common/formatDate.js';
    import changeStsComp from './component/changeStsComp'
    export default {
        name: "complaint_handle",
        comments: {
            expandHandle,changeStsComp
        },
        data() {
            return {
                show: false,
                columns1: [
                    {
                        type: 'expand',
                        align: 'left',
                        width: 50,
                        render: (h, params)=> {
                            return h(expandHandle,{
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '序号',
                        align: 'center',
                        width: 80,
                        type: 'index'
                    },
                    {
                        title: '客户',
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: '电话',
                        align: 'center',
                        key: 'cusPhone'
                    },

                    {
                        title: '邮箱',
                        align: 'center',
                        key: 'postEmail'
                    },
                    {
                        title: '投诉日期',
                        align: 'center',
                        key: 'compDate'
                    },
                    {
                        title: '建议/投诉',
                        align: 'center',
                        key: 'typeName'
                    },
                    {
                        title: ' ',
                        align: 'center',
                        key: 'mailState',
                        render: (h, params) => {
                            const row = params.row;
                            row.compState =params.row.compState ;
                            //row.workStatus = 1;
                            if(row.compState===1)
                                return h(changeStsComp,{
                                    props: {
                                        compState: true,
                                        stsColor: 'red',
                                        compId: params.row.compId
                                    },
                                });
                            if(row.compState===2)
                                return h(changeStsComp,{
                                    props: {
                                        compState: false,
                                        stsColor: 'green'
                                    },
                                });
                        }
                    },
                    // {
                    //     title: ' ',
                    //     render: (h,params) => {
                    //         return h('div', [
                    //             h('button', {
                    //                 props: {
                    //                     type: 'primary',
                    //                 },
                    //                 style: {
                    //                     width: '70px',
                    //                     height: '30px',
                    //                     color: '#FFFFFF',
                    //                     backgroundColor: '#1E90FF',
                    //                     borderRadius: '5px',
                    //                     border: 'none'
                    //                 },
                    //                 on: {
                    //                     click: () => {
                    //                         this.show = true;
                    //                         this.formItem = params.row
                    //                     }
                    //                 }
                    //
                    //             }, '查看')
                    //         ])
                    //     }
                    // },
                ],
                formItem: [],
                data1: [],
            }
        },
        methods: {
            init() {},
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
            },

            getData() {
                axios.get(`api/material/complaint`).then((res) =>{
                    console.log(res.data.data);
                    for(var i=0;i<res.data.data.length;i++){
                        res.data.data[i].compDate = this.formatDate(res.data.data[i].compDate);
                    }
                    this.data1 = res.data.data;
                })
            }
        },
        mounted() {
            this.getData()
        },
        watch: {
            '$route' () {
                this.init();
            },
        }
    }
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 700px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        /*background: #2D8CF0;*/
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-default-button {
        float: right;
        width:50px;
        height:25px;
        color:#FFFFFF;
        border: none;
        background-color: #1E90FF ;
        border-radius: 5px;
        position: relative;
        bottom: 5px;
    }
    .modal-enter, .modal-leave {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave .modal-container {
         -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    h3{
        color: black;
    }
</style>