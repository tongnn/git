<template>
<div class="animated fadeIn">
<div id="treeForm">
<!--树形控件-->
    <div id="tree"> </div>
</div>
<div class='rightForm'>
    <ul class='form_head'>
        <li class='form_head_top'><div class='org'>预警信息查询</div></li>
        <li class='form_head_middle'>
            <span>
                预警时间从：&nbsp;&nbsp;&nbsp;&nbsp;<Date-picker id='alerm_START' type="datetime" placeholder="选择日期" :value='startTime' @on-change='handleChange1' style="width: 200px"></Date-picker>&nbsp;&nbsp;&nbsp;&nbsp;至
                &nbsp;&nbsp;&nbsp;&nbsp;<Date-picker id='alerm_END' type="datetime" placeholder="选择日期" :value='endTime' @on-change='handleChange2' style="width: 200px"></Date-picker>
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
var baseURL = process.env.BASE_API; var enleval='';
    function getQuerySql(){
    var pointcode =$("#alerm_START").find(".ivu-input").val();
    var position = $("#alerm_END").find('.ivu-input').val();
    var querySql = "";
    if(pointcode != ''){
        querySql = querySql + "and  ALERM_START >= '" + pointcode + " 00:00:00'";
    }
    if(position != ''){
        querySql = querySql + "and  ALERM_START <= '" + position + " 23:59:59'";
    }
    return querySql;
    }
import Vue from 'vue'
import axios from 'axios'
export default {
name: 'eqrlywarnInfor',
    data () {
            return {startTime:'',endTime:''}
        },
        methods: {
            handleChange1(date){
                this.startTime=date;
            },
            handleChange2(date){
                this.endTime=date;
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
                document.getElementById('alerm_START').value = ""; 
                document.getElementById('alerm_END').value = "";                  
                var treeSelect = $("#tree").dynatree("getActiveNode");
                var treeSelectCode = "";
                if(treeSelect != null && treeSelect !=""){
                    treeSelectCode = treeSelect.data.id;
                }
                $("#grid-table").jqGrid('setGridParam',{
                                postData:{"querySql":"","treeSelectCode":treeSelectCode},
                            }).trigger('reloadGrid'); 
                this.startTime='';this.endTime='';
            }
        },
         beforeMount(){
            $.ajax({  
            url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=VB_WARNTYPE',//请求预警类型基础数据
            async: false,  
            success: function(data, result) {
                enleval = data; 
                if (!result) 
                alert('预警级别加载失败...');   
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
                    url:baseURL + "/listDataController.htm?param_act=listData&param_funcId=01617962a0510067",
                    datatype: "json",
                    height: 100+'%',
                    colNames:["ID",'监测设备','测点序号', '位置描述','开始时间','结束时间','事件时长(min)','预警级别','备注'],
                    colModel:[
                        {name:'ID',index:'ID', sorttype:"int", editable: true, hidden:true,editoptions:{size:"20",maxlength:"32"}},
                        {name:'EQ_NAME',index:'EQ_NAME',editable:true,editoptions:{size:"20",maxlength:"32"}}, 
                        {name:'POINT_CODE',index:'POINT_CODE', editable:true,editoptions:{size:"20",maxlength:"200"},editrules:{number:true}},                         
                        {name:'POINT_POSITION',index:'POINT_POSITION', editable: true,editoptions:{size:"20",maxlength:"30"}},
                        {name:'ALERM_START',index:'ALERM_START', editable: true,editoptions:{size:"20",maxlength:"16"}},                        
                        {name:'ALERM_END',index:'ALERM_END', editable: true,editoptions:{size:"20",maxlength:"30"}},
                        {name:'EVENT_TIME',index:'EVENT_TIME', editable: true,editoptions:{size:"20",maxlength:"16"}}, //,'事件时长(min)'
                        {name:'ALERM_LEVEL',index:'ALERM_LEVEL', editable: true,editoptions:{size:"20",maxlength:"16"},editrules:{number:true},edittype:"select",formatter:'select',editoptions:{value:enleval}},                       
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
                        $("#grid-table").setColProp('ALERM_LEVEL', { editoptions: { value:enleval} });
                        setTimeout(function(){
                            styleCheckbox(table);
                            updateActionIcons(table);
                            updatePagerIcons(table);
                            enableTooltips(table);
                        }, 0);
                    },
                    editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=01617962a0510067",
                    autowidth: true,
                    shrinkToFit:true,
                    autoScroll:true,
                     width:100+'%',
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
                return true;
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
                $("#grid_table_toppager_left").attr("colspan","3");
                function style_edit_form(form) {
				$("#tr_EQ_NAME,#tr_POINT_CODE,#tr_POINT_POSITION,#tr_ALERM_START,#tr_ALERM_END,#tr_ALERM_LEVEL,#tr_REMARK ").find(".CaptionTD").css({fontWeight:'bold'})//字体加粗								
                $("#tr_EQ_NAME,#tr_POINT_POSITION").find(".CaptionTD").css({paddingLeft:'62px'});//表单内容居中
                $("#tr_ALERM_END").find(".CaptionTD").css({paddingLeft:'38px'});//表单内容居中	
                $("#tr_REMARK").css({marginLeft:'38px'});//表单内容居中					                                                                                                              						                                                                                          
                $('#tr_REMARK').find('.DataTD #REMARK').css({width:'180px'})//备注栏宽
                $("#EQ_NAME,#POINT_CODE,#POINT_POSITION,#ALERM_START,#ALERM_LEVEL").attr({readonly:true})
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
            });	
            $(function(){
                $("#grid-table").jqGrid('setGridParam',{postData:{"querySql":""},}).trigger('reloadGrid');
                $(".ui-separator").css("display","none");
                $(window).resize(function(){
					$('#grid-table').setGridWidth($(window).width()-417);
					$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示                                        
				})
				$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示                
            });
            $(function(){
                $("#tree").dynatree({  
                    title:"工程",    
                    minExpandLevel:1,   
                    imagePath:'',      
                    method:'get',  
                    initAjax:{url:baseURL + "/manageCommon.htm", data:{param_act:"treeData",tree_code:"ST_EQUIP"}},
                    onClick: function(node){ 
                                //alert(node.data.code);
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
.rightForm{float:left;width: calc(100vw - 417px);}
</style>