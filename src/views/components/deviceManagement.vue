<template>
<div class="animated fadeIn">
<div id="treeForm">
<!--树形控件-->
    <div id="tree"> </div>
</div>
<div class='rightForm'>
    <ul class='form_head'>
        <li class='form_head_top'><div class='org'>消防设置管理</div></li>
        <li class='form_head_middle'>
            <span>所属分区：<input id='pART_CODE' type='text' ></span>
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
var partCode='';
var type_countries = "";
var pro_id_countries1 = "";
var part_countries = " : "; 
var baseURL = process.env.BASE_API;
String.prototype.trim = function(){
            return this.replace(/(^\s*)|(\s*$)/g, "");
        }
    function getQuerySql(){
        var orgCode = partCode;
        var querySql = "";
        if(orgCode != ''){
            querySql = querySql + "and PART_CODE like '%" + orgCode + "%'";
        }
        return querySql;
    }
import Vue from 'vue'
import axios from 'axios'
export default {
name: 'deviceManagement',
    data () {
            return { }
        },
        methods: {
            find(){
                partCode=$("#pART_CODE").val();
                partCode= partCode.trim();
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
                document.getElementById('pART_CODE').value = ""; 
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
        url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=FI_EQUIP_TYPE',//请求消防设备类型基础数据 
        async: false,  
        success: function(data, result) {
            type_countries = data; 
            if (!result) 
            alert('设备类型加载失败...');   
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
        $.ajax({  
        url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=FI_PART',
        async: false,  
        success: function(data, result) {
            part_countries = data; 
            if (!result) 
            alert('所属分区加载失败...');   
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
                    url:baseURL + "/fiSafety.htm?param_act=fiSafetyEquipListData&param_funcId=01614b4312e50027",
                    datatype: "json",
                    height: 100+'%',
                    colNames:["ID",'设备编号','所属工程','所属分区','设备名称','设备类型','位置描述','控制器号','一次码','回路号'],
                    colModel:[
                        {name:'ID',index:'ID', width:0, sorttype:"int", editable: true, hidden:true,editoptions:{size:"20",maxlength:"32"}},
                        {name:'EQ_CODE',index:'EQ_CODE', width:155,editable: true,editoptions:{size:"20",maxlength:"30"},editrules:{required:true,number:true}},
                        {name:'PROJECT_ID',index:'PROJECT_ID',width:230, editable:true,edittype:'select',formatter:'select',
                        editoptions:{value:pro_id_countries1},
                        sortable:false, editable: true, edittype:'select', editoptions:{  
                        // value:pro_id_countries1, //设置所属工程下拉框的内容
                        value:pro_id_countries1,  //所属工程下拉框的内容
                        dataEvents: [//给当前控件追加事件处理    
                            {    
                                type: 'change',                 //下拉选择的时候    
                                fn: function (e) {              //触发方法    
                                    //获取当前下拉框的id名字（这是点击编辑按钮时才需要的，因为点击编辑按钮后，schoolName的下拉框会变成1_roleid,其中”1“是行号）    
                                    var pro_id = this.id;      
                                    var pro_value = this.value; //获取选中的工程名称   
                                    var data = queryPartByPro(pro_value); //调用获取工程下对应分区信息data的方法    
                                    
                                }    
                            }    
                        ]  
                    }}, 
                        {name:'PART_CODE',index:'PART_CODE', width:235,editable: true,edittype:'select',formatter:'select',editoptions:{value:part_countries}},                           
                        {name:'EQ_NAME',index:'EQ_NAME', width:230,editable: true,editoptions:{size:"20",maxlength:"30"},editrules:{required:true,number:true}},
                        {name:'EQ_TYPE',index:'EQ_TYPE', width:230,editable: true,edittype:'select',formatter:'select',editoptions:{value:type_countries}},
                        {name:'LOCATION_DESCRIB',index:'LOCATION_DESCRIB', editable: true,editoptions:{size:"20",maxlength:"30"}}, //位置描述                                                                                                                                                                       
                        {name:'CONTROL_CODE',index:'CONTROL_CODE',width:115, editable:false,editoptions:{size:"20",maxlength:"200"},editrules:{number:true}},
                        {name:'ONETIME_CODE',index:'ONETIME_CODE', width:115,editable: true,editoptions:{size:"20",maxlength:"4"},editrules:{number:true}},
                        {name:'LOOP_CODE',index:'LOOP_CODE', width:115,editable: true,editoptions:{size:"20",maxlength:"16"},editrules:{number:true}},   
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
                    $("#grid-table").setColProp('EQ_TYPE', { editoptions: { value:type_countries} });
                    $("#grid-table").setColProp('PROJECT_ID', { editoptions: { value:pro_id_countries1} });
                        $("#grid-table").setColProp('PART_CODE', { editoptions: { value:part_countries} });							
                    setTimeout(function(){
                        styleCheckbox(table);
                        updateActionIcons(table);
                        updatePagerIcons(table);
                        enableTooltips(table);							
                    }, 0);
                    },
                    editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=01614b4312e50027",
                    autowidth: true,
                    width:100+'%',
                    shrinkToFit:true,
                    autoScroll:true
                });
                

            //获取所选工程下的所有分区回显下拉框
            function queryPartByPro(pro_id){
            // alert("1:"+pro_id);
            
            //将增加操作的弹出菜单中的roleid的下拉框内容清空（因为每次切换内容都需要变更）    
            $("select#PART_CODE").empty();    
                $.ajax({    
                        url: baseURL+"/fiSafety.htm?param_act=queryPartByPro&baseDataCode=FI_PART",    
                        async: false,    
                        cache: false,    
                        dataType: "json",
                        data:{
                            pro_id:pro_id
                        },
                        success: function (data) { 
                            var str=''//存放option的值
                            // var partData = JSON.parse(data);
                            var length = data.length;
                            if (length > 0) {   
                                for (var i = 0; i < length; i++) {   //循环生成option，并且连接成String对象    
                                    str += "<option value='" + data[i].PART_ID + "'>" + data[i].PART_NAME + "</option>";    
                                }    
                            }    
                            else {    
                                str += "<option>" + "该工程下暂无分区" + "</option>";  
                            }    
                            var PART_CODE = $("select#PART_CODE");     
                            PART_CODE.append(str);//渲染option  
                            
                        }
                })
            }

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
                // //获取选中行的所有数据
                // var rowId=$('#grid-table').jqGrid('getGridParam','selrow');
                // var rowData = $("#grid-table").jqGrid('getRowData',rowId);
                // // console.log(rowData);
                // //通过所属工程的编码确定当前工程下的分区
                // queryPartByPro(rowData.PROJECT_ID);
                // alert(  queryPartByPro(rowData.PROJECT_ID))
                $("#PROJECT_ID").click(function(){//判断无分区时候不提交
                    var partVal=$("#PART_CODE").text();
                    var zoneless='该工程下暂无分区'
                    if(partVal==zoneless){
                        $("#sData").hide();
                    }else{
                        $("#sData").show();
                    }
                })
                $("#tr_EQ_CODE").find(".CaptionTD").css({paddingLeft:'55px'});//表单内容居中							                                              
                $("#tr_EQ_CODE,#tr_EQ_NAME").find(".CaptionTD").append('<span style="color:red;">*</span>')//添加红*
                $("#tr_EQ_CODE,#tr_PROJECT_ID,#tr_PART_CODE,#tr_EQ_NAME,#tr_EQ_TYPE,#tr_ONETIME_CODE,#tr_LOOP_CODE,#tr_LOCATION_DESCRIB").find(".CaptionTD").css({fontWeight:'bold'})//字体加粗
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
                function styleCheckbox(table) { }
                function updateActionIcons(table) {  }
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
            $('#search_grid-table_top').click(function(){$("#searchmodfbox_grid-table,.ui-widget-overlay").show();});//再次查询时表单显示
            $(window).resize(function(){
					$('#grid-table').setGridWidth($(window).width()-417);
					$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示                                        
			})
			$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示            
        })
        $(function(){
            $("#edit_grid-table_top").click(function(){
                // $("#tr_PART_CODE #PART_CODE").empty();
                //获取选中行的所有数据
                var rowId=$('#grid-table').jqGrid('getGridParam','selrow');
                var rowData = $("#grid-table").jqGrid('getRowData',rowId);
                console.log(rowId)
                console.log(rowData)  
                $("#EQ_NAME").click(function(){
                   var fenqu= $("#tr_PART_CODE #PART_CODE").val()
                   fenqu =rowData.PART_CODE //一堆数字？0161502a83550001  0161502a83550001
                })
               
            })
            var flag=true;
            $("#grid-table").jqGrid('setGridParam',{postData:{"querySql":""},}).trigger('reloadGrid');
            //添加请求
            if(flag){
                $("#add_grid-table_top").click(function(){
                $.ajax({ 
                    url: baseURL+'/fiSafety.htm?param_act=queryPartByPro&baseDataCode=FI_PART&pro_id=001',//请求消防设备类型基础数据 分区
                    async: false, 
                    success: function(data) {
                        var str='';
                        var partData = JSON.parse(data);
                        if (partData.length > 0) {   
                            var length = partData.length; 
                            for (var i = 0; i < length; i++) {   //循环生成option，并且连接成String对象    
                                str += "<option value='" + partData[i].PART_ID + "'>" + partData[i].PART_NAME + "</option>";    
                            }    
                        }    
                        else {    
                            str += "<option>" + "该分区下暂无用户" + "</option>";    
                        }    
                        $("select#PART_CODE").empty(); 
                        var PART_CODE = $("select#PART_CODE");       
                        PART_CODE.append(str);//渲染option  
                        // alert(str)  
                        // alert(PART_CODE)
                        flag=false;
                    }
                })
                $ ("add_grid-table_top").unbind ("click");
                });
            };
           
        })
        
            $(function(){
        $("#tree").dynatree({ 
            title:"工程",   
            minExpandLevel:1,   
            imagePath:'',      
            method:'get',  
            initAjax:{url:baseURL + "/manageCommon.htm", data:{param_act:"treeData",tree_code:"FI_PRO_PART"}},
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
</style>