<template>
  <div class="animated fadeIn">
<div class='rightForm'>

    <ul class='form_head'>
        <li class='form_head_top'><div class='org'>消防工程</div></li>
        <li class='form_head_middle'>
            <span>工程名称：<input id='pROJECT_NAME' type='text' ></span>
            <span><div class='search' @click='find'>查 询</div></span>
            <span><div class='resets' @click='reset'>重 置</div></span>  
        </li>
    </ul>
	<table id="grid-table"></table>
	<div id="grid-pager"></div>
</div>

</div>
</template>
<script>
	var proName='';
	function getQuerySql(){
		var projectname = proName;
		var querySql = "";
		if(projectname != ''){
			querySql = querySql + "and  PROJECT_NAME like '%" + projectname + "%'";
		}
		return querySql;
	}
import Vue from 'vue'
import axios from 'axios'
var baseURL = process.env.BASE_API;
String.prototype.trim = function(){
            return this.replace(/(^\s*)|(\s*$)/g, "");
        }
export default {
  name: 'ProDefinition',
   data () {
            return { }
        },
        methods: {
			find(){
				proName=$("#pROJECT_NAME").val();
                proName= proName.trim();
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
				document.getElementById('pROJECT_NAME').value = "";
				var treeSelect = $("#tree").dynatree("getActiveNode");
				var treeSelectCode = "";
				if(treeSelect != null && treeSelect !=""){
					treeSelectCode = treeSelect.data.id;
				}
				$("#grid-table").jqGrid('setGridParam',{
								postData:{"querySql":"","treeSelectCode":treeSelectCode},
							}).trigger('reloadGrid'); 
			}
        },
        mounted(){
			var thisis = this;
			var baseURL = process.env.BASE_API;
            jQuery(function($) {
				var grid_selector = "#grid-table";
				var pager_selector = "#grid-pager";
				var pager_topper="#grid-toppager"
				jQuery(grid_selector).jqGrid({
					method:'get',
					url:baseURL + "/listDataController.htm?param_act=listData&param_funcId=01614b3b24750012",
					datatype: "json",
					height: 100+'%',
					colNames:["工程编号",'工程名称','分区大小','图片路径','背景图片'],
					colModel:[
						{name:'ID',index:'ID', sorttype:"int", editable: true,editoptions:{edithidden:true}},
						{name:'PROJECT_NAME',index:'PROJECT_NAME',editable:true,editoptions:{size:"20",maxlength:"30"},editrules:{required:true}},
						{name:'PART_SIZE',index:'PART_SIZE',editable: true,editoptions:{size:"20",maxlength:"30"}},
                        {name:'BACKGROUND_IMG',index:'BACKGROUND_IMG',editable: true,hidden:true,editoptions:{size:"20",maxlength:"30"}},
                        {name:'IMG_NAME',index:'IMG_NAME',editable: true,editoptions:{size:"20",maxlength:"30"},editrules:{required:false},hidden:true}
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
					editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=01614b3b24750012"
				});
				function aceSwitch( cellvalue, options, cell ) {
					setTimeout(function(){
						$(cell) .find('input[type=checkbox]')
								.wrap('<label class="inline" />')
							.addClass('ace ace-switch ace-switch-5')
							.after('<span class="lbl"></span>');
					}, 0);
				}
				function pickDate( cellvalue, options, cell ) {
					setTimeout(function(){
						$(cell) .find('input[type=text]')
								.datepicker({format:'yyyy-mm-dd' , autoclose:true}); 
					}, 0);
				}
				function fn_editSubmit(response,postdata){
                    var alertinfor=response.responseText; 
                    if(alertinfor!=''){
                        thisis.$alert(alertinfor);
                    } 
                    return true;
                }
				//navButtons
				jQuery(grid_selector).jqGrid('navGrid','#grid-table_toppager',
					{ 	//navbar options
						edit: true,
						editicon : 'icon-pencil blue',
						add: true,
						addicon : 'icon-plus-sign purple',
						del: true,
						delicon : 'icon-trash red',
						search: true,
						searchicon : 'icon-search orange',
						refresh: true,
						refreshicon : 'icon-refresh green',
						view: true,
						viewicon : 'icon-zoom-in grey',
					},
					{
						//edit record form
						closeAfterEdit: true,
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
							// alert(1);
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
					//$("#IMG_NAME").attr({placeholder:'选择文件上传',readonly:true})//输入框内提示
					$("#tr_PROJECT_NAME,#tr_IMG_NAME").find(".CaptionTD").append('<span style="color:red;">*</span>')//添加红*
					$("#tr_ID,#tr_PROJECT_NAME,#tr_PART_SIZE,#tr_IMG_NAME").find(".CaptionTD").css({fontWeight:'bold'})//字体加粗
					$("#tr_ID input").attr({readonly:true});
					$("#PART_SIZE").val("1010*0592");
					// 背景图片功能及样式
					//$('#TblGrid_grid-table tbody').append('<form id="from" action="" method="post" enctype="multipart/form-data"> <input type="button" id="intwrap" value="选择图片" /> <input type="file" id="fileId" value="" /><input type="button" id="submit" value="上传图片"/></form>')
					// $("#from").css({position:"relative",left:"150px",top:"0px",width:"235px",height:"30px"});
					// //$("#submit").css({position:"absolute",left:"0",top:"40px",width:"67px",outline:"none"});
					// $("#fileId").css({outline:"none",position:"absolute",top:"5px"});     
					// $("#intwrap").css({position:"absolute",top:"5px",width:"67px"});
					// $("#FrmGrid_grid-table").css({height:"235px",overflow:"auto"}); //溢出隐藏
					// $(".CaptionTD").css({position:"absolute",left:"150px"});$(".DataTD").css({position:"relative",left:"-100px",top:"0px"});
					// $("#submit").click(function(){ //上传图片
					// 	var upVal=$("#fileId").val();
					// 	if(upVal=='' || !upVal){
					// 		thisis.$alert("先选择上传的图片",'提示');
					// 	}else{
					// 		$("#fileId").css({opacity:"0"});
					// 			var num=$("#ID").val();
					// 			var a = new FormData();
					// 			a.append("image", $("#fileId")[0].files[0]);
					// 			a.append("id", 1);
					// 			$.ajax({
					// 			url:baseURL+"/docFile.htm?param_act=uploadPic&ID="+num, 
					// 			xhrFields:{ withCredentials:true},
					// 			type: "POST",
					// 			cache: false,
					// 			data: a,
					// 			processData: false,
					// 			contentType:false,
					// 			async: false,
					// 			success: function (data) {
					// 				var news=JSON.parse(data);
					// 				var msg=news.msg;var fileName=news.filePath;
					// 				thisis.$alert(msg);
					// 				//截取文件名称
					// 				var pos=fileName.indexOf("_");  
					// 				var result=fileName.substring(pos+1,fileName.length);
					// 				$("#IMG_NAME").val(result);
					// 				//id+文件名称
					// 				$("#BACKGROUND_IMG").val(fileName);
					// 			}
					// 		})
					// 	}
					// })
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
					buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();
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
				function styleCheckbox(table) { }
				function updateActionIcons(table) { }
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
					$("#add_grid-table_top").click(function(){
						$.ajax({
							url:baseURL+"/fiSafety.htm?param_act=addProject",
							type: "POST",
							success: function (data) {
								var news=JSON.parse(data).ID;
								$("#ID").val(news)//工程编号的id返回给表单
							 }
						})
					});
					$(window).resize(function(){
						// $('#grid-table').setGridWidth($(window).width()-50);
					$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示                						
					})
					$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示                					
				})
			});	
        }
}
</script>
<style scoped lang="css">
.form_head_top{border-bottom:1px solid gray;}
.form_head_top .org{width:100px;height:30px;background-color:#143f6d;color:white;font-size:16px;font-weight:bold;border-radius:5px 5px 0px 0px;text-align:center;line-height:30px;}
.form_head_middle{height:auto;overflow:auto;}
.form_head_middle span{display:inline-block;margin-right:1%;height:40px;margin-top:5px;font-size:12px;}
.form_head_middle span .search,.resets{width:130px;height:35px;text-align:center;line-height:35px;border-radius:5px;margin-top:2px;color:white;font-weight:500;}
.form_head_middle span .search{background-color:#169bd5;}
.form_head_middle span .resets{background-color:#ff9966;}
.form_head_bottom{background-color:#f1f3f6;height:40px;}
.form_head span{cursor:pointer;}
.rightForm{float:left;width: calc(100vw - 169px) ;}

</style>