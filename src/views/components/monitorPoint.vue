<template>
<div class="animated fadeIn">
<div id="treeForm">
<!--树形控件-->
    <div id="tree"> </div>
</div>
<div class='rightForm'>
    <ul class='form_head'>
        <li class='form_head_top'><div class='org'>应力监测点</div></li>
        <li class='form_head_middle'>
            <span>测点序号：<input id='point_CODE' type='text' ></span>
            <span>监测位置：<input id='point_POSITION' type='text' ></span>
            <span><div class='search' @click='find'>查 询</div></span>
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
    <!-- 批量修改结束 -->                     
</div>
</div>
</template>
<script>
var baseURL = process.env.BASE_API;
var equipmentId='';var stationCode=''; var monitorSite=''
    String.prototype.trim = function(){ 
            return this.replace(/(^\s*)|(\s*$)/g, "");
        }
    function getQuerySql(){
        var pointcode = stationCode;
        var position = monitorSite;
        var querySql = "";
        if(pointcode != ''){
            querySql = querySql + "and  POINT_CODE = '" + pointcode + "'";
        }
        if(position != ''){
            querySql = querySql + "and  POINT_POSITION like '%" + position + "%'";
        }
        return querySql;
    }
import Vue from 'vue'
import axios from 'axios'
export default {
name: 'monitorPoint',
    data () {
            return { }
        },
        methods: {
            find(){
                stationCode=$("#point_CODE").val();
                stationCode= stationCode.trim();
                monitorSite=$("#point_POSITION").val();
                monitorSite= monitorSite.trim();
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
                document.getElementById('point_CODE').value = ""; 
                document.getElementById('point_POSITION').value = "";                  
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
        beforeMount(){
        $.ajax({  
        url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=ST_EQUIP',//请求所属设备基础数据 
        async: false,  
        success: function(data, result) {
            equipmentId = data; 
            if (!result) 
            alert('所属设备加载失败...');   
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
                    url:baseURL + "/listDataController.htm?param_act=listData&param_funcId=0161796169b20063",
                    datatype: "json",
                    height: 100+'%',
                    colNames:["ID",'所属设备','测点序号', '位置描述','预警值(μm)','报警值(μm)','危险值(μm)','备注'],
                    colModel:[
                        {name:'ID',index:'ID',sorttype:"int", editable: true, hidden:true,editoptions:{size:"20",maxlength:"32"}},  
                        {name:'EQ_ID',index:'EQ_ID', editable:true,editoptions:{size:"20",maxlength:"32"},edittype:'select',formatter:'select',editoptions:{value:equipmentId}}, 
                        {name:'POINT_CODE',index:'POINT_CODE', editable:true,editoptions:{size:"20",maxlength:"200"},editrules:{required:true,number:true}},                         
                        {name:'POINT_POSITION',index:'POINT_POSITION', editable: true,editoptions:{size:"20",maxlength:"30"},editrules:{required:true}},
                        {name:'WARNING_VALUE',index:'WARNING_VALUE', editable: true,editoptions:{size:"20",maxlength:"16"},editrules:{number:true}},                        
                        {name:'ALARM_VALUE',index:'ALARM_VALUE',editable: true,editoptions:{size:"20",maxlength:"30"},editrules:{number:true}},
                        {name:'DANGER_VALUE',index:'DANGER_VALUE', editable: true,editoptions:{size:"20",maxlength:"16"},editrules:{number:true}},                       
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
                        $("#grid-table").setColProp('EQ_ID', { editoptions: { value:equipmentId} })
                        setTimeout(function(){
                            styleCheckbox(table);
                            updateActionIcons(table);
                            updatePagerIcons(table);
                            enableTooltips(table);
                        }, 0);
                    },
                    editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=0161796169b20063",
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
                return true;
            }
                //navButtons
            var jqnav=jQuery(grid_selector).jqGrid('navGrid','#grid-table_toppager',
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
                );
                //添加自定义按钮
                jqnav.navSeparatorAdd('#grid-table_toppager',{sepclass:"ui-separator",sepcontent: ''});
                jqnav.navButtonAdd('#grid-table_toppager', {
                caption: "多行编辑",
                title:"多行数值修改", //按钮的提示文本
                buttonicon:"ace-icon fa fa-pencil green",
                onClickButton:function() { 
                    var EQ_ID;
                    var POINT_CODE;
                    var selIds;  //多选获取id
                    selIds = jQuery(grid_selector).jqGrid('getGridParam', 'selarrrow');
                    if(!selIds || selIds==""){
                        _this.$alert("请选择要修改的行",'提示');
                    }else{
                        $("#formWrap").show();
                        $("#btnUp").click(function(){
                            var ALARM_VALUE=$("#prewarnVal").val(); //预警值
                            var WARNING_VALUE=$("#alarmVal").val();//报警值
                            var DANGER_VALUE=$("#riskVal").val();//危险值
                            $.ajax({
                                type:'get',
                                dataType:'json',
                                url:baseURL + '/manageCommon.htm?param_act=dataEdit&param_funcId=0161796169b20063&oper=edit&selIds='+selIds, 
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
            // //自定义按钮添加结束
                $("#grid-table_toppager_right").hide();
                $("#grid-table_toppager_center").hide();
                $("#grid_table_toppager_left").attr("colspan","3");
                function style_edit_form(form) {
                $("#tr_EQ_ID").find(".CaptionTD").css({paddingLeft:'50px'});//表单内容居中					                                                                    
                $("#tr_POINT_CODE,#tr_POINT_POSITION").find(".CaptionTD").append('<span style="color:red;">*</span>')//添加红*
                $("#tr_POINT_CODE,#tr_POINT_POSITION,#tr_EQ_ID,#tr_WARNING_VALUE,#tr_ALARM_VALUE,#tr_DANGER_VALUE,#tr_REMARK").find(".CaptionTD").css({fontWeight:'bold'})//字体加粗
                $("#tr_REMARK").find('.DataTD #REMARK').css({width:'180px'})	//输入框宽度	
                $("#tr_EQ_ID input").attr({readonly:true});
                $("#tr_ID").css({display:"none"});
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
            });	
            $(function(){
                $("#grid-table").jqGrid('setGridParam',{postData:{"querySql":""},}).trigger('reloadGrid');
                $("#edit_grid-table_top").click(function(){
                    $("#POINT_POSITION").css({width:'250px'})
                    $("#tr_POINT_CODE").find(".CaptionTD").css({paddingLeft:'50px'});//表单内容居中							                                                                                        
                    $("#tr_EQ_ID").css({display:'none'});//编辑表单-所属设备			                    
                    $("#POINT_CODE").attr({readonly:true});
                });
                $("#btnCancel").click(function(){
                    $("#formWrap").hide();
                });
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
.rightForm{float:left;width: calc(100vw - 417px) ;}
#formWrap{width: 100%;height:1000px;background-color:rgba(0, 0, 0, 0.5);position: absolute;left:0;top:0;z-index:99;display:none;}
#bulkEditing{width:600px;height: auto;border:2px solid #dddddd;margin-left:39%;margin-top:12%;}
#bulkEditing input{margin-left: 5px;}
#bulkEditing select{margin-left: 5px;}  
#bulkEditing #formTop{height:40px;border-bottom:2px solid #dddddd;line-height:40px;padding-left:13px;font-size: 15px;color:#669fc7;background: -webkit-linear-gradient(#ffffff, #eeeeee); /* Safari 5.1 - 6.0 */background: -o-linear-gradient(#ffffff, #eeeeee); /* Opera 11.1 - 12.0 */background: -moz-linear-gradient(#ffffff, #eeeeee); /* Firefox 3.6 - 15 */ background: linear-gradient(#ffffff, #eeeeee); /* 标准的语法 */ }
#bulkEditing #formMiddle{height:auto;background-color:#ffffff;border-bottom:2px solid #d6e1ea;}
#bulkEditing #formMiddle li:first-child{padding-top:13px;}
#bulkEditing #formMiddle span{font-weight: bold}
#bulkEditing #formMiddle li{padding-left:40px;margin-bottom: 13px;}  
#bulkEditing #formFoot{height:50px;background-color:#eff3f8;}
#bulkEditing #formFoot div{width:68px;height:35px;outline:none;float:left;text-align: center;line-height:35px;color:white;margin-top:8px;font-size:13px;cursor:pointer;}  
#bulkEditing #formFoot #btnUp{background-color: #428bca;margin-left:74%;}
#bulkEditing #formFoot #btnCancel{background-color: #abbac3;margin-left:10px}
</style>