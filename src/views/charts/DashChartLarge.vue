<template>

    <div Col :span="24" style="background-color:white">
        <div class="value">
            <h3>本月预警分析</h3>  
            <div class="sign">
                <div>
                    <hr style="border:1px solid rgba(0, 0, 203, 0.2);width:70px;" >
                    <span>应力监测</span>

                </div>
                <div>
                    <hr style="border:1px solid rgba(2, 197, 233, 0.2);width:70px;" >
                    <span>振动监测</span>

                </div>
                <div>
                    <hr style="border:1px solid rgba(145, 107, 203, 0.2);width:70px;" >
                    <span>消防监测</span>

                </div>
            </div>
        </div>
    
    <chart :options="option" class="echarts" id="chart" > </chart>

  </div>

</template>

<style scoped>
.value h3{
    height: 50px;
    text-align: center;
    line-height: 50px;
}
hr{display: inline-block;margin-bottom:3px;margin-right:10px;margin-left:150px;}
.echarts {
  height: 350px;
  width: 100%;

}


</style>

<script>

import fetch from 'utils/fetch'
import Vue from 'vue'

export default {
    data: function () {
    
        return {
            option :{
                // 坐标轴
                tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: [
                        {
                            name: '（日期）',
                            type: 'category',
                            boundaryGap: false,
                            data: []
                        }
                    ],
                    yAxis: [
                        {
                            name: '（次数）',
                            type: 'value',
                            // max: 50
                        },
                        // {
                        //     name: '（笔数）',
                        //     type: 'value',
                        //     // max: 100
                        // }
                    ],
                    series: [
                        {
                            name: '应力监测',
                            type: 'line',
                            tooltip: {
                                trigger: 'axis'
                                // formatter: '{a} <br/>{b}日: {c}元'
                            },
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(0, 0, 0, 0.2)',
                                    lineStyle: {
                                        color: 'rgba(0, 0, 203, 0.2)'
                                    },
                                    areaStyle: {
                                        color: 'rgba(223, 147, 233, 0.2)'
                                    }
                                }
                            },
                            data: []
                        },
                        {
                            name: '振动监测',
                            type: 'line',
                            tooltip: {
                                trigger: 'axis'
                                // formatter: '{a} <br/>{b}日: {c}元'
                            },
                            // yAxisIndex: 1,
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(2, 197, 233, 0.2)',
                                    lineStyle: {
                                        color: 'rgba(2, 197, 233, 0.2)'
                                    },
                                    areaStyle: {
                                        color: 'rgba(2, 197, 233, 0.2)'
                                    }
                                }
                            },
                            data: []
                        },
                        {
                            name: '消防监测',
                            type: 'line',
                            tooltip: {
                                trigger: 'axis'
                                // formatter: '{a} <br/>{b}日: {c}元'
                            },
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(70, 49, 89, 0.2)',
                                    lineStyle: {
                                        color: 'rgba(145, 107, 203, 0.2)'
                                    },
                                    areaStyle: {
                                        color: 'rgba(156, 243, 200, 0.2)'
                                    }
                                }
                            },
                            data: []
                        }
                    ]
            },

        }
    },

    mounted(){
        fetch({
            headers: {
                'Content-Type': 'application/json'
            },
            baseURL:process.env.BASE_API,
            url: '/equip.htm?param_act=getWarningRecord',
            method:'get'
        }).then(res => {
            //存储历史曲线数据
            var dataArray = new Array();
            var dateArray = new Array();
            var moniValueArray = new Array();
            var vibValueArray = new Array();
            var stValueArray = new Array();
            var fiValueArray = new Array();
            
            dataArray = res.data.list;
            
            if(dataArray == undefined && res.data.msg != ""){
                // 未查询到数据时
                // $('#chart').hide();
                // $("#historyData").html(res.data.msg);
            }else {
                // $('#chart').show();
                // $("#historyData").empty();
                for(var i=0;i<dataArray.length;i++){
                        if(dataArray[i].time != undefined && dataArray[i].value != undefined){
                            // moniValueArray.push(dataArray[i].value[0]);
                            dateArray.push(dataArray[i].time);	
                            // for(var j=0;j<moniValueArray.length;j++){
                                vibValueArray.push(dataArray[i].value[0].vibData);
                                stValueArray.push(dataArray[i].value[0].stData);
                                fiValueArray.push(dataArray[i].value[0].fiData);               
                            // }
                        }
                        

                }
                this.option.series[0].data = vibValueArray;
                this.option.series[1].data = stValueArray;
                this.option.series[2].data = fiValueArray;
                this.option.xAxis[0].data = dateArray;
                
            }
        })
    },
}
</script>