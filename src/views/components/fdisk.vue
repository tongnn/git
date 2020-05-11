<template>
<div class="animated fadeIn">
<div id="treeForm">
    <div id="tree"> </div>
</div>
<div class='rightForm'>
    <ul class='form_head'>
        <li class='form_head_top'><div class='org'>分区设置</div></li>
        <li class='form_head_middle'>
            <span>分区名称：<input id='pART_NAME' type='text' ></span>
            <span><div class='search' @click='find'>查 询</div></span>
            <span><div class='resets' @click='reset'>重 置</div></span>  
        </li>
    </ul>
    <table id="grid-table"></table>
    <div id="grid-pager"></div>  
    <Modal v-model="modal1" title="绑定设备选择"  @on-ok="saveEq" @on-cancel="cancelEq">
        <table id="grid-eqtable"></table>  
        <div id="grid-eqpager"></div>
    </Modal>     

</div>
</div>
</template>
<script>
var colour='';var partName='';var plantype='';var eqId=''
var pro_id_countries1 = ""; 
var baseURL = process.env.BASE_API;
String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
    function getQuerySql(){
        var orgCode = partName;
        var querySql = "";
        if(orgCode != ''){ querySql = querySql + "and PART_NAME like '%" + orgCode + "%'"; }
        return querySql;
    }
import Vue from 'vue'
import axios from 'axios'
export default {
name: 'fdisk',
    data () {
            return {modal1:false }
        },
        methods: {
            saveEq(){
                eqId =  jQuery('#grid-eqtable').jqGrid('getGridParam', 'selarrrow');
                var eqName = $("#grid-eqtable").jqGrid('getRowData',eqId)
                $(".ui-widget-overlay,#editmodgrid-table").show();
               // console.log(eqName.EQ_NAME)
                // $("#PROJECT_CODE").val(proId);
                $("#EQ_NAME").val(eqName.EQ_NAME)
                $("#EQ_CODE").val(eqName.EQ_CODE)
                $("#editmodgrid-table,.ui-widget-overlay").show();
            },
            cancelEq(){
                $("#editmodgrid-table,.ui-widget-overlay").show();

            },
            find(){
                partName=$("#pART_NAME").val();
                partName= partName.trim();
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
                document.getElementById('pART_NAME').value = "";        
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
        url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=BG_COLOR', 
        async: false,  
        success: function(data, result) {
            colour = data; 
            if (!result) 
            alert('背景颜色加载失败...');   
            }
        });
        $.ajax({  
        url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=FI_PROJECT',//请求消防设备类型基础数据 
        async: false,  
        success: function(data, result) {
            pro_id_countries1 = data; 
            if (!result) 
            alert('所属工程加载失败...');   
            }
        });
         $.ajax({  
        url: baseURL+'/manageCommon.htm?param_act=selectdata&baseDataCode=EQUIP_MAJOR',//请求预案类型基础数据 
        async: false,  
        success: function(data, result) {
            plantype = data; 
            if (!result) 
            alert('预案类型加载失败...');   
            }
        });
    },
        mounted(){
        var _this = this
        //弹框页
        //绑定设备
		 jQuery(function($) {
				var grid_selector = "#grid-eqtable";
                var pager_selector = "#grid-eqpager";
				var pager_topper="#grid-toppager"
				jQuery(grid_selector).jqGrid({
					method:'get',
					url:baseURL + "/vibMonitor.htm?param_act=selectUnBindingEquip",  
					datatype: "json",
					height: 100+'%',
					colNames:["ID","设备编号","设备名称"],
                    colModel:[
                        {name:'ID',index:'ID', width:0, sorttype:"int", editable: true, hidden:true},
                        {name:'EQ_CODE',index:'EQ_CODE', width:210, sorttype:"int", editable: true, hidden:false},
                        {name:'EQ_NAME',index:'EQ_CODEID', width:280, sorttype:"int", editable: true, hidden:false}
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
					editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=011535b6bd1e0003"
                });
                function beforeSelectRow(){//单选方法
					$("#grid-eqtable").jqGrid('resetSelection');  
					return(true);  
			    } 
				jQuery(grid_selector).jqGrid('navGrid','#grid-table_toppager')
			    $("#grid-eqpager_left").hide();
                    $("#grid-eqpager_center").css({width:'310px'});
                    $("#gbox_grid-eqtable").css({marginLeft:'-15px'});
                    $("#pg_grid-eqtable_toppager").hide();
			});	
        //本页
            jQuery(function($) {
                var grid_selector = "#grid-table";
                var pager_selector = "#grid-pager";
                var pager_topper="#grid-toppager"
                jQuery(grid_selector).jqGrid({
                    method:'get',
                    url:baseURL + "/listDataController.htm?param_act=listData&param_funcId=01614b3fbc86001a",
                    datatype: "json",
                    height: 100+'%',
                    width:100+'%',
                    colNames:["ID",'所属工程','分区名称','设备编码','设备名称','所属设备类型', '背景颜色','分区大小','图片路径',"背景图片"],
                    colModel:[
                        {name:'ID',index:'ID', sorttype:"int", editable: true, hidden:true,editoptions:{size:"20",maxlength:"32"}},
                        {name:'PROJECT_ID',index:'PROJECT_ID', editable:true,editoptions:{size:"20",maxlength:"32"},edittype:'select',formatter:'select',editoptions:{value:pro_id_countries1}}, 
                        {name:'PART_NAME',index:'PART_NAME', editable:true,editoptions:{size:"20",maxlength:"200"},editrules:{required:true}},  
                        {name:'EQ_CODE',index:'EQ_CODE', editable:true,editoptions:{size:"20",maxlength:"200"},hidden:true},  
                        {name:'EQ_NAME',index:'EQ_NAME', editable:true,editoptions:{size:"20",maxlength:"200"},editrules:{required:true}},  
                        
                        {name:'PLAN_TYPE',index:'PLAN_TYPE', editable:true,editrules:{required:true},editoptions:{size:"20",maxlength:"32"},edittype:'select',formatter:'select',editoptions:{value:plantype}},                    
                        {name:'BACKGROUND_COLOR',index:'BACKGROUND_COLOR', hidden:true,editable: true,editoptions:{size:"20",maxlength:"30"},edittype:"select",formatter:'select',editoptions:{value:colour}},
                        {name:'PART_SIZE',index:'PART_SIZE', editable: true,editoptions:{size:"20",maxlength:"16"}},
                        {name:'BACKGROUND_IMG',index:'BACKGROUND_IMG',editable: true,hidden:true,editoptions:{size:"20",maxlength:"30"}},
                        {name:'IMG_NAME',index:'IMG_NAME', editable: true,editoptions:{size:"20",maxlength:"30"},editrules:{required:false},hidden:true,}
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
                        $("#grid-table").setColProp('BG_COLOR', { editoptions: { value:colour} });
                        $("#grid-table").setColProp('PROJECT_ID', { editoptions: { value:pro_id_countries1} });	
                        $("#grid-table").setColProp('PLAN_TYPE', { editoptions: { value:plantype} });	
                        setTimeout(function(){
                            styleCheckbox(table);
                            updateActionIcons(table);
                            updatePagerIcons(table);
                            enableTooltips(table);
                        }, 0);
                    },
                    editurl: baseURL+"/manageCommon.htm?param_act=dataEdit&param_funcId=01614b3fbc86001a",
                    autowidth: true,
                    autoScroll:true,
                    shrinkToFit:true
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
                //添加新页面按钮
                    jqnav.navSeparatorAdd('#grid-table_toppager',{sepclass:"ui-separator",sepcontent: ''});
                    jqnav.navButtonAdd('#grid-table_toppager', {
                    caption: "分区配置",
                    title:"仅选择一个分区", 
                    buttonicon:"icon-pencil purple",
                    onClickButton:function() { 
                        var roomId = jQuery(grid_selector).jqGrid('getGridParam', 'selarrrow'); 
                        if(roomId == '' || roomId==undefined){
                            _this.$alert('请选择要配置的分区', "提示");
                            return false;
                        }
                        else if(("'"+ roomId +"'").indexOf(",") >= 0){
                            _this.$alert('请选择一个分区进行配置！', "提示");
                            return false;
                        }
                         else if(roomId[0]){
                            _this.$router.push({path: '/manager/safe/partition', query: {selected:roomId[0]}});
                        }

                        // var roomId = $(".ui-state-highlight td").eq(1).text();
                        // console.log(typeof(roomId))
                        // if(roomId){
                        //     _this.$router.push({path: '/manager/safe/partition', query: {selected: roomId}});
                        // }
                        
                    },
                    position: "last"
                })
                $("#grid-table_toppager_right").hide();
                $("#grid-table_toppager_center").hide();
                $("#grid_table_toppager_left").attr("colspan","3");
                function style_edit_form(form) {
                
                $("#tr_EQ_NAME").append("<div id='selProject' style='width:60px;height:25px;background:#09acf1;cursor:pointer;position:absolute;left:340px;top:83px;text-align:center;line-height:25px;border-radius:3px;color:white'>绑定设备</div>");
                $('#selProject').click(function(){
                    $(".ui-widget-overlay,#editmodgrid-table").hide()
					$(".ui-jqgrid-bdiv").css({border:'none'});	         
                    _this.modal1=true;
                    $("#cb_grid-eqtable").hide();
                })
                $("#sData").click(function(){
                    if($("#EQ_NAME").val()==''){
                        $("#selProject").css({left:'430px',top:"116px"})
                    }
                })
                $("#EQ_NAME").attr({readonly:true})
                    //
                $("#IMG_NAME").attr({placeholder:'选择文件上传',readonly:true})//输入框内提示                      
                // $("#FrmGrid_grid-table").css({height:"280px",overflow:"auto",position:'relative'}); //表宽是否显示滚动条
                $("#tr_PART_NAME,#tr_IMG_NAME,#tr_EQ_NAME,#tr_PLAN_TYPE").find(".CaptionTD").append('<span style="color:red;">*</span>')//添加红*
                $("#tr_PROJECT_ID,#tr_PART_NAME,#tr_BACKGROUND_COLOR,#tr_PART_SIZE,#tr_IMG_NAME,#tr_PLAN_TYPE,#tr_EQ_CODE,#tr_EQ_NAME").find(".CaptionTD").css({fontWeight:'bold'})//字体加粗
                //表单背景图片
                //$('#TblGrid_grid-table tbody').append('<form id="from" action="" method="post" enctype="multipart/form-data"> <input type="button" id="intwrap" value="选择图片" /> <input type="file" id="fileId" value="" /><input type="button" id="submit" value="上传图片"/></form>')
                // $("#from").css({position:"relative",left:"180px",top:"0",width:"235px",height:"30px"});
                // $("#submit").css({position:"absolute",left:"0",top:"40px",width:"67px",outline:"none"});
                // $("#fileId").css({outline:"none",position:"absolute",top:"5px"});     
                // $("#intwrap").css({position:"absolute",top:"5px",width:"67px"});
                // $("#tr_BACKGROUND_IMG").css({display:"none"});
                // $("#submit").click(function(){//上传图片
                //     var upVal=$("#fileId").val();
                //     if(upVal=='' || !upVal){
                //             _this.$alert("先选择上传的图片",'提示');
                //     }else{
                //         $("#fileId").css({opacity:"0"})
                //             var num=$("#ID").val();
                //             var a = new FormData();
                //             a.append("image", $("#fileId")[0].files[0]);
                //             a.append("id", 1);
                //             $.ajax({
                //             url:baseURL+"/docFile.htm?param_act=uploadPic&ID="+num,
                //             xhrFields:{ withCredentials:true},
                //             type: "POST",
                //             cache: false,
                //             data: a,
                //             processData: false,
                //             contentType:false,
                //             async: false,
                //             success: function (data) {
                //                 var news=JSON.parse(data);
                //                 var msg=news.msg;var fileName=news.filePath;
                //                 _this.$alert(msg);
                //                 //截取文件名称 表单添加文件名
                //                 var pos=fileName.indexOf("_");  
                //                 var result=fileName.substring(pos+1,fileName.length);
                //                 $("#IMG_NAME").val(result);
                //                 //id+文件名称  表格添加文件名
                //                 $("#BACKGROUND_IMG").val(fileName);
                //             }
                //         })
                //     }
                // })
                //表单部分结束
                $("#PROJECT_ID").attr({readonly:true})
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
                    buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();
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
                //添加分区时候的判断
                // $("#add_grid-table_top").click(function(){
                // $("#tr_PART_SIZE input").attr({value:"1010*0592"});
                // $(".CaptionTD").css({position:"absolute",left:"180px"});
                // $(".DataTD").css({position:"relative",left:"-90px",top:"-3px"});
                // }) //添加设备判断结束
                // $("#edit_grid-table_top").click(function(){ //编辑表
                // $(".CaptionTD").css({position:"absolute",left:"185px"}); 
                // $(".DataTD").css({position:"relative",left:"-90px",top:"-3px"});                    
                // })//结束编辑表
            });	
            $(function(){
                $("#grid-table").jqGrid('setGridParam',{postData:{"querySql":""},}).trigger('reloadGrid');
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
                    initAjax:{url:baseURL + "/manageCommon.htm", data:{param_act:"treeData",tree_code:"FI_PROJECT"}},
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
/* .rightForm{float:left;width: calc(100vw - 467px) ;} */
.rightForm{float:left;width: calc(100vw - 417px) ;}

</style>