<template>
  <div class="animated fadeIn" style="width:100%;height:calc(100vh - 55px);overflow-y:hidden; margin: 0; float:left;">
    <!-- 保存地图 -->
    <div id="map" class="map" tabindex="0" style="">
    </div>
    <div id="mapAside">
      <mapAside></mapAside>
    </div>

    <!-- 图例按钮 -->
    <!-- <div class="img-ishow">
        <i class="fa fa-image"></i>
    </div> -->

    <!-- 图例 -->
    <!-- <div class="img-eg" id="img-eg-id"><ul></ul></div> -->
    <!-- 工具栏按钮容器 -->
    <div id="tool-bar"></div>

     <!-- 工具栏按钮容器  -->
    <div class="img-button" id="img-button-id">
      <!-- 查询设备信息按钮 -->
      <div class="sousuo">
        <form label="选择器">
          <select id="equipType" name="equipType" style="margin-right:-3px;height:40px;margin-top: 1px;">
            <!-- <option value="全部">全部</option>             -->
            <option value="1">门机</option>
            <option value="3">卸船机</option>
            <option value="2">堆取料机</option>
          </select>
          <input id="equipKey" type="text" name="equipKey" placeholder="请输入关键字">
          <!-- <input type="text"  list="url_list" placeholder="请选择"> -->
          <div class="reload" @click="reload()"><img src="static/img/map/Close.png" alt=""></div>
          <Button id="queryEquip" @click="queryEquipEvent()" class="search" type="primary" size="large">查询</Button>
        </form>
        <!-- 查询设备信息画布 -->
          <div id="data" v-show = "isSearch">
            <div class="close" @click="hide()">
              <img src="static/img/map/Close1.png" alt="">
            </div>
            <p style="display:none">{{equipsData}}</p>
            <div class="queryresult"  v-for="(item,index ) in equipsData" :key="index">
               <!-- 门机图标 -->
              <img v-if="item.type == '1'" src="static/assets/icon/map_crane.png" alt="">
              <img v-if="item.type == '3'" src="static/assets/icon/map_loader.png" alt="">
              <img v-if="item.type == '2'" src="static/assets/icon/map_dui.png" alt="">
              <span id="queryRow">{{equipsData[index].name +"(" + equipsData[index].oid + ")"}}</span>
            </div>
          </div>
      </div>
      <!-- 复位按钮 -->
      <div class="box" ref="abc">
          <button id="reset" @click="reding()" class="" type="button" title="Zoom reset">
            <img src="static/img/map/reset.png" alt="">
          </button>
      </div>

      <!-- 设备基本信息弹窗 -->
      <div id="equip-popup" >
        <div class="ol-popup">
            <form method="post" id="popup-form" class="form-horizontal" role="form">
                <div class="pop-text">
                    <div class="form-group">
                        <!-- <label class="control-label">设备名称</label> -->
                        <div class="name col-md-12" id="name"></div>
                    </div>
                    <div id="equ-message">
                      <!-- <div class="form-group">
                          <div class="message col-md-12" id="oid"></div>
                      </div> -->

                      <div  id="monState" class="form-group">
                          <label class="control-label col-md-2">振动监测</label>
                          <div class="message monState">
                            <a href="#" @mouseover="showDetail()" @mouseout="hideDetail()">1#卸船机KB</a>
                            <a href="#">1#卸船机KB</a>
                            <a href="#">1#卸船机KB</a>
                          </div>
                      </div>
                      <div  id="stState" class="form-group">
                        <label class="control-label col-md-2">应力监测</label>
                          <div class="message stState">
                            <a href="#">1#卸船机KB</a>
                            <a href="#">1#卸船机KB</a>
                            <a href="#">1#卸船机KB</a>
                          </div>
                      </div>
                      <div  id="fiState" class="form-group">
                        <label class="control-label col-md-2">消防监测</label>
                          <div class="message fiState">
                            <a href="#">1#卸船机KB</a>
                            <a href="#">1#卸船机KB</a>
                            <a href="#">1#卸船机KB</a>
                          </div>
                      </div>
                    </div>
                </div>
                <!-- <router-link id='text-info' :to="{path:'/equipMonitor',query: {id: oid}}" @click.native="queryEquipInfo()" >详情</router-link> -->
                <!-- <button type="button" id='text-info' @click="queryEquipInfo()">查看详情 ></button> -->
            </form>
            <div class="triangle_border_down">
            </div>
        </div>
        <div id="equip-detail" class="ol-detail">
            <form method="post" id="popup-form" class="form-horizontal" role="form">
                <div class="pop-text">
                    <div class="form-group">
                        <!-- <label class="control-label">设备名称</label> -->
                        <div class="name col-md-12" id="childName"></div>
                    </div>
                    <div id="equ-message">
                      <div id="myChart1" style="width: 100%;height: 150px;"></div>
                    </div>
                </div>
                <!-- <router-link id='text-info' :to="{path:'/equipMonitor',query: {id: oid}}" @click.native="queryEquipInfo()" >详情</router-link> -->
                <!-- <button type="button" id='text-info' @click="queryEquipInfo()">查看详情 ></button> -->
            </form>
            <div class="triangle_border_left">
            </div>
        </div>

      </div>

    
      <!-- <div id="mapType"  @mouseover="toggle()">
        <div id="normal" class="mapTypeCard normal" data-name="normalMap" @click="switchTerrainJs()">    
          <span>地形</span>
        </div>
        <div id="panorama" class="mapTypeCard panorama choosedType active" data-name="panorama" @click="switchSatelliteJs()">    
          <span>卫星</span>
        </div>
      </div> -->
        
      
  
    </div>
  </div>
</template>


<style type="text/css" scoped>
@import "/static/assets/font-awesome/css/font-awesome.min.css";
@import "/static/assets/font-awesome/css/font-awesome-animation.min.css";

@import "/static/css/ol.css";
@import "/static/css/ol3-layerswitcher.css";
@import "/static/css/map.css";
@import "/static/assets/layer/skin/layer.css";
@import "/static/assets/layer/skin/layer.ext.css";

.animated {
  position: relative;
}
#map {
  background: #fff;
  width: 80%;
  height: 100%;
}
#mapAside{
  background: #18181E;
  width: 20%;
  height: calc(100vh - 55px);
  overflow: auto;
  position: absolute;
  top: 0;
  right: 0;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
tr,
th {
  text-align: center;
}

/* .img-button {
  position: relative;
} */
.tools {
  position: absolute;
  right: 460px;
  top: 0px;
}

.img-button .box{
   width: 27px;
  height:27px;
  background-color: #150619;
  border-radius: 5px;
}
.img-button #reset {
  width: 25px;
  height: 25px;
  background-color: #150619;
  /* border-radius: 0px; */
  border: 1px solid #150619;
  position: absolute;
  left: .5em;
  bottom: 12.8em;
  display: block;
}

.sousuo {
  width: 440px;
  height: 40px;
  position: absolute;
  right: 22%;
  top: 30px;
  
}
input {
  display: inline-block;
  width: 280px;
  height: 40px;
  color: #7E87B4;
  background: #150619;
  border:#150619;
}
#equipType{
background-color:#150619;
border:#150619;
color:#7E87B4;
}
input:focus {
  background: #150619;
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {   
 /* WebKit browsers */   
color: #7E87B4;   
}   
input:-moz-placeholder, textarea:-moz-placeholder {   
/* Mozilla Firefox 4 to 18 */   
color: #7E87B4;   
}   
input::-moz-placeholder, textarea::-moz-placeholder {   
 /* Mozilla Firefox 19+ */   
color: #7E87B4;   
}   
input:-ms-input-placeholder, textarea:-ms-input-placeholder {   
 /* Internet Explorer 10+ */   
color: #7E87B4;   
}
.search {
  width: 80px;
  height: 40px;
  position: absolute;
  right: 0;
}
.reload{
  position: absolute;
  top: 7px;
  right: 85px;
  cursor: pointer;
  display: none;
}
#data {
  width: 360px;
  height: auto;
  padding: 20px;
  background-color: #150619;
  position: absolute;
  right: 0px;
  top: 50px;
}
#data .queryresult{
  height: 40px;
  line-height: 40px;
}
#queryRow{
  margin-left:15px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #C7CEF2;
}

.icon-trash {
  display: inline;
  font-size: 30px;
  position: absolute;
  right: 0px;
  top: 0px;
}
#text-info{
  width:100%;
  height:30px;
  border: 1px solid #E6E6E6;
  background-color: #fff;
  box-sizing: border-box;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 12px;
  color: #666;
}
#mapType {
  height: 80px;
  cursor: pointer;
  transition-duration: 0.4s;
  width: 110px;
  background-color: rgba(255, 255, 255, 0);
}

#mapType .normal {
  z-index: 1;
  background-position: 0 0;
  right: 20px;
}

#mapType .mapTypeCard {
  height: 60px;
  width: 86px;
  position: absolute;
  border-radius: 2px;
  left: 0px;
  bottom: 40px;
  box-sizing: border-box;
  border: 1px solid transparent;
  border: 1px solid rgba(153, 153, 153, 0.42);
  background: url(//webmap1.bdimg.com/wolfman/static/common/images/new/shadow_6bf0ecd.png)
    no-repeat 0 0;
  background-size: 86px 240px;
  transition-duration: 0.4s;
}

#mapType .mapTypeCard.active span,
#mapType .mapTypeCard:hover span {
  background-color: #3385ff;
}

#mapType .mapTypeCard span {
  position: absolute;
  bottom: 5px;
  right: 0;
  display: inline-block;
  padding: 3px 3px 2px 4px;
  font-size: 12px;
  height: 12px;
  line-height: 12px;
  color: #fff;
  border-top-left-radius: 2px;
}
#mapType .normal {
  z-index: 2;
  left: 0px;
  background-image: url(../../static/img/maptype.png);
  background-position: 0 -1px;
  border-left: 1px solid rgba(153, 153, 153, 0.6);
}

#mapType .normal:hover {
  left: 100px;
  transition: all 2s;
}

#mapType .panorama {
  z-index: 3;
  right: 10px;
  background-image: url(../../static/img/maptype.png);
  background-position: 0 -61px;
  border-left: 1px solid rgba(153, 153, 153, 0.6);
}
/*滚动条样式*/
	::-webkit-scrollbar {/*滚动条整体样式*/
	width: 5px !important;;  /*高宽分别对应横竖滚动条的尺寸*/
	}
	::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
	background:rgba(46,44,72,1) !important;;
	border-radius:2px;
	}
	::-webkit-scrollbar-track {/*滚动条里面轨道*/
	background: rgba(22,21,41,1) !important;;
	}

</style>

<script type="module">
// import Table from './Table';
import equipMonitor from "./components/equipMonitor";
import mapAside from './mapAside'
import '../../static/css/bootstrap.min.css'
import '../../static/js/jquery.min.js'
import '../../static/js/bootstrap.min.js'
import '../../static/js/ol.js'
import {initMapJs,getLayers,getView,getMap,timerCloseAlertBox,equipSelect,getCraneSource,getShipLoaderSource,getShipUnloaderSource,getChildSystem} from "static/js/map";
import {queryEquip,queryEquipInfo,queryEquipsByKey,flyToEquip,reset,switchSatellite,switchTerrain} from "static/js/map-toolbar";
// import {initSourceData} from "static/js/map-factory";
import echarts from 'echarts'

var base_URL = process.env.BASE_API;
export default {
  components: { 
    equipMonitor,
    mapAside,

  },
  name: "home",
  data() {
    return {
      isSearch: false,
      equipsData: [],
    };
  },
  methods: {
    // test_logout() {
    //   this.$store
    //     .dispatch("LogOut")
    //     .then(() => {
    //       this.$router.push({ path: "/login" });
    //     })
    //     .catch(err => {
    //       this.$message.error(err);
    //     });
    // },
    insert: function() {
      console.log(this.users);
      this.users.push(this.user);
    },
    remove: function(index) {
      this.users.splice(index, 1);
    },
    hide: function() {
      this.isSearch = false;
    },
    toggle: function() {
      $(".normal").css("left", "100px");
      $(".normal").fadeIn();
      setTimeout(function() {
        $(".normal").fadeOut();
      }, 3000);
    },

    /**
     * 切换到地形相关图层
     */

    // switchTerrainJs: function() {
    //   switchTerrain(getLayers());
    // },

    // switchSatelliteJs: function() {
    //   switchSatellite(getLayers());
    // },

    /**
     * 关闭设备信息窗口
     */
    // closeInfoJs: function() {
    //   closeInfo();
    // },
    //查询设备信息
    queryEquipEvent: function() {
      this.equipsData = queryEquip(getView(),getLayers(),true);
      if(this.equipsData != ""){
        this.isSearch = true;
        flyToEquip(this.equipsData[0].oid,getMap(),getLayers(),getView());

      }else{
        this.isSearch = false;
      }
      //清空表格数据
      // jQuery("#grid-table").jqGrid('clearGridData'); 
      // //重新渲染表格
      // for(var i=0;i<=equips.length;i++)
      // jQuery("#grid-table").jqGrid('addRowData',i+1,equips[i]); 
      // $("#gview_grid-table").show();
      // $("#grid-pager").show();
      // $("#sp_1_grid-pager").html(1);
      // $("#next_grid-pager").addClass("ui-state-disabled");
      // $("#last_grid-pager").addClass("ui-state-disabled");
      
     
		},

    /**
     * 地图复位，回到初始化状态
     */
    reding: function() {
      reset(getView());
    },

    reload:function(){
      $("#equipKey").val("").focus();
      this.isSearch = false;
      // initMapJs(base_URL);
      initSourceData(getView(),'1', getCraneSource(), base_URL);
      initSourceData(getView(),'2', getShipLoaderSource(),base_URL);
      initSourceData(getView(),'3', getShipUnloaderSource(),base_URL);
    },


    /**
     * 查询设备详情
     */
    queryEquipInfo:function(){
      var str = $("#equip-popup #oid").html();
      var start = str.indexOf(">");
      var end = str.lastIndexOf("<");
      var oid = str.substring(start+1,end);
      console.log(oid)
      // bus.$emit("oid", oid)
      this.$router.push({ name: '振动监测',params:{id:oid}});
   
    },
    showDetail(){
      this.$nextTick(function(){
        $("#equip-detail").show();
				fetch({
					headers: {
						'Content-Type': 'application/json'
						},
						baseURL:base_URL,
						url: '/vibMonitor.htm?param_act=getVbHome&card=all',
						method:'get'
					}).then(res => {
            // debugger
					// 	console.log(res.data.List);
					// var arr = res.data.List;
					// var bottomData = arr[0];
					// // this.equipName1 = bottomData.equipName;						
					// // 基于准备好的dom，初始化echarts实例 
					let myChart1 = echarts.init(document.getElementById('myChart1'));
					// var a1 = bottomData.total;
					// var detailMsg = bottomData.data[0];
					// var total1 ={name:'监测点',value:a1};
					var total1 ={name:'监测点',value:12};
					// var arr = [3,3,3,1];
					
					myChart1.setOption(
						{
						title:[{
							text: total1.name,
							left: '29%',
							top: '40%',
							textAlign: 'center',
							textBaseline: 'middle',
							textStyle: {
								color: '#C7CEF2',
							fontWeight: 'normal',
							fontFamily: '',
								fontSize: 14
							}
						}, {
							text: total1.value,
							left: '29%',
							top: '55%',
							textAlign: 'center',
							textBaseline: 'middle',
							textStyle: {
								color: '#C7CEF2',
								fontWeight: 'normal',
								fontSize: 20
							}
						}],
						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b}: {c} ({d}%)"
						},
						legend: {
							icon:'rect',
							orient: 'vertical',//图例排列方向
							align:"left",//图例标记和文本的对齐,left,right
							x: 'right',
							top:'8%',
							left:'65%',
							itemGap:20,
							textStyle:{color:'rgba(199,206,242,1)'},
							data:['正常','预警','报警','危险'],
							formatter: function(name) {
								if(name === '正常') {
									// return name + "："+detailMsg.normal;
									return name + "："+3;
								} else if(name === '预警') {
									// return name + "："+detailMsg.warn;
									return name + "："+3;
								}else if(name === '报警') {
									// return name + "："+detailMsg.alarm;
									return name + "："+3;
								}else if(name === '危险') {
									// return name + "："+detailMsg.danger;
									return name + "："+3;
								}
							}
						},
						color:['#FF2B2B','#FF6C00','#FFDF03','#005AFF'],
						series: [
							{
								name:'状态',
								type:'pie',
								radius: ['50%', '70%'],//饼图的大小
								center: ['30%', '50%'],//饼图的位置 
								avoidLabelOverlap: false,
								label: {
									normal: {
										show: false,
										position: 'center'
									}
								},
								itemStyle: {
									normal: {
										borderWidth: 10,//断裂间距
										borderColor:'#2E2C48',
									},
									
								},
								labelLine: {
									normal: {
										show: false
									}
								},
								data:[
									// {value:detailMsg.danger, name:'危险'},
									// {value:detailMsg.alarm, name:'报警'},
									// {value:detailMsg.warn, name:'预警'},
                  // {value:detailMsg.normal, name:'正常'}
                  {value:3, name:'危险'},
									{value:3, name:'报警'},
									{value:3, name:'预警'},
									{value:3, name:'正常'}
						]
							}
						],
          })
        }).catch(res => {
						console.log('请求设备详情信息,请求失败',res)
					})  
			}) 

    },
    hideDetail(){
      $("#equip-detail").hide();
    }

    // show:function (){
    //   if($("#equip-popup").show()){
    //     var childSystem =  $("#popup-form  .equ-message p").text();
    //     console.log(childSystem);
    //   }
    // }


  },
  mounted() {
      //---------------初始化地图map.js---------------
      initMapJs(base_URL);
      // this.show();
      // this.closeInfoJs();
      $('#equipKey,#equipType').on('input porpertychange', function () {
      // if($('#equipKey').val().trim() === '') {
          // console.log('text is empty');
          initSourceData(getView(),'1', getCraneSource(), base_URL);
          initSourceData(getView(),'2', getShipLoaderSource(),base_URL);
          initSourceData(getView(),'3', getShipUnloaderSource(),base_URL);
      // }
      });
      $('#equipKey,#equipType').on('input focus', function () {
        $(".reload").css("display", "block")
      });
      $('#equipKey,#equipType').on('input blur', function () {
        if($('#equipKey').val().trim() === '') {
          $(".reload").css("display", "none")
        }
      });


  },
    
  // beforeRouteLeave (to, from, next){
  //   clearInterval(timer);
  //   next()

  // }

};
</script>

