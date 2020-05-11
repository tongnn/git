;(function($){
/**
 * jqGrid English Translation
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = $.jgrid || {};
$.extend($.jgrid,{
	defaults : {
		recordtext: "显示 {0} - {1} 条记录 ， 共 {2} 条",
		emptyrecords: "没有找到记录",
		loadtext: "加载中...",
		pgtext : "第 {0} 页， 共  {1} 页"
	},
	search : {
		caption: "查找...",
		Find: "确定",
		Reset: "重置",
		odata: [
			{ oper:'eq', text:'等于'},
			{ oper:'ne', text:'不等于'},
			{ oper:'lt', text:'小于'},
			{ oper:'le', text:'小于等于'},
			{ oper:'gt', text:'大于'},
			{ oper:'ge', text:'大于等于'},
			{ oper:'bw', text:'以XX开始'},
			{ oper:'ew', text:'以XX结束'},
			{ oper:'cn', text:'包含'}
		],
		groupOps: [	{ op: "AND", text: "并且" },	{ op: "OR",  text: "或者" }	]
	},
	edit : {
		addCaption: "添加记录",
		editCaption: "修改记录",
		bSubmit: "提交",
		bCancel: "取消",
		bClose: "关闭",
		saveData: "数据已修改，要保存修改数据吗？",
		bYes : "是",
		bNo : "否",
		bExit : "取消",
		msg: {
			required:"必填项",
			number:"请输入合法数字",
			minValue:"请填大于或等于 ",
			maxValue:"请填小于或等于",
			email: "e-mail格式不正确",
			integer: "请输入整数",
			date: "日期格式错误",
			url: "Url格式错误 ('http://' or 'https://')",
			nodefined : " 未定义!",
			novalue : " 必须有返回值!",
			customarray : "自定义函数应返回数组!",
			customfcheck : "自定义函数应出现在自定义检查的情况下!"
			
		}
	},
	view : {
		caption: "显示",
		bClose: "关闭"
	},
	del : {
		caption: "删除",
		msg: "删除选中行?",
		bSubmit: "删除",
		bCancel: "取消"
	},
	nav : {
		edittext: "",
		edittitle: "编辑选中行",
		addtext:"",
		addtitle: "添加记录",
		deltext: "",
		deltitle: "删除选中行",
		searchtext: "",
		searchtitle: "查找",
		refreshtext: "",
		refreshtitle: "刷新",
		alertcap: "警告",
		alerttext: "请选择行",
		viewtext: "",
		viewtitle: "查看选中行"
	},
	col : {
		caption: "显示/隐藏列",
		bSubmit: "提交",
		bCancel: "取消"
	},
	errors : {
		errcap : "错误",
		nourl : "没有设置URL",
		norecords: "没有数据",
		model : "加载数据出错!"
	},
	formatter : {
		integer : {thousandsSeparator: ",", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"日", "一", "二", "三", "四", "五", "六",
				"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"
			],
			monthNames: [
				"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
				"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
			],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th';},
			srcformat: 'Y-m-d',
			newformat: 'n/j/Y',
			parseRe : /[Tt\\\/:_;.,\t\s-]/,
			masks : {
				// see http://php.net/manual/en/function.date.php for PHP format used in jqGrid
				// and see http://docs.jquery.com/UI/Datepicker/formatDate
				// and https://github.com/jquery/globalize#dates for alternative formats used frequently
				// one can find on https://github.com/jquery/globalize/tree/master/lib/cultures many
				// information about date, time, numbers and currency formats used in different countries
				// one should just convert the information in PHP format
				ISO8601Long:"Y-m-d H:i:s",
				ISO8601Short:"Y-m-d",
				// short date:
				//    n - Numeric representation of a month, without leading zeros
				//    j - Day of the month without leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				// example: 3/1/2012 which means 1 March 2012
				ShortDate: "n/j/Y", // in jQuery UI Datepicker: "M/d/yyyy"
				// long date:
				//    l - A full textual representation of the day of the week
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				LongDate: "l, F d, Y", // in jQuery UI Datepicker: "dddd, MMMM dd, yyyy"
				// long date with long time:
				//    l - A full textual representation of the day of the week
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    s - Seconds, with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				FullDateTime: "l, F d, Y g:i:s A", // in jQuery UI Datepicker: "dddd, MMMM dd, yyyy h:mm:ss tt"
				// month day:
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				MonthDay: "F d", // in jQuery UI Datepicker: "MMMM dd"
				// short time (without seconds)
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				ShortTime: "g:i A", // in jQuery UI Datepicker: "h:mm tt"
				// long time (with seconds)
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    s - Seconds, with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				LongTime: "g:i:s A", // in jQuery UI Datepicker: "h:mm:ss tt"
				SortableDateTime: "Y-m-d\\TH:i:s",
				UniversalSortableDateTime: "Y-m-d H:i:sO",
				// month with year
				//    Y - A full numeric representation of a year, 4 digits
				//    F - A full textual representation of a month
				YearMonth: "F, Y" // in jQuery UI Datepicker: "MMMM, yyyy"
			},
			reformatAfterEdit : false
		},
		baseLinkUrl: '',
		showAction: '',
		target: '',
		checkbox : {disabled:true},
		idName : 'id'
	}
});
})(jQuery);