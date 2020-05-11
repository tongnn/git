<template>
  <div class="animated fadeIn">
<!-- <div id='CTreeCtrl'>
树形控件11
 <div id="jstree">
    in this example the tree is populated from inline HTML
    <ul>
      <li>Root1
        <ul>
          <li id="child_node_1">Child1</li>
          <li>Child2</li>
        </ul>
      </li>
      <li>Root2</li>
    </ul>
  </div>
树形控件12
Add a <div> element where the tree should appear:
    <div id="tree"> </div>
</div> -->
<div id='detailform'>
<div class="col-xs-12">
    <!-- <ul class='form_head'>
        <li class='form_head_top'><div class='org'>组织机构</div></li>
        <li class='form_head_middle'>
            <span>机构编码：<input type='text' ></span>
            <span>机构名称：<input type='text'></span>
            <span><div class='search'>查询</div></span>
            <span><div class='resets'>重置</div></span>
        </li>
        <li class='form_head_bottom'>
        <div class='add'>增加</div><div class='alter'>修改</div><div class='del'>删除</div>
        </li>
    </ul> -->

	<!-- PAGE CONTENT BEGINS -->
	<p id="abc">{{message}}</p>
	<table id="grid-table"></table>
	<div id="grid-pager"></div>
	<!-- PAGE CONTENT ENDS -->
	</div><!-- /.col -->
							
</div>
</div>
</template>

<script>
// // 树形控件1
// import '../../../static/dist/jstree.min.js'
// // 树形控件2
// import '../../../static/dist/skin/ui.dynatree.css'
// import '../../../static/jquery/jquery.js'
// import '../../../static/jquery/jquery-ui.custom.js'
// import '../../../static/jquery/jquery.cookie.js'
// import '../../../static/js/jquery.dynatree.js'
//  basic styles
import '../../../static/css/bootstrap.min.css'
import '../../../static/css/font-awesome.min.css'
// page specific plugin styles 
import '../../../static/css/jquery-ui-1.10.3.full.min.css'
import '../../../static/css/datepicker.css'
import '../../../static/css/ui.jqgrid.css'
//  ace styles
import '../../../static/css/ace.min.css'
// ace settings handler
import '../../../static/js/ace-extra.min.js'
var $path_base = "/";//this will be used in gritter alerts containing images
window.jQuery || document.write("<script src='../../static/js/jquery-2.0.3.min.js'>"+"<"+"/script>");			
if("ontouchend" in document) document.write("<script src='../../static/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
import '../../../static/js/bootstrap.min.js'
import '../../../static/js/typeahead-bs2.min.js'
// page specific plugin scripts 
import '../../../static/js/date-time/bootstrap-datepicker.min.js'
import '../../../static/js/jqGrid/jquery.jqGrid.min.js'
import '../../../static/js/jqGrid/i18n/grid.locale-cn.js'

export default {
  name: 'details',
  props: ["message"],
  //props: {message:Array},
   data () {
            return {
                
            }
        },
        methods: {
    //         handleNodeClick(data) {
	//     // console.log(data);
	//   },
	
			test: function (){
				var arr = $("#abc").html();
				console.log(arr);
				return arr;
			}
	

        },
        mounted(){
			

			//console.log(this.message);
            var equips = [];
			//[ 
				
				// {id:"1",name:"二号门机",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
				// {id:"2",name:"卸船机",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
				// {id:"3",name:"装船机",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
				// {id:"4",name:"装船机",stock:"No",ship:"ARAMEX",sdate:"2007-12-03"},
				// {id:"5",name:"一号门机",stock:"Yes",ship:"FedEx",sdate:"2007-12-03"},
				// {id:"6",name:"一号门机",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
				// {id:"7",name:"Mobile Telephone",stock:"Yes",ship:"ARAMEX",sdate:"2007-12-03"},
				// {id:"8",name:"Server",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
				// {id:"9",name:"Matrix Printer",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
				// {id:"10",name:"Desktop Computer",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
				// {id:"11",name:"Laptop",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
				// {id:"12",name:"LCD Monitor",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
				// {id:"13",name:"Speakers",stock:"No",ship:"ARAMEX",sdate:"2007-12-03"},
				// {id:"14",name:"Laser Printer",stock:"Yes",ship:"FedEx",sdate:"2007-12-03"},
				// {id:"15",name:"Play Station",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
				// {id:"16",name:"Mobile Telephone",stock:"Yes",ship:"ARAMEX",sdate:"2007-12-03"},
				// {id:"17",name:"Server",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
				// {id:"18",name:"Matrix Printer",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
				// {id:"19",name:"Matrix Printer",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
				// {id:"20",name:"Desktop Computer",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
				// {id:"21",name:"Laptop",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
				// {id:"22",name:"LCD Monitor",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
				// {id:"23",name:"Speakers",stock:"No",ship:"ARAMEX",sdate:"2007-12-03"}
			//];

            jQuery(function($) {
				var grid_selector = "#grid-table";
				var pager_selector = "#grid-pager";
				var pager_topper="#grid-toppager";

				jQuery(grid_selector).jqGrid({
				// 	method:'get',
				// 	url:base_URL + "/equip.htm?param_act=" + param_act + "&equiptype" + type,
				// //	userData:{param_act:"listData",param_funcId:"011535b6bd1e0003"},
				// 	datatype: "json",
				// 	height: 100+'%',
					
					data: equips,
					datatype: "local",
					height: 100+'%',
					colNames:[' ', '设备编码','设备名称','设备专业', '设备状态'],
					colModel:[
						{name:'myac',index:'', width:1, fixed:true, sortable:false, resize:false,hidden: true},
						{name:'id',index:'id', width:65, sorttype:"int", editable: true},
						{name:'sdate',index:'name',width:90, editable:true, sorttype:"date",unformat: pickDate},
						{name:'name',index:'sdate', width:90,editable: true,editoptions:{size:"20",maxlength:"30"}},
						{name:'stock',index:'stock', width:70, editable: true,edittype:"checkbox",editoptions: {value:"Yes:No"},unformat: aceSwitch},
						// {name:'ship',index:'ship', width:90, editable: true,edittype:"select",editoptions:{value:"FE:FedEx;IN:InTime;TN:TNT;AR:ARAMEX"}},
						// {name:'note',index:'note', width:100, sortable:false,editable: true,edittype:"textarea", editoptions:{rows:"2",cols:"10"}} 
					], 
			
					// viewrecords : true,
					// rowNum:8,
					// rowList:[10,20,30],
					pager : pager_selector,
					altRows: true,
					
					multiselect: true,
			        multiboxonly: true,
			
					loadComplete : function() {
						var table = this;
						setTimeout(function(){
							styleCheckbox(table);
							
							updateActionIcons(table);
							updatePagerIcons(table);
							enableTooltips(table);
						}, 0);
					},
					// caption: "jqGrid with inline editing",
					autowidth: true
			
				});
			
				//enable search/filter toolbar
				//jQuery(grid_selector).jqGrid('filterToolbar',{defaultSearch:true,stringResult:true})
			
				//switch element when editing inline
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
			
			
				//navButtons
				jQuery(grid_selector).jqGrid('navGrid',pager_selector,
					{ 	//navbar options
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
						//closeAfterEdit: true,
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
							alert(1);
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
			
			
				
				function style_edit_form(form) {
					//enable datepicker on "sdate" field and switches for "stock" field
					form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
						.end().find('input[name=stock]')
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
					buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'icon-search');
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
			
			
			
				//it causes some flicker when reloading or navigating grid
				//it may be possible to have some custom formatter to do this as the grid is being created to prevent this
				//or go back to default browser checkbox styles for the grid
				function styleCheckbox(table) {
				/**
					$(table).find('input:checkbox').addClass('ace')
					.wrap('<label />')
					.after('<span class="lbl align-top" />')
			
			
					$('.ui-jqgrid-labels th[id*="_cb"]:first-child')
					.find('input.cbox[type=checkbox]').addClass('ace')
					.wrap('<label />').after('<span class="lbl align-top" />');
				*/
				}
				
			
				//unlike navButtons icons, action icons in rows seem to be hard-coded
				//you can change them like this in here if you want
				function updateActionIcons(table) {
					/**
					var replacement = 
					{
						'ui-icon-pencil' : 'icon-pencil blue',
						'ui-icon-trash' : 'icon-trash red',
						'ui-icon-disk' : 'icon-ok green',
						'ui-icon-cancel' : 'icon-remove red'
					};
					$(table).find('.ui-pg-div span.ui-icon').each(function(){
						var icon = $(this);
						var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
						if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
					})
					*/
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
			
				//var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow');
			
			
			});	
        }
}


</script>


<style scoped lang="css">
 
  #CTreeCtrl{width:10%;float:left;}
  #detailform{float:left;width:90%;}
  #detailform .form_head_top{border-bottom:1px solid gray;}
  #detailform .form_head_top .org{width:100px;height:30px;background-color:#143f6d;color:white;font-size:16px;font-weight:bold;border-radius:5px 5px 0px 0px;text-align:center;line-height:30px;}
  #detailform .form_head_middle{height:40px;}
  #detailform .form_head_middle span{display:inline-block;margin-right:20px;}
  #detailform .form_head_middle span .search,.resets{width:100px;height:35px;text-align:center;line-height:35px;border-radius:5px;margin-top:2px;}
  #detailform .form_head_middle span .search{background-color:#169bd5;}
   #detailform .form_head_middle span .resets{background-color:#ff9966;}
  #detailform .form_head_bottom{background-color:#f1f3f6;}
  #detailform .form_head_bottom .add,.alter,.del{width:75px;margin-right:20px;margin-bottom:2px;height:40px;float:left;margin-right:20px;text-align:center;line-height:40px;border-radius:5px;}
   #detailform .form_head_bottom .add{background-color:#009966;}
    #detailform .form_head_bottom .alter{background-color:#169bd5;}
	 #detailform .form_head_bottom .del{background-color:#ff6600;}
</style>


