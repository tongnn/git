<template>
<div class="animated fadeIn">
<!--树形控件-->
<div id='treeForm'>
    <div id="tree"> </div>
</div>
<div class='rightForm'>
    <ul class='form_head'>
        <li class='form_head_top'><div class='org'>预警设置</div></li>
        <li class='form_head_middle'>
            <span>路径编码：<input id='itemCODE' type='text' ></span>
            <span><div id="queryId" class='search' @click='find'>查 询</div></span>
            <span><div class='resets' @click='reset'>重 置</div></span>  
        </li>
    </ul>
    <table id="grid-table"></table>
    <div id="grid-pager"></div>
    <!-- 批量修改 -->
    <div id='formWrap'>
        <div id="bulkEditing">
            <div id="formTop">批量修改</div>
            <ul id="formMiddle">
                <li> <span>预警值</span> <input id='prewarnVal' type="text" value=""> </li>
                <li> <span>报警值</span> <input id='alarmVal' type="text" value=""> </li>
                <li> <span>危险值</span> <input id='riskVal' type="text" value=""> </li>
            </ul>
            <div id="formFoot">
                <div id='btnUp'>提交</div>
                <div id='btnCancel'>取消</div>
            </div>            
        </div>
    </div>
</div>

</div>
</template>
<script>
var countries = ""; var keyPoint='';var itemCodes='';
var baseURL = process.env.BASE_API;
String.prototype.trim = function(){ 
            return this.replace(/(^\s*)|(\s*$)/g, "");
        }
    function getQuerySql(){
        var userCode =itemCodes;
        var querySql = "";
        if(userCode != ''){
            querySql = querySql + "and  ITEMCODE like '%" + userCode + "%'";
        }
        return querySql;
    }
import Vue from 'vue'
import axios from 'axios'
export default {
name: 'earlyWarning',
    data () {
            return { }
        },
        methods: {
            find(){
                itemCodes=$("#itemCODE").val();
                itemCodes= itemCodes.trim();
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
                document.getElementById('itemCODE').value = "";
                var treeSelect = $("#tree").dynatree("getActiveNode");
                var treeSelectCode = "";
                if(treeSelect != null && treeSelect !=""){
                    treeSelectCode = treeSelect.data.id;
                }
                $("#grid-table").jqGrid('setGridParam',{
                                postData:{"querySql":"","treeSelectCode":treeSelectCode},
                            }).trigger('reloadGrid'); 
            },
        },
        beforeMount(){
            $.ajax({  
            url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=SF_YESORNO',//是否关键点请求基础数据
            async: false,  
            success: function(data, result) {
                keyPoint = data; 
                if (!result) 
                alert('是否关键点加载失败...');   
                }
            });
            $.ajax({  
            url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=SF_ORG',
            async: false,  
            success: function(data, result) {
                countries = data; 
                if (!result) 
                alert('设备编码加载失败...');   
                }
            });
        },
        mounted(){
            var thisis = this;
            var grid_selector = "#grid-table";
            var pager_selector = "#grid-pager";
            var pager_topper="#grid-toppager";
            jQuery(function($) {
                jQuery(grid_selector).jqGrid({
                    method:'get',
                    url:baseURL + "/listDataController.htm?param_act=listData&param_funcId=016121a81c900005",
                    datatype: "json",
                    height: 100+'%',
                    colNames:["ID",'序号','路径编码','路径ID', '数据站点','机器','设备编码','监测点','测量单位','采集定义','是否关键点','预警值(mm/s)','报警值(mm/s)','危险值(mm/s)'],
                    colModel:[
                        
                        {name:'ID',index:'ID', sorttype:"int", editable: true, hidden:true,editoptions:{size:"20",maxlength:"32"}}, //ID
                        {name:'NUMBER',index:'NUMBER', sorttype:"int", editable: true,editoptions:{size:"20",maxlength:"32"}}, //序号
                        {name:'ITEMCODE',index:'ITEMCODE', editable:true,editoptions:{size:"20",maxlength:"32"}}, //路径编码 
                        {name:'ITEM_ID',index:'ITEM_ID', editable:true,editoptions:{size:"20",maxlength:"200"}}, //路径ID                         
                        {name:'DATA_FOLDER',index:'DATA_FOLDER', editable: false,hidden:true,edittype:"select",formatter:'select',editoptions:{size:"20",maxlength:"80"}},//数据站点
                        {name:'MONI_MACHIEN',index:'MONI_MACHIEN', editable: false,hidden:true,editoptions:{size:"20",maxlength:"80"},edittype:"select",formatter:'select'},//机器
                        {name:'EQUIP_CODE',index:'EQUIP_CODE',editable:false,hidden:true,editoptions:{size:"20",maxlength:"32"},edittype:"select",formatter:'select',editoptions:{value:countries}},//设备编码
                        {name:'MONI_POINT',index:'MONI_POINT', editable: true,editoptions:{size:"20",maxlength:"80"}}, //监测点
                        {name:'MONI_LOCATION',index:'MONI_LOCATION',editable: true,editoptions:{size:"20",maxlength:"80"}}, //测量单位
                        {name:'MONI_SCHEDULE',index:'MONI_SCHEDULE', editable: true,editoptions:{size:"20",maxlength:"80"}},//采集定义
                        {name:'IS_KEYNODE',index:'IS_KEYNODE', editable: true,editoptions:{size:"20",maxlength:"1"},edittype:"select",formatter:'select',editoptions:{value:keyPoint}},//是否关键点 
                        {name:'ALARM_VALUE',index:'ALARM_VALUE',editable: true,editoptions:{size:"20",maxlength:"16"},editrules:{number:true}},//预警值
                        {name:'WARNING_VALUE',index:'WARNING_VALUE', editable: true,editoptions:{size:"20",maxlength:"16"},editrules:{number:true}},//报警值
                        {name:'DANGER_VALUE',index:'DANGER_VALUE', editable: true,editoptions:{size:"20",maxlength:"16"},editrules:{number:true}},//危险值
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
                        $("#grid-table").setColProp('IS_KEYNODE', { editoptions: { value:keyPoint} });						                        					
                        setTimeout(function(){
                            styleCheckbox(table);
                            updateActionIcons(table);
                            updatePagerIcons(table);
                            enableTooltips(table);							
                        }, 0);
                    },					
                    autowidth: true,
                    editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=016121a81c900005",
                    width:100+'%',
                    shrinkToFit:true,
                    autoScroll:true,
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
                        add: false,
                        addicon : 'icon-plus-sign purple',
                        del: false,
                        delicon : 'icon-trash red',
                        search: true,
                        searchicon : 'icon-search orange',
                        view: false,
                        viewicon : 'icon-zoom-in grey',
                        refresh:true,
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
                        },
                        onClick : function(e) {
                            // alert(1);
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
                //添加自定义按钮
            jqnav.navSeparatorAdd('#grid-table_toppager',{sepclass:"ui-separator",sepcontent: ''});
            jqnav.navButtonAdd('#grid-table_toppager', {
                    caption: "批量设置",
                    title:"批量设置", //按钮的提示文本
                    buttonicon:"ace-icon fa fa-pencil green",
                    onClickButton:function() { 
                        var selIds;  //多选获取id
                        selIds = jQuery(grid_selector).jqGrid('getGridParam', 'selarrrow');
                        if(!selIds || selIds==""){
                            thisis.$alert("请选择要修改的行",'提示');
                        }else{
                            $("#formWrap").show();
                            $("#btnUp").click(function(){
                                var ALARM_VALUE=$("#prewarnVal").val(); //预警值
                                var WARNING_VALUE=$("#alarmVal").val();//报警值
                                var DANGER_VALUE=$("#riskVal").val();//危险值
                                // var IS_KEYNODE=$("#selList option:selected").val();//关键点选择                                
                                $.ajax({
                                    type:'get',
                                    dataType:'json',
                                    url:baseURL + '/manageCommon.htm?param_act=dataEdit&param_funcId=016121a81c900005&oper=edit&selIds='+selIds, 
                                    data:{'ALARM_VALUE':ALARM_VALUE,'WARNING_VALUE':WARNING_VALUE,'DANGER_VALUE':DANGER_VALUE},
                                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                                    success:function(data){ }               
                                }) 
                                $("#formWrap").hide(); $("#grid-table").trigger('reloadGrid');	

                            })
                        }
                    },
                    position: "last"
            })
               //自定义按钮添加结束
                $("#refresh_grid-table_top").css({paddingLeft:'13px'})// 刷新按钮位置
                $("#grid-table_toppager_right").hide();
                $("#grid-table_toppager_center").hide();
                $("#grid_table_toppager_left").attr("colspan","3");
                function style_edit_form(form) {
                //监测点，测量单位，采集定义，是否关键点灰显不可修改哦
                $("#tr_MONI_POINT,#tr_MONI_LOCATION,#tr_MONI_SCHEDULE").find('input').attr({readonly:true})
                $("#tr_IS_KEYNODE").find("#IS_KEYNODE").attr({disabled:true})
                $("#IS_KEYNODE").css({background:'#f5f5f5'})
                $("#tr_ITEMCODE,#tr_ITEM_ID,#tr_IS_KEYNODE,#tr_ALARM_VALUE,#tr_WARNING_VALUE,#tr_DANGER_VALUE,#tr_MONI_POINT,#tr_MONI_LOCATION,#tr_MONI_SCHEDULE").find(".CaptionTD").css({fontWeight:'bold'})//字体加粗
                $("#ITEM_ID").css({width:"420px"}); 
                $("#ITEMCODE,#ITEM_ID,#NUMBER").attr({readonly:true});                     
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
                function styleCheckbox(table) {				
                    $(table).find('input:checkbox').addClass('ace')
                    .wrap('<label />')
                    .after('<span class="lbl align-top" />')			
                    $('.ui-jqgrid-labels th[id*="_cb"]:first-child')
                    .find('input.cbox[type=checkbox]').addClass('ace')
                    .wrap('<label />').after('<span class="lbl align-top" />');
                }		
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
            });	
            $(function(){
                $("#grid-table").jqGrid('setGridParam',{postData:{"querySql":""},}).trigger('reloadGrid');
                $('.ui-jqgrid .ui-separator').css({height:'0'});
                //quxiao
                $("#btnCancel").click(function(){
                    $("#formWrap").hide();
                })
                $(window).resize(function(){
                    $('#grid-table').setGridWidth($(window).width()-447);
					$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示                =                        
				})
				$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示                
            });
            $(function(){
                $("#tree").dynatree({  
                    minExpandLevel:1,  
                    imagePath:'',    
                    method:'get',
                    initAjax:{url:baseURL+"/manageCommon.htm", data:{param_act:"treeData",tree_code:"VB_NODE"}},
                    onClick: function(node){ 
                                $("#grid-table").jqGrid('setGridParam',{
                                        postData:{"treeSelectCode":node.data.id},
                                        page:1
                                    }).trigger('reloadGrid'); 
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
#treeForm{float:left;width: 280px}
/* .rightForm{float:left;width: calc(100vw - 497px) ;} */
.rightForm{float:left;width: calc(100vw - 447px) ;}
#formWrap{width: 100%;height:1000px;background-color:rgba(0, 0, 0, 0.5);position: absolute;left:0;top:0;z-index:99;display:none;}
#bulkEditing{width:600px;height: auto;border:2px solid #dddddd;margin-left:39%;margin-top:12%;}
#bulkEditing input{margin-left: 5px;}
#bulkEditing select{margin-left: 5px;}  
#bulkEditing #formTop{height:40px;border-bottom:2px solid #dddddd;line-height:40px;padding-left:13px;font-size: 15px;color:#669fc7;background: -webkit-linear-gradient(#ffffff, #eeeeee); /* Safari 5.1 - 6.0 */background: -o-linear-gradient(#ffffff, #eeeeee); /* Opera 11.1 - 12.0 */background: -moz-linear-gradient(#ffffff, #eeeeee); /* Firefox 3.6 - 15 */ background: linear-gradient(#ffffff, #eeeeee); /* 标准的语法 */ }
#bulkEditing #formMiddle{height:auto;background-color:#ffffff;border-bottom:2px solid #d6e1ea;}
#bulkEditing #formMiddle li:first-child{padding-top:13px;}
#bulkEditing #formMiddle span{font-weight: bold}
#bulkEditing #formMiddle li{padding-left:180px;margin-bottom: 13px;}  
#bulkEditing #formFoot{height:50px;background-color:#eff3f8;}
#bulkEditing #formFoot div{width:68px;height:35px;outline:none;float:left;text-align: center;line-height:35px;color:white;margin-top:8px;font-size:13px;cursor:pointer;}  
#bulkEditing #formFoot #btnUp{background-color: #428bca;margin-left:74%;}
#bulkEditing #formFoot #btnCancel{background-color: #abbac3;margin-left:10px}
</style>