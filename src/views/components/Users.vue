<template>
  <div class="animated fadeIn">
	<!--树形控件-->
	<div id='treeForm'>
    	<div id="tree"> </div>
	</div>
	<div class='rightForm'>
    <ul class='form_head'>
        <li class='form_head_top'><div class='org'>用户</div></li>
        <li class='form_head_middle'>
            <span>用户编码：<input id='user_CODE' type='text' ></span>
            <span>姓  名：<input id='user_NAME' type='text'></span>
            <span><div id="queryId" class='search' @click='find'>查 询</div></span>
			<span><div class='resets' @click='reset'>重 置</div></span>  
			<span><leadInto :solecode='soleCode'></leadInto> </span>  
			<span><leadOut :message="ids"></leadOut></span>  
        </li>
    </ul>
	<table id="grid-table"></table>
	<div id="grid-pager"></div>
    <Modal v-model="modal1" title="用户角色选择"  @on-ok="saveRole" @on-cancel="cancel">
        <div id="roletree"> </div>
    </Modal>
	</div>						
</div>
</template>
<script>
import leadInto from '../lead/leadInto'
import leadOut from '../lead/leadOut'
var countries = "";  var usersCode='';var usersName='';
var baseURL = process.env.BASE_API;
String.prototype.trim = function(){ // 用正则表达式将前后空格 用空字符串替代。 去掉空格
            return this.replace(/(^\s*)|(\s*$)/g, "");
        }
	function getQuerySql(){
		var userCode =usersCode;
		var userName =usersName;
		var querySql = "";
		if(userCode != ''){
			querySql = querySql + "and  USER_CODE like '%" + userCode + "%'";
		}
		if(userName != ''){
			querySql = querySql + "and  USER_NAME like '%" + userName + "%'";
		}
		return querySql;
	}
	function getRoleOfUser(userId) {
        return new Promise((resolve,reject) => {     
            fetch({
                headers: {
                    'Content-Type': 'application/json'
                },
                baseURL:process.env.BASE_API,
                url: '/managePower.htm?param_act=getRoleOfUser&userId='+userId,
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
	function saveRoleOfUser(userId, rolecodes) {
        //alert('savePowerdata');
        return new Promise((resolve,reject) => {            
            fetch({
                headers: {
                    'Content-Type': 'application/json'
                },
                baseURL:process.env.BASE_API,
                url: '/managePower.htm?param_act=saveRoleOfUser&userId='+userId+'&rolecodes='+rolecodes,
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
var x = 0;
import Vue from 'vue'
import axios from 'axios'
import fetch from 'utils/fetch'
import { isWscnEmail } from 'utils/validate';
export default {
  name: 'User',
   data () {
	return { modal1: false ,ids:'',soleCode:'USER_CODE'}
		},
		components: {
    		leadInto,leadOut
		},
        methods: {
    
			find(){
				usersCode=$("#user_CODE").val();
                usersCode= usersCode.trim();
                usersName=$("#user_NAME").val();
				usersName= usersName.trim();	
				var treeSelect = $("#tree").dynatree("getActiveNode");
				var treeSelectCode = "";
				if(treeSelect != null && treeSelect !=""){
					treeSelectCode = treeSelect.data.id;
				}
				var querySql = getQuerySql();
				$("#grid-table").jqGrid('setGridParam',{
								postData:{"querySql":querySql,"treeSelectCode":treeSelectCode},page:'1'
							}).trigger('reloadGrid'); 
			},
			reset(){
				document.getElementById('user_CODE').value = "";
				document.getElementById('user_NAME').value = "";
				var treeSelect = $("#tree").dynatree("getActiveNode");
				var treeSelectCode = "";
				if(treeSelect != null && treeSelect !=""){
					treeSelectCode = treeSelect.data.id;
				}
				$("#grid-table").jqGrid('setGridParam',{
								postData:{"querySql":"","treeSelectCode":treeSelectCode},
							}).trigger('reloadGrid'); 
			},
			saveRole () {
				var selectIds = jQuery('#grid-table').jqGrid('getGridParam', 'selarrrow');
				//获取选中的角色
                var roleSelectCode = "";
				var roleTreeSelect = $("#roletree").dynatree("getSelectedNodes");
				
				if(roleTreeSelect != null && roleTreeSelect !=""){
                   
                    $.each(roleTreeSelect,function(index,node){ 
                       
                        roleSelectCode = roleSelectCode + node.data.code+";"
                        }); 
				}	
				if(roleSelectCode == ""){
                     this.$alert('请先选择要授予的角色！','提示');
                     return false;
				}	
				saveRoleOfUser(selectIds, roleSelectCode).then(retdata=>{
                    
                    if(retdata['isSave'] == '1'){
						
						this.$Message.info('保存成功！');
						this.modal1 = false;
                    }else{
                        this.$alert('操作失败，请稍后重试！','提示');
                    }
                });
            },
            cancel () {
                this.$Message.info('点击了取消');
            }
        },
		beforeMount(){
			$.ajax({  
			url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=SF_ORG',//请求路径  
			async: false,  
			success: function(data, result) {
				//alert("data11111="+ data);
				countries = data; 
				//alert("countries111111="+ countries)  ;
				if (!result) 
				alert('部门名称加载失败...');   
				}
			});
		},
        mounted(){
			var thisis = this;
			var grid_selector = "#grid-table";
			var pager_selector = "#grid-pager";
			var pager_topper="#grid-toppager";
			function alertinfo(){
				var selectIds = jQuery(grid_selector).jqGrid('getGridParam', 'selarrrow'); 
				if(selectIds == ''){
					thisis.$alert('请选择要设置角色的用户！', "提示");
					return false;
				}else if(("'"+ selectIds +"'").indexOf(",") >= 0){
					thisis.$alert('请选择一个用户！', "提示");
					return false;
				}
				$("#roletree").dynatree("getTree").reload();       
				getRoleOfUser(selectIds).then(retdata=>{
					thisis.modal1 = true;
					$("#roletree").dynatree("getTree").visit(function(dtnode){
						
						if(retdata[dtnode.data.code]){
							dtnode.select(true);
							dtnode.expand(true);
						}	
					});
				})
			};
            jQuery(function($) {
				jQuery(grid_selector).jqGrid({
					method:'get',
					url: baseURL+"/listDataController.htm?param_act=listData&param_funcId=016067709dd4000b",
					datatype: "json",
					height: 100+'%',
					colNames:["ID",'用户编码','姓名','所属机构','是否具有管理权限'],
					colModel:[
						{name:'ID',index:'ID',sorttype:"int", editable: true,hidden:true},
						{name:'USER_CODE',index:'USER_CODE', editable:true,editoptions:{size:"20",maxlength:"30"},editrules:{required:true}},
						{name:'USER_NAME',index:'USER_NAME', editable: true,editoptions:{size:"20",maxlength:"30"},editrules:{required:true}},
            			{name:'ORG_CODE',index:'ORG_CODE', sortable:false,editable: true,edittype:'select',formatter:'select',editoptions:{value:countries}},
            			{name:'IS_MANAGER',index:'IS_MANAGER',editable: true,edittype:"select",formatter:'select',editoptions:{value:"1:是;0:否"}}
					], 
					viewrecords : true,
					rowNum: 10,
					rowList:[10,20,30],
					pager : pager_selector,
					toppager : true,
					altRows: true,
					mtype:"post",
					jsonReader: {     
						root: "dataRows",
						id: "ID",   
						repeatitems : false     
					},
					multiselect: true,
			        multiboxonly: true,
					loadComplete : function() {
						var table = this;
						$("#grid-table").setColProp('ORG_CODE', { editoptions: { value:countries} });						
						setTimeout(function(){
							styleCheckbox(table);
							updateActionIcons(table);
							updatePagerIcons(table);
							enableTooltips(table);							
						}, 0);
					},					
					autowidth: true,
					width:100+'%',
					shrinkToFit:true,
					autoScroll:true,
					editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=016067709dd4000b"
				});
				//enable search/filter toolbar
				//jQuery(grid_selector).jqGrid('filterToolbar',{defaultSearch:true,stringResult:true})			
				//switch element when editing inline
				function aceSwitch( cellvalue, options, cell ) {
					setTimeout(function(){
						$(cell) .find('input[type=checkbox]')
								.wrap('<label class="inline" />')
							.addClass('ace ace-switch ace-switch-5')
							.after('<span class="lbl"></span>');
					}, 0);
				}
				//enable datepicker
				function pickDate( cellvalue, options, cell ) {
					setTimeout(function(){
						$(cell) .find('input[type=text]')
								.datepicker({format:'yyyy-mm-dd' , autoclose:true}); 
					}, 0);
				}
				function reloadgrid() {
					setTimeout(function(){
						$("#grid-table").jqGrid('setGridParam',{postData:{"querySql":""},}).trigger('reloadGrid');
					}, 0);
				}			
				function fn_editSubmit(response,postdata){
					// alert('提交')
					$('.ui-jqdialog,.ui-widget-overlay').css('display','none')
                    $("#grid-table").trigger('reloadGrid');				
					var alertinfor=response.responseText; 
					if(alertinfor != ""){ thisis.$alert(alertinfor, '提示')} 
                }
				//navButtons
				var jqnav = jQuery(grid_selector).jqGrid('navGrid','#grid-table_toppager',
					{ 	//navbar options
						edit: true,
						editicon : 'icon-pencil blue', 
						add: true,
						addicon : 'icon-plus-sign purple',
						del: true,
						delicon : 'icon-trash red',
						search: true,
						searchicon : 'icon-search orange',
						view: true,
						viewicon : 'icon-zoom-in grey',
						refresh: true,
						refreshicon : 'icon-refresh green'
					},
					{
						//edit record form
						//closeAfterEdit: true,
						recreateForm: true,
                        afterSubmit: fn_editSubmit,
						beforeShowForm : function(e) {
							var form = $(e[0]);
							form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
							style_edit_form(form);
						}
					},
					{
						//new record form
						closeAfterAdd: true,
						recreateForm: true,
						viewPagerButtons: false,
                        afterSubmit: fn_editSubmit,
						beforeShowForm : function(e) {
							var form = $(e[0]);
							form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
							style_edit_form(form);
						}
					},
					{
						//delete record form
						recreateForm: true,
						beforeShowForm : function(e) {
							var form = $(e[0]);
							if(form.data('styled')) return false;
							
							form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
							style_delete_form(form);
							
							form.data('styled', true);
						},
						onClick : function(e) {
							//alert(1);
						}
					},
					{
						//search form
						recreateForm: true,
						afterShowSearch: function(e){
							var form = $(e[0]);
							form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
							style_search_form(form);
						},
						afterRedraw: function(){
							style_search_filters($(this));
						}
						,
						multipleSearch: true,
						/**
						multipleGroup:true,
						showQuery: true
						*/
					},
					{
						//view record form
						recreateForm: true,
						beforeShowForm: function(e){
							var form = $(e[0]);
							form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
						}
					}
				);
				jqnav.navSeparatorAdd('#grid-table_toppager',{sepclass:"ui-separator",sepcontent: ''});
				jqnav.navButtonAdd('#grid-table_toppager', {  
					caption: "角色管理",  
					title:"为用户添加角色",  
					buttonicon: "ace-icon fa fa-globe blue",  
					onClickButton: alertinfo,  
					position: "last"  
				})							
				$("#grid-table_toppager_right").hide();
				$("#grid-table_toppager_center").hide();
				$("#grid_table_toppager_left").attr("colspan","3");
				function style_edit_form(form) {
					$("#tr_USER_CODE,#tr_USER_NAME").find(".CaptionTD").append('<span style="color:red;">*</span>')	//添加红*
					$("#tr_USER_CODE,#tr_USER_NAME,#tr_ORG_CODE,#tr_IS_MANAGER").find(".CaptionTD").css({fontWeight:'bold'})//字体加粗								
					//enable datepicker on "sdate" field and switches for "stock" field
					form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
						.end().find('input[name=IS_USE]')
							  .addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');
					//update buttons classes
					var buttons = form.next().find('.EditButton .fm-button');
					buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
					buttons.eq(0).addClass('btn-primary').prepend('<i class="icon-ok"></i>');
					buttons.eq(1).prepend('<i class="icon-remove"></i>')
					buttons = form.next().find('.navButton a');
					buttons.find('.ui-icon').remove();
					buttons.eq(0).append('<i class="icon-chevron-left"></i>');
					buttons.eq(1).append('<i class="icon-chevron-right"></i>');	
					
				}			
				function style_delete_form(form) {
					var buttons = form.next().find('.EditButton .fm-button');
					buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
					buttons.eq(0).addClass('btn-danger').prepend('<i class="icon-trash"></i>');
					buttons.eq(1).prepend('<i class="icon-remove"></i>')
				}				
				function style_search_filters(form) {
					form.find('.delete-rule').val('X');
					form.find('.add-rule').addClass('btn btn-xs btn-primary');
					form.find('.add-group').addClass('btn btn-xs btn-success');
					form.find('.delete-group').addClass('btn btn-xs btn-danger');
				}
				function style_search_form(form) {
					var dialog = form.closest('.ui-jqdialog');
					var buttons = dialog.find('.EditTable')
					buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'icon-retweet');
					buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'icon-comment-alt');
					buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'icon-search','search');
				}				
				function beforeDeleteCallback(e) {
					var form = $(e[0]);
					if(form.data('styled')) return false;
					
					form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
					style_delete_form(form);
					
					form.data('styled', true);
				}				
				function beforeEditCallback(e) {
					var form = $(e[0]);
					form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
					style_edit_form(form);
				}			
				//it causes some flicker when reloading or navigating grid
				//it may be possible to have some custom formatter to do this as the grid is being created to prevent this
				//or go back to default browser checkbox styles for the grid
				function styleCheckbox(table) {				
					$(table).find('input:checkbox').addClass('ace')
					.wrap('<label />')
					.after('<span class="lbl align-top" />')			
					$('.ui-jqgrid-labels th[id*="_cb"]:first-child')
					.find('input.cbox[type=checkbox]').addClass('ace')
					.wrap('<label />').after('<span class="lbl align-top" />');
				
				}		
				//unlike navButtons icons, action icons in rows seem to be hard-coded
				//you can change them like this in here if you want
				function updateActionIcons(table) {
				
				}			
				//replace icons with FontAwesome icons like above
				function updatePagerIcons(table) {
					var replacement = 
					{
						'ui-icon-seek-first' : 'icon-double-angle-left bigger-140',
						'ui-icon-seek-prev' : 'icon-angle-left bigger-140',
						'ui-icon-seek-next' : 'icon-angle-right bigger-140',
						'ui-icon-seek-end' : 'icon-double-angle-right bigger-140'
					};
					$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
						var icon = $(this);
						var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
						
						if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
					})
				}	
				function enableTooltips(table) {
					$('.navtable .ui-pg-button').tooltip({container:'body'});
					$(table).find('.ui-pg-div').tooltip({container:'body'});
				}
				$(function(){
					$("#edit_grid-table_top").click(function(){
						$("#tr_USER_CODE input,#tr_USER_NAME input").attr("readonly",true)
					})
					$("#grid-table").click(function(){  //父子组件间传递的id 获取选中id
						thisis.ids = jQuery('#grid-table').jqGrid('getGridParam', 'selarrrow').toString()
					})
					$("#jqgh_grid-table_cb").click(function(){ //父子组件间传递的id 获取所有id
						thisis.ids = $("#grid-table").jqGrid('getDataIDs').toString();
					})
				});
			});	
			$(function(){
				$(window).resize(function(){
					$('#grid-table').setGridWidth($(window).width()-417);
					$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示                						
				})
				$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示				
				$("#grid-table").jqGrid('setGridParam',{postData:{"querySql":""},}).trigger('reloadGrid');
				$("#view_grid-table_top").click(function(){
					$("#trv_IS_MANAGER,#trv_ORG_CODE,#trv_USER_NAME,#trv_USER_CODE").find('.DataTD span').css({marginLeft:'20px'})
				});
				$("#add_grid-table_top").click(function(){
					//用户编码只能由数字和字母组成
					$("#tr_USER_CODE").append("<div id='hint' style='color:red;font-size:9px;margin-left:-383px;padding-top:36px'>以字母开头，只能由数字，字母组成！</div>")
					var reg =/^[a-zA-Z][a-zA-Z0-9]*$/g; 
					$("#hint").hide();
					$("#USER_CODE").blur(function(){
						var userCoding=$("#USER_CODE").val();						
						if(!reg.test(userCoding)){
							$("#hint").show();
							return false;}
					})
					$("#USER_CODE").attr({placeholder:'请最少输入四位编码'});
					$("#USER_CODE").css({fontSize:'11px',width:'179px',height:'27px'});
					$("#sData").click(function(){
						$("#hint").css("margin-left","-359px")
					})
					
				})
			});
			 $(function(){
				$("#tree").dynatree({   //tree生成树形结构所在的节点的ID如<div id="tree"></div>
					title:"组织机构",    //树的名字
					minExpandLevel:1,   //1：根节点不能展开
					imagePath:'',       //文件夹节点图片路径
					method:'get',
					initAjax:{url:baseURL+"/manageCommon.htm", data:{param_act:"treeData",tree_code:"SF_ORG"}},
					onClick: function(node){ 
								$("#grid-table").jqGrid('setGridParam',{
										postData:{"treeSelectCode":node.data.id},
										page:1
									}).trigger('reloadGrid'); 
								} 
				});	
				$("#roletree").dynatree({   //tree生成树形结构所在的节点的ID如<div id="tree"></div>
					title:"组织机构",    //树的名字
					minExpandLevel:1,   //1：根节点不能展开
					imagePath:'',       //文件夹节点图片路径
					method:'get',     
                    checkbox:true,
                    expand:true,
                    isFolder:false,
					initAjax:{url:baseURL+"/manageCommon.htm", data:{param_act:"treeData",tree_code:"SF_ROLE"}},
					onClick: function(node){ 
					}
				});
				$("#grid-table").trigger('reloadGrid');	
				
			});	
		}		
}
</script>
<style scoped lang="css">
.form_head_top{border-bottom:1px solid gray;}
.form_head_top .org{width:100px;height:30px;background-color:#143f6d;color:white;font-size:16px;font-weight:bold;border-radius:5px 5px 0px 0px;text-align:center;line-height:30px;}
.form_head_middle{height:auto;overflow:auto;}
.form_head_middle span{display:inline-block;margin-right:1%;height:40px;font-size:12px;margin-top:5px;}
.form_head_middle span .search,.resets{width:130px;height:35px;text-align:center;line-height:35px;border-radius:5px;margin-top:2px;color:white;font-weight:500;}
.form_head_middle span .search{background-color:#169bd5;}
.form_head_middle span .resets{background-color:#ff9966;}
.form_head_bottom{background-color:#f1f3f6;height:40px;}
.form_head span{cursor:pointer;}
#treeForm{float:left;width: 250px}
/* .rightForm{float:left;width: calc(100vw - 467px) ;} */
.rightForm{float:left;width: calc(100vw - 417px) ;}

</style>