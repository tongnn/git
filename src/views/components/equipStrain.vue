<template>
  <div class="animated fadeIn" style="height:calc(100vh - 155px);overflow:hidden; margin: 10px;">

    <div class='row'>
        <header class='col-xs-12'>
          <Button id="" @click="skipEquipMonitor()" class="search" type="primary" shape="circle">振动监测</Button>
				  <Button id="" @click="skipEquipStrain()" class="search" type="primary" shape="circle">应力监测</Button>
          <Button id="" @click="returnHome()" class="search" type="primary" shape="circle">返回首页</Button>
        </header>
        <div class='col-xs-2'>
          <!--树形控件-->
          <!-- Add a <div> element where the tree should appear: -->
          <div id="tree"> </div>
        </div>
      	<div class='col-xs-9'>
						<Row>
							<div Col span="24" id="monitor">
                <div class="imgs">
                  <img id="background" src="" alt="">
                  <div class="strainDom" v-for="(item,index ) in monitorData" :key="index">
                    <p>
                      <span class="straincode">{{item.POINT_CODE}} </span>
                     <span class="strainnum">{{item.STRESS}}</span>
                     <!-- <p class="straintemp">12.234℃</p> -->
                     </p>
                  </div>
                </div>
						</div>
					</Row>




        </div><!-- /.col -->
                  
    </div>

    
</div>
</template>

<style scoped lang="css">
header{height:40px;line-height: 40px;font-size: 18px;}
#tree{float: left;width: 220px;}
#monitor{width: 100%;margin: 0 auto;}
#monitor .imgs{width:100%; position: relative;}
#background{width:100%;height:100%;}
.strainDom{position: absolute;}
.strainDom .straincode{width:12px;height:12px;padding:0 1px;border: 1px solid #000;border-radius: 45%;margin-right:5px;}
</style>




<script>
// 树形控件
import 'static/dist/skin/ui.dynatree.css'
import 'static/jquery/jquery.js'
import 'static/jquery/jquery-ui.custom.js'
import 'static/jquery/jquery.cookie.js'
import 'static/js/jquery.dynatree.js'
//  basic styles
import 'static/css/bootstrap.min.css'
import 'static/css/font-awesome.min.css'
// page specific plugin styles 
import 'static/css/jquery-ui-1.10.3.full.min.css'
import 'static/css/datepicker.css'
import 'static/css/ui.jqgrid.css'
//  ace styles
import 'static/css/ace.min.css'


// ace settings handler
import 'static/js/ace-extra.min.js'

var $path_base = "/";//this will be used in gritter alerts containing images
window.jQuery || document.write("<script src='../../static/js/jquery-2.0.3.min.js'>"+"<"+"/script>");			
if("ontouchend" in document) document.write("<script src='../../static/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
import 'static/js/bootstrap.min.js'
import 'static/js/typeahead-bs2.min.js'
// page specific plugin scripts 
import 'static/js/date-time/bootstrap-datepicker.min.js'
import 'static/js/jqGrid/jquery.jqGrid.min.js'
import 'static/js/jqGrid/i18n/grid.locale-cn.js'
import fetch from 'utils/fetch'
import Vue from 'vue'

export default {
  name: 'Yinglimonitor',
    data () {
      return {
        monitorData: [],
        // monitorData1: [],
        // monitorData2: [],
        id:""
			}
    },

    methods: {
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


     mounted(){
       this.id = this.$route.params.id;
	    // console.log(this.id);
       //var baseURL = process.env.NODE_ENV === "production"?process.env.BASE_API:'/prod';
       var baseURL = process.env.BASE_API;

       var _this = this
        $(function(){
         // Attach the dynatree widget to an existing <div id="tree"> element
         // and pass the tree options as an argument to the dynatree() function:
          $("#tree").dynatree({   //tree生成树形结构所在的节点的ID如<div id="tree"></div>
            title:"应力监测",    //树的名字
            minExpandLevel:1,   //1：根节点不能展开
            imagePath:'',       //文件夹节点图片路径 
            method:'get',  
            //initAjax:{url:"http://172.16.72.250:8085/manageCommon.htm", data:{param_act:"treeData",tree_code:"SF_ORG"}},
            // initAjax:{url:baseURL + "/manageCommon.htm", data:{param_act:"treeData",tree_code:"ST_EQUIP"}},
            initAjax:{url:baseURL + "/equip.htm", data:{param_act:"selectStMonTreeByEqCode",EQ_CODE:_this.id}},
            // equip.htm?param_act=selectStMonTreeByEqCode&EQ_CODE=300003
            onClick: function(node){
              var nodeCode =node.data.code;
              //alert(nodeCode)
              if(nodeCode == "01100001001"){
                var imgPath = 'static/img/vibbottom.png';
	              $("#background").attr("src", imgPath);
              }else if(nodeCode == "01100001002"){
                var imgPath = 'static/img/vibtop.png';
	              $("#background").attr("src", imgPath);
              }else{
                var imgPath = '';
	              $("#background").attr("src", imgPath);
              }
              if(nodeCode.length >= 11){
                fetch({
                    headers: {
                        'Content-Type': 'application/json'
                      },
                      baseURL:baseURL,
                      url: '/stMonitor.htm?param_act=selectStPointInfoByEqId&eqId='+nodeCode,
                      method:'get'
                  }).then(res => {
                    // console.log(res.data);
                    if(res.data.data == undefined && res.data.msg !== ""){
                      _this.monitorData = [];
                      _this.$alert(res.data.msg);
                      return;
                    }else{
                      _this.monitorData = res.data.data;  
                      _this.$nextTick(function(){
                        for(var i=0;i<_this.monitorData.length;i++){
                          $(".strainDom").eq(i).css("bottom",_this.monitorData[i].y);
                          $(".strainDom").eq(i).css("left",_this.monitorData[i].x);                     
                        }             
                      })
                    }

                  })
              }else{
                _this.monitorData = [];
              }
          } 
        })
      });
    },
}

</script>


