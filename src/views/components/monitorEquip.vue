<template>
<div class="animated fadeIn">
<ul class='form_head'>
	<li class='form_head_top'><div class='org'>应力监测设备</div></li>
	<li class='form_head_middle'>
		<span>设备名称：<input id='eQ_NAME' type='text' ></span>
		<span><div class='search' @click='find'>查 询</div></span>
		<span><div class='resets' @click='reset'>重 置</div></span> 
	</li>
</ul>
<table id="grid-table"></table>
<div id="grid-pager"></div>
<Modal v-model="modal1" title="监测设备添加"  @on-ok="saveRole" @on-cancel="cancel">
	<div id='formWrap'>
		<table id="grid-eqtable"></table>
		<div id="grid-eqpager"></div>
	</div>
	
</Modal> 
</div>
</template>
<script>
var eqName='';
String.prototype.trim = function(){ 
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
function getQuerySql(){
	var eqname = eqName;
	var querySql = "";
	if(eqname != ''){
		querySql = querySql + "and  EQ_NAME like '%" + eqname + "%'";
	}
	return querySql;
}
import Vue from 'vue'
import axios from 'axios'
var baseURL = process.env.BASE_API;
export default {
name: 'monitorEquip',
data () {
		return {
			modal1: false
			}
	},
	methods: {
		saveRole () {
				this.$Message.info('点击了确定');
				var _this=this;
				var selectIds = jQuery('#grid-eqtable').jqGrid('getGridParam', 'selarrrow');
				$.ajax({
					type:'post',
					url:baseURL + '/stMonitor.htm?param_act=getEquipCode&id='+selectIds,
					headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
					success:function(data){
						var news=JSON.parse(data).EQ_CODE;
						$("#EQ_CODE").val(news);
						$("#grid-eqtable").jqGrid('setGridParam',{ page:1 }).trigger('reloadGrid'); 
						}       
				})  
				$("#editmodgrid-table").show();
			},
		cancel () {
					this.$Message.info('点击了取消');
					$("#editmodgrid-table").show();
			}
		,
		find(){
			eqName=$("#eQ_NAME").val();
			eqName= eqName.trim();
			var querySql = getQuerySql();
			$("#grid-table").jqGrid('setGridParam',{postData:{"querySql":querySql},page:'1'}).trigger('reloadGrid'); 
		},
		reset(){
			document.getElementById('eQ_NAME').value = "";
			$("#grid-table").jqGrid('setGridParam',{postData:{"querySql":""}}).trigger('reloadGrid'); 
		}
	},
	mounted(){
		var thisis = this;
		//弹出框表格
		jQuery(function($) {
					var grid_selector = "#grid-eqtable";
					var pager_selector = "#grid-eqpager";
					jQuery(grid_selector).jqGrid({
						method:'get',    
						url:baseURL + "/listDataController.htm?param_act=listData&param_funcId=0160e3e6f0540010",                  
						datatype: "json",
						height: 100+'%',
						width:50+ '%',
						colNames:["ID","设备编号","设备名称"],
						colModel:[
							{name:'ID',index:'ID', width:0, sorttype:"int", editable: true, hidden:true},
							{name:'EQ_CODE',index:'EQ_CODE', width:200, sorttype:"int", editable: true, hidden:false},
							{name:'EQ_NAME',index:'EQ_CODEID', width:290, sorttype:"int", editable: true, hidden:false}
						], 
						viewrecords : true,
						rowNum: 5,
						rowList:[5,10,15],
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
						beforeSelectRow:beforeSelectRow, //单选
						loadComplete : function() {
							var table = this;
							setTimeout(function(){
								updatePagerIcons(table);
								enableTooltips(table);
							}, 0);
						},
						editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=0160e3e6f0540010",
						autowidth: true
					});
					function reloadgrid() {
					setTimeout(function(){
						$("#grid-eqpager").jqGrid('setGridParam',{postData:{"querySql":""},}).trigger('reloadGrid');
					}, 0);
				} 
				function beforeSelectRow(){//单选方法
						$("#grid-eqtable").jqGrid('resetSelection');  
						return(true);  
					}  
					//navButtons
					jQuery(grid_selector).jqGrid('navGrid','#grid-table_toppager',
						{ 	// navbar options
							edit: false,
							editicon : 'icon-pencil blue',
							add: false,
							addicon : 'icon-plus-sign purple',
							del: false,
							delicon : 'icon-trash red',
							search: false,
							searchicon : 'icon-search orange',
							refresh: false,
							refreshicon : 'icon-refresh green',
							view: false,
							viewicon : 'icon-zoom-in grey',
						},
						{
							//edit record form
						//   closeAfterEdit: true,
							recreateForm: true,
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
					$("#grid-eqpager_left").hide();
					$("#grid-eqpager_center").css({width:'310px'})
					$("#grid-eqtable_toppager").hide();
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
				});
				$(function(){ $("#grid-eqpager").jqGrid('setGridParam',{postData:{"querySql":""},}).trigger('reloadGrid')});
		//本页表格
		jQuery(function($) {
			var grid_selector = "#grid-table";
			var pager_selector = "#grid-pager";
			var pager_topper="#grid-toppager" 
			jQuery(grid_selector).jqGrid({
				method:'get',
				url:baseURL + "/listDataController.htm?param_act=listData&param_funcId=01617960df600060",
				datatype: "json",
				height: 100+'%',
				colNames:['监测设备编号',"监测设备名称",'对应设备编号','监测结果表','备注'],
					colModel:[
						{name:'ID',index:'ID', sorttype:"int", editable:true,editoptions:{edithidden:true}},
						{name:'EQ_NAME',index:'EQ_NAME',editable:true,editoptions:{size:"20",maxlength:"30"},editrules:{required:true}},
						{name:'EQ_CODE',index:'EQ_CODE', editable: true,editoptions:{size:"20",maxlength:"30"},editrules:{required:true,number:true}},
						{name:'RESULT_TABLE',index:'RESULT_TABLE', editable:true,editoptions:{size:"20",maxlength:"30"}},
						{name:'REMARK',index:'REMARK', editable: true,edittype:"textarea",editoptions:{size:"20",maxlength:"30"}}
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
				editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=01617960df600060",
				width:100+'%',
				shrinkToFit:true,
				autoScroll:true
			});
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
			function fn_editSubmit(response,postdata){
				$('.ui-jqdialog,.ui-widget-overlay').css('display','none')
				$("#grid-table").trigger('reloadGrid');
				var alertinfor=response.responseText; 
				if(alertinfor!=''){
					thisis.$alert(alertinfor);
				} 
				return true;
			}
			//navButtons
			jQuery(grid_selector).jqGrid('navGrid','#grid-table_toppager',
				{ 
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
				$("#tr_EQ_NAME,#tr_EQ_CODE").find(".CaptionTD").append('<span style="color:red;">*</span>')//添加红*
				$("#tr_ID,#tr_REMARK,#tr_EQ_NAME,#tr_EQ_CODE,#tr_RESULT_TABLE").find(".CaptionTD").css({fontWeight:'bold'})//字体加粗
				$("#REMARK").css({width:'180px'});
				$("#EQ_CODE").attr({readonly:true});
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
				$("#fbox_grid-table").find(".columns select").css({width:'115px'});//查找的select宽					                                                                      					
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
			function updateActionIcons(table) {	}
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
				
				$(window).resize(function(){
					// $('#grid-table').setGridWidth($(window).width()-50);
					$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示                						
				})
				$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示				
				$("#add_grid-table_top").click(function(){ 									
					$.ajax({
						type:'post',
						url: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=01617960df600060",
						headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
						success:function(data){
							
						}       
					});
					$("#tr_ID").hide();
					// //添加监测点弹出框表格  position:absolute;left:600px;top:39px;
					$("#tr_EQ_CODE").append("<div id='addMonitor' style='width:70px;height:25px;background:#09acf1;cursor:pointer;text-align:center;line-height:25px;border-radius:3px;color:white;' >选设备编号</div>");//<img id='pic_search' src='../../../static/img/search.jpg' alt='搜索图片'/>
					$("#pic_search").css({width:"30px",height:"25px"});							
					$("#addMonitor").css({marginLeft:'-225px',marginTop:'7px'});				
					$("#addMonitor").click(function(){
						$(".ui-widget-overlay,#editmodgrid-table").hide()
						thisis.modal1 = true;
						$("#cb_grid-eqtable").hide();
						$(".ui-jqgrid-bdiv").css({border:'none'});
						
					});
					$("#sData").click(function(){//提交后搜索图标样式变化
						$("#addMonitor").css({marginLeft:'-145px',marginTop:'7px'});
						jQuery("#grid-table").trigger("reloadGrid");					
					});
				});
				$("#edit_grid-table_top").click(function(){
					$("#ID").attr({readonly:true})
				})
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
#formWrap{margin-left:-15px;}
</style>