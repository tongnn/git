<template>
  <div class="animated fadeIn" style=" margin:10px;">

    <div class='row'>
        <!-- <div class='col-xs-2'>
    </div> -->
      	<div class='col-xs-12'>
            <header>
              <Button id="" @click="skipEquipMonitor()" class="search" type="primary" shape="circle">振动监测</Button>
              <Button id="" @click="skipEquipStrain()" class="search" type="primary" shape="circle">应力监测</Button>
              <Button id="" @click="returnHome()" class="search" type="primary" shape="circle">返回首页</Button>
            </header>
            <!-- <p class="ziti">{{$route.query.id}}</p> -->
          	<ul class='form_head' >
              	<li class='form_head_top'  v-for="(item,index ) in treeData" :key="index">
					
						<Row>
							<Col span="24" >
							<div id="equ" class='equ'>{{treeData[index].title}}</div> 

								<div class="state-info">
									<!-- <ul id="v-for-object" class="demo">
										<li v-for="(item,index ) in treeData" :key="index">
											{{ item.MONI_NAME }}
										</li>
									</ul> -->
									
									<section class="panel" v-for="(valueItem,valueIndex ) in treeData[index].value" :key="valueIndex">
										<div class="panel-body">
											<div class="summary">
												
												<span>{{ valueItem.MONI_NAME }}</span>
											</div>
											
											<div id="expense" class="chart-bar" v-if="valueItem.MONI_VALUE < valueItem.WARNING_VALUE"> 
												<h3 class="green-txt" >{{ valueItem.MONI_VALUE }} mm/s</h3>
												<el-button class="img" @click="showdialogTable(valueItem.NODE_CODE,valueItem.valueList)"><img src="static/img/greenincome.png"></el-button>
											</div>
											<div id="expense" class="chart-bar" v-else-if="valueItem.MONI_VALUE >= valueItem.WARNING_VALUE && valueItem.MONI_VALUE < valueItem.ALARM_VALUE"> 
												<h3 class="blue-txt">{{ valueItem.MONI_VALUE }} mm/s</h3>
												<el-button class="img" @click="showdialogTable(valueItem.NODE_CODE,valueItem.valueList)"><img src="static/img/greenincome.png"></el-button>
											</div>
											<div id="expense" class="chart-bar" v-else-if="valueItem.MONI_VALUE >= valueItem.ALARM_VALUE && valueItem.MONI_VALUE < valueItem.DANGER_VALUE"> 
												<h3 class="orange-txt">{{ valueItem.MONI_VALUE }} mm/s</h3>
												<el-button class="img" @click="showdialogTable(valueItem.NODE_CODE,valueItem.valueList)"><img src="static/img/greenincome.png"></el-button>
											</div>
											<div id="expense" class="chart-bar" v-else-if="valueItem.MONI_VALUE >= valueItem.DANGER_VALUE"> 
												<h3 class="red-txt">{{ valueItem.MONI_VALUE }} mm/s</h3>
												<el-button class="img" @click="showdialogTable(valueItem.NODE_CODE,valueItem.valueList)"><img src="static/img/greenincome.png"></el-button>
											</div>
										</div>
									</section>
							</div>
						</Col>
					</Row>
				</li>
              	<el-dialog title="振动曲线" class="dialog" :visible.sync="dialogTableVisible" :modal-append-to-body="false">
					<Row>
						<Col :span="24" style="background-color:white">
							<div class="history">
								历史曲线  
								<Date-picker type="daterange" placement="bottom-end" placeholder="选择日期" @on-change="handleChange" :options="pickerOptions1" :value="dateValue" style="width: 200px"></Date-picker>
								<Button type="info" @click="setHistoryChart()">生成曲线</Button>
							</div>
							
							<chart :options="option" class="echarts" id="chart" > </chart>
							<div  id="historyData">
								<p></p>
							</div>
						</Col>
					</Row>
				</el-dialog>				
          </ul>
        </div><!-- /.col -->
                  
    </div>

    
</div>
</template>

<script>
// 树形控件

import "static/jquery/jquery.js";
import "static/jquery/jquery-ui.custom.js";
import "static/jquery/jquery.cookie.js";
//  basic styles
import "static/css/bootstrap.min.css";
import fetch from "utils/fetch";

var timer = null;

import Vue from "vue";
import axios from "axios";
export default {
  name: "equipMonitor",
  data() {
    return {
      treeData: {},
      nodeCodeForHistory: "", //用于查询历史曲线
	  dateValue: "", // 日期
	  id:"",
      pickerOptions1: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        },
        shortcuts: [
          {
            text: "最近一周",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: "最近一月",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: "最近三月",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          }
        ]
      },
      option: {
        tooltip: {
          trigger: "axis"
        },
        xAxis: [
          // x轴
          {
            type: "category", //leixing
            boundaryGap: false,
            data: [
              "0",
              "2",
              "4",
              "6",
              "8",
              "10",
              "12",
              "14",
              "16",
              "18",
              "20",
              "22",
              "24"
            ]
          }
        ],
        yAxis: [
          {
            name: "（频率）",
            type: "value",
            max: 100
          }
        ],
        series: [
          {
            name: "震动频率",
            type: "line", //折线图
            tooltip: {
              trigger: "axis"
            },
            smooth: true,
            itemStyle: {
              normal: {
                color: "rgba(2, 197, 233, 0.2)",
                lineStyle: {
                  color: "rgba(23, 107, 203, 0.2)"
                },
                areaStyle: {
                  color: "rgba(223, 147, 233, 0.2)"
                }
              }
            },
            data: [10, 12, 21, 54, 60, 80, 71]
          }
        ]
      },

      dialogTableVisible: false
    };
  },
  methods: {
    handleChange(date) {
      this.dateValue = date;
    },
    // 显示今日振动曲线
    showdialogTable(nodeCode, dataArray) {
      this.dialogTableVisible = true;
      $("#chart").show();
      $("#historyData").empty();
      this.nodeCodeForHistory = nodeCode;
      this.option.xAxis[0].data = [
        "0",
        "2",
        "4",
        "6",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "22",
        "24"
      ];
      this.option.series[0].data = dataArray;
      var today = new Date();
      var submitTime =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      // console.log(submitTime)
      this.dateValue = [submitTime, submitTime];
      // $("#date").attr('value',submitTime);
    },
    // 创建历史震动曲线
    setHistoryChart(startTime, endTime) {
      var nodeCode = this.nodeCodeForHistory;
      var dateValue = this.dateValue;
      var param_act = "selectHistoryChart";
      var startTime = "";
      var endTime = "";
      if (dateValue == "" || dateValue[1] == undefined) {
        this.$alert("请选择日期！");
      } else {
        //请求接口
        // console.log(dateValue);
        startTime = dateValue[0];
        if (
          new Date(startTime).getTime() <
          Date.now() - 3600 * 1000 * 24 * 365
        ) {
          this.$alert("请选择专业的分析软件！");
          return;
        }
        endTime = dateValue[1];
        fetch({
          headers: {
            "Content-Type": "application/json"
          },
          baseURL: process.env.BASE_API,
          url: "/vibMonitor.htm",
          method: "get",
          params: { param_act, nodeCode, startTime, endTime }
        }).then(res => {
          // console.log(res.data.list);

          //存储历史曲线数据
          var historyArray = new Array();
          var moniValueArray = new Array();
          var moniTimeArray = new Array();
          // var xyArray = new Array();

          historyArray = res.data.list;
          if (historyArray == undefined && res.data.msg != "") {
            // 未查询到数据时
            $("#chart").hide();
            $("#historyData").html(res.data.msg);
          } else {
            $("#chart").show();
            $("#historyData").empty();
            for (var i = 0; i < historyArray.length; i++) {
              if (
                historyArray[i].MONI_VALUE != undefined &&
                historyArray[i].MONI_TIME != undefined
              ) {
                moniValueArray.push(historyArray[i].MONI_VALUE);
                moniTimeArray.push(historyArray[i].MONI_TIME);
                // xyArray.push(new Array(historyArray[i].MONI_TIME,parseInt(historyArray[i].MONI_VALUE)));
              }
            }
            this.option.series[0].data = moniValueArray;
            this.option.xAxis[0].data = moniTimeArray;
            // this.option.xAxis = '{}';
            // this.option.yAxis = '{}';
            // this.option.series[0].data = xyArray;
          }
        });
      }
	},
	//跳转到振动监测页面
	skipEquipMonitor:function(){
		this.$router.push({ name: '振动监测',params:{id:this.id}});
	},
	//跳转到应力监测页面
	skipEquipStrain:function(){
		this.$router.push({ name: '应力监测',params:{id:this.id}});
	},
  returnHome:function(){
    this.$router.push({ path: '/home'});
  }
  },
  // created() {
	// console.log(123)
    
  // },
  mounted() {
	  this.id = this.$route.params.id;
	  // console.log(this.id);
    //var baseURL = process.env.NODE_ENV === "production"?process.env.BASE_API:'/prod';
    var baseURL = process.env.BASE_API;
    fetch({
      headers: {
        "Content-Type": "application/json"
      },
      baseURL: baseURL,
      url: "/equip.htm?param_act=selectEQByCode&EQ_CODE=" + this.id,
      method: "get"
    }).then(res => {
      _this.treeData = res.data.list;
      //_this.option.series[0].data = res.data.list[0].value[0].valueList;
      // console.log(_this.treeData)
      if (res.data.list == undefined && res.data.msg != "") {
        _this.$alert(res.data.msg);
        return;
      } else {
        //判断是否弹窗
        var treeArray = new Array();
        var moniValueBlueArray = new Array();
        var moniValueRedArray = new Array();
        var _index = 80;
        treeArray = _this.treeData;
        var moniValueInit = 49;
        var valueArray = new Array();
        for (var i = 0; i < treeArray.length; i++) {
          if (
            treeArray[i].value != undefined &&
            treeArray[i].value.length > 0
          ) {
            valueArray = treeArray[i].value;
            for (var j = 0; j < valueArray.length; j++) {
              if (
                valueArray[j].MONI_VALUE >= valueArray[j].WARNING_VALUE &&
                valueArray[j].MONI_VALUE < valueArray[j].DANGER_VALUE
              ) {
                moniValueBlueArray.push(valueArray[j].MONI_VALUE);
                //蓝色预警
                _this.$notify({
                  title: "警告提示",
                  message:
                    treeArray[i].title + valueArray[j].MONI_NAME + "震动异常",
                  type: "warning",
                  offset: _index, //偏移的距离
                  //position : bottom-right,
                  duration: 3000 //显示时间, 毫秒
                });
              } else if (
                valueArray[j].MONI_VALUE >= valueArray[j].DANGER_VALUE
              ) {
                moniValueRedArray.push(valueArray[j].MONI_VALUE);
                //红色预警
                _this.$notify({
                  title: "危险提示",
                  message:
                    treeArray[i].title + valueArray[j].MONI_NAME + "危险报警",
                  type: "error",
                  offset: _index, //偏移的距离
                  //position : bottom-right,
                  duration: 3000 //显示时间, 毫秒
                });
                _index += 100;
              }
            }
          }
        }
      }
    });
    var _this = this;
    $(function() {
      clearInterval(timer);
      timer = setInterval(() => {
        fetch({
          headers: {
            "Content-Type": "application/json"
          },
          baseURL: baseURL,
          url: "/equip.htm?param_act=selectEQByCode&EQ_CODE=" + _this.id,
          method: "get"
        }).then(res => {
          _this.treeData = res.data.list;
          //_this.option.series[0].data = res.data.list[0].value[0].valueList;
          // console.log(_this.treeData)

          //判断是否弹窗
          var treeArray = new Array();
          var moniValueBlueArray = new Array();
          var moniValueRedArray = new Array();
          var _index = 80;
          treeArray = _this.treeData;
          var moniValueInit = 49;
          var valueArray = new Array();
          for (var i = 0; i < treeArray.length; i++) {
            if (
              treeArray[i].value != undefined &&
              treeArray[i].value.length > 0
            ) {
              valueArray = treeArray[i].value;
              for (var j = 0; j < valueArray.length; j++) {
                if (
                  valueArray[j].MONI_VALUE >= valueArray[j].WARNING_VALUE &&
                  valueArray[j].MONI_VALUE < valueArray[j].DANGER_VALUE
                ) {
                  moniValueBlueArray.push(valueArray[j].MONI_VALUE);
                  //蓝色预警
                  _this.$notify({
                    title: "警告提示",
                    message:
                      treeArray[i].title + valueArray[j].MONI_NAME + "震动异常",
                    type: "warning",
                    offset: _index, //偏移的距离
                    //position : bottom-right,
                    duration: 3000 //显示时间, 毫秒
                  });
                } else if (
                  valueArray[j].MONI_VALUE >= valueArray[j].DANGER_VALUE
                ) {
                  moniValueRedArray.push(valueArray[j].MONI_VALUE);
                  //红色预警
                  _this.$notify({
                    title: "危险提示",
                    message:
                      treeArray[i].title + valueArray[j].MONI_NAME + "危险报警",
                    type: "error",
                    offset: _index, //偏移的距离
                    //position : bottom-right,
                    duration: 3000 //显示时间, 毫秒
                  });
                  _index += 100;
                }
              }
            }
          }
          // if(moniValueBlueArray.length>0){
          // 		// alert("蓝色警告");
          // 	for(var blueValue in moniValueBlueArray){
          // 		 _this.$notify({
          // 			title: '警告提示',
          // 			message: treeArray[i].title + valueArray[j].MONI_NAME + '震动异常',
          // 			type: 'warning'
          // 		});
          // 	}
          // }
          // if(moniValueRedArray.length>0){
          // 	for(var redValue in moniValueRedArray){
          // 		 _this.$notify.error({
          // 			title: '危险提示',
          // 			message: '这是一条红色警告的提示消息',

          // 		});
          // 		// alert("红色警告");
          // 	}
          // }
        });
      }, 5000);
      // } // alert node text property when clicked
    });
  },

  beforeRouteLeave(to, from, next) {
    clearInterval(timer);
    next();
  },
// created(){
// 	console.log(this.$route);
// }
};
</script>


<style scoped lang="css">
.animated {
  width: 100%;
  height: 100%;
}
/* background-color: #f1f0f1; */
header {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}
.ziti {
  width: 100px;
  height: 100px;
  border: 1px solid #000;
}
.text-info {
  width: 100px;
  height: 40px;
  background-color: orange;
  color: #fff;
}
/* .form_head{width:100%;height:100%} */
.form_head_top .equ {
  width: 100px;
  height: 30px;
  background-color: #143f6d;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px 5px 0px 0px;
  text-align: center;
  line-height: 30px;
}
.form_head span {
  cursor: pointer;
}
.state-info {
  margin-top: 10px;
  margin-bottom: 30px;
}
.state-info .panel,
.state-info2 .panel {
  float: left;
  margin: 20px;
  width: 240px;
}
.panel {
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}
.panel-body {
  padding: 15px;
}
.state-info .panel .summary,
.state-info2 .panel .summary {
  float: left;
  margin-right: 10px;
}
.panel .summary span {
  color: #49586e;
  font-size: 13px;
  font-weight: 400;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.panel .chart-bar h3.green-txt {
  color: #65cea7;
}
.panel .chart-bar h3 {
  /* float: left; */
  font-size: 180%;
  font-weight: 700;
  line-height: 10px;
}
.panel .chart-bar h3.blue-txt {
  color: #2d8cf0;
}

.panel .chart-bar h3.orange-txt {
  color: orange;
}
.panel .chart-bar h3.red-txt {
  color: red;
}

.chart-bar {
  float: right;
  width: 170px;
  margin-top: 20px;
  position: relative;
}
.chart-bar .img {
  position: absolute;
  right: 10px;
  bottom: 0px;
}
.chart-bar img {
  display: inline-block;
  float: right;
  width: 68px;
  height: 45px;
  position: absolute;
  right: -5px;
  bottom: -15px;
  cursor: pointer;
  vertical-align: top;
}
@media screen and (max-width: 767px) {
  .form_head {
    float: left;
    width: calc(100vw - 450px);
  }
  .state-info,
  .state-info2 {
    position: static;
    width: 80%;
    margin-top: 15px;
  }
  .state-info .panel,
  .state-info2 .panel {
    width: 100%;
  }
  .form_head_middle {
    width: 100%;
    height: 40px;
    overflow: hidden;
    margin-top: 10%;
    border-bottom: #ccc 2px solid;
    margin-bottom: 10px;
  }
}
@media screen and (max-width: 1230px) {
  .form_head {
    float: right;
    width: calc(100vw - 450px);
  }
  .state-info,
  .state-info2 {
    position: static;
    width: 80%;
    margin-top: 15px;
  }
  .state-info .panel,
  .state-info2 .panel {
    width: 100%;
  }
}

@media screen and (max-width: 1730px) {
  .form_head_middle {
    width: 100%;
    height: 40px;
    overflow: hidden;
    margin-top: 30%;
    border-bottom: #ccc 2px solid;
    margin-bottom: 10px;
  }
}

.dialog {
  width: 100%;
  z-index: 4000 !important;
  opacity: 1;
}
.v-modal {
  z-index: -1 !important;
}
.echarts {
  background-color: #fff;
  z-index: 100 !important;
  /* margin: 40px; */
  height: 450px;
  width: 100%;
}
.history {
  margin-left: 100px;
}
#historyData {
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: gray;
}
</style>



