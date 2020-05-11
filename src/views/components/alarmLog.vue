<template>
<div class="animated fadeIn">
<!--树形控件-->  
<div id='treeForm'>
    <div id="tree"> </div>
</div>
<div class='rightForm'>
    <ul class='form_head'>
        <li class='form_head_top'><div class='org'>报警记录</div></li>
        <li class='form_head_middle'>
            <span>路径编码：<input id='iTEMCODE' type='text' ></span>
            <span>开始日期：
                <Date-picker id='mONI_TIME' type="datetime" placeholder="选择日期和时间" :value="value" @on-change="handleChange" style="width: 200px"></Date-picker>
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
var alarmType=''; var baseURL = process.env.BASE_API;var itemCodes='';
String.prototype.trim = function(){ 
            return this.replace(/(^\s*)|(\s*$)/g, "");
        }
function getQuerySql(){
var orgName=$("#mONI_TIME").find(".ivu-input").val();
var orgCode = itemCodes;        
    var querySql = "";
    if(orgCode != undefined && orgCode != ''){
        querySql = querySql + "and  ITEMCODE like '%" + orgCode + "%'";
    }
    if(orgName != undefined && orgName != ''){
        querySql = querySql + "and  MONI_TIME >= '" + orgName + "'";
    }
    return querySql;
}
import Vue from 'vue'
import axios from 'axios'
export default {
name: 'alarmLog',
    data(){
            return {value:'' }
        },
        methods: {
            handleChange(date) {
			    this.value = date;
		    },
            find(){
                itemCodes=$("#iTEMCODE").val();
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
                document.getElementById('iTEMCODE').value = "";
                document.getElementById('mONI_TIME').value = "";
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
                url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=VB_WARNTYPE',//请求报警类型基础数据
                async: false,  
                success: function(data, result) {
                    alarmType = data; 
                    if (!result) 
                    alert('报警类型加载失败...');   
                    }
            });
        },
        mounted(){    
            var _this=this;
           
            jQuery(function($) {
                var grid_selector = "#grid-table";
                var pager_selector = "#grid-pager";
                var pager_topper="#grid-toppager"
                jQuery(grid_selector).jqGrid({
                    method:'get',
                    url:baseURL + "/listDataController.htm?param_act=listData&param_funcId=016125fba0a20007",
                    datatype: "json",
                    height: 100+'%',
                    colNames:["ID",'路径编码','路径ID', '开始时间','结束时间 ','振动值(mm/s)','报警类型','事件时长(min)','情况说明'],
                    colModel:[
                        {name:'ID',index:'ID', sorttype:"int", editable: true, hidden:true,editoptions:{size:"20",maxlength:"32"}},
                        {name:'ITEMCODE',index:'ITEMCODE', editable:true,editoptions:{size:"20",maxlength:"32"}}, //路径编码
                        {name:'ITEM_ID',index:'ITEM_ID',editable:true,editoptions:{size:"20",maxlength:"200"}}, //路径ID                          
                        {name:'MONI_TIME',index:'MONI_TIME',editable: true,editoptions:{size:"20",maxlength:"30"}},//报警时间
                        {name:'END_TIME',index:'END_TIME',editable: true,editoptions:{size:"20",maxlength:"30"}},//报警结束时间                        
                        {name:'MONI_VALUE',index:'MONI_VALUE', editable: true,editoptions:{size:"20",maxlength:"16"}},//振动值
                        {name:'WARN_TYPE',index:'WARN_TYPE', editable: true,editoptions:{size:"20",maxlength:"4"}, edittype:"select",formatter:'select',editoptions:{value:alarmType}},//报警类型
                        {name:'EVENT_TIME',index:'EVENT_TIME', editable: true,editoptions:{size:"20",maxlength:"16"}}, //,'事件时长(min)'
                        {name:'REMARK',index:'REMARK', editable: true,edittype:"textarea",editoptions:{size:"20",maxlength:"200"}}, //情况说明
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
                        $("#grid-table").setColProp('WARN_TYPE', { editoptions: { value:alarmType} });                        
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
                    editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=016125fba0a20007"
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
                        add: false,
                        addicon : 'icon-plus-sign purple',
                        del: false,
                        delicon : 'icon-trash red',
                        search: false,
                        searchicon : 'icon-search orange',
                        refresh: true,
                        refreshicon : 'icon-refresh green',
                        view: false,
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
                $("#tr_ITEMCODE,#tr_ITEM_ID,#tr_MONI_TIME,#tr_MONI_VALUE,#tr_WARN_TYPE,#tr_REFER_VALUE,#tr_REMARK,#tr_END_TIME,#tr_EVENT_TIME").find(".CaptionTD").css({fontWeight:'bold'})//字体加粗
                $("#tr_ITEMCODE,#tr_ITEM_ID,#tr_MONI_TIME,#tr_MONI_VALUE,#tr_WARN_TYPE,#tr_REFER_VALUE,#tr_REMARK,#tr_END_TIME").find("input").css({width:'250px'})//输入框宽度
                $("#ITEMCODE,#ITEM_ID,#MONI_TIME,#MONI_VALUE,#WARN_TYPE,#REFER_VALUE").attr({readonly:true});//除备注外都不可编辑
                $("#REMARK").css({width:"250px"});//备注宽度
                $('#ITEM_ID').css({width:'425px'})//路径id宽度
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
                function styleCheckbox(table) {  }
                function updateActionIcons(table) {  }				
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
            $('.ui-jqgrid .ui-separator').css({height:'0',width:'0'});
            $("#iTEMCODE").css({height:'31px'});
            $(window).resize(function(){
                $('#grid-table').setGridWidth($(window).width()-447);
                $(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示                                        
            })
                $(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示                
        })
        $(function(){
            $("#tree").dynatree({   
                title:"组织机构",    
                minExpandLevel:1,  
                imagePath:'',     
                method:'get',  
                initAjax:{url:baseURL + "/manageCommon.htm", data:{param_act:"treeData",tree_code:"VB_NODE"}},
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
#treeForm{float:left;width: 280px}
.rightForm{float:left;width: calc(100vw - 447px) ;}
</style>