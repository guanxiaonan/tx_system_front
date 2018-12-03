<style type="text/css">
button.ivu-btn{
    margin: 0px 7px;
}
/*.ivu-tag {
    width: 100%;
}*/
.ivu-table-cell {
    padding-left: 3px;
    padding-right: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    box-sizing: border-box;
    text-align: center;
}
.ivu-tag.ivu-tag-red.ivu-tag-dot.ivu-tag-checked {
    padding: 0 6px;
}
.ivu-table-border td, .ivu-table-border th {
    text-align: center;
}
</style>
<template>
    <Table width='100%' border :columns="columns2" :data="data3"></Table>
</template>
<script>
import axios from 'axios';
import {formatDate} from '../common/formatDate.js';
export default {
    data () {
        return {
            color: '',
            columns2: [
                {
                    title: 'JobId',
                    key: 'jobId',
                    width: 70,
                    fixed: 'left'
                },
                {
                    title: 'Cron',
                    key: 'cron',
                    width: 150
                },
                {
                    title: 'Status',
                    key: 'status',
                    width: 100,
                    render: (h, params) => {
                            console.log(h)
                            console.log(params)
                            console.log('---------')

                            const row = params.row;
                            /*
                                0禁用 1启用 2新建未运行 3正常运行 4暂停 5运行结束 6任务异常 7堵塞
                            */
                            let color = ''
                            let text = ''
                            
                            if (row.status === 3) {
                                color = 'blue'
                                text = '运行中'
                            } else if (row.status === 4) {
                                color = 'yellow'
                                text = '暂停'
                            } else if (row.status === 5) {
                                color = 'green'
                                text = '运行结束'
                            } else {
                                color = 'red'
                                text = '任务异常'
                            }
                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, text);
                    }
                },
                {
                    title: 'Rule',
                    key: 'rule',
                    width: 200
                },
                {
                    title: 'Desc',
                    key: 'desc',
                    width: 200
                },
                {
                    title: 'Email',
                    key: 'email',
                    width: 150
                },
                {
                    title: 'CreateTime',
                    key: 'createTime',
                    width: 200,
                    render: (h, params) => {
                            console.log(h)
                            console.log(params)
                            console.log('---------')

                            const time = params.row.createTime;
                            /*
                                0禁用 1启用 2新建未运行 3正常运行 4暂停 5运行结束 6任务异常 7堵塞
                            */

                            console.log(time)
                            let date = new Date(time);
                            return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
                    }
                },
                {
                    title: 'CreatorId',
                    key: 'creatorId',
                    width: 100
                },
                {
                    title: 'Action',
                    key: 'action',
                    width: 250,
                    fixed: 'right',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success'
                                },
                                on: {
                                  click: () => {
                                    console.log('click')
                                    this.start(params.row.jobId)
                                    //mCheck.singleShow(params.row);
                                  }
                                }
                            }, '启动'),
                            h('Button', {
                                props: {
                                    type: 'primary'
                                },
                                on: {
                                  click: () => {
                                    this.pause(params.row.jobId)
                                    //mCheck.singleShow(params.row);
                                  }
                                }
                            }, '暂停'),
                            h('Button', {
                                props: {
                                    type: 'error'
                                },
                                on: {
                                  click: () => {
                                    this.delete(params.row.jobId)
                                    //mCheck.singleShow(params.row);
                                  }
                                }
                            }, '删除')

                        ]);
                    }
                }
            ],
            data3: [
                {
                    jobId: 'John Brown',
                    cron: 'John Brown',
                    desc: 'John Brown',
                    rule: 18,
                    createTime: 'New York No. 1 Lake Park',
                    creatorId: 'America',
                    status: 'New York',
                    email: 100000
                }
            ]
        }
    },
    methods: {
            init () {
            },
            start(jobId) {
                console.log(jobId)
                console.log('start')
                axios.get(`/api/produce-task/resume-job/${jobId}`).then((res) => {

                    let code = res.data.code
                    console.log(code)
                    console.log(res);
                  }).catch((error) => {
                    console.log(error);
                  }); 
                  this.$router.go(0)
            },
            pause(jobId) {
                console.log(jobId)
                console.log('pause')
                axios.get(`/api/produce-task/pause-job/${jobId}`).then((res) => {

                    let code = res.data.code
                    console.log(code)
                    console.log(res);
                  }).catch((error) => {
                    console.log(error);
                  }); 
                  this.$router.go(0)
            },
            delete(jobId) {
                console.log(jobId)
                console.log('delete')
                axios.delete(`/api/produce-task/${jobId}`).then((res) => {

                    let code = res.data.code
                    console.log(code)
                    console.log(res);
                  }).catch((error) => {
                    console.log(error);
                  }); 
                  this.$router.go(0)
            },
            getData () {
                //请求方法，根据实际情况使用
                axios.get('/api/produce-task').then((res) => {
                    //res 为成功回调的响应
                    this.data3 = res.data.data;
                    console.log(this.data3)
                });
            },
            onClick: function () {
              this.message = "You click me!";
              this.onClick = function () {
                 this.message = "Hello,i changed!";
              }
           }
    },
    mounted () {
        this.init();
        this.getData();
    },
    watch: {
        '$route' () {
            this.init();
        }
    }
}
</script>
