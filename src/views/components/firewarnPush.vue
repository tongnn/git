<template>
    <div class='animated fadeIn'>
<div class='rightForm'>
		<ul class='form_head'>
			<li class='form_head_top'><div class='org'>预警推送</div></li>
			<li class='form_head_middle'>
				<span>工程名称：<input id='project_NAME' type='text' ></span>
				<span><div class='search' @click='find'>查 询</div></span>
				<span><div class='resets' @click='reset'>重 置</div></span>  
			</li>
    	</ul>
        <!-- 表格 -->
        <table id="grid-table"></table>
	    <div id="grid-pager"></div>
		<!-- 选择工程 -->
		<Modal v-model="modal2" title="选择工程" @on-ok="savePro" @on-cancel="cancelPro" >
			<div id='formWrap2'>
				<table id="grid-proTable"></table>
				<div id="grid-proeqpager"></div>
			</div>
		</Modal> 
		<!-- 弹出表单 -->
		<Modal id='modal4' v-model="modal4" title="推送设置" @on-ok="savepush" @on-cancel="cancelpush">
			<div id='formWrap4'>
				<form style="width:100%;text-align:left;"  name="example" method="post" action="">
				<div class="int"><span><i>*</i>设备：</span><input id="project" name="project" type="text" value="" /> <input id='selEQ' type="button" value="选择设备" @click="eqbtn"></div>
				<div class="int"><span><i>*</i>分区：</span><input id="part" name="part" type="text" value="" /> <input id='selPART' type="button" value="选择分区" @click="partbtn"></div>
				<div class="int"> &nbsp;&nbsp;<span>位置：</span>
					<select name="location" id="location">
						<option value="---select---">-----请选择-----</option>
					</select>
				</div>
				<div class="int"><span><i>*</i>事件：</span>
					<input  id="event1" name="event" type="radio" value="2_4" checked/>堆装队传感器故障
					<input  id="event2" name="event" type="radio" value="2_12" />堆装队网络故障
					<input  id="event3" name="event" type="radio" value="2_1" />堆装队火灾报警
					<input  id="event4" name="event" type="radio" value="3_4" />装船队传感器故障
					<input  id="event5" name="event" type="radio" value="3_12" />装船队网络故障
					<input  id="event6" name="event" type="radio" value="3_1" />装船队火灾报警
					<input  id="event7" name="event" type="radio" value="1_1" />固机队火灾报警
				</div>
				<!-- <div class="int"><span><i>*</i>质量：</span><input id="quality1" name="quality" type="radio" checked value="OPC_QUALITY_GOOD" />正常
					<input id="quality2" name="quality" type="radio" value="OPC_QUALITY_NOT_CONNECTED" />中断</div> -->
				<div class="int group"><span><i>*</i>小组：</span>
					<input  id="DEPT_GROUP1" name="DEPT_GROUP" type="checkbox" value="22" checked/>消防预警_测试
					<input  id="DEPT_GROUP2" name="DEPT_GROUP" type="checkbox" value="23" />大机状态监测_传感器故障_堆装队
					<input  id="DEPT_GROUP3" name="DEPT_GROUP" type="checkbox" value="30" />大机状态监测_固机队 <br>
					<input  id="DEPT_GROUP4" name="DEPT_GROUP" type="checkbox" value="24" />大机状态监测_网络故障_堆装队
					<input  id="DEPT_GROUP5" name="DEPT_GROUP" type="checkbox" value="25" />大机状态监测_火灾报警_堆装队 <br>
					<input  id="DEPT_GROUP6" name="DEPT_GROUP" type="checkbox" value="26" />大机状态监测_传感器故障_装船队
					<input  id="DEPT_GROUP7" name="DEPT_GROUP" type="checkbox" value="27" />大机状态监测_网络故障_装船队 <br>
					<input  id="DEPT_GROUP8" name="DEPT_GROUP" type="checkbox" value="28" />大机状态监测_火灾报警1_装船队
					<input  id="DEPT_GROUP9" name="DEPT_GROUP" type="checkbox" value="29" />大机状态监测_火灾报警2_装船队
				</div>
				<div class="int fname"><span><i>*</i>表名：</span><input id="tableName1" name="tableName" type="radio" checked value="FI_EQ_STATE" />消防
					<input id="tableName2" name="tableName" type="radio" value="vbst" />振动应力</div>
				</form>
			</div>
		</Modal> 
			<!-- 选择分区 -->
		<Modal id='modal3' v-model="modal3" title="选择分区" @on-ok="savePart" @on-cancel="cancelPart">
			<div id='formWrap3'>
				<table id="grid-parttable"></table>
				<div id="grid-parteqpager"></div>
			</div>
		</Modal> 
		<!-- 选择设备 -->
		<Modal v-model="modal5" title="选择设备" @on-ok="saveEq" @on-cancel="cancelEq">
			<div id='formWrap5'>
				<table id="grid-eqtable"></table>
    			<div id="grid-eqeqpager"></div>    
			</div>
		</Modal> 
    </div>
	</div>
</template>
<script>
var baseURL = process.env.BASE_API;var eqName;
var pushType='';var zu='';var proCode='';var proId='';var engCode='';//根据工程编码显示相应的分区
var partproid='';var eqid='';var partCodes=''//根据设备编码显示相应的分区
var monitortype='';var partCode='';var PART_CODE='';
var warnLevel='';
var content = document.getElementById('editor_id');
function getQuerySql(type){
	var querySql = "";
	if(type == '0'){
		var monitor_type= type ;
			if(monitor_type !=''){
				querySql = querySql + "and  MONITOR_TYPE = '0'";
			}
	}else{
		var projectcode = proCode;
		var engineercode= engCode;
		var partitioncode=partCodes;
		if(projectcode != ''){
			querySql = querySql + "and  PROJECT_NAME like '%" + projectcode + "%'";
		}
		if(engineercode !=''){
			 querySql = querySql + "and  PROJECT_ID like '%" + engineercode + "%'";
		 }
		 if(partitioncode !=''){
			 querySql = querySql + "and  EQ_CODE like '%" + partitioncode + "%'";
		 }

	} 
	return querySql;
}
String.prototype.trim = function(){
            return this.replace(/(^\s*)|(\s*$)/g, "");
		}
export default {
    name:'firewarnPush',
    data(){
        return{ modal1:false,modal2:false,modal3:false,modal4:false,modal5:false}
	},
	methods: {
		savePro(){//选择工程获取编码和名称
			proId =  jQuery('#grid-proTable').jqGrid('getGridParam', 'selarrrow');
			var proName = $("#grid-proTable").jqGrid('getRowData',proId)
			$(".ui-widget-overlay,#editmodgrid-table").show();
			$("#PROJECT_CODE").val(proId);
			$("#PROJECT_NAME").val(proName.PROJECT_NAME);
		},
		cancelPro(){
			$("#editmodgrid-table").show();			
		},
		savePart(){//选择分区获取编码和名称
			
			partCode=  jQuery('#grid-parttable').jqGrid('getGridParam', 'selarrrow');
			var partName = $("#grid-parttable").jqGrid('getRowData',partCode)
			$("#PART_CODE").val(partCode);
			$("#PART_NAME").val(partName.PART_NAME)
			$("#part").val(partName.PART_NAME);
			// 
			var sf=$("#modal4").css("display")
			if(sf=='block'){
			$(".ui-widget-overlay,#editmodgrid-table").hide();
			}else{
				$(".ui-widget-overlay,#editmodgrid-table").show();
			}
			var  optionstring='';
			$("#location").empty();
			$("#location").append(" <option value='---select---'>-----请选择-----</option>")
			partCodes='';
				PART_CODE=partCode.toString();
						$.ajax({
							type:"post",
							url: baseURL+"/fiSafety.htm?param_act=selectLocationByPart&PART_CODE="+PART_CODE, //选择位置请求接口
							async:false,
							success:function(data){
								var dat=JSON.parse(data)
								// var optionstring = "";
								var arr=[]
								for(var i in dat){
									arr.push(dat[i])
									optionstring += "<option value=''>"+dat[i]+"</option>";  
								}
								$("#location").append(optionstring)
							},
							error:function(err){
								
							}
						});
			//
		},
		cancelPart(){
			var sf=$("#modal4").css("display")
			if(sf=='block'){
			$(".ui-widget-overlay,#editmodgrid-table").hide();
			}else{
				$(".ui-widget-overlay,#editmodgrid-table").show();
			}
		},
		find(){//查找
			var type = '1';
				proCode=$("#project_NAME").val();
                proCode= proCode.trim();
				var querySql = getQuerySql(type);
				$("#grid-table").jqGrid('setGridParam',{
								postData:{"querySql":querySql},page:'1'
							}).trigger('reloadGrid'); 
			},
		reset(){//重置
				document.getElementById('project_NAME').value = "";
				$("#grid-table").jqGrid('setGridParam',{
								postData:{"querySql":""},
							}).trigger('reloadGrid'); 
			},
		seek(){//根据工程号查看分区
			var type = '1';
				engCode=proId;
				var querySql = getQuerySql(type);
				$("#grid-parttable").jqGrid('setGridParam',{
								postData:{"querySql":querySql},page:'1'
							}).trigger('reloadGrid'); 
		},
		eqbtn(){//选择设备
			$("#part").val("");
			var type = '0';
			var querySql = getQuerySql(type);
				$("#grid-eqtable").jqGrid('setGridParam',{
								postData:{"querySql":querySql,},page:'1'
							}).trigger('reloadGrid');
			proId =  jQuery('#grid-eqtable').jqGrid('getGridParam', 'selarrrow');
			var eqsort= $("#grid-eqtable").jqGrid('getRowData',proId)
			this.modal5=true;
			$("#cb_grid-eqtable").hide();
			$(".ui-jqgrid-bdiv").css({border:'none'});
		},
		saveEq(){//选择设备确定
			eqid =  jQuery('#grid-eqtable').jqGrid('getGridParam', 'selarrrow');
			eqName = $("#grid-eqtable").jqGrid('getRowData',eqid)
			$("#project").val(eqName.EQ_NAME);

		},
		cancelEq(){

		},
		partbtn(){//选择分区
			if($("#project").val()==''){
				this.$alert("请先选择设备",'提示')
			}else{
				var type = '1';
				this.modal3=true;
				$("#cb_grid-parttable").hide();
				partCodes=eqName.EQ_CODE;
				 var querySql = getQuerySql();
					$("#grid-parttable").jqGrid('setGridParam',{
									postData:{"querySql":querySql},page:'1'
								}).trigger('reloadGrid');
			}
		},
		savepush(){
			var project = $("#project").val();
		    var part = $("#part").val();
			var location = $("#location option:selected").text();
			var event = $("input[name='event']:checked").val();
		    // var quality = $("input[name='quality']:checked").val();
			var obj = document.getElementsByName("DEPT_GROUP");
			var DEPT_GROUP = '';
			for(var k in obj){
				if(obj[k].checked){
					DEPT_GROUP+="|"+obj[k].value
				}
			}
			var tableName = $("input[name='tableName']:checked").val();
			var _this=this;
			if($("#project").val()==''){
				this.$alert('请添写设备项')
				return false;
			}else if( $("#part").val()==''){
				this.$alert('请添写分区')
				return false;
			}
			else{
				$.ajax({
					type: "post",
					url:baseURL+"/fiSafety.htm?param_act=sendWxMsg", //推送
					data:{
						"project":project,
						"part":part,
						"location":location,
						"event":event,
						// "quality":quality,
						"DEPT_GROUP":DEPT_GROUP,
						"tableName":tableName
					},
					datatype: "html",
					success: function (data) {
						var datamsg=JSON.parse(data)
						_this.$alert(datamsg.msg)
					},
					error:function(err){
						console.log(err)
					}
            })
			}
			$("#modal4").css({display:'none'});
		},
		cancelpush(){
			$("#modal4").css({display:'none'});
		},
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
			url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=WX_ALARM_EVENT',//预警级别基础数据
			async: false,  
			success: function(data, result) {
				warnLevel = data; 
				if (!result) 
				alert('预警级别加载失败...');   
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
		//弹出框表格
		
			//选择工程
			 jQuery(function($) {
				var grid_selector = "#grid-proTable";
				var pager_selector = "#grid-proeqpager";
				var pager_topper="#grid-toppager"
				jQuery(grid_selector).jqGrid({
					method:'get',
					url:baseURL + "/listDataController.htm?param_act=listData&param_funcId=01614b3b24750012",
					datatype: "json",
					height: 100+'%',
					colNames:["工程编号",'工程名称','分区大小','图片路径','背景图片'],
					colModel:[
 						{name:'ID',index:'ID', sorttype:"int",width:130, editable: true,editoptions:{edithidden:true}},
 						{name:'PROJECT_NAME',index:'PROJECT_NAME',width:185,editable:true,editoptions:{size:"20",maxlength:"30"},editrules:{required:true}},
 						{name:'PART_SIZE',index:'PART_SIZE',width:145,editable: true,editoptions:{size:"20",maxlength:"30"}},
                        {name:'BACKGROUND_IMG',index:'BACKGROUND_IMG',width:110,editable: true,hidden:true,editoptions:{size:"20",maxlength:"30"}},
                        {name:'IMG_NAME',index:'IMG_NAME',width:120,editable: true,editoptions:{size:"20",maxlength:"30"},hidden:true}
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
					editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=01614b3b24750012"
				});
				function beforeSelectRow(){//单选方法
					$("#grid-proTable").jqGrid('resetSelection');  
					return(true);  
				}  
				jQuery(grid_selector).jqGrid('navGrid','#grid-table_toppager',)
				$("#grid-proTable_toppager,#grid-proeqpager_left").hide();
				$("#grid-proeqpager_center").css({width:'310px'})
				
			});	
		//选择分区
		 jQuery(function($) {
				var grid_selector = "#grid-parttable";
				var pager_selector = "#grid-parteqpager";
				var pager_topper="#grid-toppager"
				jQuery(grid_selector).jqGrid({
					method:'get',
					url:baseURL + "/listDataController.htm?param_act=listData&param_funcId=01614b3fbc86001a",
					datatype: "json",
					height: 100+'%',
					colNames:["ID",'所属工程','分区名称','设备编码','设备名称','预案类型','分区大小','父子系统设备类型'],
                    colModel:[
                        {name:'ID',index:'ID', sorttype:"int", editable: true, hidden:true,editoptions:{size:"20",maxlength:"32"}},
                        {name:'PROJECT_ID',index:'PROJECT_ID',width:70, editable:true,editoptions:{size:"20",maxlength:"32"}}, 
                        {name:'PART_NAME',index:'PART_NAME',width:140, editable:true,editoptions:{size:"20",maxlength:"200"},editrules:{required:true}},  
                        {name:'EQ_CODE',index:'EQ_CODE', editable:true,editoptions:{size:"20",maxlength:"200"},hidden:true},  
                        {name:'EQ_NAME',index:'EQ_NAME',width:90, editable:true,editoptions:{size:"20",maxlength:"200"},},  
                        {name:'PLAN_TYPE',index:'PLAN_TYPE',width:90, editable:true,editoptions:{size:"20",maxlength:"32"}},                    
						{name:'PART_SIZE',index:'PART_SIZE',width:80, editable: true,editoptions:{size:"20",maxlength:"16"}},
						{name:'MONITOR_TYPE',index:'MONITOR_TYPE',editable:false,hidden:true,editoptions:{size:"20",maxlength:"30"}},// 父子系统设备类型                        
						
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
					shrinkToFit:true,
					autoScroll:true,
					editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=01614b3fbc86001a",
				});
				function beforeSelectRow(){//单选方法
					$("#grid-parttable").jqGrid('resetSelection');  
					return(true);  
				}  
				jQuery(grid_selector).jqGrid('navGrid','#grid-table_toppager')
				$("#grid-parttable_toppager,#grid-parteqpager_left").hide();
				$("#grid-parteqpager_center").css({width:'300px'})
			});
			//选择设备
		 jQuery(function($) {
			var grid_selector = "#grid-eqtable";
            var pager_selector = "#eqeqpager";
            var pager_topper="#grid-toppager"    
			jQuery(grid_selector).jqGrid({
				 	url:baseURL + "/listDataController.htm?param_act=listData&param_funcId=0160e3e6f0540010",
                    datatype: "json",
                    height: 100+'%',
                    colNames:["ID",'设备编码','设备名称','父子系统设备类型'],
                    colModel:[
                        {name:'ID',index:'ID', sorttype:"int", editable:true,hidden:true},
                        {name:'EQ_CODE',index:'EQ_CODE',width:230,editable:true,editoptions:{size:"20",maxlength:"30"}}, //设备编码  
						{name:'EQ_NAME',index:'EQ_NAME',width:230, editable:true,editoptions:{size:"20",maxlength:"30"},editrules:{required:true}}, //设备名称  
						{name:'MONITOR_TYPE',index:'MONITOR_TYPE',editable:false,hidden:true,editoptions:{size:"20",maxlength:"30"}},// 父子系统设备类型                        
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
					shrinkToFit:true,
					autoScroll:true,
                    editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=0160e3e6f0540010",					
				});
				function beforeSelectRow(){//单选方法
					$("#grid-eqtable").jqGrid('resetSelection');  
					return(true);  
				}  
				jQuery(grid_selector).jqGrid('navGrid','#grid-table_toppager')
				$("#grid-eqtable_toppager,#grid-parteqpager_left").hide();
				$("#grid-eqeqpager_center").css({width:'300px'})
			});		

		//本页表格
        jQuery(function($) {
				var grid_selector = "#grid-table";
				var pager_selector = "#grid-pager";
				var pager_topper="#grid-toppager"
				jQuery(grid_selector).jqGrid({
					method:'get',
					url:baseURL + "/listDataController.htm?param_act=listData&param_funcId=0163af005e7c0007",
					datatype: "json",
					height: 100+'%',
					colNames:["ID",'工程编码','工程名称','分区编码','分区名称','预警级别','推送方式','延时时长(min)', '推送组','预案编码','预案名称'],
					colModel:[
						{name:'ID',index:'ID',sorttype:"int", editable: true,hidden:true},
						{name:'PROJECT_CODE',index:'PROJECT_CODE', editable:true,hidden:true},//工程编码
						{name:'PROJECT_NAME',index:'PROJECT_NAME', editable:true,editrules:{required:true}},//工程名称
						{name:'PART_CODE',index:'PART_CODE',editable: false,hidden:true},//分区编码
						{name:'PART_NAME',index:'PART_NAME',editable: true},//分区名称
						{name:'SEND_LEVEL',index:'SEND_LEVEL', editable: true,edittype:"select",formatter:'select',editoptions:{value:warnLevel}}, //预警级别
						// {name:'SEND_LEVEL',index:'SEND_LEVEL', editable: true,edittype:"select",formatter:'select',editoptions:{value:"'':请选择;4:故障;1:火警;3:连接中断"}}, //预警级别
						{name:'SEND_TYPE',index:'SEND_TYPE', editable: true,edittype:"select",formatter:'select',editoptions:{value:pushType},editrules:{required:true}}, //推送方式
						{name:'CONTINUE_TIME',index:'CONTINUE_TIME', editable: true}, //延时时长
						{name:'DEPT_GROUP',index:'DEPT_GROUP', editable: true,edittype:"select",formatter:'select',editoptions:{value:zu},editrules:{required:true}}, //组
						{name:'PLAN_CODE',index:'PLAN_CODE',editable: false,hidden:true},//预案编码
						{name:'PLAN_NAME',index:'PLAN_NAME',editable: true,hidden:true},//预案名称
					
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
						$("#grid-table").setColProp('SEND_LEVEL', { editoptions: { value:warnLevel} });	//预警级别请求基础数据
						$("#grid-table").setColProp('SEND_TYPE', { editoptions: { value:pushType} });
						$("#grid-table").setColProp('DEPT_GROUP', { editoptions: { value:zu} });
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
					editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=0163af005e7c0007"
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
					if(alertinfor != ""){  thisis.$alert(alertinfor, '提示')} 
                }
				//navButtons
				var jqnav=jQuery(grid_selector).jqGrid('navGrid','#grid-table_toppager',
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
				//添加自定义按钮
            	jqnav.navSeparatorAdd('#grid-table_toppager',{sepclass:"ui-separator",sepcontent: ''});
            	jqnav.navButtonAdd('#grid-table_toppager', {
                    caption: "手动推送",
                    title:"手动推送", //按钮的提示文本
                    buttonicon:"ace-icon fa fa-pencil green",
                    onClickButton:function() { 
						$("#part,#project").attr({readonly:true})
						$("#modal4").css({display:"block"})
						thisis.modal4 = true;
						$(".ui-jqgrid-bdiv").css({border:'none'});
						$("#project,#part").val('');
						$("#location option:first").prop("selected", 'selected'); 
						$.ajax({  
						url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=WX_ALARM_EVENT',//推送事件
						async: false,  
						success: function(data, result) {
						console.log(data)
							}
						});
						$.ajax({  
						url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=WX_DEPT_GROUP',//推送组
						async: false,  
						success: function(data, result) {
						console.log(data)
							}
						});
                    },
                    position: "last"
            	})
               //自定义按钮添加结束
				$("#grid-table_toppager_right").hide();
				$("#grid-table_toppager_center").hide();
				$("#grid_table_toppager_left").attr("colspan","3");
				function style_edit_form(form) {
					$("#tr_PROJECT_NAME,#tr_PART_NAME,#tr_SEND_TYPE,#tr_DEPT_GROUP").find(".CaptionTD").append('<span style="color:red;">*</span>')//必填红*
					//选择延时推送才出现
					$("#tr_CONTINUE_TIME,#tr_PLAN_NAME").hide();
					$("#SEND_TYPE ").click(function(){
						if($("#SEND_TYPE option:selected").text() == '延时推送'){
							$("#tr_CONTINUE_TIME").show();
							$("#selProject,#selPart").css({left:'440px'})
						}else{
							$("#tr_CONTINUE_TIME").hide();
						}
					})
					//
					//选择工程按钮
					$("#tr_PROJECT_NAME").append("<div id='selProject' style='width:60px;height:25px;background:#09acf1;cursor:pointer;position:absolute;left:405px;top:6px;text-align:center;line-height:25px;border-radius:3px;color:white;'>选择工程</div>");
					$("#selProject").click(function(){
						$("#grid-proTable").jqGrid('setGridParam',{page:1}).trigger('reloadGrid'); 
						$("#PART_NAME").val("");
						$(".ui-widget-overlay,#editmodgrid-table").hide()
						thisis.modal2 = true;
						$("#cb_grid-proTable").hide();
						$(".ui-jqgrid-bdiv").css({border:'none'});
						
				    });
					//选择分区按钮
					$("#tr_PART_NAME").append("<div id='selPart' style='width:60px;height:25px;background:#09acf1;cursor:pointer;position:absolute;left:405px;top:46px;text-align:center;line-height:25px;border-radius:3px;color:white;' >选择分区</div>");
					$("#selPart").click(function(){
						if($("#PROJECT_NAME").val()==''){
							thisis.$alert("请先选择工程","提示")
						}else{
							thisis.modal3 = true;
						$("#editmodgrid-table,#cb_grid-parttable,.ui-widget-overlay").hide();
						$(".ui-jqgrid-bdiv").css({border:'none'});
						thisis.seek();             
						}
					});
					$("#sData").click(function(){
						if($("#PROJECT_NAME").val()==''){
							$("#selProject").css({top:'40px',left:'425px'});
							$("#selPart").css({top:'79px',left:'425px'});
						}
						if($("#SEND_LEVEL").val()=="''"){
							$("#SEND_LEVEL").text('')
						}
						
					})
					//
					$("#tr_PROJECT_CODE").css({display:"none"})
					$("#PROJECT_NAME,#PART_NAME").attr({readonly:true})
					$("#tr_PLAN_NAME,#tr_DEPT_GROUP,#tr_PROJECT_CODE,#tr_PART_CODE,#tr_SEND_LEVEL,#tr_SEND_TYPE,#tr_CONTINUE_TIME,#tr_DEPT_CODE,#tr_PERSON,#tr_PROJECT_NAME,#tr_PART_NAME,#tr_DEPT_NAME,#tr_PERSON_NAME")
					.find(".CaptionTD").css({fontWeight:'bold',paddingLeft:'50px'})//字体加粗								
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
						$('#grid-table').setGridWidth($(window).width()-169);
						$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示                						
					})
					$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示  
				//自定义结束
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
#formWrap4 span{font-weight:bold;font-size:13px;}
#formWrap4 .int{margin:8px 0}
#formWrap4 .int i{color: red;}
#selEQ,#selPART{width:80px;height:28px;background-color:#09acf1;border-radius:5px;color:#f1f3f6;margin-left:30px;outline: none;border:0;}
.rightForm{float:left;width: calc(100vw - 169px) ;}
.fname{display:none}
#modal4{display:none;}
#event5,#DEPT_GROUP4,#DEPT_GROUP6,#DEPT_GROUP8{margin-left:47px}
#event6{margin-left:13px}
</style>
