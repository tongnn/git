<template>
    <div class='animated fadeIn'>
		<div class='rightForm'>
		<ul class='form_head'>
			<li class='form_head_top'><div class='org'>预警推送</div></li>
			<li class='form_head_middle'>
				<span>设备：<input id='eq_CODE' type='text' ></span>
				<span><div class='search' @click='find'>查 询</div></span>
				<span><div class='resets' @click='reset'>重 置</div></span>  
			</li>
    	</ul>
        <!-- 表格 -->
        <table id="grid-table"></table>
	    <div id="grid-pager"></div>
		<!-- 选择数据站点 -->
		<Modal v-model="modal1" title="选择数据站点"  @on-ok='saveSite'  @on-cancel='cancleSite'>
			<div id='formWrap1'>
				<table id="grid-sitetable"></table>
				<div id="grid-siteeqpager"></div>
			</div>
		</Modal> 
		<!-- 选择设备 -->
		<Modal v-model="modal2" title="选择设备"  @on-ok='saveEq'  @on-cancel='cancleEq'>
			<div id='formWrap2'>
				<table id="grid-eqtable"></table>
				<div id="grid-eqeqpager"></div>
			</div>
		</Modal> 
		</div>
    </div>
</template>
<script>
var baseURL = process.env.BASE_API;
var pushType='';
var zu='';
var eqCode='';
var siteId='';var siteName='';var seleqCode=''; //回显站点名称和根据站点过滤设备
function getQuerySql(type){
	var querySql = "";
		if(type=="0"){
			var selsiteCodes=type;
			if(selsiteCodes !=''){
				querySql = querySql + "and  NODE_TYPE = '1'";
			}
		}
		if(type == "1"){
			var seleqCodes=seleqCode;
			if(seleqCodes != ''){
				querySql = querySql +"and NODE_CODE like '"+seleqCodes+"%' and NODE_TYPE = '2' "
			}
		}
		if(type=="2"){
			var orgName =eqCode;
			if(orgName != ''){
				querySql = querySql + "and  EQ_CODE like '%" + orgName + "%'";
			}
		}
		return querySql;
}
String.prototype.trim = function(){
		return this.replace(/(^\s*)|(\s*$)/g, "");
	}
export default {
    name:'shakewarnPush',
    data(){
        return{modal1:false,modal2:false}
	},
	methods: {
			seek(){//数据站点选择
				var type='0';
				var querySql = getQuerySql(type);
				$("#grid-sitetable").jqGrid('setGridParam',{
								postData:{"querySql":querySql},page:'1'
							}).trigger('reloadGrid'); 
			},
			saveSite(){
				siteId =  jQuery('#grid-sitetable').jqGrid('getGridParam', 'selarrrow');
				siteName = $("#grid-sitetable").jqGrid('getRowData',siteId)
				$("#DATA_POINT").val(siteName.NODE_NAME);
				$(".sitecodes").val(siteName.NODE_CODE)
				$("#editmodgrid-table,.ui-widget-overlay").show();
			},
			cancleSite(){
				$("#editmodgrid-table,.ui-widget-overlay").show();
			},
			seekEq(){//设备选择
				var type="1";
				seleqCode=siteName.NODE_CODE;
				var querySql = getQuerySql(type);
				$("#grid-eqtable").jqGrid('setGridParam',{
								postData:{"querySql":querySql},page:'1'
							}).trigger('reloadGrid'); 
			},
			saveEq(){
				var siteeqId =  jQuery('#grid-eqtable').jqGrid('getGridParam', 'selarrrow');
				var siteeqName = $("#grid-eqtable").jqGrid('getRowData',siteeqId)
				$("#EQ_CODE").val(siteeqName.NODE_NAME);
				$(".siteeqs").val(siteeqName.NODE_CODE)
				$(".ui-widget-overlay,#editmodgrid-table").show();
			},
			cancleEq(){
				$("#editmodgrid-table,.ui-widget-overlay").show();
			},
			find(){
				var type='2'
			    eqCode=$("#eq_CODE").val();
				eqCode= eqCode.trim();
				var querySql = getQuerySql(type);
				$("#grid-table").jqGrid('setGridParam',{
								postData:{"querySql":querySql},page:'1'
							}).trigger('reloadGrid'); 
			},
			reset(){
				document.getElementById('eq_CODE').value = "";
				$("#grid-table").jqGrid('setGridParam',{
								postData:{"querySql":""},
							}).trigger('reloadGrid'); 
			}
        },
	beforeMount(){
			$.ajax({  
			url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=WARN_SEND_TYPE',//推送方式基础数据
			async: false,  
			success: function(data, result) {
				pushType = data; 
				if (!result) 
				alert('推送方式加载失败...');   
				}
			});
			$.ajax({  
			url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=WX_DEPT_GROUP',//推送组基础数据
			async: false,  
			success: function(data, result) {
				zu = data; 
				if (!result) 
				alert('推送组加载失败...');   
				}
			});
		},
    mounted(){
		var thisis=this;
		//弹出框
		//选择数据站点
			 jQuery(function($) {
				var grid_selector = "#grid-sitetable";
				var pager_selector = "#grid-siteeqpager";
				var pager_topper="#grid-toppager"
				jQuery(grid_selector).jqGrid({
					method:'get',
					url:baseURL + "/listDataController.htm?param_act=listData&param_funcId=01611d565f6e00aa", 
					datatype: "json",
					height: 100+'%',
					colNames:["ID",'测点编码','测点名称',"过滤数据站点"],
					colModel:[
						{name:'ID',index:'ID', sorttype:"int", editable: true, hidden:true},
						{name:'NODE_CODE',index:'NODE_CODE',width:230, editable:true,editoptions:{size:"20",maxlength:"32"}}, //测点编码 
						{name:'NODE_NAME',index:'NODE_NAME',width:230, editable:true,editoptions:{size:"20",maxlength:"80"}}, //测点名称    
						{name:'NODE_TYPE',index:'NODE_TYPE',width:230,hidden:true, editable:true,editoptions:{size:"20",maxlength:"80"}}, // NODE_TYPE = '1'                          

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
                    beforeSelectRow:beforeSelectRow, //单选					
					loadComplete : function() {
						var table = this;
					},
					autowidth: true,
					width:100+'%',
					shrinkToFit:true,
					autoScroll:true,
					editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=01611d565f6e00aa",
				});
				function beforeSelectRow(){//单选方法
					$("#grid-sitetable").jqGrid('resetSelection');  
					return(true);  
				}  
				jQuery(grid_selector).jqGrid('navGrid','#grid-table_toppager',)
				$("#grid-sitetable_toppager,#grid-siteeqpager_left").hide();
				$("#grid-siteeqpager_center").css({width:'310px'})
				$("#grid-siteeqpager").hide();
			});	
			//选择设备
			 jQuery(function($) {
				var grid_selector = "#grid-eqtable";
				var pager_selector = "#grid-eqeqpager";
				var pager_topper="#grid-toppager"
				jQuery(grid_selector).jqGrid({
					method:'get',
					url:baseURL + "/listDataController.htm?param_act=listData&param_funcId=01611d565f6e00aa", 
					datatype: "json",
					height: 100+'%',
					colNames:["ID",'测点编码','测点名称'],
					colModel:[
						{name:'ID',index:'ID', sorttype:"int", editable: true, hidden:true},
						{name:'NODE_CODE',index:'NODE_CODE',width:230, editable:true,editoptions:{size:"20",maxlength:"32"}}, //测点编码 
						{name:'NODE_NAME',index:'NODE_NAME',width:230, editable:true,editoptions:{size:"20",maxlength:"80"}}, //测点名称                          
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
                    beforeSelectRow:beforeSelectRow, //单选					
					loadComplete : function() {
						var table = this;
					},
					autowidth: true,
					width:100+'%',
					shrinkToFit:true,
					autoScroll:true,
					editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=01611d565f6e00aa",
				});
				function beforeSelectRow(){//单选方法
					$("#grid-eqtable").jqGrid('resetSelection');  
					return(true);  
				}  
				jQuery(grid_selector).jqGrid('navGrid','#grid-table_toppager',)
				$("#grid-eqtable_toppager,#grid-eqeqpager_left").hide();
				$("#grid-eqeqpager_center").css({width:'310px'})
				$("#grid-eqeqpager").hide();
			});	
			//本页
        jQuery(function($) {
				var grid_selector = "#grid-table";
				var pager_selector = "#grid-pager";
				var pager_topper="#grid-toppager"
				jQuery(grid_selector).jqGrid({
					method:'get',
					url:baseURL + "/listDataController.htm?param_act=listData&param_funcId=0163aeffba0d0004",
					datatype: "json",
					height: 100+'%',
					colNames:["ID",'数据站点','设备', '预警级别','推送方式','延时时长(min)',"推送组"],
					colModel:[
						{name:'ID',index:'ID',sorttype:"int", editable: true,hidden:true},
						{name:'DATA_POINT',index:'DATA_POINT', editable:true,editrules:{required:true}},//数据站点
						{name:'EQ_CODE',index:'EQ_CODE',editable: true},//设备
						// {name:'SEND_LEVEL',index:'SEND_LEVEL', editable: true,edittype:"select",formatter:'select',editoptions:{value:warnLevel}}, //预警级别
						{name:'SEND_LEVEL',index:'SEND_LEVEL', editable: true,edittype:"select",formatter:'select',editoptions:{value:"0:请选择;4:危险;1:预警;3:报警"}}, //预警级别
						{name:'SEND_TYPE',index:'SEND_TYPE', editable: true,edittype:"select",formatter:'select',editoptions:{value:pushType}}, //推送方式
						{name:'CONTINUE_TIME',index:'CONTINUE_TIME', editable: true}, //持续时长
						{name:'DEPT_GROUP',index:'DEPT_GROUP', editable: true,edittype:"select",formatter:'select',editoptions:{value:zu},editrules:{required:true}}, //组
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
						$("#grid-table").setColProp('DEPT_GROUP', { editoptions: { value:zu} });
						$("#grid-table").setColProp('SEND_TYPE', { editoptions: { value:pushType} });							
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
					editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=0163aeffba0d0004"
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
				function style_edit_form(form) {
					//传递数据站点编码
					$("#tr_DATA_POINT").append("<input class='sitecodes' style='display:none' type='text' value=''/>");
					//传递数据站点编码
					$("#tr_EQ_CODE").append("<input class='siteeqs' style='display:none' type='text' value=''/>");
					//选择延时推送才出现
					$("#tr_CONTINUE_TIME").hide();
					$("#SEND_TYPE ").click(function(){
						if($("#SEND_TYPE option:selected").text() == '延时推送'){
							$("#tr_CONTINUE_TIME").show();
							$("#selsite,#selequip").css({left:"450px"})  
						}else{
							$("#tr_CONTINUE_TIME").hide();
							$("#selsite,#selequip").css({left:"415px"})  

						}
					})
					//选择数据站点
					$("#tr_DATA_POINT").append("<div id='selsite' style='width:88px;height:25px;background:#09acf1;color:white;cursor:pointer;position:absolute;left:415px;top:6px;text-align:center;line-height:25px;border-radius:3px'>选择数据站点</div>");
					$("#selsite").click(function(){
						$(".ui-widget-overlay,#editmodgrid-table,#cb_grid-sitetable").hide();
						$("#EQ_CODE").val("");
						thisis.modal1 = true;
						$(".ui-jqgrid-bdiv").css({border:'none'});
						thisis.seek();  
						
						
					});
					//选择设备按钮
					$("#tr_EQ_CODE").append("<div id='selequip' style='width:60px;height:25px;background:#09acf1;color:white;cursor:pointer;position:absolute;left:415px;top:46px;text-align:center;line-height:25px;border-radius:3px' >选择设备</div>");
					$("#selequip").click(function(){
						if($("#DATA_POINT").val()==""){
							thisis.$alert("请先选择数据站点")
						}else{
							$("#editmodgrid-table,.ui-widget-overlay,#cb_grid-eqtable").hide();
							thisis.modal2 = true;
							$(".ui-jqgrid-bdiv").css({border:'none'});
							thisis.seekEq();
						}
					});
					$("#sData").click(function(){
						if($("#DATA_POINT").val()==''){
								$("#selsite").css({top:'40px',left:'440px'});
								$("#selequip").css({top:'79px',left:'440px'});
							}
						if($("#EQ_CODE").val()==''){
							$("#selsite").css({top:'40px',left:'430px'});
							$("#selequip").css({top:'79px',left:'430px'});
						}
						
					})
					//
					$("#tr_DATA_POINT,#tr_DEPT_GROUP").find(".CaptionTD").append('<span style="color:red;">*</span>')//必填红*
					$("#DATA_POINT,#EQ_CODE").attr({readonly:true})
					$("#tr_DATA_POINT,#tr_EQ_CODE,#tr_SEND_LEVEL,#tr_SEND_TYPE,#tr_CONTINUE_TIME,#tr_DEPT_CODE,#tr_PERSON,#tr_DEPT_GROUP").find(".CaptionTD").css({fontWeight:'bold',paddingLeft:'50px'})//字体加粗
                	$("#tr_DATA_POINT,#tr_EQ_CODE,#tr_CONTINUE_TIME,#tr_DEPT_CODE,#tr_PERSON").find("input").css({width:'220px'})//输入框宽度								
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
						$('#grid-table').setGridWidth($(window).width()-165);
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
.rightForm{float:left;width: calc(100vw - 165px) ;}
</style>
