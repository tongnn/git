<template>
    <div class='animated fadeIn'>
		<ul class='form_head'>
			<li class='form_head_top'><div class='org'>应急预案</div></li>
			<li class='form_head_middle'>
				<span>应急预案编号:<input id='plan_CODE' type='text' ></span>
				<span><div class='search' @click='find'>查 询</div></span>
				<span><div class='resets' @click='reset'>重 置</div></span>  
			</li>
    	</ul>
        <!-- 表格 -->
        <table id="grid-table"></table>
	    <div id="grid-pager"></div>
		<Modal v-model="modal1" title="编辑信息" @on-ok="saveEdit1" @on-cancel="cancel1">
			<textarea id="editorOne" name="contentOne" cols="100" rows="8" style="width:100%;height:200px;"></textarea>
		</Modal>
		<Modal v-model="modal2" title="编辑信息" @on-ok="saveEdit2" @on-cancel="cancel2">
			<textarea id="editorTwo" name="contentTwo" cols="100" rows="8" style="width:100%;height:200px;"></textarea>
		</Modal>
		<Modal v-model="modal3" title="编辑信息" @on-ok="saveEdit3" @on-cancel="cancel3">
			<textarea id="editorThree" name="contentThree" cols="100" rows="8" style="width:100%;height:200px;"></textarea>
		</Modal>
    </div>
</template>
<script>
import '../../../static/js/kindeditor-all-min.js'
import '../../../static/css/themes/default/default.css'
var baseURL = process.env.BASE_API;
var planType='';
var warnLevel='';
var proCode='';
var describeOne='';var describeTwo='';var describeThird='';
var editorFirst='';var editorSecond='';var editorThird='';
function getQuerySql(){
	var projectcode = proCode;
	var querySql = "";
	if(projectcode != ''){
		querySql = querySql + "and  PLAN_CODE like '%" + projectcode + "%'";
	}
	return querySql;
}
String.prototype.trim = function(){
            return this.replace(/(^\s*)|(\s*$)/g, "");
		}
KindEditor.ready(function(K){ })	
	
export default {
    name:'firewarnPush',
    data(){
        return{modal1: false,modal2: false,modal3: false}
	},
	methods: {
			saveEdit1 () {
				$("#editmodgrid-table,.ui-widget-overlay").show(); 
				describeOne=editorFirst.html();
				var str1 = describeOne;
				var regx = /<[^>]*>|<\/[^>]*>/gm;
				str1=str1.replace(/<\/p>/g,'----');
				str1 =str1.replace(regx,"");
				$("#PLAN_DESCRIBE_ONE").val(str1);
				editorFirst.sync(); 		
			},
			cancel1 () {
				$("#editmodgrid-table,.ui-widget-overlay").show(); 
			},
			saveEdit2(){
				$("#editmodgrid-table,.ui-widget-overlay").show(); 
				describeTwo=editorSecond.html();
				var str2 = describeTwo;
				var regx = /<[^>]*>|<\/[^>]*>/gm;
				str2=str2.replace(/<\/p>/g,'----');
				str2 =str2.replace(regx,"");
				$("#PLAN_DESCRIBE_TWO").val(str2);
				editorSecond.sync(); 
			},
			cancel2(){
				$("#editmodgrid-table,.ui-widget-overlay").show(); 				
			},
			saveEdit3(){
				$("#editmodgrid-table,.ui-widget-overlay").show(); 
				describeThird=editorThird.html();
				var str3 = describeThird;
				var regx = /<[^>]*>|<\/[^>]*>/gm;
				str3=str3.replace(/<\/p>/g,'----');
				str3 =str3.replace(regx,"");
				$("#PLAN_DESCRIBE_THREE").val(str3);
				editorThird.sync(); 
			},
			cancel3(){
				$("#editmodgrid-table,.ui-widget-overlay").show(); 
			},
			find(){
				proCode=$("#plan_CODE").val();
                proCode= proCode.trim();
				var querySql = getQuerySql();
				$("#grid-table").jqGrid('setGridParam',{
								postData:{"querySql":querySql},page:'1'
							}).trigger('reloadGrid'); 
			},
			reset(){
				document.getElementById('plan_CODE').value = "";
				$("#grid-table").jqGrid('setGridParam',{
								postData:{"querySql":""},
							}).trigger('reloadGrid'); 
			},
			edits1(){
				KindEditor.ready(function(K){//创建编辑器1
					editorFirst=K.create("#editorOne",{items:["undo","redo","source"]})
				})
			},
			edits2(){
				KindEditor.ready(function(K){//创建编辑器1
					editorSecond=K.create("#editorTwo",{items:["undo","redo","source"]})
				})
			},
			edits3(){
				KindEditor.ready(function(K){//创建编辑器1
					editorThird=K.create("#editorThree",{items:["undo","redo","source"]})
				})
			}
			
		},
		
	beforeMount(){
			$.ajax({  
			url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=EQUIP_MAJOR',//类型基础数据
			async: false,  
			success: function(data, result) {
				planType = data; 
				if (!result) 
				alert('类型加载失败...');   
				}
			});
		},
    mounted(){
		var _this=this;
		_this.edits1();//调用创建编辑器1
		_this.edits2();//调用创建编辑器2
		_this.edits3();//调用创建编辑器3
        jQuery(function($) {
				var grid_selector = "#grid-table";
				var pager_selector = "#grid-pager";
				var pager_topper="#grid-toppager"
				jQuery(grid_selector).jqGrid({
					method:'get',
					url:baseURL + "/listDataController.htm?param_act=listData&param_funcId=0163f6edbb05002c",
					datatype: "json",
					height: 100+'%',
					colNames:["ID",'应急预案编号','应急预案名称','所属设备类型','应急预案描述1','应急预案描述2','应急预案描述3', '创建人', '创建时间','备注',],
					colModel:[
						{name:'ID',index:'ID',sorttype:"int", editable: true,hidden:true},
						{name:'PLAN_CODE',index:'PLAN_CODE', editable:true,editrules:{required:true}},//应急预案编号
						{name:'PLAN_NAME',index:'PLAN_NAME',editable: true,editrules:{required:true}},//应急预案名称
						{name:'PLAN_TYPE',index:'PLAN_TYPE', editable: true,editrules:{required:true},edittype:"select",formatter:'select',editoptions:{value:planType}}, //所属设备类型
						{name:'PLAN_DESCRIBE_ONE',index:'PLAN_DESCRIBE_ONE',editable: true,edittype:"textarea",},//应急预案描述
						{name:'PLAN_DESCRIBE_TWO',index:'PLAN_DESCRIBE_TWO',editable: true,edittype:"textarea",},//应急预案描述
						{name:'PLAN_DESCRIBE_THREE',index:'PLAN_DESCRIBE_THREE',editable: true,edittype:"textarea",},//应急预案描述
						
						{name:'CREATE_USER',index:'CREATE_USER', editable: true},//创建人
						{name:'CREATE_TIME',index:'CREATE_TIME', editable: true},//创建时间
						{name:'REMARK',index:'REMARK', editable: true,edittype:"textarea"},//备注
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
						$("#grid-table").setColProp('PLAN_TYPE', { editoptions: { value:planType} });
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
					editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=0163f6edbb05002c"
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

				String.prototype.replaceAll = function(str,oldCode,newCode){
					return (str.replace(new RegExp(oldCode,"gm"),newCode));
				} 

				function style_edit_form(form) {
					//应急预案描述1
					 $("#PLAN_DESCRIBE_ONE").click(function(){
						_this.modal1=true;$(".ui-widget-overlay,#editmodgrid-table").hide();
						if ($("#PLAN_DESCRIBE_ONE").val() == '') {} 
						else {
							_this.modal1=true;$(".ui-widget-overlay,#editmodgrid-table").hide();
							var ss=$("#PLAN_DESCRIBE_ONE").val();
							$("div .ke-edit").val(ss);
						}
					});
					//应急预案描述2
					$("#PLAN_DESCRIBE_TWO").click(function(){
						_this.modal2=true;$(".ui-widget-overlay,#editmodgrid-table").hide();
					})
					//应急预案描述3
					$("#PLAN_DESCRIBE_THREE").click(function(){
						_this.modal3=true;$(".ui-widget-overlay,#editmodgrid-table").hide();
					})
					$("#tr_PLAN_CODE,#tr_PLAN_NAME,#tr_PLAN_TYPE,#tr_PLAN_DESCRIBE_ONE,#tr_CREATE_USER,#tr_CREATE_TIME,#tr_REMARK,#tr_PLAN_DESCRIBE_TWO,#tr_PLAN_DESCRIBE_THREE").find(".CaptionTD").css({fontWeight:'bold',paddingLeft:'40px'})//字体加粗								
					$("#tr_PLAN_CODE,#tr_PLAN_NAME,#tr_PLAN_DESCRIBE_ONE,#tr_PLAN_TYPE").find(".CaptionTD").append('<span style="color:red;">*</span>')//必填红*
					$("#tr_PLAN_DESCRIBE_ONE,#tr_REMARK,#tr_PLAN_DESCRIBE_TWO,#tr_PLAN_DESCRIBE_THREE").find('.DataTD textarea').css({width:'181px'})	//输入框宽度								
					form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
						.end().find('input[name=IS_USE]')
							  .addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');
					var buttons = form.next().find('.EditButton .fm-button');
					buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
					buttons.eq(0).addClass('btn-primary').prepend('<i class="icon-ok"></i>');
					buttons.eq(1).prepend('<i class="icon-remove"></i>')	
					buttons = form.next().find('.navButton a');
					buttons.find('.ui-icon').remove();
					buttons.eq(0).append('<i class="icon-chevron-left"></i>');
					buttons.eq(1).append('<i class="icon-chevron-right"></i>');	
					$("#sData,#cData").click(function(){
						 editorFirst.html(" "); editorSecond.html(" "); editorThird.html(" ");
					})	
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
				function styleCheckbox(table) { }
				function updateActionIcons(table) { }				
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
						$('#grid-table').setGridWidth($(window).width()-140);
						$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示                						
					})
					$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示  
					
				})
			});	
			
			
    }
}
</script>
<style scoped>
.form_head_top{border-bottom:1px solid gray;}
.form_head_top .org{width:100px;height:30px;background-color:#143f6d;color:white;font-size:16px;font-weight:bold;border-radius:5px 5px 0px 0px;text-align:center;line-height:30px;}
.form_head_middle{height:auto;overflow:auto;}
.form_head_middle span{display:inline-block;margin-right:1%;height:40px;margin-top:5px;font-size:12px;}
.form_head_middle span .search,.resets{width:130px;height:35px;text-align:center;line-height:35px;border-radius:5px;margin-top:2px;color:white;font-weight:500;}
.form_head_middle span .search{background-color:#169bd5;}
.form_head_middle span .resets{background-color:#ff9966;}
.form_head_bottom{background-color:#f1f3f6;height:40px;}
.form_head span{cursor:pointer;}
</style>
