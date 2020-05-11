<template>
  <div class="animated fadeIn">
        <!--树形控件-->
        <div id='treeForm'>
            <div id="tree"> </div>
        </div>
        <div class='rightForm'>
        <ul class='form_head'>
            <li class='form_head_middle'>
                <span><div class='search' @click='savePower'>保存权限</div><div class='resets' @click='reset'>重 置</div></span>  
            </li>
        </ul>
	    <div id="powertree"> </div>
	    <!-- PAGE CONTENT ENDS --> 							
        </div>
  </div>
</template>
<script>
// 树形控件
import '../../../static/dist/skin/ui.dynatree.css'
import '../../../static/jquery/jquery.js'
import '../../../static/jquery/jquery-ui.custom.js'
import '../../../static/jquery/jquery.cookie.js'
import '../../../static/js/jquery.dynatree.js'
//  basic styles
import '../../../static/css/bootstrap.min.css'
import '../../../static/css/font-awesome.min.css'
// page specific plugin styles 
import '../../../static/css/jquery-ui-1.10.3.full.min.css'
// ace settings handler
import '../../../static/js/ace-extra.min.js'
var $path_base = "/";//this will be used in gritter alerts containing images
window.jQuery || document.write("<script src='../../static/js/jquery-2.0.3.min.js'>"+"<"+"/script>");			
if("ontouchend" in document) document.write("<script src='../../static/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
import '../../../static/js/bootstrap.min.js'	
import Vue from 'vue'
import axios from 'axios'
import fetch from 'utils/fetch'
function getPowerdata(rolecode) { 
        //alert('getPowerdata');
        return new Promise((resolve,reject) => {                
            fetch({
                headers: {
                    'Content-Type': 'application/json'
                },
                baseURL:process.env.BASE_API,
                url: '/managePower.htm?param_act=getPower&roleCode='+rolecode,
                method:'get'
            }).then(res =>{
                if(res.data != undefined){
                    resolve(res.data);
                }else{
                    resolve(0);
                }
            })
        })
    }
function savePowerdata(rolecode, powercode) {
        //alert('savePowerdata');
        return new Promise((resolve,reject) => {                
            fetch({
                headers: {
                    'Content-Type': 'application/json'
                },
                baseURL:process.env.BASE_API,
                url: '/managePower.htm?param_act=savePower&roleSelectCode='+rolecode+'&powerSelectCode='+powercode,
                method:'get'
            }).then(res =>{
                if(res.data != undefined){
                    resolve(res.data);
                }else{
                    resolve(0);
                }
            })
        })
    }
export default {
  name: 'Impower',
   data () {
            return { }
        },
        methods: {
			savePower(){
				var treeSelect = $("#tree").dynatree("getActiveNode");
				var roleSelectCode = "";
				
				if(treeSelect != null && treeSelect !=""){
                    roleSelectCode = treeSelect.data.code;
                    //alert('treeSelect='+roleSelectCode);
				}else{
                    this.$alert('请先选中要设置权限的角色！','提示');
                    return false;
                }
                //获取树中所有选中的功能点
                var powerSelectCode = "";
                var powerTreeSelect = $("#powertree").dynatree("getSelectedNodes");
				if(powerTreeSelect != null && powerTreeSelect !=""){
                   
                    $.each(powerTreeSelect,function(index,node){ 
                       
                        powerSelectCode = powerSelectCode+node.data.id+";"
                        }); 
                }
                //alert(powerSelectCode);
                if(powerSelectCode == ""){
                     this.$alert('请先选择要授予的功能权限！','提示');
                     return false;
                }
                savePowerdata(roleSelectCode, powerSelectCode).then(retdata=>{
                    
                    if(retdata['isSave'] == '1'){
                        this.$alert('权限保存成功！','提示');
                    }else{
                        this.$alert('授权失败，请稍后重试！','提示');
                    }
                });
			},
			reset(){	
				var treeSelect = $("#tree").dynatree("getActiveNode");
				var treeSelectCode = "";
				//alert(treeSelect);
				if(treeSelect != null && treeSelect !=""){
					treeSelectCode = treeSelect.data.id;
				}
            } 
        },
        mounted(){   
            jQuery(function($) {

			});	
			 $(function(){
                // Attach the dynatree widget to an existing <div id="tree"> element
                // and pass the tree options as an argument to the dynatree() function:
                $("#tree").dynatree({   
                    title:"角色",    
                    minExpandLevel:1,   
                    imagePath:'',               
                    initAjax:{url:process.env.BASE_API+"/manageCommon.htm", data:{param_act:"treeData",tree_code:"SF_ROLE"}},     
                    onClick: function(node){             
                        $("#powertree").dynatree("getTree").reload();    
                        getPowerdata(node.data.code).then(retdata=>{    
                            //取得当前用户的权限并在右侧树中选中相关节点   
                            $("#powertree").dynatree("getTree").visit(function(dtnode){    
                                if(retdata[dtnode.data.id]){
                                    dtnode.select(true);
                                    dtnode.expand(true);
                                }
                                //dtnode.focus(true);
                            })
                        })
                    }
                }); 
                $("#powertree").dynatree({   
                    title:"功能",    
                    minExpandLevel:1,  
                    imagePath:'',      
                    checkbox:true,
                    expand:true,
                    isFolder:false,
                    initAjax:{url:process.env.BASE_API+"/manageCommon.htm", data:{param_act:"treeData",tree_code:"SF_FUNC_MANAGE"}},     
                    onClick: function(node){ } 
                });
            });
        }
}
</script>
<style scoped lang="css">
.form_head_top{border-bottom:1px solid gray;}
.form_head_top .org{width:100px;height:30px;background-color:#143f6d;color:white;font-size:16px;font-weight:bold;border-radius:5px 5px 0px 0px;text-align:center;line-height:30px;}
.form_head_middle{height:40px;overflow:hidden;}
.form_head_middle span{display:inline-block;margin-right:5%;height:40px;font-size:12px;}
.form_head_middle span .search,.resets{width:130px;height:35px;text-align:center;line-height:35px;border-radius:5px;margin-top:2px;color:white;font-weight:500;}
.form_head_middle span .search{background-color:#169bd5;}
.form_head_middle span .resets{background-color:#ff9966;}
.form_head_bottom{background-color:#f1f3f6;height:40px;}
.form_head span{cursor:pointer;}
#treeForm{float:left;width: 250px}
.rightForm{float:left;width: calc(100vw - 467px) ;}
</style>



