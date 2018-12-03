<template>
    <div id="helloword">
        <div class="wrapper">
            <div style="" id="zhuxingtu"></div>
            <!--<div style="" id="zhuxingtu2"></div>-->
            <div style="clear:both"></div>
        </div>
        <!--<div  class="wrapper">-->
            <!--<div style="" id="shanxingtu"></div>-->
            <!--<div style="" id="huanxingtu"></div>-->
            <!--<div style="clear:both"></div>-->
        <!--</div>-->
        <!--<div class="wrapper">-->
            <!--<div id="map"></div>-->
            <!--<div style="clear:both"></div>-->
        <!--</div>-->
        <div id="map2"></div>

    </div>
</template>

<script>
    // import china from '../../static/china.js'
    import axios from 'axios'
    import echarts from 'echarts'
    import china from 'echarts/map/js/china'
    export default {
        name: "repairAnalysis",
        components: {
        },
        data() {
            return {
                data: [],
                charts: '',
                opinion:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
                addressFind: [
                    '北京', '天津', '上海', '重庆', '河北', '河南', '云南', '辽宁', '黑龙江', '湖南', '安徽',
                    '山东', '新疆', '江苏', '浙江', '江西', '湖北', '广西', '甘肃', '山西', '内蒙古', '陕西',
                    '吉林', '福建', '贵州', '广东', '青海', '西藏', '四川', '宁夏', '海南', '台湾','香港','澳门',
                ],
                maxData: [],
                maxShow: 30,
                dataAnalysis:[
                    {name: '北京',value: 11},
                    {name: '天津',value: 0},
                    {name: '上海',value: 0},
                    {name: '重庆',value: 0},
                    {name: '河北',value: 0},
                    {name: '河南',value: 0},
                    {name: '云南',value: 0},
                    {name: '辽宁',value: 0},
                    {name: '黑龙江',value: 0},
                    {name: '湖南',value: 0},
                    {name: '安徽',value: 0},
                    {name: '山东',value: 0},
                    {name: '新疆',value: 0},
                    {name: '江苏',value: 0},
                    {name: '浙江',value: 0},
                    {name: '江西',value: 0},
                    {name: '湖北',value: 0},
                    {name: '广西',value: 0},
                    {name: '甘肃',value: 0},
                    {name: '山西',value: 0},
                    {name: '内蒙古',value: 0},
                    {name: '陕西',value: 0},
                    {name: '吉林',value: 0},
                    {name: '福建',value: 0},
                    {name: '贵州',value: 0},
                    {name: '广东',value: 0},
                    {name: '青海',value: 0},
                    {name: '西藏',value: 0},
                    {name: '四川',value: 0},
                    {name: '宁夏',value: 0},
                    {name: '海南',value: 0},
                    {name: '台湾',value: 0},
                    {name: '香港',value: 0},
                    {name: '澳门',value: 0}
                ],
                problemConclude: ['部位1', '部位2', '部位3', '部位4', '部位5', '其他'],
                problemData: [0,0,0,0,0,0],
            }
        },
        methods: {
            initEchart() {
                // var myChartMap = this.$echarts.init(document.getElementById('map'));
                // myChartMap.setOption({
                //     backgroundColor: '#e6e2e4',
                //     title : {
                //         text: '订单量',
                //         subtext: '纯属虚构',
                //         x:'center'
                //     },
                //     tooltip : {
                //         trigger: 'item'
                //     },
                //     legend: {
                //         orient: 'vertical',
                //         x:'left',
                //         data:['订单量']
                //     },
                //     visualMap: {
                //         type: 'piecewise',
                //         pieces: [
                //             {min: 15},
                //             {min: 11, max: 15},
                //             {min: 8, max: 10},
                //             {min: 6, max: 7},
                //             {min: 5, max: 5, label: '10 到 200（自定义label）'},
                //             {value: 4, label: '4（自定义特殊颜色）', color: 'grey'},
                //             {min: 2, max: 3, label: '3（自定义特殊颜色）', color: 'black'},
                //             {max: 2}
                //         ],
                //         color: ['#E0022B', '#E09107', '#A3E00B']
                //     },
                //     // 工具盒，可以保存图片
                //     toolbox: {
                //         show: true,
                //         orient : 'vertical',
                //         x: 'right',
                //         y: 'center',
                //         feature : {
                //             mark : {show: true},
                //             dataView : {show: true, readOnly: false},
                //             restore : {show: true},
                //             saveAsImage : {show: true}
                //         }
                //     },
                //     roamController: {
                //         show: true,
                //         x: 'right',
                //         mapTypeControl: {
                //             'china': true
                //         }
                //     },
                //     series : [{
                //         name: '订单量',
                //         type: 'map',
                //         mapType: 'china',
                //         roam: false,
                //         itemStyle:{
                //             normal:{
                //                 label:{
                //                     show:true,
                //                     textStyle: {
                //                         color: "#fff"
                //                     }
                //                 },
                //                 areaColor: '#323c48',//地图区域的颜色
                //                 borderColor: '#000'//图形的描边颜色
                //             },
                //             emphasis:{
                //                 label:{
                //                     show:false
                //                 }
                //             }
                //         },
                //         data: this.dataAnalysis
                //     }]
                // });
                // 绘制地图2
                var myChartMap2 = this.$echarts.init(document.getElementById('map2'));
                // 地图上数据
                var myData = [
                    {name: '分店1', value: [121.15, 31.89, 90]},
                    {name: '分店2', value: [109.781327, 39.608266, 120]},
                    {name: '分店3', value: [120.38, 37.35, 142]},
                    {name: '分店4', value: [122.207216, 29.985295, 123]},
                    {name:'分店5',value:[110.245672,30.7787677,566]}
                ]
                myChartMap2.setOption({
                    // 新建一个地理坐标系 geo ，
                    title: {
                        text: '报修区域分布',
                        x:'center',
                        color: 'red'
                    },
                    geo: {
                        map: 'china',//地图类型为中国地图
                        itemStyle:{ // 定义样式
                            normal:{       // 普通状态下的样式
                                areaColor:'#6699CC',
                                borderColor: '#fff',
                            },
                            emphasis: {         // 高亮状态下的样式
                                areaColor: '#e9fbf1'
                            }
                        }
                    },
                    // hover显示目标数据
                    tooltip : {
                        trigger: 'item',
                        // tooltip的trigger的值可以有'item'、'axis'。
                        //'item':数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
                        //'axis':坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
                        textStyle:{
                            align:'left'
                        },
                    },
                    // 图表背景色
                    backgroundColor: '#404a59',
                    // 标志颜色
                    color:'red',
                    // 新建散点图series
                    // series:[{
                    //     name:'',//series名称
                    //     type:'scatter',//为散点类型
                    //     coordinateSystem: 'geo',// series坐标系类型
                    //     data:myData,
                    //     symbol:'pin',
                    //     symbolSize:[20,20]
                    // }],
                    series : [{
                        name: '报修数',
                        type: 'map',
                        mapType: 'china',
                        roam: false,

                        symbol:'pin',
                        symbolSize:[20,20],
                        coordinateSystem: 'geo',

                        itemStyle:{
                            normal:{
                                label:{
                                    show:true,
                                    textStyle: {
                                        color: "red"
                                    }
                                },
                                areaColor: '#323c48',//地图区域的颜色
                                borderColor: '#000'//图形的描边颜色
                            },
                            emphasis:{
                                label:{
                                    show:false
                                }
                            }
                        },
                        data: this.dataAnalysis
                    }],

                    // 添加视觉映射组件
                    visualMap: {
                        type: 'continuous', // 连续型
                        min: 0,           // 值域最小值，必须参数
                        max: this.maxShow+5,     // 值域最大值，必须参数 Math.max.apply(Math,this.maxData) +
                        calculable: true, // 是否启用值域漫游
                        inRange: {
                            color: ['LightSteelBlue','blue']
                            // 指定数值从低到高时的颜色变化
                        },
                        textStyle: {
                            color: '#fff' // 值域控件的文本颜色
                        }
                    },
                    toolbox: {
                        show: true,
                        orient : 'vertical',
                        x: 'right',
                        y: 'center',
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },

                });
                var myChartZhu = this.$echarts.init(document.getElementById('zhuxingtu'));
                myChartZhu.setOption({
                    backgroundColor: '#e6e2e4',
                    title: {
                        text: '故障汇总',
                        x:'center'
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['部位1', '部位2', '部位3', '部位4', '部位5', '其他']
                    },
                    yAxis: {},
                    series: [{
                        name: '损坏部位',
                        type: 'bar',
                        // color: 'Olive',
                        // data: [5, 20, 46, 10, 10, 20]
                        data: this.problemData,
                        itemStyle: {
                            normal:{
                                barColor: 'blue'
                            },
                        }
                    }],
                    toolbox: {
                        show: true,
                        orient : 'vertical',
                        x: 'right',
                        y: 'center',
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                });
                // // 绘制柱形图2
                // var myChartZhu2 = this.$echarts.init(document.getElementById('zhuxingtu2'));
                // myChartZhu2.setOption({
                //     backgroundColor: '#e6e2e4',
                //     title: {
                //         text: 'ECharts 多表表格示例'
                //     },
                //     legend: {},
                //     tooltip: {},
                //     dataset: {
                //         // 提供一份数据。
                //         source: [
                //             ['product', '2015', '2016', '2017'],
                //             ['Matcha Latte', 43.3, 85.8, 93.7],
                //             ['Milk Tea', 83.1, 73.4, 55.1],
                //             ['Cheese Cocoa', 86.4, 65.2, 82.5],
                //             ['Walnut Brownie', 72.4, 53.9, 39.1]
                //         ]
                //     },
                //     // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
                //     xAxis: {type: 'category'},
                //     // 声明一个 Y 轴，数值轴。
                //     yAxis: {},
                //     // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
                //     series: [
                //         {type: 'bar'},
                //         {type: 'bar'},
                //         {type: 'bar'}
                //     ]
                // });
                // // 绘制扇形图
                // var myChartShan = this.$echarts.init(document.getElementById('shanxingtu'));
                // myChartShan.setOption({
                //     backgroundColor: '#e6e2e4',
                //     textStyle: {
                //         // color: '#000',//显示扇形图标题
                //         fontWeight:'bold',//字体加粗
                //         fontSize:'18'
                //     },
                //     color: ['#000','rgb(252,157,154)','rgb(249,205,173)','rgb(200,200,169)','rgb(131,175,155)'],
                //     series : [
                //         {
                //             name: '访问来源',
                //             type: 'pie',
                //             radius: '60%',
                //             data:[
                //                 {value:235, name:'视频广告'},
                //                 {value:274, name:'联盟广告'},
                //                 {value:310, name:'邮件营销'},
                //                 {value:335, name:'直接访问'},
                //                 {value:400, name:'搜索引擎'}
                //             ],
                //         }
                //     ],
                // });
                // // 绘制环形图
                // var myChartHuan = this.$echarts.init(document.getElementById('huanxingtu'));
                // myChartHuan.setOption({
                //     backgroundColor: '#e6e2e4',
                //     tooltip: {
                //         trigger: 'item',
                //         formatter: '{a}<br/>{b}:{c} ({d}%)'
                //     },
                //     legend: {
                //         orient: 'vertical',
                //         x: 'left',
                //         data:this.opinion
                //     },
                //     series: [
                //         {
                //             name:'访问来源',
                //             type:'pie',
                //             radius:['40%','70%'],
                //             avoidLabelOverlap: false,
                //             label: {
                //                 normal: {
                //                     show: false,
                //                     position: 'center',
                //                 },
                //                 emphasis: {
                //                     show: true,
                //                     textStyle: {
                //                         fontSize: '30',
                //                         fontWeight: 'blod'
                //                     }
                //                 }
                //             },
                //             labelLine: {
                //                 normal: {
                //                     show: false
                //                 }
                //             },
                //             data:this.opinionData
                //         }
                //     ]
                // });
                // 绘制地图1

            },
            getData() {
                axios.get('/api/material/repair_handle').then((res) => {
                    this.data = res.data.data;
                    for(var i =0; i<this.data.length; i++) {
                        var substrAddress = this.data[i].address.substr(0,2);
                        var j = 0;
                        if(this.addressFind.indexOf(substrAddress)> 0) {
                            this.dataAnalysis[this.addressFind.indexOf(substrAddress)].value ++;
                        }
                    }
                    for(var i = 0; i<this.dataAnalysis.length; i++) {
                        this.maxData[i] = this.dataAnalysis[i].value
                    }
                    this.maxShow = Math.max.apply(Math,this.maxData);
                    // console.log(this.data[10].position);
                    for(var i=0; i<this.data.length; i++) {
                        var initPro = this.data[i].position;
                        // console.log(initPro.indexOf(this.problemConclude[0]));
                       for(var k=0; k<6; k++) {
                           if(initPro.indexOf(this.problemConclude[k]) >= 0) {
                               this.problemData[k] ++;
                               // console.log(this.problemData[k])
                           }
                       }
                    }
                    console.log(this.problemData)
                });
            }
        },
        mounted() {
            this.initEchart();
            this.getData()
        },
        created() {

        },
        watch: {
            dataAnalysis: {
                handler(val) {
                    this.initEchart()
//
                },
                deep: true
            }
        }
    }
</script>

<style scoped>
    #map{
        width: 90%;
        height: 100%;
    }
    #helloworld{
        width: 100%;
    }
    .wrapper{
        width: 76.05%;
        margin:0 auto;
        /*background: #000;*/
    }
    #zhuxingtu{
        width: 800px;
        height:400px;
        float:left;
    }
    #zhuxingtu2{
        width: 800px;
        height:400px;
        margin-left: 10px;
        float:left;
    }
    #shanxingtu{
        width: 800px;
        height:400px;
        margin-top:10px;
        float: left;
    }
    #huanxingtu{
        width: 800px;
        height:400px;
        margin-top:10px;
        float: left;
        margin-left: 10px;
    }
    #map{
        width: 800px;
        height:400px;
        margin-top:10px;
        float: left;
    }
    #map2{
        width: 100%;
        height:800px;
        margin-top:10px;
        float: left;
    }
</style>