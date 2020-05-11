<template>
    <div class="animated fadeIn">
  <div id="treeForm">
  <!--树形控件-->
      <div id="tree"> </div>
  </div>
  <div class='rightForm'>
      <ul class='form_head'>  
          <li class='form_head_top'><div class='org'>异常信息查询</div></li>
          <li class='form_head_middle'>
              <span>预警时间：
                  <Date-picker id='time' type="date" placeholder="选择日期和时间" :value="value" @on-change='handleChange' style="width: 200px"></Date-picker>
                </span>
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
  var type_countries = "";
  var linkStatus = ""; 
  var eqTypes='';
  var part_countries='';
  var pro_id_countries1='';
  var baseURL = process.env.BASE_API;
      function getQuerySql(){
        var startTime=$("#time").find(".ivu-input").val();
          var querySql = "";
          if(startTime != ''){
              querySql = querySql + "and  EXCETION_TIME like '" + startTime + " %'";
          }
          return querySql;
      }
  import Vue from 'vue'
  import axios from 'axios'
  export default {
    name: 'abnormalInform',
     data () {
              return { value:""}
          },
          methods: {
              handleChange(date){
                  this.value=date;
              },
              find(){
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
                  document.getElementById('time').value = "";             
                  var treeSelect = $("#tree").dynatree("getActiveNode");
                  var treeSelectCode = "";
                  if(treeSelect != null && treeSelect !=""){
                      treeSelectCode = treeSelect.data.id;
                  }
                  $("#grid-table").jqGrid('setGridParam',{
                                  postData:{"querySql":"","treeSelectCode":treeSelectCode},
                              }).trigger('reloadGrid'); 
                  this.value='';
              }
          },
           beforeMount(){
			$.ajax({  
			url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=FI_EXT_TYPE',
			async: false,  
			success: function(data, result) {
				type_countries = data; 
				if (!result) 
				alert('类型名称加载失败...');   
				}
            });
            $.ajax({  
			url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=FI_DATA_QUALITY',//请求消防连接状态基础数据 
			async: false,  
			success: function(data, result) {
				linkStatus = data; 
				if (!result) 
				alert('连接状态加载失败...');   
				}
            });
            $.ajax({  
			url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=FI_EQUIP_TYPE',//请求消防设备类别基础数据 
			async: false,  
			success: function(data, result) {
				eqTypes = data; 
				if (!result) 
				alert('设备类别加载失败...');   
				}
            });
            $.ajax({  
            url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=FI_PART',//请求消防所属分区基础数据
            async: false,  
            success: function(data, result) {
                part_countries = data; 
                if (!result) 
                alert('所属分区加载失败...');   
                }
            });
            $.ajax({  
                url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=FI_PROJECT',
                async: false,  
                success: function(data, result) {
                    pro_id_countries1 = data; 
                    if (!result) 
                    alert('所属工程加载失败...');   
                    }
                });
		},
          mounted(){
            var _this = this
            jQuery(function($) {
                var grid_selector = "#grid-table";
                var pager_selector = "#grid-pager";
                var pager_topper="#grid-toppager"
                jQuery(grid_selector).jqGrid({
                    method:'get',
                    url:baseURL + "/fiSafety.htm?param_act=fiSafetyExpListData&param_funcId=01614b450ce4002f",  
                    datatype: "json",
                    height: 100+'%',
                    colNames:["ID",'工程编码','分区名称','设备名称','设备编码','位置描述','开始时间','设备状态','结束时间','事件时长(min)','控制器号','一次码','回路号'],
                    colModel:[
                        {name:'ID',index:'ID', sorttype:"int", editable: true, hidden:true,editoptions:{size:"20",maxlength:"32"}}, // id
                        {name:'PROJECT_ID',index:'PROJECT_ID', editable: false,hidden:false,editoptions:{size:"20",maxlength:"30"},edittype:'select',formatter:'select',editoptions:{value:pro_id_countries1}},// 工程编码
                        {name:'PART_CODE',index:'PART_CODE', editable: true,editoptions:{size:"20",maxlength:"30"},edittype:'select',formatter:'select',editoptions:{value:part_countries}},//分区编码   
                        {name:'EQ_CODE',index:'EQ_CODE', hidden:true,editable: true,editoptions:{size:"20",maxlength:"30"}}, //设备编码                                                                                                                                               
                        {name:'EQ_NAME',index:'EQ_NAME'},//设备名称                                                    
                        {name:'LOCATION',index:'LOCATION', editable: true,editoptions:{size:"20",maxlength:"30"}}, //位置描述
                        {name:'EXCETION_TIME',index:'EXCETION_TIME', editable: true,editoptions:{size:"20",maxlength:"30"}}, //开始时间
                        {name:'EQ_STATE',index:'EQ_STATE', editable: true,editoptions:{size:"20",maxlength:"30"},edittype:'select',formatter:'select',editoptions:{value:type_countries}},//设备状态                                                                    
                        {name:'END_TIME',index:'END_TIME',editable: true,editoptions:{size:"20",maxlength:"30"}},//结束时间
                        {name:'EVENT_TIME',index:'EVENT_TIME',editable: true,editoptions:{size:"20",maxlength:"30"}},//事件时长
                        {name:'CONTROL_CODE',index:'CONTROL_CODE', editable: true,editoptions:{size:"20",maxlength:"30"}}, //控制器号
                        {name:'ONETIME_CODE',index:'ONETIME_CODE', editable: true,hidden:true,editoptions:{size:"20",maxlength:"4"}},//一次码                        
                        {name:'LOOP_CODE',index:'LOOP_CODE', editable: true,editoptions:{size:"20",maxlength:"4"}},//回路号
                        
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
                    $("#grid-table").setColProp('Value', { editoptions: { value:type_countries} });
                    $("#grid-table").setColProp('Quality', { editoptions: { value:linkStatus} });	
                    $("#grid-table").setColProp('EQ_TYPE', { editoptions: { value:eqTypes} });  
                    $("#grid-table").setColProp('PART_CODE', { editoptions: { value:part_countries} });							                                      					
                    setTimeout(function(){
                        styleCheckbox(table);
                        updateActionIcons(table);
                        updatePagerIcons(table);
                        enableTooltips(table);							
                    }, 0);
                },
                    editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=01614b450ce4002f",
                    autowidth: true,
                    width:100+'%',
                    shrinkToFit:true,
                    autoScroll:true
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
                function reloadgrid() {
                setTimeout(function(){
                    $("#grid-table").jqGrid('setGridParam',{postData:{"querySql":""},}).trigger('reloadGrid');
                }, 0);
            } 
            function fn_editSubmit(response,postdata){
                var alertinfor=response.responseText;
                if(alertinfor != ""){
                    _this.$alert(alertinfor, '提示'); 
                } 
            }
                //navButtons
                jQuery(grid_selector).jqGrid('navGrid','#grid-table_toppager',
                    { 	
                        edit: true,
                        editicon : 'icon-pencil blue',
                        add: false,
                        addicon : 'icon-plus-sign purple',
                        del: false,
                        delicon : 'icon-trash red',
                        search: true,
                        searchicon : 'icon-search orange',
                        refresh: true,
                        refreshicon : 'icon-refresh green',
                        view: false,
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
                $("#grid-table_toppager_left").attr("colspan","3");
                function style_edit_form(form) {
                $("#tr_PART_CODE,#tr_EQ_CODE,#tr_LOCATION,#tr_EXCETION_TIME,#tr_EQ_STATE,#tr_END_TIME,#tr_EVENT_TIME,#tr_CONTROL_CODE,#tr_ONETIME_CODE,#tr_LOOP_CODE").find(".CaptionTD").css({fontWeight:'bold'})//字体加粗
                $('.ui-jqdialog').css('width','700px') 
                $('.ui-jqdialog-content .FormData').css({width:'300px',display:'inline-block',float:'left'})
                $('.ui-jqdialog-content .CaptionTD').css({width:'75px',})
                $(".ui-jqdialog-content .FormData:first").css({display:'none'})
                $(".ui-jqdialog-content .FormData:last").css({display:'none'}) 
                    var buttons = form.next().find('.EditButton .fm-button');
                    buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();
                    buttons.eq(0).addClass('btn-primary').prepend('<i class="icon-ok"></i>');
                    buttons.eq(1).prepend('<i class="icon-remove"></i>')
                    buttons = form.next().find('.navButton a');
                    buttons.find('.ui-icon').remove();
                    buttons.eq(0).append('<i class="icon-chevron-left"></i>');
                    buttons.eq(1).append('<i class="icon-chevron-right"></i>');	
                    var val = $(".ui-jqdialog-content .FormData #EQ_CODE").val();
                $('#PURCHASE_DATE').datepicker({
                    language: "zh-CN",
                    todayHighlight: true,
                    format:'yyyy-mm-dd',
                    autoclose: true,
                    startView: 'months',
                    maxViewMode:'years',
                    minViewMode:'months'
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
                function styleCheckbox(table) {  }
                function updateActionIcons(table) {   }
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
            $(function(){
                $("#grid-table").jqGrid('setGridParam',{postData:{"querySql":""},}).trigger('reloadGrid');
                $(window).resize(function(){
					$('#grid-table').setGridWidth($(window).width()-420);
					$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示                                        
				})
					$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示                
            });
            $(function(){
                $("#tree").dynatree({   
                    title:"分区",   
                    minExpandLevel:1,   
                    imagePath:'',       
                    method:'get',  
                    initAjax:{url:baseURL + "/manageCommon.htm", data:{param_act:"treeData",tree_code:"FI_PRO_PART"}},
                    onClick: function(node){ 
                                // console.log(node.data.code);
                                // console.log(node.data.id);                                
                                $("#grid-table").jqGrid('setGridParam',{
                                        postData:{"treeSelectCode":node.data.id},
                                        page:1
                                    }).trigger('reloadGrid'); 
                                } // alert node text property when clicked  
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
  .form_head_middle span{display:inline-block;margin-right:1%;height:40px;margin-top:5px;font-size:12px;}
  .form_head_middle span .search,.resets{width:130px;height:35px;text-align:center;line-height:35px;border-radius:5px;margin-top:2px;color:white;font-weight:500;}
  .form_head_middle span .search{background-color:#169bd5;}
  .form_head_middle span .resets{background-color:#ff9966;}
  .form_head_bottom{background-color:#f1f3f6;height:40px;}
  .form_head span{cursor:pointer;}
  #treeForm{float:left;width: 250px;}
.rightForm{float:left;width: calc(100vw - 420px) ;}
  </style>