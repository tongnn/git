<template>
  <div col :span="24">
    <chart :options="option" class="echarts" id="chart" > </chart>
  </div>
</template>

<style scoped>
.echarts {
  border-radius:4px;
    
  height: 250px;
  width: 100%;

}
</style>

<script>
import fetch from 'utils/fetch'
import Vue from 'vue'
export default {
    data: function () {
        return {
            option : {
                backgroundColor: '#49586e',
                title: {
                    text: '设备分布',
                    // 位置坐标
                    x: '25%',
                    y: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 20,
                        color: '#fff',
                    }
                },
                tooltip: {
                    show: true,
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                // 图例
                legend: {
                    orient: 'vertical',
                    // 位置
                    right: '20%',
                    top: '25%',
                    //  文本样式
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 20,
                        color: '#fff',
                    },
                    data: ['门机', '堆取料机', '卸船机']
                },
                // 图标
                series: [{
                    type: 'pie',
                    selectedMode: 'single',
                    center: ['30%', '50%'],
                    radius: ['50%', '80%'],
                    color: ['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67'],
                    // color: ['#AF89D6', '#5ab6df', '#6a8bc0', '#4acacb', '#fe8676'],
                    // 百分比
                    label: {
                        normal: {
                            position: 'inner',
                            formatter: '{d}%',

                            textStyle: {
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 13
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                            // {
                                
                            //     name: "门机",
                            //     value: 10,
                            // }, 
                            // {
                                
                            //     name: "装船机",
                            //     value: 6 ,
                            // }, 
                            // {
                                
                            //     name: "卸船机",
                            //     value: 4,
                            // },
                            {
                                
                                name: "",
                                value: "",
                            }, 
                            {
                                
                                name: "",
                                value: "" ,
                            }, 
                            {
                                
                                name: "",
                                value: "",
                            }
                        ]
                }]
            },

        }
    },

    mounted(){
        // var baseURL = process.env.BASE_API;
        var dataArr = [];
        
        fetch({
            headers: {
                    'Content-Type': 'application/json'
                },
                baseURL:process.env.BASE_API,
                url: '/equip.htm?param_act=getEquipDistribute',
                method:'get'
            }).then(res => {
                // console.log(JSON.stringify(res.data));
                var data = this.option.series[0].data;
                data =res.data.result;
                for(var i=0;i<data.length;i++)
                    if(data[i] != undefined && data[i] != ""){
                        this.option.series[0].data[i].value = data[i].value;
                        this.option.series[0].data[i].name = data[i].name;
                        dataArr.push(data[i].name);
                        // console.log(dataArr)
                        this.option.legend.data = dataArr;
                    }
        })
    },
}
</script>