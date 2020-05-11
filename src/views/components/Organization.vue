<template>
  <div class="animated fadeIn">
<!--树形控件-->
<div id='treeForm'>
    <div id="tree"> </div>
</div>
<div class='rightForm'>
    <ul class='form_head'>
        <li class='form_head_top'><div class='org'>组织机构</div></li>
        <li class='form_head_middle'>
            <span>机构编码：<input id='org_CODE' type='text' ></span>
            <span>机构名称：<input id='org_NAME' type='text'></span>
            <span><div class='search' @click='find'>查 询</div></span>
            <span><div class='resets' @click='reset'>重 置</div></span>  
        </li>
    </ul>
	<!-- PAGE CONTENT BEGINS -->
	<table id="grid-table"></table>
	<div id="grid-pager"></div>
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
import '../../../static/css/datepicker.css'
import '../../../static/css/ui.jqgrid.css'
//  ace styles
import '../../../static/css/ace.min.css'
// ace settings handler
import '../../../static/js/ace-extra.min.js'
var $path_base = "/";//this will be used in gritter alerts containing images
window.jQuery || document.write("<script src='../../static/js/jquery-2.0.3.min.js'>"+"<"+"/script>");			
if("ontouchend" in document) document.write("<script src='../../static/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
import '../../../static/js/bootstrap.min.js'
import '../../../static/js/typeahead-bs2.min.js'
// page specific plugin scripts 
import '../../../static/js/date-time/bootstrap-datepicker.min.js'
import '../../../static/js/jqGrid/jquery.jqGrid.min.js'
import '../../../static/js/jqGrid/i18n/grid.locale-cn.js'
var organCode='';var organName='';
String.prototype.trim = function(){ // 用正则表达式将前后空格 用空字符串替代。 去掉空格
            return this.replace(/(^\s*)|(\s*$)/g, "");
        }
	function getQuerySql(){
		// var orgCode = document.getElementById('org_CODE').value;
		// var orgName = document.getElementById('org_NAME').value;
		var orgCode = organCode;
		var orgName = organName;
		var querySql = "";
		if(orgCode != ''){
			querySql = querySql + "and  ORG_CODE like '%" + orgCode + "%'";
		}
		if(orgName != ''){
			querySql = querySql + "and  ORG_NAME like '%" + orgName + "%'";
		}
		//alert(querySql);
		return querySql;
	}
import Vue from 'vue'
import axios from 'axios'
export default {
  name: 'Organization',
   data () {
            return { }
        },
        methods: {
			find(){
				organCode=$("#org_CODE").val();
                organCode= organCode.trim();
                organName=$("#org_NAME").val();
				organName= organName.trim();				
				var treeSelect = $("#tree").dynatree("getActiveNode");
				var treeSelectCode = "";
				//alert(treeSelect);
				if(treeSelect != null && treeSelect !=""){
					treeSelectCode = treeSelect.data.id;
				}
				var querySql = getQuerySql();
				$("#grid-table").jqGrid('setGridParam',{
								postData:{"querySql":querySql,"treeSelectCode":treeSelectCode},page:'1'
							}).trigger('reloadGrid'); 
			},
			reset(){
				document.getElementById('org_CODE').value = "";
				document.getElementById('org_NAME').value = "";
				var treeSelect = $("#tree").dynatree("getActiveNode");
				var treeSelectCode = "";
				//alert(treeSelect);
				if(treeSelect != null && treeSelect !=""){
					treeSelectCode = treeSelect.data.id;
				}
				$("#grid-table").jqGrid('setGridParam',{
								postData:{"querySql":"","treeSelectCode":treeSelectCode},
							}).trigger('reloadGrid'); 
			}
        },
        mounted(){    
			var _this=this;
			var baseURL = process.env.BASE_API;
            jQuery(function($) {
				var grid_selector = "#grid-table";
				var pager_selector = "#grid-pager";
				var pager_topper="#grid-toppager"
				jQuery(grid_selector).jqGrid({
					method:'get',
					url:baseURL + "/listDataController.htm?param_act=listData&param_funcId=011535b6bd1e0003",
					datatype: "json",
					height: 100+'%',
					colNames:["ID",'机构编码','机构名称', '类型', '是否启用'],
					colModel:[
						{name:'ID',index:'ID',sorttype:"int", editable: true,hidden:true},
						{name:'ORG_CODE',index:'ORG_CODE', editable:true,editoptions:{size:"20",maxlength:"30"},editrules:{required:true,number:true}},
						{name:'ORG_NAME',index:'ORG_NAME',editable: true,editoptions:{size:"20",maxlength:"30"},editrules:{required:true}},
						{name:'ORG_TYPE',index:'ORG_TYPE',editable: true,edittype:"select",formatter:'select',editoptions:{value:"1:公司;2:部门"}},
						{name:'IS_USE',index:'IS_USE', editable: true,edittype:"select",formatter:'select',editoptions:{value:"1:是;0:否"}}	 
					], 
					viewrecords : true,
					rowNum: 10,
					rowList:[10,20,30],
					pager : pager_selector,
					toppager : true,
					altRows:true,
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
					editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=011535b6bd1e0003"
				});
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
				function fn_editSubmit(response,postdata){
					$('.ui-jqdialog,.ui-widget-overlay').css('display','none')
                    $("#grid-table").trigger('reloadGrid');
					var alertinfor=response.responseText; 
					if(alertinfor != ""){  _this.$alert(alertinfor, '提示')} 
					$("#tree").dynatree("getTree").reload();
                }
				//navButtons
				jQuery(grid_selector).jqGrid('navGrid','#grid-table_toppager',
					{ 	//navbar options
						edit: true,
						editicon : 'icon-pencil blue', 
						// edittext:'修改',
						add: true,
						addicon : 'icon-plus-sign purple',
						// addtext: '添加',
						del: true,
						delicon : 'icon-trash red',
						// deltext:'删除',
						search: true,
						searchicon : 'icon-search orange',
						// searchtext:'',
						refresh: true,
						refreshicon : 'icon-refresh green',
						view: true,
						viewicon : 'icon-zoom-in grey',
						// viewtext: "查看"
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
						afterComplete: fn_editSubmit,	
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
				)
				$("#grid-table_toppager_right").hide();
				$("#grid-table_toppager_center").hide();
				$("#grid_table_toppager_left").attr("colspan","3");
				function style_edit_form(form) {			
					$("#tr_ORG_CODE").find(".CaptionTD").css({paddingLeft:'80px'});//表单内容居中		
					$("#tr_ORG_CODE,#tr_ORG_NAME").find(".CaptionTD").append('<span style="color:red;">*</span>')//必填红*
					$("#tr_ORG_CODE,#tr_ORG_NAME,#tr_ORG_TYPE,#tr_IS_USE").find(".CaptionTD").css({fontWeight:'bold'})//字体加粗					
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
					$("#fbox_grid-table").find(".columns select").css({width:'84px'});//查找的select宽
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
				//var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow'); 
				$(function(){
					$("#edit_grid-table_top").click(function(){
						$("#tr_ORG_CODE input,#tr_ORG_NAME input").attr("readonly",true)
					});
					$(window).resize(function(){
						$('#grid-table').setGridWidth($(window).width()-417);
						$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示                						
					})
					$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示
				})
			});	
			 $(function(){
				$("#tree").dynatree({   
					title:"组织机构",    
					minExpandLevel:1,  
					imagePath:'',     
					method:'get',  
					initAjax:{url:baseURL + "/manageCommon.htm", data:{param_act:"treeData",tree_code:"SF_ORG"}},
					onClick: function(node){ 
								//alert(node.data.code);
								$("#grid-table").jqGrid('setGridParam',{
										postData:{"treeSelectCode":node.data.id},
										page:1
									}).trigger('reloadGrid'); 
								}
				}); 
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