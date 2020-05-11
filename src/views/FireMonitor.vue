<template>
    <div class="animated fadeIn" style="height:100%;margin: 0;width: 100%">
        <!-- left-dashboard -->
        <div class="left-dashboard">
            <div class="left-dashboard-top">
                <div class="user-module">
                    <div class="user-line">
                        <div class="user-avatar"></div>
                        <div class="user-name">
                            <span>青岛国际前港公司</span>
                            <span class="user-tab">切换
                                <span class="glyphicon glyphicon-menu-right" style="color: #C7CEF2;font-size: 12px;" aria-hidden="true"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="pin">
                    <div class="pin-line"></div>
                    <div class="pin-num">
                        <div class="pin-num-cell"></div>
                        <div class="pin-num-cell"></div>
                    </div>
                    <div class="pin-label">
                        <div class="pin-label-cell">监测电气室数</div>
                        <div class="pin-label-cell">监测机柜数</div>
                    </div>
                </div>
            </div>
            <div class="left-dashboard-bottom">
                <div class="left-dashboard-nav">
                    <ul>
                        <li class="left-dashboard-nav-active nav-list nav-list-all">全部电气室</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- main-part -->
        <div class="main-part">
            <div class="main-part-title">全部电气室</div>
            <div class="main-part-content zone">
                <div class="all-room-tltle">全部电气室&nbsp;（消防工程实时监控）</div>
                <nav class="nav-line">
                    <ul>
                        <li>图例：</li>
                        <li>
                            <img src="../../static/img/Firefighting/legend_normal.png">正常</li>
                        <li>
                            <img src="../../static/img/Firefighting/legend_interrupt.png">连接中断</li>
                        <li>
                            <img src="../../static/img/Firefighting/legend_fault.png">设备故障</li>
                        <li>
                            <img src="../../static/img/Firefighting/legend_fire.png">火警</li>
                    </ul>
                </nav>
                <section>
                    <p class="choose-tip">请选择电气室进行消防报警统计分析</p>
                    <button type="button" class="btn-all-analysis">消防报警统计分析</button>
                </section>

                <!-- 全部电气室汇总图 -->
                <div class="content-box">
                    <div class="electrical-box" v-for="(item,index) in box" :key="index">
                        <div class="select-box select-box-unselect" v-bind="{id:item.partInfo[0].PART_CODE}"></div>
                        <div class="box-title">{{item.partName}}</div>
                        <div class="box-icon-bar">
                            <div class="box-icon box-icon-normal" v-bind="{type:item.partInfo[0].NORMAL}"></div>
                            <div class="box-icon box-icon-fault" v-bind="{type:item.partInfo[0].FAULT}"></div>
                            <div class="box-icon box-icon-interrupt" v-bind="{type:item.partInfo[0].CONNECT}"></div>
                            <div class="box-icon box-icon-fire" v-bind="{type:item.partInfo[0].FIRE}"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!--  消防报警统计分析总图 -->
            <div id="all-analysis" class="main-part-content hide">
                <div class="all-room-tltle">全部电气室&nbsp;（消防报警统计分析）</div>
                <section>
                    <div class="box-toolbar">
                        <label style=" float: left;">报警类型：</label>
                        <Checkbox-group v-model="checkbox1" class="checkbox-type">
                            <Checkbox label="中断"></Checkbox>
                            <Checkbox label="故障"></Checkbox>
                            <Checkbox label="火警"></Checkbox>
                        </Checkbox-group>
                        <label style="margin-left: 20px;">选择日期：&nbsp;</label>
                        <Date-picker :value="startDate" type="date" @on-change="handleChange1" format="yyyy-MM-dd" placeholder="选择日期" class="date-picker-type"></Date-picker>
                        <label>&nbsp;至&nbsp;</label>
                        <Date-picker :value="endDate" type="date" @on-change="handleChange2" format="yyyy-MM-dd" placeholder="选择日期" class="date-picker-type"></Date-picker>
                        <div class="btn-group">
                            <button class="btn-analysis">开始分析</button>
                            <button class="btn-reset">重置</button>
                        </div>
                    </div>
                </section>
                <div class="content-box">
                    <nav>
                        <ul class="nav-ul-center">
                            <li>
                                <div class="example-box example-box-interrupt"></div> 中断
                            </li>
                            <li>
                                <div class="example-box example-box-fault"></div> 故障
                            </li>
                            <li>
                                <div class="example-box example-box-fire"></div> 火警
                            </li>
                        </ul>
                    </nav>
                    <div id="all-analysis-echarts"></div>
                    <div class="diy-table">
                        <div class="diy-table-title">统计报表</div>
                        <div class="diy-table-size">
                            <table class="diy-table-ontology">
                                <tr>
                                    <th>序号</th>
                                    <th>分区</th>
                                    <th>设备编号</th>
                                    <th>日期</th>
                                    <th>时间</th>
                                    <th>报警类型</th>
                                    <th>位置描述</th>
                                </tr>
                                <tr v-for="(item,index) in tableAll" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{item.partName}}</td>
                                    <td>{{item.eqCode}}</td>
                                    <td>{{item.exDate}}</td>
                                    <td>{{item.exTime}}</td>
                                    <td>{{item.warnType}}</td>
                                    <td>{{item.location}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 分区报警统计分析 -->
            <div id="part-analysis" class="main-part-content hide">
                <div class="all-room-tltle">
                    <span></span>&nbsp;（分区消防报警统计分析）</div>
                <section>
                    <div class="box-toolbar">
                        <label style=" float: left;">报警类型：</label>
                        <Checkbox-group v-model="checkbox2" class="checkbox-type">
                            <Checkbox label="中断"></Checkbox>
                            <Checkbox label="故障"></Checkbox>
                            <Checkbox label="火警"></Checkbox>
                        </Checkbox-group>
                        <label style="margin-left: 20px;">选择日期：&nbsp;</label>
                        <Date-picker :value="startDate1" format="yyyy-MM-dd" @on-change="handleChange3" type="date" placeholder="选择日期" class="date-picker-type"></Date-picker>
                        <label>&nbsp;至&nbsp;</label>
                        <Date-picker :value="endDate1" format="yyyy-MM-dd" @on-change="handleChange4" type="date" placeholder="选择日期" class="date-picker-type"></Date-picker>
                        <div class="btn-group">
                            <button class="btn-analysis">开始分析</button>
                            <button class="btn-reset">重置</button>
                        </div>
                    </div>
                </section>
                <div class="content-box">
                    <nav>
                        <ul class="nav-ul-center1">
                            <li>
                                <div class="example-box1 example-box-interrupt1"></div> 中断
                            </li>
                            <li>
                                <div class="example-box1 example-box-fault1"></div> 故障
                            </li>
                            <li>
                                <div class="example-box1 example-box-fire1"></div> 火警
                            </li>
                        </ul>
                    </nav>
                    <div id="part-analysis-echarts"></div>
                    <div class="diy-table">
                        <div class="diy-table-title">统计报表</div>
                        <div class="diy-table-size">
                            <table class="diy-table-ontology">
                                <tr>
                                    <th>序号</th>
                                    <th>设备编号</th>
                                    <th>日期</th>
                                    <th>时间</th>
                                    <th>报警类型</th>
                                    <th>位置描述</th>
                                </tr>
                                <tr v-for="(item,index) in tablePart" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{item.eqCode}}</td>
                                    <td>{{item.exDate}}</td>
                                    <td>{{item.exTime}}</td>
                                    <td>{{item.warnType}}</td>
                                    <td>{{item.location}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 分区电气室 -->
            <div class="main-part-content hide zone roomZone" v-for="(item,index) in box" :key="index">
                <div class="all-room-tltle" v-bind="{code:item.partInfo[0].PART_CODE}">{{item.partName}}</div>
                <nav class="nav-line">
                    <ul>
                        <li>故障图例：</li>
                        <li>
                            <img src="../../static/img/Firefighting/legend_interrupt.png">连接中断</li>
                        <li>
                            <img src="../../static/img/Firefighting/legend_fault.png">设备故障</li>
                        <li>
                            <img src="../../static/img/Firefighting/legend_fire.png">火警</li>
                        <li style="margin-left:60px;">设备图例：</li>
                        <li>
                            <img src="../../static/img/Firefighting/legend_warm feeling.png">烟感</li>
                        <li>
                            <img src="../../static/img/Firefighting/legend_smoke.png">温感</li>
                        <li>
                            <img src="../../static/img/Firefighting/legend_controller.png">控制器</li>
                    </ul>
                </nav>
                <section>
                    <div class="room-tooltip">
                        <img src="../../static/img/Firefighting/content_partition_first.png" style="margin:10px 12px 2px 0;float:left;">
                        <span class="room-tooltip-label first-partition">
                            第一分区</span>
                        <span class="room-tooltip-label up-partition">上一分区</span>
                        <span class="room-tooltip-label down-partition">下一分区</span>
                        <span class="room-tooltip-label last-partition">最后分区
                        </span>
                        <img src="../../static/img/Firefighting/content_partition_last.png" style="margin:10px 0px 2px 12px;float:left;">
                        <!--  <span class="room-tooltip-label expand-partition">
              <img src="../../static/img/Firefighting/+.png" style="margin:0 10px 2px 0;">
              <span>100%</span>
              <img src="../../static/img/Firefighting/-.png" style="margin:0 0 2px 10px;">
            </span>
            <span class="room-tooltip-label narrow-partition">还原
              <img src="../../static/img/Firefighting/reduction.png" style="margin:0 0px 2px 12px;">
            </span> -->
                        <button class="btn-part-analysis">分区报警统计分析</button>
                    </div>
                </section>
                <div class="content-box">
                </div>
            </div>
        </div>

        <!-- right-dashboard -->
        <div class="right-dashboard">
            <div class="right-dashboard-title">
                <img src="../../static/img/Firefighting/interrupt_ss.png">连接中断信息
            </div>
            <ul class="right-dashboard-info">
                <ul v-for="(item,index) in interrupt" :key="index">
                    <li class="right-dashboard-partName">{{item.PART_NAME}}
                      <span style="float:right;color: #8084A2;padding-right: 5px;">{{item.time}}</span>
                    </li>
                    <li>{{item.INFO}}</li>
                </ul>
            </ul>
            <div class="right-dashboard-title">
                <img src="../../static/img/Firefighting/fault_ss.png">设备故障信息
            </div>
            <ul class="right-dashboard-info">
                <ul v-for="(item,index) in fault" :key="index">
                    <li class="right-dashboard-partName">{{item.PART_NAME}}
                      <span style="float:right;color: #8084A2;padding-right: 5px;">{{item.time}}</span>
                    </li>
                    <li>{{item.INFO}}</li>
                </ul>
            </ul>
            <div class="right-dashboard-title">
                <img src="../../static/img/Firefighting/fire_ss.png">火警信息
            </div>
            <ul class="right-dashboard-info">
                <ul v-for="(item,index) in fire" :key="index">
                    <li class="right-dashboard-partName">{{item.PART_NAME}}
                      <span style="float:right;color: #8084A2;padding-right: 5px;">{{item.time}}</span>
                    </li>
                    <li>{{item.INFO}}</li>
                </ul>
            </ul>
        </div>
    </div>
</template>

<script>
// import "../../static/3D/js/d3-threeD.js";
// 鼠标控制
import "../../static/3D/js/OrbitControls.js";
// 模型打孔
import "../../static/3D/js/ThreeBSP.js";
// 自定义配置
// import "../../static/3D/js/dat.gui.min.js";
// 消防脚本
import utils from "../../static/3D/js/utils.1.js";

// 树形控件
import "../../static/dist/skin/ui.dynatree.css";
import "../../static/jquery/jquery.js";
import "../../static/jquery/jquery-ui.custom.js";
import "../../static/jquery/jquery.cookie.js";
import "../../static/js/jquery.dynatree.js";

//  basic styles
import "../../static/css/bootstrap.min.css";
import "../../static/css/font-awesome.min.css";
// page specific plugin styles
import "../../static/css/jquery-ui-1.10.3.full.min.css";
import "../../static/css/datepicker.css";
import "../../static/css/ui.jqgrid.css";
//  ace styles
import "../../static/css/ace.min.css";

// ace settings handler
import "../../static/js/ace-extra.min.js";

var $path_base = "/"; //this will be used in gritter alerts containing images
window.jQuery ||
  document.write(
    "<script src='../../static/js/jquery-2.0.3.min.js'>" + "<" + "/script>"
  );
if ("ontouchend" in document)
  document.write(
    "<script src='../../static/js/jquery.mobile.custom.min.js'>" +
      "<" +
      "/script>"
  );
import "../../static/js/bootstrap.min.js";
import "../../static/js/typeahead-bs2.min.js";

import fetch from "utils/fetch";
import { initFireJs } from "static/js/fire-control-map";

import echarts from "echarts";
let time = null;
let boxTime = null;
let finder = {
    timer0: null,
    timer1: null
}
let scene = null
let renderer = null
let three = {
      camera: null,
      light: null,
      controls: null,
      width: null,
      height: null,
      states: null,
      background: 0x1e1e24,
      helper: null,
      gui: null,
      datGui: null,
      loop: null
  },
  geometry = null,
  material = null,
  texture = null,
  loader = null,
  model = null,
  modelClone = null,
  object = null,
  objectClone = null,
  geo = null,
  mat = null,
  mod = null,
  bsp = null,
  equip = null
export default {
  name: "FireMonitor",
  data() {
    return {
      box: [],
      interrupt: [],
      fault: [],
      fire: [],
      tableAll: [],
      tablePart: [],
      startDate: "",
      endDate: "",
      startDate1: "",
      endDate1: "",
      checkbox1: ["中断", "故障", "火警"],
      checkbox2: ["中断", "故障", "火警"]
    };
  },
  methods: {
    handleChange1(date) {
      this.startDate = date;
    },
    handleChange2(date) {
      this.endDate = date;
    },
    handleChange3(date) {
      this.startDate1 = date;
    },
    handleChange4(date) {
      this.endDate1 = date;
    }
  },
  beforeMount() {},
  mounted() {
    var baseURL = process.env.BASE_API;
    var _this = this;

    // 获取左侧信息
    $.post(baseURL + "/fiSafety.htm?param_act=fiSafetyRoomNum", function(
      result
    ) {
      var data = JSON.parse(result);
      $(".pin-num-cell")
        .eq(0)
        .text(data.roomNum);
      $(".pin-num-cell")
        .eq(1)
        .text(data.cupBoardNum);
      var arr = data.partInfo;
      var partCode;
      var partName;
      for (var i = 0; i < data.roomNum; i++) {
        partCode = arr[i].partCode;
        partName = arr[i].partName;
        $(".left-dashboard-nav ul").append(
          '<li class="nav-list" code=' + partCode + ">" + partName + "</li>"
        );
      }
    });

    // 电气室选中/未选中切换
    $(".main-part").on("click", ".electrical-box", function() {
      if (
        $(this)
          .find(".select-box")
          .hasClass("select-box-select")
      ) {
        $(this)
          .find(".select-box")
          .removeClass("select-box-select");
        $(this)
          .find(".select-box")
          .addClass("select-box-unselect");
        $(this).removeClass("border-select");
      } else {
        $(this)
          .find(".select-box")
          .removeClass("select-box-unselect");
        $(this)
          .find(".select-box")
          .addClass("select-box-select");
        $(this).addClass("border-select");
      }
      if ($(".select-box-select").length > 0) {
        $(".main-part-content section .btn-all-analysis").addClass(
          "btn-select"
        );
      } else {
        $(".main-part-content section .btn-all-analysis").removeClass(
          "btn-select"
        );
      }
    });
    // 全部电气室清空选中
    $(".left-dashboard-nav").on("click", ".nav-list-all", function() {
      $(".select-box").removeClass("select-box-select");
      $(".electrical-box").removeClass("border-select");
      $(".main-part-content section .btn-all-analysis").removeClass(
        "btn-select"
      );
    });
    box();
    // 遍历中间部分电气室信息
    function box() {
      $.post(baseURL + "/fiSafety.htm?param_act=fiSafetyAllRooms", function(
        result,
        state
      ) {
        var mainData = JSON.parse(result);
        _this.box = mainData.List;
        _this.$nextTick(() => {
          // 电气室状态
          for (var i = 0; i < $(".electrical-box").length; i++) {
            if (
              $(".box-icon-normal")
                .eq(i)
                .attr("type") == "OK"
            ) {
              $(".box-icon-normal")
                .eq(i)
                .addClass("box-normal");
            } else {
              $(".box-icon-normal")
                .eq(i)
                .addClass("box-normal-gray");
            }

            if (
              $(".box-icon-fault")
                .eq(i)
                .attr("type") == "OK"
            ) {
              $(".box-icon-fault")
                .eq(i)
                .addClass("box-fault-gray");
            } else {
              $(".box-icon-fault")
                .eq(i)
                .addClass("box-fault");
            }

            if (
              $(".box-icon-interrupt")
                .eq(i)
                .attr("type") == "OK"
            ) {
              $(".box-icon-interrupt")
                .eq(i)
                .addClass("box-interrupt-gray");
            } else {
              $(".box-icon-interrupt")
                .eq(i)
                .addClass("box-interrupt");
            }

            if (
              $(".box-icon-fire")
                .eq(i)
                .attr("type") == "OK"
            ) {
              $(".box-icon-fire")
                .eq(i)
                .addClass("box-fire-gray");
            } else {
              $(".box-icon-fire")
                .eq(i)
                .addClass("box-fire");
            }
          }
        });
      });
      boxTime = setTimeout(function(){box}, 10000);
    }

    // 左侧边栏点击变色
    $(".left-dashboard-nav").on("click", ".nav-list", function() {
      $(this).addClass("left-dashboard-nav-active");
      $(this)
        .siblings()
        .removeClass("left-dashboard-nav-active");
      var inxx = $(this).index();
      // 对应电气室模块显示，其余电气室隐藏
      $(".zone")
        .eq(inxx)
        .removeClass("hide");
      $(".zone")
        .eq(inxx)
        .siblings(".main-part-content")
        .addClass("hide");
      var partCode = $(this).attr("code");
      $(".main-part-title").text($(this).text());
      if(scene) {
          $(".roomZone .content-box").html("")
          clearThree()
      }
      if (inxx > 0) {
        room(partCode, inxx);
      }
    });
    // 点击右侧通知栏标题切换tab
    $(".right-dashboard").on("click", ".right-dashboard-partName", function() {
      var partNameRight = $(this).text();
      var partNameLeft = $(".nav-list");
      for (var i = 0; i < partNameLeft.length; i++) {
        if (partNameLeft.eq(i).text() == partNameRight) {
          $(".nav-list")
            .eq(i)
            .addClass("left-dashboard-nav-active");
          $(".nav-list")
            .eq(i)
            .siblings()
            .removeClass("left-dashboard-nav-active");
          // 对应电气室模块显示，其余电气室隐藏
          $(".zone")
            .eq(i)
            .removeClass("hide");
          $(".zone")
            .eq(i)
            .siblings(".main-part-content")
            .addClass("hide");
          var partCode = $(".nav-list")
            .eq(i)
            .attr("code");
          if (i > 0) {
            if(scene) {
                $(".roomZone .content-box").html("")
                clearThree()
            }
            $(".main-part-title").text(partNameLeft.eq(i).text());
            room(partCode, i);
          }
        }
      }
    });
    // 第一分区
    $(".main-part").on("click", ".first-partition", function() {
      if(scene) {
          $(".roomZone .content-box").html("")
          clearThree()
      }
      var partCode = $(".nav-list")
        .eq(1)
        .attr("code");
      var inxx = 1;
      area(inxx);
      room(partCode, inxx);
    });

    // 上一分区
    $(".main-part").on("click", ".up-partition", function() {
      var inxx = $(".nav-list.left-dashboard-nav-active").index() - 1;
      var partCode = $(".nav-list")
        .eq(inxx)
        .attr("code");
      if (inxx > 0) {
        if(scene) {
          $(".roomZone .content-box").html("")
          clearThree()
        }
        area(inxx);
        room(partCode, inxx);
      }
    });

    // 下一分区
    $(".main-part").on("click", ".down-partition", function() {
      var inxx = $(".nav-list.left-dashboard-nav-active").index() + 1;
      var partCode = $(".nav-list")
        .eq(inxx)
        .attr("code");
      var length = $(".nav-list").length;
      if (inxx < length) {
        if(scene) {
          $(".roomZone .content-box").html("")
          clearThree()
        }
        area(inxx);
        room(partCode, inxx);
      }
    });

    // 最后分区
    $(".main-part").on("click", ".last-partition", function() {
      if(scene) {
          $(".roomZone .content-box").html("")
          clearThree()
      }
      var length = $(".nav-list").length - 1;
      var inxx = length;
      var partCode = $(".nav-list")
        .eq(inxx)
        .attr("code");
      area(inxx);
      room(partCode, inxx);
    });

    // 分区操作
    function area(inxx) {
      if (inxx > 0) {
        $(".main-part-title").text(
          $(".zone")
            .eq(inxx)
            .find(".all-room-tltle")
            .text()
        );
      }

      $(".zone")
        .eq(inxx)
        .removeClass("hide");
      $(".zone")
        .eq(inxx)
        .siblings(".main-part-content")
        .addClass("hide");
      $(".nav-list")
        .eq(inxx)
        .addClass("left-dashboard-nav-active");
      $(".nav-list")
        .eq(inxx)
        .siblings()
        .removeClass("left-dashboard-nav-active");
    }

    function room(partCode, inxx) {
        clearTimeout(finder.timer0)
        clearTimeout(finder.timer1)

        let surge,  // Json 数据
            props = {
                describArr: [],  // 机箱名称
                machinePositionArr: [],  // 机箱位置
                airPositionArr: [],  // 空调位置
                smokePositionArr: [],   // 烟感位置
                temperaturePositionArr: [],  // 温感位置
                controllerPositionArr: [],  // 控制器位置
                fontPositionArr: [],  // 名称位置
                inxx: inxx,
                partCode: partCode

            }
        $.post(baseURL + "/fiSafety.htm?param_act=fiSafetySingleRoomInfo",{partCode: partCode},function(result,state){
            surge = JSON.parse(result)
            if (state == 'success') {
                // 机柜空调坐标、名称以及名称坐标
                $.each(surge.List[0].describ, function(index, val) {
                    if (val.CABINET_TYPE == "0") {
                        props.machinePositionArr.push(val.CABINET_COORDINATE.split(","))
                    } else if (val.CABINET_TYPE == "1") {
                        props.airPositionArr.push(val.CABINET_COORDINATE.split(","))
                    }
                    props.fontPositionArr.push(val.DESCRIB_COORDINATE.split(","))
                    props.describArr.push(val.CABINET_NAME)
                })
                // 烟感、温感、控制器坐标
                $.each(surge.List[0].equipInfo, function(index, val) {
                    // 温感
                    if (val.eqType == "02") {
                        props.temperaturePositionArr.push(val.EQ_COORDINATE.split(","))
                    // 烟感
                    } else if (val.eqType == "03") {
                        props.smokePositionArr.push(val.EQ_COORDINATE.split(","))
                    // 控制器
                    } else if (val.eqType == "25" || "29") {
                        props.controllerPositionArr.push(val.EQ_COORDINATE.split(","))
                    }
                })
                if(props.inxx > 0){
                  workshop(props,finder)
                }
            } else {
                console.log('axisJson 数据异常')
            }
        })
    }

    function workshop(props,finder) {
        three.width = $(".roomZone .content-box").eq(props.inxx - 1).width()
        three.height = $(".roomZone .content-box").eq(props.inxx - 1).height()

        //兼容性判断
        // (!Detector.webgl) && Detector.addGetWebGLMessage()

        // 建造场景
        function initScene() {
            scene = new THREE.Scene()
            scene.position.z = 120
        }

        //初始化dat.GUI简化试验流程
        function initGui() {
            //声明一个保存需求修改的相关数据的对象
            three.gui = {
                x:0,
                y:0,
                z:120
            }
            three.datGui = new dat.GUI()
            //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
            three.datGui.add(three.gui,"x",-500,500)
            three.datGui.add(three.gui,"y",-500,500)
            three.datGui.add(three.gui,"z",-500,500)
        }

        // 透视投影相机
        function initCamera() {
            three.camera =  new THREE.PerspectiveCamera(35,three.width / three.height,0.1,3000)  // 可视角度，显示口的宽高比，近裁剪面，远裁剪面
            three.camera.position.set(0, 1000, 1100)
            three.camera.lookAt(new THREE.Vector3(0, 2500, 0)) // 设置摄像机观察的方向
        }

        // 渲染器
        function initRender() {
            renderer = new THREE.WebGLRenderer({antialias: true}) // 新建一个渲染器, 渲染器用来输出最终结果
            renderer.setSize(three.width, three.height) // 设置渲染的尺寸, 在这里是浏览器尺寸
            renderer.setClearColor(three.background) // 设置背景的颜色
            renderer.shadowMap.enabled = true // 设置是否开启投影, 开启的话, 光照会产生投影
            renderer.shadowMap.type = THREE.PCFSoftShadowMap // 设置投影类型, 这边是柔和投影
            $(".roomZone .content-box").eq(props.inxx - 1).append(renderer.domElement) // 创建 canvas
        }

        // 光源
        function initLight() {
            // 平行的一束光，模拟从很远处照射的太阳光
            // DirectionalLight( color, intensity )

            three.light = new THREE.DirectionalLight(0xffffff, 1)  // color — 光的颜色值，十六进制，默认值为0xffffff,intensity — 光的强度，默认值为1
            three.light.position.set(500, 1000, 500)
            three.light.target.position.set(0, 0, 0)
            three.light.castShadow = false
            const d = 300
            // 正交投影相机
            // var camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far)
            three.light.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 500, 1600 )
            three.light.shadow.bias = 0.0001
            three.light.shadow.mapSize.width = three.light.shadow.mapSize.height = 1024
            scene.add(three.light)
            // 环境光( AmbientLight )：笼罩在整个空间无处不在的光
            scene.add(new THREE.AmbientLight(0xffffff, 0.3))
        }

        function initModel() {
            // 辅助工具
            // three.helper = new THREE.AxisHelper(1000)
            // scene.add(three.helper)
            // 文字模型
            function fontModel(fontPositionArr,describArr) {
                loader = new THREE.FontLoader()
                loader.load("../../static/3D/font/MicrosoftYaHei_Regular.json",function(res) {
                    for (let i = 0,l = fontPositionArr.length; i <l ; i++) {
                        geometry = new THREE.TextBufferGeometry(describArr[i], {
                            font: res,
                            size: 11,
                            height: 1
                        })
                        geometry.computeBoundingBox() // 运行以后设置font的boundingBox属性对象，如果不运行无法获得。
                        material = new THREE.MeshLambertMaterial({})
                        model = new THREE.Mesh(geometry, material)
                        //设置位置
                        modelClone = model.clone()
                        modelClone.position.set(fontPositionArr[i][0], fontPositionArr[i][1], fontPositionArr[i][2])
                        scene.add(modelClone)
                    }
                })
            }
            // 底座
            function base() {
                // 创建底座 长/宽/高
                geometry = new THREE.BoxBufferGeometry(1000, 10, 600)
                // 设置材质
                texture = new THREE.TextureLoader().load( "../../static/3D/img/floor.jpg")
                texture.wrapS = THREE.RepeatWrapping
                texture.wrapT = THREE.RepeatWrapping
                texture.repeat.set(8, 8)
                material = new THREE.MeshLambertMaterial({ map: texture, color: 0xc6e2ff})
                model = new THREE.Mesh(geometry,material)
                model.rotation.z = -Math.PI
                model.position.y = -1
                model.name = 'base'
                scene.add(model)
            }
            // 机柜
            function machine(machinePositionArr) {
                // 机柜
                object = new THREE.Object3D()

                // 机柜正面
                texture = new THREE.TextureLoader().load(
                    "../../static/3D/img/rack_front_door.jpg"
                )
                material = new THREE.MeshPhongMaterial({
                    map: texture
                })
                geometry = new THREE.BoxGeometry(2, 300, 150)
                model = new THREE.Mesh(geometry, material)
                model.rotation.y = -0.5 * Math.PI
                model.position.set(0, 152, 0)
                object.add(model)

                // 机柜背面
                texture = new THREE.TextureLoader().load(
                    "../../static/3D/img/rack_door_back.jpg"
                )
                material = new THREE.MeshPhongMaterial({
                    map: texture
                })
                geometry = new THREE.BoxGeometry(2, 300, 150)
                model = new THREE.Mesh(geometry,material)
                model.rotation.y = -0.5 * Math.PI
                model.position.set(0, 152, -140)
                object.add(model)

                // 机柜左侧
                texture = new THREE.TextureLoader().load(
                    "../../static/3D/img/rack_panel.jpg"
                )
                material = new THREE.MeshPhongMaterial({
                    map: texture,
                    color: 0x383838
                })
                geometry = new THREE.BoxGeometry(2, 300, 140)
                model = new THREE.Mesh(geometry, material)
                model.position.set(-75, 152, -70)
                object.add(model)

                // 机柜右侧
                modelClone = model.clone()
                modelClone.position.set(75, 152, -70)
                object.add(modelClone)

                // 机柜底部
                texture = new THREE.TextureLoader().load(
                    "../../static/3D/img/rack_panel.jpg"
                )
                material = new THREE.MeshPhongMaterial({
                    map: texture,
                    color: 0x383838
                })
                geometry = new THREE.BoxGeometry(150,2,140)
                model = new THREE.Mesh(geometry,material)
                model.position.set(0, 2, -70)
                object.add(model)

                // 机柜顶部
                texture = new THREE.TextureLoader().load(
                    "../../static/3D/img/rack_panel.jpg"
                )
                material = new THREE.MeshPhongMaterial({
                    map: texture,
                    color: 0x383838
                })
                geometry = new THREE.BoxGeometry(140, 40, 150)
                model = new THREE.Mesh(geometry,material)
                model.position.set(0, 290, -70)
                object.add(model)
                object.name = 'machine'

                // 机柜克隆
                for (let i = 0,l = machinePositionArr.length; i < l; i++) {
                    objectClone = object.clone()
                    objectClone.position.set(machinePositionArr[i][0],machinePositionArr[i][1],machinePositionArr[i][2])
                    scene.add(objectClone)
                }
            }
            // 空调
            function air(airPositionArr) {
                // 空调
                object = new THREE.Object3D()
                // 空调正面
                texture = new THREE.TextureLoader().load(
                    "../../static/3D/img/rack_inside.jpg"
                )
                material = new THREE.MeshBasicMaterial({
                    map: texture,
                    color: 0xffffff
                })
                geometry = new THREE.BoxGeometry(2, 300, 150)
                model = new THREE.Mesh(geometry,material)

                // 空调正面打孔
                geo = new THREE.BoxGeometry(2, 60, 120)
                mat = new THREE.MeshPhongMaterial({
                    color: 0x4a708b
                })
                mod = new THREE.Mesh(geo,mat)
                mod.position.y = 87
                bsp = new ThreeBSP(model).subtract(new ThreeBSP(mod))

                geo = new THREE.BoxGeometry(2, 40, 35)
                mat = new THREE.MeshPhongMaterial({
                    color: 0x4a708b
                })
                mod = new THREE.Mesh(geo,mat)
                mod.position.y = -118
                bsp = bsp.subtract(new ThreeBSP(mod))

                mod = mod.clone()
                mod.position.z = 45
                bsp = bsp.subtract(new ThreeBSP(mod))

                mod = mod.clone()
                mod.position.z = -45
                bsp = bsp.subtract(new ThreeBSP(mod))
                model = bsp.toMesh()
                // 更新模型的面和顶点的数据
                model.geometry.computeFaceNormals()
                model.geometry.computeVertexNormals()
                model.material = new THREE.MeshPhongMaterial({
                    color: 0xebebeb
                })
                model.rotation.y = -0.5 * Math.PI
                model.position.set(0, 152, 0)
                object.add(model)

                // 缺口处补充网格
                texture = new THREE.TextureLoader().load(
                    "../../static/3D/img/flag.jpg"
                )
                material = new THREE.MeshBasicMaterial({
                    map: texture,
                    color: 0xffffff
                })
                geometry = new THREE.BoxGeometry(120, 60, 2)
                model = new THREE.Mesh(geometry, material)
                model.position.z = 0
                model.position.y = 240
                object.add(model)

                texture = new THREE.TextureLoader().load(
                    "../../static/3D/img/eee.png"
                )
                material = new THREE.MeshBasicMaterial({
                    map: texture,
                    color: 0xffffff
                })
                geometry = new THREE.BoxGeometry(35, 40, 2)
                model = new THREE.Mesh(geometry, material)
                model.position.z = 0
                model.position.y = 35
                object.add(model)

                model = model.clone()
                model.position.x = 45
                object.add(model)

                model = model.clone()
                model.position.x = -45
                object.add(model)

                // 密码锁
                texture = new THREE.TextureLoader().load(
                    "../../static/3D/img/lock.png"
                )
                material = new THREE.MeshBasicMaterial({
                    map: texture,
                    color: 0xffffff
                })
                geometry = new THREE.BoxGeometry(18, 24, 10)
                model= new THREE.Mesh(geometry, material)
                model.position.y = 166
                model.position.x = 0
                object.add(model)

                // 空调背面
                texture = new THREE.TextureLoader().load(
                    "../../static/3D/img/rack_inside.jpg"
                )
                material = new THREE.MeshPhongMaterial({
                    map: texture,
                    color: 0xffffff
                })
                geometry = new THREE.BoxGeometry(2, 300, 150)
                model = new THREE.Mesh(geometry, material)
                model.rotation.y = -0.5 * Math.PI
                model.position.set(0, 152, -140)
                object.add(model)

                // 空调左侧面
                texture = new THREE.TextureLoader().load(
                    "../../static/3D/img/rack_inside.jpg"
                )
                material = new THREE.MeshPhongMaterial({
                    map: texture,
                    color: 0xffffff
                })
                geometry = new THREE.BoxGeometry(2, 300, 140)
                model = new THREE.Mesh(geometry, material)
                model.position.set(-75, 152, -70)
                object.add(model)

                // 空调右侧面
                model = model.clone()
                model.position.set(75, 152, -70)
                object.add(model)

                // 空调底部
                texture = new THREE.TextureLoader().load(
                    "../../static/3D/img/rack_inside.jpg"
                )
                material = new THREE.MeshPhongMaterial({
                    map: texture,
                    color: 0xffffff
                })
                geometry = new THREE.BoxGeometry(150, 2, 140)
                model = new THREE.Mesh(geometry, material)
                model.position.set(0, 2, -70)
                object.add(model)

                // 空调顶部
                texture = new THREE.TextureLoader().load(
                    "../../static/3D/img/rack_inside.jpg"
                )
                material = new THREE.MeshPhongMaterial({
                    map: texture,
                    color: 0x63b8ff
                })
                geometry = new THREE.BoxGeometry(140, 40, 150)
                model = new THREE.Mesh(geometry, material)
                model.position.set(0, 290, -70)
                object.add(model)
                object.name = 'air'

                // 空调克隆
                for (let i = 0,l = airPositionArr.length; i < l; i++) {
                    objectClone = object.clone()
                    objectClone.position.set(airPositionArr[i][0], airPositionArr[i][1], airPositionArr[i][2])
                    scene.add(objectClone)
                }
            }
            // 烟感
            function smoke(x,y,z,i) {
                // 烟感
                object = new THREE.Object3D()

                // 底座
                geometry = new THREE.CylinderGeometry(20, 20, 10, 40, 5)
                material = new THREE.MeshPhongMaterial({
                    color: 0xe8e8e8
                })
                model = new THREE.Mesh(geometry, material)
                model.position.set(0, 96, 0)
                object.add(model)

                // 玻璃体
                geometry = new THREE.CylinderGeometry(16, 16, 4, 40, 5)
                material = new THREE.MeshBasicMaterial({
                    color: 0x008b00,
                    opacity: 0.4,
                    transparent: true
                })
                model = new THREE.Mesh(geometry,material)
                model.position.set(0, 102, 0)
                object.add(model)

                // 顶部
                geometry = new THREE.CylinderGeometry(8, 10, 5, 40, 5)
                material = new THREE.MeshPhongMaterial({
                    color: 0xe8e8e8
                })
                model = new THREE.Mesh(geometry,material)
                model.position.set(0, 106, 0)
                object.add(model)
                object.name = `smoke-${i}`
                object.position.set(x, y, z)

                return object
            }
            // 温感
            function temperature(x,y,z,i) {
                // 温感
                object = new THREE.Object3D()

                // 温感底座
                geometry = new THREE.CylinderGeometry(20,20,10,40,40)
                material = new THREE.MeshPhongMaterial({
                    color: 0xe8e8e8
                })
                model = new THREE.Mesh(geometry,material)
                model.position.set(0, 96, 0)
                object.add(model)

                // 玻璃体
                geometry = new THREE.CylinderGeometry(20,20,8,40,5)
                material = new THREE.MeshPhongMaterial({
                    color: 0x000080,
                    opacity: 0.8,
                    transparent: true
                })
                model = new THREE.Mesh(geometry,material)
                model.position.set(0, 105, 0)
                object.add(model)

                // 温感顶部
                geometry = new THREE.SphereGeometry(20,20,6,0,Math.PI * 2,0,Math.PI / 2)
                material = new THREE.MeshPhongMaterial({
                    color: 0xe8e8e8,
                })
                model = new THREE.Mesh(geometry,material)
                model.position.set(0, 109, 0)
                object.add(model)
                object.name = `temperature-${i}`
                object.position.set(x, y, z)

                return object
            }

            // 控制器
            function controller(x,y,z,i) {
                // 控制器
                object = new THREE.Object3D()

                // 控制器主体
                geometry = new THREE.BoxGeometry(40,30,40)
                material = new THREE.MeshPhongMaterial({
                    color: 0xe8e8e8,
                })
                model = new THREE.Mesh(geometry,material)
                model.position.set(0, 103, 0)
                object.add(model)

                // 控制器左侧
                geometry = new THREE.BoxGeometry(9,26,43)
                material = new THREE.MeshPhongMaterial({
                    color: 0x848484,
                    opacity: 0.9,
                    transparent: true
                })
                model = new THREE.Mesh(geometry,material)
                model.position.set(-20, 96, 0)
                object.add(model)

                // 控制器右侧
                model = model.clone()
                model.position.set(20, 96, 0)
                object.add(model)

                // 控制器指示灯
                geometry = new THREE.CircleGeometry(1.4,36,0,Math.PI * 2)
                material = new THREE.MeshPhongMaterial({
                    color: 0x00ee00,
                    opacity: 0.9,
                    transparent: true
                })
                model = new THREE.Mesh(geometry,material)
                model.position.set(-10, 107, 21)
                object.add(model)

                material = new THREE.MeshPhongMaterial({
                    color: 0xeeee00,
                    opacity: 0.9,
                    transparent: true
                })
                model = new THREE.Mesh(geometry,material)
                model.position.set(-5, 107, 21)
                object.add(model)

                material = new THREE.MeshPhongMaterial({
                    color: 0xee0000,
                    opacity: 0.9,
                    transparent: true
                })
                model = new THREE.Mesh(geometry,material)
                model.position.set(0, 107, 21)
                object.add(model)

                // 控制器按钮组
                geometry = new THREE.BoxGeometry(10,6,0.5)
                material = new THREE.MeshPhongMaterial({
                    color: 0x4a708b
                })
                model = new THREE.Mesh(geometry,material)
                model.castShadow = false
                model.position.set(-3, 98, 21)
                object.add(model)

                modelClone = model.clone()
                modelClone.position.set(9, 98, 21)
                object.add(modelClone)
                object.name = `controller-${i}`
                object.position.set(x, y, z)

                return object
            }
            // 创造温感、烟感、控制器
            // 注：因为具有分别闪烁功能，因此不能使用 Clone 方法
            function inventor(smokePositionArr,temperaturePositionArr,controllerPositionArr){
                for (let i = 0,l = smokePositionArr.length; i < l; i++) {
                    equip = smoke(smokePositionArr[i][0],smokePositionArr[i][1],smokePositionArr[i][2],i)
                    scene.add(equip)
                    equip = null
                }
                for (let i = 0,l = temperaturePositionArr.length; i < l; i++) {
                    equip = temperature(temperaturePositionArr[i][0],temperaturePositionArr[i][1],temperaturePositionArr[i][2],i)
                    scene.add(equip)
                    equip = null
                }
                for (let i = 0,l = controllerPositionArr.length; i < l; i++) {
                    equip = controller(controllerPositionArr[i][0],controllerPositionArr[i][1],controllerPositionArr[i][2],i)
                    scene.add(equip)
                    equip = null
                }
            }
            // 文字模型
            fontModel(props.fontPositionArr, props.describArr)
            // 底座
            base()
            // 机柜
            machine(props.machinePositionArr)
            // 空调
            air(props.airPositionArr)
            // 温感、烟感、控制器
            inventor(props.smokePositionArr,props.temperaturePositionArr,props.controllerPositionArr)
        }
        // 动画
        function animate() {
            let alarm = {
                arr1: [],  // 烟感状态
                arr2: [],  // 温感状态
                arr3: [],  // 控制器状态
                surge: null,
                smoke: [],
                temperature: [],
                controller: []
            }
            // 请求闪光信息
            $.post(baseURL + "/fiSafety.htm?param_act=fiSafetySingleRoomInfo",{partCode: props.partCode},function(result,state){
                alarm.surge = JSON.parse(result)
                if (state == 'success') {
                    $.each(alarm.surge.List[0].equipInfo, function(index, val) {
                        // 温感
                        if (val.eqType == "02") {
                            // 连接正常
                            if (val.Quality == "OPC_QUALITY_GOOD") {
                                if (val.State == "0") {
                                    alarm.arr1.push("normal")
                                } else if (val.State == "1") {
                                    alarm.arr1.push("fire")
                                } else if (val.State == "4") {
                                    alarm.arr1.push("fault")
                                }
                            } else if (val.Quality == "OPC_QUALITY_NOT_CONNECTED") {
                                alarm.arr1.push("interrupt")
                            }
                        // 烟感
                        } else if (val.eqType == "03") {
                            if (val.Quality == "OPC_QUALITY_GOOD") {
                                if (val.State == "0") {
                                    alarm.arr2.push("normal")
                                } else if (val.State == "1") {
                                    alarm.arr2.push("fire")
                                } else if (val.State == "4") {
                                    alarm.arr2.push("fault")
                                }
                            } else if (val.Quality == "OPC_QUALITY_NOT_CONNECTED") {
                                alarm.arr2.push("interrupt")
                            }
                        // 控制器
                        } else if (val.eqType == "25" || "29") {
                            if (val.Quality == "OPC_QUALITY_GOOD") {
                                if (val.State == "0") {
                                    alarm.arr3.push("normal")
                                } else if (val.State == "1") {
                                    alarm.arr3.push("fire")
                                } else if (val.State == "4") {
                                    alarm.arr3.push("fault")
                                }
                            } else if (val.Quality == "OPC_QUALITY_NOT_CONNECTED") {
                                alarm.arr3.push("interrupt")
                            }
                        }
                    })
                    // 筛选数组
                    for (let i = 0,l = scene.children.length;i < l;i++){
                        let name = scene.children[i].name
                        if (name.substr(0,name.length-2) == `smoke`){
                            alarm.smoke.push(scene.children[i])
                        } else if (name.substr(0,name.length-2) == `temperature`){
                            alarm.temperature.push(scene.children[i])
                        } else if (name.substr(0,name.length-2) == `controller`){
                            alarm.controller.push(scene.children[i])
                        }
                    }
                    // 烟感闪光
                    for(let i = 0,l = alarm.smoke.length;i < l;i++){
                        blink(alarm.arr1[i],alarm.smoke[i].children[2])
                    }
                    // 温感闪光
                    for(let i = 0,l = alarm.temperature.length;i < l;i++){
                        blink(alarm.arr2[i],alarm.temperature[i].children[2])
                    }
                    // 控制器闪光
                    for(let i = 0,l = alarm.controller.length;i < l;i++){
                        blink(alarm.arr3[i],alarm.controller[i].children[0])
                    }
                } else {
                    console.log('axisJson 数据异常')
                }
            })
            // 10s请求数据
            finder.timer0 = setTimeout(function() {
                clearTimeout(finder.timer1)
                animate()
            }, 10000)
        }
        // 闪光动画
        function blink(flag,equip) {
            let colorindex = 0,
                colorArray = []
            if (flag == "interrupt") {
                colorArray = [0xe8e8e8, 0xeeee00]
                timer(colorindex,colorArray)
            } else if (flag == "fault") {
                colorArray = [0xe8e8e8, 0xff8247]
                timer(colorindex,colorArray)
            } else if (flag == "fire") {
                colorArray = [0xe8e8e8, 0xee0000]
                timer(colorindex,colorArray)
            }
            // 颜色更替
            function timer(colorindex,colorArray) {
                colorindex++
                if (colorindex == 2) {
                    colorindex = 0
                }
                equip.material.color.set(colorArray[colorindex])
                finder.timer1 = setTimeout(function() {
                    timer(colorindex,colorArray)
                }, 1000)
            }
        }
        //初始化性能插件
        function initStats () {
            three.stats = new Stats()
            document.body.appendChild(three.stats.dom)
        }

        // 鼠标控制
        function initControls() {
            three.controls = new THREE.OrbitControls(three.camera, renderer.domElement)
            //设置控制器的中心点
            //controls.target.set( 0, 5, 0 )
            // 如果使用animate方法时，将此函数删除
            //controls.addEventListener( 'change', render )
            // 使动画循环使用时阻尼或自转 意思是否有惯性
            three.controls.enableDamping = true
            //动态阻尼系数 就是鼠标拖拽旋转灵敏度
            three.controls.dampingFactor = 0.25
            // 旋转速度
            three.controls.rotateSpeed = 0.35
            //是否可以缩放
            three.controls.enableZoom = true
            //是否自动旋转
            three.controls.autoRotate = false
            three.controls.autoRotateSpeed = 0.5
            //设置相机距离原点的最远距离
            three.controls.minDistance = 1
            //设置相机距离原点的最远距离
            three.controls.maxDistance = 2000
            //是否开启右键拖拽
            three.controls.enablePan = true
        }

        function loop() {
            //更新性能插件
            // three.stats.update()
            renderer.render(scene, three.camera) // 渲染器开始渲染, scene 和 camera 是必须参数, 因为场景里有动画, 所以放在 loop 里循环
            //更新相关位置
            // scene.position.x = three.gui.x
            // scene.position.y = three.gui.y
            // scene.position.z = three.gui.z

            // three.controls.update()
            three.loop = requestAnimationFrame(loop)
        }

        // 窗口自适应
        function onWindowResize() {
            window.addEventListener('resize', function() {
                three.camera.aspect = three.width / three.height
                three.camera.updateProjectionMatrix()
                renderer.setSize(three.width, three.height)
            })
        }

        function draw() {
            // 兼容性判断
            // if (!Detector.webgl) Detector.addGetWebGLMessage()
            initScene()
            // initGui()
            initCamera()
            initRender()
            initLight()
            initModel()
            animate()
            initControls()
            // initStats()
            loop()
            onWindowResize()
        }
        // 执行函数
          draw()
    }
    function clearThree(){
      cancelAnimationFrame(three.loop)
      material.dispose()
      texture.dispose()
      geometry.dispose()
      renderer.dispose()
      three.controls.dispose()
      for(let i = scene.children.length-1;i>-1;i--){
        if(scene.children[i].type == 'Object3D'){
          for(let q = scene.children[i].children.length-1;q >-1 ;q--){
            if(scene.children[i].children[q].material.map){scene.children[i].children[q].material.map.dispose()}
              scene.children[i].children[q].geometry.dispose()
              scene.children[i].children[q].material.dispose()
              scene.children[i].remove(scene.children[i].children[q])
          }
        }else if(scene.children[i].type == 'Mesh'){
          if(scene.children[i].material.map){scene.children[i].material.map.dispose()}
            scene.children[i].geometry.dispose()
            scene.children[i].material.dispose()
        }else if(scene.children[i].type == 'LineSegments'){
          scene.children[i].geometry.dispose()
          scene.children[i].material.dispose()
        }
        scene.remove(scene.children[i])
      }
      renderer = null
      scene = null
    }

    function getFormatDate(date) {
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate =
        date.getFullYear() + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }

    // 点击跳转到->全部电气室（消防报警统计分析）- 柱状图
    $(".btn-all-analysis").click(function() {
      if ($(".btn-all-analysis").is(".btn-select")) {
        $(this)
          .parents(".main-part-content")
          .addClass("hide");
        $("#all-analysis").removeClass("hide");
        // 全部电气室（消防报警统计分析）- 柱状图
        // 获取电气室的id
        var partCode = "";
        for (var i = 0; i < $(".select-box-select").length; i++) {
          partCode +=
            $(".select-box-select")
              .eq(i)
              .attr("id") + ",";
        }
        // 去掉最后一个逗号
        if (partCode.length > 0) {
          partCode = partCode.substr(0, partCode.length - 1);
        }
        _this.checkbox1 = ["中断", "故障", "火警"];
        var warn = "-1,4,1";
        var today = new Date();
        var pastDate = new Date();
        var submitEndTime = getFormatDate(today);
        _this.endDate = submitEndTime;
        pastDate.setTime(today.getTime() - 3600 * 1000 * 24 * 90);
        var submitStartTime = getFormatDate(pastDate);
        _this.startDate = submitStartTime;
        var start = _this.startDate;
        var end = _this.endDate;
        histogram(partCode, warn, start, end);

        $("#all-analysis .btn-analysis").click(function() {
          // 开始日期
          var start = _this.startDate;
          // 结束日期
          var end = _this.endDate;
          // 获取checkbox的选中状态
          var arr = _this.checkbox1;
          var warnArr = [];
          for (var j = 0; j < arr.length; j++) {
            if (arr[j] == "中断") {
              warnArr.push(-1);
            } else if (arr[j] == "火警") {
              warnArr.push(1);
            } else if (arr[j] == "故障") {
              warnArr.push(4);
            }
          }
          if (warnArr.length == 0) {
            alert("预警类型不能为空！");
          }
          var warn = warnArr.join(",");
          histogram(partCode, warn, start, end);
        });

        $("#all-analysis .btn-reset").click(function() {
          _this.checkbox1 = ["中断", "故障", "火警"];
        });

        // 请求后台数据
        function histogram(partCode, warn, start, end) {
          $.post(
            baseURL + "fiSafety.htm?param_act=fiSafetyAnalysis",
            {
              partCode: partCode,
              warn: warn,
              start: start,
              end: end
            },
            function(result) {
              var data = JSON.parse(result);
              var xData = [];
              var seriesArr = [];
              var arr;
              var colorArr = [];
              var stateArr = [];
              var y1Data = [];
              var y2Data = [];
              var y3Data = [];
              $.each(data.List[0].pic, function(index, val) {
                xData.push(val.partName);
                // 火警 中断 故障的数据遍历
                $.each(val.count, function(i, v) {
                  if (v.state == "-1") {
                    y1Data.push(v.num);
                  } else if (v.state == "4") {
                    y2Data.push(v.num);
                  } else if (v.state == "1") {
                    y3Data.push(v.num);
                  }
                });
              });

              var stateArr = warn.split(",");
              for (var j in stateArr) {
                if (stateArr[j] == "-1") {
                  colorArr.push("#EFD83B");
                  arr = {
                    name: "中断",
                    type: "bar",
                    barGap: 0,
                    data: y1Data
                  };
                } else if (stateArr[j] == "4") {
                  colorArr.push("#FF852C");
                  arr = {
                    name: "故障",
                    type: "bar",
                    barGap: 0,
                    data: y2Data
                  };
                } else if (stateArr[j] == "1") {
                  colorArr.push("#FF4646");
                  arr = {
                    name: "火警",
                    type: "bar",
                    barGap: 0,
                    data: y3Data
                  };
                }
                seriesArr.push(arr);
              }
              // 遍历table的数据
              _this.tableAll = data.List[0].table;
              // echarts
              var app = echarts.init(
                document.getElementById("all-analysis-echarts")
              );
              var posList = [
                "left",
                "right",
                "top",
                "bottom",
                "inside",
                "insideTop",
                "insideLeft",
                "insideRight",
                "insideBottom",
                "insideTopLeft",
                "insideTopRight",
                "insideBottomLeft",
                "insideBottomRight"
              ];

              app.configParameters = {
                rotate: {
                  min: -90,
                  max: 90
                },
                align: {
                  options: {
                    left: "left",
                    center: "center",
                    right: "right"
                  }
                },
                verticalAlign: {
                  options: {
                    top: "top",
                    middle: "middle",
                    bottom: "bottom"
                  }
                },
                position: {
                  options: echarts.util.reduce(
                    posList,
                    function(map, pos) {
                      map[pos] = pos;
                      return map;
                    },
                    {}
                  )
                },
                distance: {
                  min: 0,
                  max: 100
                }
              };

              app.config = {
                rotate: 90,
                align: "left",
                verticalAlign: "middle",
                position: "insideBottom",
                distance: 15,
                onChange: function() {
                  var labelOption = {
                    normal: {
                      rotate: app.config.rotate,
                      align: app.config.align,
                      verticalAlign: app.config.verticalAlign,
                      position: app.config.position,
                      distance: app.config.distance
                    }
                  };
                  myChart.setOption({
                    series: [
                      {
                        label: labelOption
                      },
                      {
                        label: labelOption
                      },
                      {
                        label: labelOption
                      },
                      {
                        label: labelOption
                      }
                    ]
                  });
                }
              };

              var labelOption = {
                normal: {
                  show: true,
                  position: app.config.position,
                  distance: app.config.distance,
                  align: app.config.align,
                  verticalAlign: app.config.verticalAlign,
                  rotate: app.config.rotate,
                  formatter: "{c}  {name|{a}}",
                  fontSize: 16,
                  rich: {
                    name: {
                      textBorderColor: "#fff"
                    }
                  }
                }
              };

              var option = {
                color: colorArr,
                tooltip: {
                  trigger: "axis",
                  axisPointer: {
                    type: "shadow"
                  }
                },
                /*                 legend: {
                                  data: ['中断', '故障', '火警']
                                }, */
                toolbox: {
                  show: false,
                  orient: "vertical",
                  left: "right",
                  top: "center",
                  feature: {
                    mark: {
                      show: true
                    },
                    dataView: {
                      show: true,
                      readOnly: false
                    },
                    magicType: {
                      show: true,
                      type: ["line", "bar", "stack", "tiled"]
                    },
                    restore: {
                      show: true
                    },
                    saveAsImage: {
                      show: true
                    }
                  }
                },
                calculable: true,
                xAxis: [
                  {
                    type: "category",
                    axisTick: {
                      show: false
                    },
                    axisLabel: {
                      show: true,
                      textStyle: {
                        color: "#C7CEF2"
                      },
                      formatter: function(params) {
                        var newParamsName = ""; // 最终拼接成的字符串
                        var paramsNameNumber = params.length; // 实际标签的个数
                        var provideNumber = 9; // 每行能显示的字的个数
                        var rowNumber = Math.ceil(
                          paramsNameNumber / provideNumber
                        ); // 换行的话，需要显示几行，向上取整
                        /**
                         * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                         */
                        // 条件等同于rowNumber>1
                        if (paramsNameNumber > provideNumber) {
                          /** 循环每一行,p表示行 */
                          for (var p = 0; p < rowNumber; p++) {
                            var tempStr = ""; // 表示每一次截取的字符串
                            var start = p * provideNumber; // 开始截取的位置
                            var end = start + provideNumber; // 结束截取的位置
                            // 此处特殊处理最后一行的索引值
                            if (p == rowNumber - 1) {
                              // 最后一次不换行
                              tempStr = params.substring(
                                start,
                                paramsNameNumber
                              );
                            } else {
                              // 每一次拼接字符串并换行
                              tempStr = params.substring(start, end) + "\n";
                            }
                            newParamsName += tempStr; // 最终拼成的字符串
                          }
                        } else {
                          // 将旧标签的值赋给新标签
                          newParamsName = params;
                        }
                        //将最终的字符串返回
                        return newParamsName;
                      }
                    },
                    axisLine: {
                      lineStyle: {
                        color: "#2E2C48",
                        width: 1 //这里是为了突出显示加上的
                      }
                    },
                    data: xData
                  }
                ],
                yAxis: [
                  {
                    type: "value",
                    name: "单位：次",
                    nameTextStyle: {
                      color: "#828099" // y轴单位标签颜色
                    },
                    axisLabel: {
                      show: true,
                      textStyle: {
                        color: "#828099" // y轴单位坐标文字颜色
                      }
                    },
                    axisLine: {
                      lineStyle: {
                        color: "#2E2C48",
                        width: 1 // 这里是为了突出显示加上的
                      }
                    },
                    splitLine: {
                      // 网格线
                      show: true,
                      lineStyle: {
                        width: 1,
                        color: "#2E2C48"
                      }
                    }
                  }
                ],
                series: seriesArr
              };
              app.setOption(option, true);
              // echarts宽度重置
              $(window).on("resize", function() {
                app.resize();
              });
            }
          );
        }
      }
    });

    // 点击跳转到->单独电气室（消防报警统计分析）- 折线图
    $(".main-part").on("click", ".btn-part-analysis", function() {
      // 部分电气室-折线图
      // 获取当前电气室的id
      var partCode = "";
      partCode = $(this)
        .parents("section")
        .siblings(".all-room-tltle")
        .attr("code");
      var partName = $(this)
        .parents("section")
        .siblings(".all-room-tltle")
        .text();
      $(".all-room-tltle span").attr("code", partCode);
      $("#part-analysis .all-room-tltle span").text(partName);
      // 故障标识
      _this.checkbox2 = ["中断", "故障", "火警"];
      var warn = "-1,4,1";
      // 默认当前日期
      var today = new Date();
      var pastDate = new Date();
      var submitEndTime = getFormatDate(today);
      _this.endDate1 = submitEndTime;
      pastDate.setTime(today.getTime() - 3600 * 1000 * 24 * 90);
      var submitStartTime = getFormatDate(pastDate);
      _this.startDate1 = submitStartTime;
      var start = _this.startDate1;
      var end = _this.endDate1;

      $(this)
        .parents(".main-part-content")
        .addClass("hide");
      $("#part-analysis").removeClass("hide");
      // 初次加载echarts
      graph(partCode, warn, start, end);

      $("#part-analysis .btn-analysis").click(function() {
        var partCode = $(".all-room-tltle span").attr("code");
        // 开始日期
        var start = _this.startDate1;
        // 结束日期
        var end = _this.endDate1;
        // 获取checkbox的选中状态
        var arr = _this.checkbox2;
        var warnArr = [];
        for (var j = 0; j < arr.length; j++) {
          if (arr[j] == "中断") {
            warnArr.push(-1);
          } else if (arr[j] == "火警") {
            warnArr.push(1);
          } else if (arr[j] == "故障") {
            warnArr.push(4);
          }
        }
        if (warnArr.length == 0) {
          alert("预警类型不能为空！");
        }
        var warn = warnArr.join(",");
        var partCode = partCode;
        graph(partCode, warn, start, end);
      });
      $("#part-analysis .btn-reset").click(function() {
        _this.checkbox2 = ["中断", "故障", "火警"];
      });

      function graph(partCode, warn, start, end) {
        $.post(
          baseURL + "fiSafety.htm?param_act=fiSafetySingleAnalysis",
          {
            partCode: partCode,
            warn: warn,
            start: start,
            end: end
          },
          function(result) {
            var data = JSON.parse(result);
            var xData = [];
            var seriesArr = [];
            var arr;
            var colorArr = [];
            var stateArr = [];
            // 故障
            var y1Data = [];
            // 中断
            var y2Data = [];
            // 火警
            var y3Data = [];
            $.each(data.List[0].pic, function(index, val) {
              $.each(val.exNum, function(i, v) {
                y1Data.push(v.breakNum);
                y2Data.push(v.faultNum);
                y3Data.push(v.fireNum);
              });
              xData.push(val.exDate);
            });

            var stateArr = warn.split(",");
            for (var j in stateArr) {
              if (stateArr[j] == "-1") {
                colorArr.push("#EFD83B");
                arr = {
                  name: "中断",
                  type: "line",
                  smooth: true,
                  data: y1Data
                };
              } else if (stateArr[j] == "4") {
                colorArr.push("#FF852C");
                arr = {
                  name: "故障",
                  type: "line",
                  smooth: true,
                  data: y2Data
                };
              } else if (stateArr[j] == "1") {
                colorArr.push("#FF4646");
                arr = {
                  name: "火警",
                  type: "line",
                  smooth: true,
                  data: y3Data
                };
              }
              seriesArr.push(arr);
            }
            _this.tablePart = data.List[0].table;
            var app = echarts.init(
              document.getElementById("part-analysis-echarts")
            );
            var option = {
              tooltip: {
                trigger: "axis"
              },
              color: colorArr,
              xAxis: {
                type: "category",
                data: xData,
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#C7CEF2"
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: "#2E2C48",
                    width: 1 //这里是为了突出显示加上的
                  }
                }
              },
              yAxis: {
                type: "value",
                name: "单位：次",
                nameTextStyle: {
                  color: "#828099" // y轴单位标签颜色
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#828099" // y轴单位坐标文字颜色
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: "#2E2C48",
                    width: 1 // 这里是为了突出显示加上的
                  }
                },
                splitLine: {
                  // 网格线
                  show: true,
                  lineStyle: {
                    width: 1,
                    color: "#2E2C48"
                  }
                }
              },
              series: seriesArr
            };
            app.setOption(option, true);
            $(window).on("resize", function() {
              app.resize();
            });
          }
        );
      }
    });
    // 右侧通知栏信息
    // 每5s刷新一次
    notify();
    function notify() {
      $.post(baseURL + "/fiSafety.htm?param_act=fiSafetyExpArea", function(
        result,
        state
      ) {
        var rightData = JSON.parse(result, state);
        _this.interrupt = rightData.List[0].连接中断信息;
        _this.fault = rightData.List[0].设备故障信息;
        _this.fire = rightData.List[0].火警信息;
        // 通知栏无通知的状态
        if (rightData.List[0].连接中断信息.length == 0) {
          $(".right-dashboard-info")
            .eq(0)
            .css(
              "background",
              "url(../../static/img/Firefighting/252070036001200.png) no-repeat center center"
            );
        }
        if (rightData.List[0].设备故障信息.length == 0) {
          $(".right-dashboard-info")
            .eq(1)
            .css(
              "background",
              "url(../../static/img/Firefighting/252070036001200.png) no-repeat center center"
            );
        }
        if (rightData.List[0].火警信息.length == 0) {
          $(".right-dashboard-info")
            .eq(2)
            .css(
              "background",
              "url(../../static/img/Firefighting/252070036001200.png) no-repeat center center"
            );
        }
      });
      time = setTimeout(function(){notify}, 10000);
    }
  },
  destroyed() {
    clearTimeout(time);
    clearTimeout(finder.timer0);
    clearTimeout(finder.timer1);
    clearTimeout(boxTime);
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
}
.sidebar-minimized.sidebar-fixed .main {
  margin-left: 140px !important;
}
.container-fluid {
  height: 100%;
  width: 100%;
}

.left-dashboard {
  width: 15%;
  height: 100%;
  float: left;
  background: #1e1e24;
}

.user-module {
  height: 133px;
  position: relative;
}

.left-dashboard-top {
  width: 100%;
  height: 140px;
  background: #2e2c48;
  margin-bottom: 50px;
  position: relative;
}
.user-line {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0 0 0px 6%;
}
.user-avatar {
  margin-top: 45px;
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
  border-radius: 50px;
  background: url(../../static/img/Firefighting/Avatar.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border: 2px solid #ffffff;
}

.user-name {
  margin-left: 5px;
  margin-top: 60px;
  height: 18px;
  font-size: 16px;
  color: #c7cef2;
  text-shadow: 3px 3px 3px RGBA(0, 43, 183, 0.6);
  min-width: 36px;
}

.user-tab {
  margin-top: 19px;
  margin-left: 5px;
  font-size: 12px;
  text-shadow: 3px 3px 3px RGBA(0, 43, 183, 0.6);
  color: #c7cef2;
  font-family: "SimSun";
}

.main-part {
  float: left;
  width: 64%;
  height: 100%;
  float: left;
  padding: 0 10px 10px 10px;
  background: #121214;
  overflow: hidden;
}

.main-part-title {
  height: 40px;
  width: 100%;
  background: #1e1e24;
  line-height: 40px;
  padding-left: 19px;
  font-size: 12px;
  color: #c7cef2;
  margin-bottom: 10px;
  font-family: "SimSun";
}

.main-part-content {
  width: 100%;
  background: #1e1e24;
  height: calc(100% - 50px);
  overflow-y: auto;
}

.all-room-tltle {
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  color: #c7cef2;
  text-align: center;
  border-bottom: 1px solid #2e2c48;
}

.main-part-content nav {
  height: 40px;
  width: 96%;
  margin-left: 2%;
}

.main-part-content nav ul.nav-ul-center {
  margin: 0 auto;
  width: 200px;
}

.main-part-content nav ul.nav-ul-center1 {
  margin: 0 auto;
  width: 240px;
}

.main-part-content nav.nav-line {
  border-bottom: 1px solid #2e2c48;
  font-family: "SimSun";
}

.main-part-content nav li {
  float: left;
  font-size: 12px;
  line-height: 40px;
  margin-right: 20px;
  color: #8084a2;
}

.main-part-content nav li img {
  margin-right: 5px;
  margin-bottom: 3px;
}

.main-part-content section {
  text-align: center;
}

.main-part-content section p:nth-child(1) {
  margin-top: 31px;
  font-size: 14px;
  color: #c7cef2;
}

.main-part-content section choose-tip {
  margin-top: 50px;
  color: #808080;
  font-size: 14px;
  font-family: "SimSun";
}

.main-part-content section .btn-all-analysis {
  margin-top: 10px;
  width: 160px;
  height: 30px;
  border-radius: 20px;
  background: #2e2c48;
  border: 1px solid #2e2c48;
  color: #8084a2;
  font-size: 14px;
  font-family: "SimSun";
  cursor: pointer;
}

.btn-select {
  background: #1b86ff !important;
  color: #ffffff !important;
  border: 1px solid #1b86ff !important;
  cursor: pointer;
}

.content-box {
  margin-top: 68px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 4%;
}

.roomZone .content-box {
  height: calc(100% - 208px);
}

.electrical-box {
  width: 320px;
  min-width: 320px;
  height: 220px;
  background: #1e1e24 url(../../static/img/Firefighting/Electrical-room.png);
  background-repeat: no-repeat;
  background-position: center center;
  margin-bottom: 35px;
  position: relative;
  border: 1px solid #2e2c48;
}

.border-select {
  border: 1px solid #1b86ff;
}

.electrical-box .select-box {
  background: url(../../static/img/Firefighting/unsele_l.png);
  width: 18px;
  height: 18px;
  border-radius: 18px;
  position: absolute;
  top: 11px;
  left: 10px;
  cursor: pointer;
}

.electrical-box .select-box-unselect {
  background: url(../../static/img/Firefighting/unsele_l.png);
}

.electrical-box .select-box-select {
  background: url(../../static/img/Firefighting/sele_l.png);
}

.electrical-box .box-title {
  width: 180px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  font-size: 16px;
  color: #ffffff;
  position: absolute;
  top: 76px;
  left: 54px;
}

.electrical-box .box-icon-bar {
  position: absolute;
  width: 200px;
  height: 32px;
  top: 127px;
  left: 58px;
}

.electrical-box .box-icon {
  width: 32px;
  height: 32px;
  border-radius: 32px;
  float: left;
  margin-right: 10px;
}

.electrical-box .box-normal-gray {
  background: url(../../static/img/Firefighting/normal_gray.png) no-repeat
    center;
  background-size: cover;
}

.electrical-box .box-fault-gray {
  background: url(../../static/img/Firefighting/fault_gray.png) no-repeat center;
  background-size: cover;
}

.electrical-box .box-interrupt-gray {
  background: url(../../static/img/Firefighting/interrupt_gray.png) no-repeat
    center;
  background-size: cover;
}

.electrical-box .box-fire-gray {
  background: url(../../static/img/Firefighting/fire_gray.png) no-repeat center;
  background-size: cover;
}

.box-normal {
  background: url(../../static/img/Firefighting/normal_selected.png) no-repeat
    center;
  background-size: cover;
}

.electrical-box .box-fault {
  background: url(../../static/img/Firefighting/故障.gif) no-repeat center;
  background-size: cover;
}

.electrical-box .box-interrupt {
  background: url(../../static/img/Firefighting/中断.gif) no-repeat center;
  background-size: cover;
}

.electrical-box .box-fire {
  background: url(../../static/img/Firefighting/火警.gif) no-repeat center;
  background-size: cover;
}

#all-analysis-echarts {
  height: 300px;
  width: 100%;
}

#all-analysis .content-box {
  margin-top: 33px;
}

#part-analysis-echarts {
  height: 300px;
  width: 100%;
}

#part-analysis .content-box {
  margin-top: 33px;
}

.box-tooltip {
  height: 40px;
}

.example-box {
  width: 12px;
  height: 12px;
  float: left;
  margin: 14px 6px 14px 0;
}

.example-box1 {
  width: 24px;
  height: 12px;
  float: left;
  margin: 14px 6px 14px 0;
}

.example-box-interrupt1 {
  background: url(../../static/img/Firefighting/interrupt_line.png);
  background-repeat: no-repeat;
}

.example-box-fault1 {
  background: url(../../static/img/Firefighting/fault_line.png);
  background-repeat: no-repeat;
}

.example-box-fire1 {
  background: url(../../static/img/Firefighting/fire_line.png);
  background-repeat: no-repeat;
}

.example-box-interrupt {
  background: #efd83b;
}

.example-box-fault {
  background: #ff852c;
}

.example-box-fire {
  background: #ff4646;
}

.box-toolbar {
  text-align: left;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  width: 96%;
  margin-left: 2%;
  border-bottom: 1px solid #2e2c48;
  font-family: "SimSun";
}

.box-toolbar label {
  color: #c7cef2;
}

.btn-group {
  float: right;
  margin-right: 2%;
  border-left: 1px solid #2e2c48;
  height: 30px;
  margin-top: 10px;
  line-height: normal;
  padding-left: 52px;
}

.btn-analysis {
  width: 100px;
  height: 30px;
  background: #1b86ff;
  border-radius: 15px;
  color: #ffffff;
  border: 1px solid #1b86ff !important;
  line-height: normal;
  cursor: pointer;
}

.btn-reset {
  width: 100px;
  height: 30px;
  background: #2e2c48;
  border-radius: 15px;
  color: #1b86ff;
  border: 1px solid #1b86ff !important;
  margin-left: 15px;
  line-height: normal;
  cursor: pointer;
}

.btn-part-analysis {
  width: 160px;
  height: 26px;
  background: #1b86ff;
  border-radius: 13px;
  margin-top: 0;
  color: #ffffff;
  margin-top: 5px;
  font-size: 12px;
  line-height: 26px;
  float: right;
  border: 1px solid #1b86ff;
  cursor: pointer;
}

.btn-part-analysis:active,
.btn-part-analysis:hover {
  background: #1b86ff;
  color: #ffffff;
  border: 1px solid #1b86ff;
}

.diy-table {
  width: 100%;
  height: 260px;
  padding-top: 40px;
  border-top: 1px solid #2e2c48;
}

.diy-table-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #2e2c48;
  color: #c7cef2;
  font-size: 16px;
  border-bottom: 1px solid #1e1e24;
}

.diy-table-ontology {
  width: 100%;
  text-align: center;
  font-family: "SimSun";
}

.diy-table-ontology tr:nth-of-type(odd) {
  background: #2e2c48;
}

.diy-table-ontology tr:not(:first-child) {
  height: 30px;
}

.diy-table-ontology tr:first-child {
  height: 40px;
}

.diy-table-ontology tr th {
  color: #c7cef2;
  font-size: 14px;
  text-align: center;
}

.diy-table-ontology tr td {
  color: #c7cef2;
  font-size: 12px;
}

.diy-table-size {
  overflow-y: auto;
  height: 220px;
}

.right-dashboard {
  width: 19%;
  height: 100%;
  font-family: "SimSun";
}

.pin {
  width: 80%;
  height: 50px;
  position: absolute;
  bottom: -25px;
  left: 10%;
  background: #33314e;
  border-radius: 5px;
  padding: 10px 0;
}

.pin-num {
  width: 100%;
  height: 15px;
}

.pin-line {
  position: absolute;
  width: 1px;
  height: 30px;
  background: #474565;
  left: 50%;
  bottom: 10px;
}

.pin-num-cell {
  float: left;
  width: 50%;
  height: 15px;
  text-align: center;
  line-height: 15px;
  color: #c7cef2;
  font-size: 18px;
}

.pin-label {
  width: 100%;
  height: 12px;
  margin-top: 3px;
}

.pin-label-cell {
  float: left;
  width: 50%;
  height: 12px;
  text-align: center;
  line-height: 12px;
  color: #828099;
  font-size: 12px;
  font-family: "SimSun";
}

.room-tooltip {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #8084a2;
  width: 96%;
  margin: 0 2%;
  border-bottom: 1px solid #2e2c48;
  font-family: "SimSun";
}

.room-tooltip-label {
  float: left;
  width: 100px;
  height: 40px;
  cursor: pointer;
}

.room-tooltip-label:active,
.room-tooltip-label:hover {
  background: #2e2c48;
  color: #c7cef2;
}

.left-dashboard-nav .nav-list {
  color: #c7cef2;
  width: 100%;
  height: 40px;
  padding-left: 8px;
  line-height: 40px;
  font-size: 14px;
  border-bottom: 1px solid #2e2c48;
  font-family: "SimSun";
  cursor: pointer;
}

.left-dashboard-nav-active {
  background: #2e2c48 !important;
  color: #c7cef2 !important;
}

.right-dashboard {
  width: 21%;
  height: 100%;
  float: right;
  background: #18181e;
}

.right-dashboard-title {
  width: 100%;
  height: 40px;
  background: -webkit-linear-gradient(
    left,
    rgba(24, 24, 30, 1) 10%,
    rgba(0, 72, 255, 0.8)
  );
  /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    rgba(24, 24, 30, 1) 10%,
    rgba(0, 72, 255, 0.8)
  );
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    rgba(24, 24, 30, 1) 10%,
    rgba(0, 72, 255, 0.8)
  );
  /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to right,
    rgba(24, 24, 30, 1) 10%,
    rgba(0, 72, 255, 0.8)
  );
  /* 标准的语法（必须放在最后） */
  line-height: 40px;
  font-size: 14px;
  color: #c7cef2;
}

.right-dashboard-title img {
  margin-left: 19px;
  margin-right: 5px;
}

.right-dashboard-info {
  min-height: 70px;
  width: 100%;
}

.right-dashboard-info {
  padding: 18px 0;
  max-height: 280px;
  overflow-y: auto;
}

.right-dashboard-info ul {
  border-bottom: 1px solid #2e2c48;
  padding-bottom: 18px;
  margin-bottom: 18px;
  padding-left: 18px;
}

.right-dashboard-info ul:last-child {
  border-bottom: none;
  padding-bottom: 0px;
  margin-bottom: 0px;
}

.right-dashboard-info ul li:nth-child(1) {
  color: #c7cef2;
  font-size: 13px;
  margin-bottom: 10px;
  height: 13px;
}

.right-dashboard-info ul li:nth-child(2) {
  color: #c7cef2;
  font-size: 12px;
  height: 12px;
}

.hide {
  display: none;
}

.show {
  display: block;
}

.checkbox-type {
  float: left;
}

.checkbox-type span {
  color: #c7cef2;
  font-size: 14px;
}

.date-picker-type {
  width: 140px;
  height: 30px;
}

button:focus {
  outline: none;
}

.ivu-input {
  height: 26px;
  background: #2e2c48 !important;
  border: none !important;
  color: #c7cef2 !important;
  font-size: 12px !important;
}

.ivu-input-icon {
  height: 26px !important;
  line-height: 26px !important;
  color: #c7cef2 !important;
}

/*滚动条样式*/

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px;
  /*高宽分别对应横竖滚动条的尺寸*/
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  background: rgba(46, 44, 72, 1);
  border-radius: 2px;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  background: rgba(22, 21, 41, 1);
}

.ivu-checkbox-inner {
  background-color: #1e1e24;
}

.right-dashboard-partName {
  cursor: pointer;
}
</style>

