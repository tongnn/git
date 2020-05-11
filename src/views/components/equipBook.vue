<template>
<div class="animated fadeIn">
<!--树形控件-->
<div id='treeForm'>
    <div id="tree"> </div>
</div>
<div class='rightForm'>
    <ul class='form_head'>
        <li class='form_head_top'><div class='org'>设备台账</div></li>
        <li class='form_head_middle'>
            <span>设备编码：<input id='eq_CODE' type='text' ></span>
            <span>设备名称：<input id='eq_NAME' type='text'></span>
            <span>设备分类：<select id='eq_TYPE' name='sel'> </select></span>
            <span><div class='search' @click='find'>查 询</div></span>
            <span><div class='resets' @click='reset'>重 置</div></span>  
        </li>
    </ul>
    <!-- 表格 -->
    <table id="grid-table"></table>
    <div id="grid-pager"></div>      
     <!-- 地图选点-->
    <div id="setpoint" >
        <div id="map" class="map-container" >
           <div id="mapWarp">
                <div @click="pruge" class="btnBox">解绑</div>
                <div @click="draw" class="btnBox">绑定设备坐标</div>
                <div @click="notarize" class="btnBox">确认</div>
                <div @click="callOff" class="btnBox">取消</div>
            </div> 
            <div id="coord"></div>            
        </div> 
    </div>  
</div>

</div>
</template>
<script>
var career=''; var countries = "";  var classify=''; var condition=''; var intact=''; var lease=''; var abc=''; var baseURL = process.env.BASE_API;
var eqCode=''; var eqName='';
 var EQ_CODES=''; 
String.prototype.trim = function(){ 
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
    function getQuerySql(){
        var orgCode =eqCode;
        var orgName =eqName;
        var orgType = document.getElementById('eq_TYPE').value;
        var querySql = "";
        if(orgCode != ''){
            querySql = querySql + "and  EQ_CODE like '%" + orgCode + "%'";
        }
        if(orgName != ''){
            querySql = querySql + "and  EQ_NAME like '%" + orgName + "%'";
        }
        if(orgType != ''){
            querySql = querySql + "and  EQ_TYPE like '%" + orgType + "%'";
        }
        return querySql;
    }
import Vue from 'vue'
import axios from 'axios'
export default {
name: 'equipBook',
    data () {
            return { }
        },
        methods: {
            pruge(){
                removeDrawInteraction();
                unbindGetMapCenter();
                $("#coord").text("");
            },
            draw(){
                unbindGetMapCenter();
                addDrawInteraction();
            },
            notarize(){
                var coords=$("#coord p").first().text();
                var _this=this;
                 var rowId=$('#grid-table').jqGrid('getGridParam','selrow');
                            var rowData = $("#grid-table").jqGrid('getRowData',rowId);
                            EQ_CODES=rowData.EQ_CODE; 
                if(coords){
                    $.ajax({  
                        url: baseURL+'/equip.htm?param_act=selectEqCoord&EQ_CODE='+EQ_CODES+'&coord='+coords,
                        async:false,  
                        success:function(data) {
                            _this.$alert(JSON.parse(data).msg)
                            }
                    });
                    $("#setpoint,.btnBox").hide();
                }else{
                     _this.$alert("还未进行选点","提示");
                }
            },
            callOff(){
                $("#grid-table").trigger("reloadGrid");
                $("#setpoint,.btnBox").hide();
            },
            find(){
                eqCode=$("#eq_CODE").val();
                eqCode= eqCode.trim();
                eqName=$("#eq_NAME").val();
				eqName= eqName.trim();
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
                document.getElementById('eq_CODE').value = ""; 
                document.getElementById('eq_NAME').value = ""; 
                document.getElementById('eq_TYPE').value = "";                
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
        beforeMount(){//表单请求基础数据
        $.ajax({  
        url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=EQUIP_MAJOR',
        async: false,  
        success: function(data, result) {
            career = data; 
            if (!result) 
            alert('设备专业加载失败...');   
            }
        });
        $.ajax({  
        url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=SF_ORG',
        async: false,  
        success: function(data, result) {
            countries = data; 
            if (!result) 
            alert('所属机构加载失败...');   
            }
        });
        $.ajax({  
        url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=EQ_TYPE',
        async: false,  
        success: function(data, result) {
            classify = data; 
            if (!result) 
            alert('设备分类加载失败...');   
            }
        });
        $.ajax({  
        url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=EQ_RUNTYPE',
        async: false,  
        success: function(data, result) {
            condition= data; 
            if (!result) 
            alert('设备状态加载失败...');   
            }
        });
        $.ajax({  
        url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=EQUIP_INTACTSTATUS',
        async: false,  
        success: function(data, result) {
            intact= data; 
            if (!result) 
            alert('完好状况加载失败...');   
            }
        });
        $.ajax({  
        url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=EQ_RENTALTYPE',  
        async: false,  
        success: function(data, result) {
            lease = data; 
            if (!result) 
            alert('租赁类别加载失败...');   
            }
        });
        $.ajax({  
        url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=ABCTYPE',  
        async: false,  
        success: function(data, result) {
            abc = data; 
            if (!result) 
            alert('ABC分类加载失败...');   
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
                    url:baseURL + "/listDataController.htm?param_act=listData&param_funcId=0160e3e6f0540010",
                    datatype: "json",
                    height: 100+'%',
                    colNames:["ID",'设备编码','设备名称', '设备专业','设备分类','所属机构','设备状态','完好状况','租贷类别','ABC分类','是否应力监测','是否振动监测','购置日期','功能位置编码','功能位置','规格型号',
                    '购置价值','货币代码','资产制造商','业务范围','供应商编码','供应商','工序','固定资产编号','图档号','父子系统'],
                    colModel:[
                        {name:'ID',index:'ID', sorttype:"int", editable:true,hidden:true},
                        {name:'EQ_CODE',index:'EQ_CODE',editable:true,editoptions:{size:"20",maxlength:"30"},editrules:{required:true,number:true}}, //编码  
                        {name:'EQ_NAME',index:'EQ_NAME', editable:true,editoptions:{size:"20",maxlength:"30"},editrules:{required:true}}, //设备名称                          
                        {name:'EQ_MAJOR',index:'EQ_MAJOR',editable: true,edittype:"select",formatter:'select',editoptions:{value:career}},//设备专业
                        {name:'EQ_TYPE',index:'EQ_TYPE',editable: true,editoptions:{size:"20",maxlength:"30"},edittype:"select",formatter:'select',editoptions:{value:classify}},//设备分类
                        {name:'ORG_CODE',index:'ORG_CODE',editable: true,editoptions:{size:"20",maxlength:"30"},edittype:"select",formatter:'select',editoptions:{value:countries}},//所属机构
                        {name:'EQ_RUN_STATE',index:'EQ_RUN_STATE',editable: true,editoptions:{size:"20",maxlength:"30"},edittype:"select",formatter:'select',editoptions:{value:condition}}, //设备状态
                        {name:'EQ_CONDITION',index:'EQ_CONDITION',editable: true,editoptions:{size:"20",maxlength:"30"},edittype:"select",formatter:'select',editoptions:{value:intact}}, //完好状况
                        {name:'EQ_RENTALTYPE',index:'EQ_RENTALTYPE',editable: true,hidden:true,editoptions:{size:"20",maxlength:"30"},edittype:"select",formatter:'select',editoptions:{value:lease}},//租贷类别
                        {name:'ABC_CLASSES',index:'ABC_CLASSES',editable: true,editoptions:{size:"20",maxlength:"30"},edittype:"select",formatter:'select',editoptions:{value:abc}},//ABC分类
                        {name:'IS_ST',index:'IS_ST', editable: false,hidden:true,editoptions:{size:"20",maxlength:"30"},edittype:"select",formatter:'select',editoptions:{value:"1:是;0:否"}},//是否应力监测
                        {name:'IS_VIB',index:'IS_VIB',editable: false,hidden:true,editoptions:{size:"20",maxlength:"30"},edittype:"select",formatter:'select',editoptions:{value:"1:是;0:否"}},//是否振动监测
                        {name:'PURCHASE_DATE',index:'PURCHASE_DATE',editable:false,hidden:true,editoptions:{size:"20",maxlength:"30"}, sorttype:"date",unformat: pickDate},//购置日期 
                        {name:'EQ_FUNC_CODE',index:'EQ_FUNC_CODE', editable:false,hidden:true,editoptions:{size:"20",maxlength:"30"}},//功能位置编码
                        {name:'EQ_FUNC_LOCATION',index:'EQ_FUNC_LOCATION', editable: false,hidden:true,editoptions:{size:"20",maxlength:"30"}},//功能位置
                        {name:'EQ_SPEC',index:'EQ_SPEC', editable: false,hidden:true,editoptions:{size:"20",maxlength:"30"}},//规格型号
                        {name:'EQ_PRICE',index:'EQ_PRICE', editable: false,hidden:true,editoptions:{size:"20",maxlength:"30"}},//购置价值
                        {name:'CURRENCY_CODE',index:'CURRENCY_CODE',editable: false,hidden:true,editoptions:{size:"20",maxlength:"30"}},//货币代码
                        {name:'ASSET_COMPANTY',index:'ASSET_COMPANT',editable:false,hidden:true,editoptions:{size:"20",maxlength:"30"}},//资产制造商
                        {name:'SCOPE_OF_BUSINESS',index:'SCOPE_OF_BUSINESS',editable:false,hidden:true,editoptions:{size:"20",maxlength:"30"}},//业务范围
                        {name:'SUP_COMP_CODE',index:'SUP_COMP_CODE', editable:false,hidden:true,editoptions:{size:"20",maxlength:"30"}},//供应商编码
                        {name:'SUP_COMP',index:'SUP_COMP', editable:false,hidden:true,editoptions:{size:"20",maxlength:"30"}},//供应商
                        {name:'EQ_PROCESS',index:'EQ_PROCESS', editable:false,hidden:true,editoptions:{size:"20",maxlength:"30"}},//工序
                        {name:'FIXED_ASSET_NUMBER',index:'FIXED_ASSET_NUMBER',editable:false,hidden:true,editoptions:{size:"20",maxlength:"30"}},//固定资产编号
                        {name:'PIC_PATH',index:'PIC_PATH',editable:false,hidden:true,editoptions:{size:"20",maxlength:"30"}},//图档号  MONITOR_TYPE
                        {name:'MONITOR_TYPE',index:'MONITOR_TYPE',editable:false,hidden:true,editoptions:{size:"20",maxlength:"30"}},// 父子系统设备类型
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
                    beforeSelectRow:beforeSelectRow, //单选
                    loadComplete : function() {
                        var table = this;
                        $("#grid-table").setColProp('EQUIP_MAJOR', { editoptions: { value:career} });
                        $("#grid-table").setColProp('SF_ORG', { editoptions: { value:countries} });
                        $("#grid-table").setColProp('EQ_TYPE', { editoptions: { value:classify} });
                        $("#grid-table").setColProp('EQ_RUNTYPE', { editoptions: { value:condition} });
                        $("#grid-table").setColProp('EQUIP_INTACTSTATUS', { editoptions: { value:intact} });
                        $("#grid-table").setColProp('EQ_RENTALTYPE', { editoptions: { value:lease} });
                        $("#grid-table").setColProp('ABCTYPE', { editoptions: { value:abc} });
                        setTimeout(function(){
                            styleCheckbox(table);
                            updateActionIcons(table);
                            updatePagerIcons(table);
                            enableTooltips(table);
                        }, 0);
                    },
                    editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=0160e3e6f0540010",
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
                $("#grid-table").trigger('reloadGrid');
                var alertinfor=response.responseText;
                if(alertinfor != ""){ _this.$alert(alertinfor, '提示') }
            }
            function beforeSelectRow(){//单选方法
					$("#grid-table").jqGrid('resetSelection');  
					return(true);  
			}  
            //navButtons
            var jqnav = jQuery(grid_selector).jqGrid('navGrid','#grid-table_toppager',
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
                        closeAfterEdit:true,
                        reloadAfterSubmit:false,
                        recreateForm: true,
                        beforeShowForm : function(e) {
                            var form = $(e[0]);
                            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                            style_edit_form(form);
                            
                        },
                        afterComplete:fn_editSubmit,
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
                        },
                        afterComplete: fn_editSubmit,
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
                );
                //添加自定义按钮
                jqnav.navSeparatorAdd('#grid-table_toppager',{sepclass:"ui-separator",sepcontent: ''});
                jqnav.navButtonAdd('#grid-table_toppager', {
                    caption: "地图选点",
                    title:"仅限一个设备进行选点", //按钮的提示文本
                    buttonicon:"ace-icon fa fa-flag red",
                    onClickButton:function() { 
                        var selIds;  //多选获取id
                        selIds = jQuery(grid_selector).jqGrid('getGridParam', 'selarrrow');
                        if(!selIds || selIds==""){
                            _this.$alert("请选择一个设备进行选点",'提示');
                        }
                        else if(("'"+ selIds +"'").indexOf(",") >= 0){
                            _this.$alert('请选择一个设备进行选点！', "提示");
                            return false;
                        }
                        else{
                            $("#setpoint,.btnBox").show();                                                                                   
                            initMapJs(baseURL);  
                        }
                    },
                    position: "last"
                })
               //自定义按钮添加结束
                $("#grid-table_toppager_right").hide();
                $("#grid-table_toppager_center").hide();
                $("#grid_table_toppager_left").attr("colspan","3");
                function style_edit_form(form) {
                $("#tr_EQ_CODE,#tr_EQ_MAJOR,#tr_ORG_CODE,#tr_EQ_CONDITION,#tr_ABC_CLASSES").find(".CaptionTD").css({paddingLeft:'55px'});//表单内容居中							                        
                // $('#PURCHASE_DATE').removeAttr('type').attr({'type':'date'}).css({width:'180px'}) //购置日期的时间选择
                $("#tr_EQ_CODE,#tr_EQ_NAME").find(".CaptionTD").append('<span style="color:red;">*</span>')//添加红*
                $("#tr_EQ_CODE,#tr_EQ_NAME,#tr_EQ_MAJOR,#tr_EQ_TYPE,#tr_ORG_CODE,#tr_EQ_RUN_STATE,#tr_EQ_CONDITION,#tr_EQ_RENTALTYPE,#tr_ABC_CLASSES,#tr_IS_ST,#tr_IS_VIB,#tr_PURCHASE_DATE").find(".CaptionTD").css({fontWeight:'bold'})//字体加粗 
                //form表单双排
                $('#FrmGrid_grid-table').css('width','800px') 
                $('.ui-jqdialog-content .FormData').css({width:'300px',display:'inline-block',float:'left'})
                $(".ui-jqdialog-content .FormData:last").css({display:'none'}) 
                    //update buttons classes
                    var buttons = form.next().find('.EditButton .fm-button');
                    buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
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
                $('.ui-datepicker-title').css('width','140px')
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
                    $("#edit_grid-table_top").click(function(){
                        $("#tr_ID").hide();
                        $("#tr_EQ_CODE input,#tr_EQ_NAME input").attr("readonly",true)
                    });
                    $("#add_grid-table_top").click(function(){
                        $("#tr_ID").hide();
                    });
                    $(window).resize(function(){
					    $(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示                                        
				    })
                    $(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示     
                    $("#eq_TYPE").click(function(){ //设备分类查询下拉框方法
                       $(this).unbind("click");
                        $.ajax({  
                            url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=EQ_TYPE',
                            async: false,  
                            success: function(data) {
                                var message=data.split(';')                         
                                var length = message.length;
                                if(length > 0) {   
                                    for(var i=0; i<length; i++) {   //循环生成option，并且连接成String对象   
                                        var split1=message[i].split(':');
                                        $("#eq_TYPE").append("<option value='"+split1[0] +"'>"+split1[1]+"</option>");  
                                    } 
                                }    
                            }
                        });
                    }) // 设备分类查询下拉框方法结束 
                })
            });	
        $(function(){ $("#grid-table").jqGrid('setGridParam',{postData:{"querySql":""},}).trigger('reloadGrid')});
        $(function(){
            $("#tree").dynatree({  
                title:"组织机构",    
                minExpandLevel:1,  
                imagePath:'',      
                method:'get',  
                initAjax:{url:baseURL + "/manageCommon.htm", data:{param_act:"treeData",tree_code:"SF_ORG"}},
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
import{initMapJs,unbindGetMapCenter,addDrawInteraction,removeDrawInteraction} from 'static/js/maptrail'
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
.ui-datepicker { width: 17em; padding: .2em .2em 0; display: none !important;} 
#treeForm{float:left;width: 250px}
.rightForm{float:left;width: calc(100vw - 417px) ;}
#eq_TYPE{width:120px}
#setpoint{position: absolute;left:14%;top:11%;width:85%;z-index: 1;width:1360px;height:auto;display:none;background-color:white;overflow: hidden;}
#map{height:800px;}
#mapWarp{position:absolute;right:0;top:0;z-index:1}
.btnBox{width:100px;height:40px;background-color: #1B86FF;font-size:15px;text-align:center;line-height:40px;border-radius:12px;cursor: pointer;float:right;}
#coord{width:300px;height:100px;background-color:rgb(194, 241, 194);position:absolute;left:0;top:0;z-index:1;display:none;}
</style>