<template>
    <div class="animated fadeIn">
    
<!--树形控件-->
    <div id='treeForm'>
    <div class='DBSite' @click='dataSite'>添加数据站点</div>
    <div class='binging' @click='binging'>绑定</div>
    <!-- <div class='addition' @click='addition'>添加子节点</div>
    <div class='omit' @click='omit'>删除此节点</div> -->
    <div id='menu'>
        <div class='addition2' @click='addition'>添加子节点</div>
        <div class='omit2' @click='omit'>删除此节点</div>
    </div>
    <div id="tree"></div>
    </div>
<!-- 右侧 -->
<div class='rightForm'>
    <ul class='form_head'>
            <li class='form_head_top'><div class='org'>测点定义</div></li>
            <li class='form_head_middle'>
                <span>测点编码：<input id='NODE_CODE' type='text' ></span>
                <span>测点名称：<input id='NODE_NAME' type='text'></span>
                <span><div class='search' @click='find'>查 询</div></span>
                <span><div class='resets' @click='reset'>重 置</div></span>  
            </li>
        </ul>
        <table id="grid-table"></table>
        <div id="grid-pager"></div>
    <!-- 弹出框 -->
    <div id='mask'> </div>
    <div class='popUpOne'>
        <div class='contentform'>
            <p>请输入名称：<input type="text" value="" id='int'></p>
            <div class='yes' @click='yes'>确认</div><div class='no'>取消</div>
        </div>
    </div>
    <div class='popUpTwo'>
        <div class='contentform'> 
            <p>请输入名称：<input type="text" value="" class='int'></p>
            <div id='ensure' @click='ensure'>确认</div><div class='no'>取消</div>
        </div>
    </div>
</div>
<Modal v-model="modal1" title="绑定设备选择"  @on-ok="saveRole" @on-cancel="cancel">
    <table id="grid-eqtable"></table>  
    <div id="grid-eqpager"></div>
</Modal>
</div>
</template>
    <script>
    var abc=''; var baseURL = process.env.BASE_API; var treeSelectCode = "";var pointType='';
    var nodeCode=''; var nodeName='';
    String.prototype.trim = function(){
            return this.replace(/(^\s*)|(\s*$)/g, "");
        }
        function getQuerySql(){
            var orgCode = nodeCode;
            var orgName = nodeName;
            var querySql = "";
            if(orgCode != ''){
                querySql = querySql + "and  NODE_CODE like '%" + orgCode + "%'";
            }
            if(orgName != ''){
                querySql = querySql + "and  NODE_NAME like '%" + orgName + "%'";
            }
            return querySql;
        }
    import Vue from 'vue'
    import axios from 'axios'
    export default {
    name: 'station',
        data () {
                return { modal1: false }
            },
            methods: {
            addition(){//添加子节点
                var treeSelect = $("#tree").dynatree("getActiveNode");
                if(treeSelect != null && treeSelect !=""){
                        treeSelectCode = treeSelect.data.code;
                }
                if(!treeSelectCode||treeSelectCode==''){
                    this.$alert('选择要添加的站点','提示')
                }else{
                    $('.popUpTwo,#mask').show();
                    $("#tree").dynatree("getTree").reload();
                }
            },
            ensure(){//确认添加子节点
                $('.popUpTwo,#mask').hide();
                var message=$(".int").val();
                var _this=this;
                if(!treeSelectCode||treeSelectCode==''){
                    this.$alert('选择要添加的站点','提示')
                }else{
                    $.ajax({
                        type:'post',
                        url:baseURL + '/vibMonitor.htm?param_act=addchildnode', 
                        data:{'parentnodecode':treeSelectCode,'nodeName':message},
                        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        success:function(data){
                            
                            var news=JSON.parse(data).msg
                            _this.$alert(news,'提示')
                            jQuery("#grid-table").trigger("reloadGrid");$("#tree").dynatree("getTree").reload();
                            $('.int').val('');
                            }               
                    })
                }
            },
            omit(){//删除节点
                var _this=this;
                var treeSelect = $("#tree").dynatree("getActiveNode");
                if(treeSelect != null && treeSelect !=""){
                        treeSelectCode = treeSelect.data.code;
                }
                if(!treeSelectCode||treeSelectCode==''){
                    this.$alert('选择要删除的节点','提示')
                }else{
                    $.ajax({
                        type:'post',
                        url:baseURL + '/vibMonitor.htm?param_act=deletenode&nodeCode='+treeSelectCode, 
                        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        success:function(data){
                            var news=JSON.parse(data).msg
                            _this.$alert(news,'提示')
                            jQuery("#grid-table").trigger("reloadGrid");$("#tree").dynatree("getTree").reload();
                                }               
                    })   
                }
            },
            dataSite(){//添加数据站点
                $('.popUpOne,#mask').show();
            },
            yes(){//确认发送数据站点
                var _this=this;
                $('.popUpOne,#mask').hide();
                var message=$('#int').val()
                $.ajax({
                    type:'post',
                    async:true,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    url:baseURL + '/vibMonitor.htm?param_act=addnode&nodeName='+message, 
                    success:function(data){
                        jQuery("#grid-table").trigger("reloadGrid");
                        $("#tree").dynatree("getTree").reload();
                        $('#int').val('');
                        _this.$alert(JSON.parse(data).msg)
                    }
                })
                $("#tree").dynatree("getTree").reload();
            },
            binging(){//绑定
                var treeSelect = $("#tree").dynatree("getActiveNode");
                var treeChoose;
                if(treeSelect != null && treeSelect !=""){
                        treeChoose=treeSelect.data.code
                }
                if(!treeChoose){ 
                    this.$alert("先选择要绑定的设备") 
                }
                if(treeChoose.length!=5){
                    this.$alert('请选择机器设备','提示')
                }else if(treeChoose.length==5){ 
                    this.modal1 = true;
                    $('#cb_grid-eqtable').hide();
			        $(".ui-jqgrid-bdiv").css({border:'none'});

                    if(this.modal1 = true){
                        jQuery("#grid-eqtable").trigger("reloadGrid");
                    }
                }
            },
                find(){
                    nodeCode=$("#NODE_CODE").val();
                    nodeCode= nodeCode.trim();
                    nodeName=$("#NODE_NAME").val();
                    nodeName= nodeName.trim();	
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
                    document.getElementById('NODE_CODE').value = ""; 
                    document.getElementById('NODE_NAME').value = "";   
                    var treeSelect = $("#tree").dynatree("getActiveNode");
                    var treeSelectCode = "";
                    //alert(treeSelect);
                    if(treeSelect != null && treeSelect !=""){
                        treeSelectCode = treeSelect.data.id;
                    }
                    $("#grid-table").jqGrid('setGridParam',{
                                    postData:{"querySql":"","treeSelectCode":treeSelectCode},
                                }).trigger('reloadGrid'); 
                },
                saveRole () {
                var _this=this;
                var selectIds = jQuery('#grid-eqtable').jqGrid('getGridParam', 'selarrrow');
                selectIds=selectIds[0]
                var roleSelectCode = "";
                var treeSelect = $("#tree").dynatree("getActiveNode");
                var treeSelectCode = "";var treeSelectTitle = "";
                    if(treeSelect != null && treeSelect !=""){
                        treeSelectCode = treeSelect.data.code;
                        treeSelectTitle = treeSelect.data.title;
                    }
                   
                    if(selectIds){
                    $.ajax({
                    type:'post',
                    url:baseURL + '/vibMonitor.htm?param_act=bindingEquip',
                    data:{"nodeCode":treeSelectCode,"dataID":selectIds,"title":treeSelectTitle},
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    success:function(data){
                        var news=JSON.parse(data).msg
                        _this.$alert(news,'提示') //grid-eqtable grid-eqpager
                        $("#grid-eqtable").jqGrid('setGridParam',{  page:1 }).trigger("reloadGrid"); //重新载入 
                        jQuery("#grid-table").trigger("reloadGrid");
                        }       
                    })
                    }else{
                        var msg='请选择一条数据进行绑定'
                        _this.$alert(msg,'提示')
                }
            },
                cancel () {
                    this.$Message.info('点击了取消');
                }
            },
            beforeMount(){//form表单下拉框
                $.ajax({  
                    url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=VB_NODETYPE',//请求测点类型基础数据
                    async: false,  
                    success: function(data, result) {
                        pointType = data; 
                        if (!result) 
                        alert('测点类型加载失败...');   
                        }
                });
            },
            mounted(){
            var _this = this
            jQuery(function($) {
                    var grid_selector = "#grid-eqtable";
                    var pager_selector = "#grid-eqpager";
                    jQuery(grid_selector).jqGrid({
                        method:'get',
                        url:baseURL + "/vibMonitor.htm?param_act=selectUnBindingEquip",                       
                        datatype: "json",
                        height: 100+'%',
                        width:50+ '%',
                        colNames:["ID","设备编号","设备名称"],
                        colModel:[
                            {name:'ID',index:'ID', width:0, sorttype:"int", editable: true, hidden:true},
                            {name:'EQ_CODE',index:'EQ_CODE', width:210, sorttype:"int", editable: true, hidden:false},
                            {name:'EQ_NAME',index:'EQ_CODEID', width:280, sorttype:"int", editable: true, hidden:false}
                        ], 
                        viewrecords : true,
                        rowNum: 5,
                        rowList:[5,10,15],
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
                            setTimeout(function(){
                                updatePagerIcons(table);
                                enableTooltips(table);
                            }, 0);
                        },
                        editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=0160e3e6f0540010",
                        autowidth: true
                    });
                    function reloadgrid() {
                    setTimeout(function(){
                        $("#grid-eqpager").jqGrid('setGridParam',{postData:{"querySql":""},}).trigger('reloadGrid');
                    }, 0);
                    } 
                    function beforeSelectRow(){//单选方法
					$("#grid-eqtable").jqGrid('resetSelection');  
					return(true);  
			        } 
                    //navButtons
                    jQuery(grid_selector).jqGrid('navGrid','#grid-table_toppager',
                        { 	// navbar options
                            edit: false,
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
                            closeAfterEdit: true,
                            recreateForm: true,
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
                    )
                    $("#grid-eqpager_left").hide();
                    $("#grid-eqpager_center").css({width:'310px'});
                    $("#gbox_grid-eqtable").css({marginLeft:'-15px'});
                    $("#pg_grid-eqtable_toppager").hide();
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
                $(function(){ $("#grid-eqpager").jqGrid('setGridParam',{postData:{"querySql":""},}).trigger('reloadGrid')});
            // 本页的表格
                jQuery(function($) {
                    var grid_selector = "#grid-table";
                    var pager_selector = "#grid-pager";
                    var pager_topper="#grid-toppager"
                    jQuery(grid_selector).jqGrid({
                        method:'get',
                        url:baseURL + "/listDataController.htm?param_act=listData&param_funcId=01611d565f6e00aa", 
                        datatype: "json",
                        height: 100+'%',
                        colNames:["ID",'测点编码','测点名称','测点类型','设备编码'],
                        colModel:[
                            {name:'ID',index:'ID', sorttype:"int", editable: true, hidden:true},
                            {name:'NODE_CODE',index:'NODE_CODE', editable:true,editoptions:{size:"20",maxlength:"32"}}, //测点编码 
                            {name:'NODE_NAME',index:'NODE_NAME', editable:true,editoptions:{size:"20",maxlength:"80"}}, //测点名称                          
                            {name:'NODE_TYPE',index:'NODE_TYPE', editable: true,editoptions:{size:"20",maxlength:"4"},edittype:"select",formatter:'select',editoptions:{value:pointType}},//测点类型
                            {name:'EQ_CODE',index:'EQ_CODE', editable: true,editoptions:{size:"20",maxlength:"32"}},//设备编码
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
                            $("#grid-table").setColProp('NODE_TYPE', { editoptions: { value:pointType} });
                            setTimeout(function(){
                                styleCheckbox(table);
                                updateActionIcons(table);
                                updatePagerIcons(table);
                                enableTooltips(table);
                            }, 0);
                        },
                        editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=01611d565f6e00aa",
                        autowidth: true,
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
                    if(alertinfor != ""){
                        _this.$alert(alertinfor, '提示'); 
                    } 
                }
                    //navButtons
                    jQuery(grid_selector).jqGrid('navGrid','#grid-table_toppager',
                        { 	// navbar options
                            add: false,
                            addicon : 'icon-plus-sign purple',
                            edit: false,
                            editicon : 'icon-pencil blue',
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
                    $("#grid-table_toppager_left").attr("colspan","3");
                    function style_edit_form(form) {                    
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
                    $(".ui-separator").hide();//编辑分割线
                    $(".no").click(function(){//弹框取消
                        $(".popUpOne,#mask,.popUpTwo").hide();//数据站点弹框遮罩层hide
                        $("#int,.int").val('')
                    })
                    $('#treeForm').bind('contextmenu',function(){return false;})
                    $('#treeForm').mousedown(function(e){
                        var h = document.documentElement.clientHeight || document.body.clientHeight;
                        var s=document.documentElement.scrollTop  || document.body.scrollTop 
                        if(e.which==3){
                           if(h-62>=e.clientY){
                                $('#menu').show().css({left:e.clientX+6,top:e.clientY})
                           }else if(h-62<e.clientY){
                                $('#menu').show().css({left:e.clientX+6,top:(e.clientY-62)+s})
                           }
                        };
                    })
                    $(document).click(function(){$('#menu').hide();});
                    $(window).resize(function(){
						$('#grid-table').setGridWidth($(window).width()-447);
					$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示                                        
				    })
					$(".ui-jqgrid-bdiv").css({width:$(".ui-jqgrid-htable").width()})//滚动条在表格移动后显示                    
                });
                $(function(){
                    $("#tree").dynatree({   
                        title:"在线振动监测",    
                        minExpandLevel:1,  
                        imagePath:'',      
                        method:'get',  
                        initAjax:{url:baseURL + "/manageCommon.htm", data:{param_act:"treeData",tree_code:"VB_NODE"}},
                        onClick: function(node){ 
                            $(this).unbind("click");
                                // alert(node.data.code); 
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
.popUpOne,.popUpTwo{width:428px;border:1px solid lightgray;position:fixed;left:35%;top:40%;border-radius:5px;background-color:white;display:none;}
.contentform{margin:20px 60px;background-color:white;}
.yes,.no,#ensure,.surebtn,.offbtn{width:50px;height:30px;background-color:lightskyblue;border-radius:5px;display:inline-block;text-align:center;line-height:30px;color: white;margin-top:10px;cursor:pointer}
.yes,#ensure{margin-left:129px}
.no{margin-left: 25px;}
#treeForm{float:left;width:280px;height:auto;}
/* .rightForm{float:left;width: calc(100vw - 497px) ;} */
.rightForm{float:left;width: calc(100vw - 447px) ;}

.surebtn{margin:225px 30px 40px 425px;}
.DBSite,.binging,.addition,.omit{width:95px;line-height:30px;text-align: center;border-radius:3px;display:inline-block;font-size:13px;color:white;cursor: pointer}
.binging{background-color:#ff9966;}
.DBSite{background-color:#169bd5;}
.omit{margin-top:3px;background-color: #9258dd}
.addition{background-color: #587cdd}
#mask{height: 100%; width: 100%; position: fixed; left: 0px; top: 0px; opacity: 0.3;background-color: black;display: none;}
/*  右键菜单栏  */
#menu{width:102px;height:auto;position: absolute;display:none;font-weight:500;z-index: 1;}
.omit2,.addition2{width:100px;height:30px;line-height:30px;text-align: center;border-radius:3px;background-color:white;cursor:pointer;}
.omit2:hover{background-color:rgb(235, 235, 243)};.addition2:hover{background-color:rgb(235, 235, 243)};
</style>