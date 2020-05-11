
/**
 * 初始化消防监测展示
 */
function initFire(equipData, bgColorCode,bgImage){
	
	// var data = [
	// 	{
	// 		type: "01",
	// 		status: "1",
	// 		x: 50,
	// 		y: 50
	// 	},
	// 	{
	// 		type: "smoke",
	// 		status: "warning",
	// 		x: 50,
	// 		y: 250
	// 	},
	// 	{
	// 		type: "water",
	// 		status: "normal",
	// 		x: 350,
	// 		y: 250	
	// 	},
	// 	{
	// 		type: "water",
	// 		status: "warning",
	// 		x: 350,
	// 		y: 50			
	// 	},
	// 	{
	// 		type: "water",
	// 		status: "normal",
	// 		x: 350,
	// 		y: 150			
	// 	}
	// ];
	
	//1. 初始化监测房间背景图
	// var imgPath = "static/assets/icon/room-background.png";// todo 获取服务器地址的背景图
	// var imgPath = "E:/workspace/QDQG_1/WebContent/upload/pic/" + bgImage;
	var imgPath = '/upload/pic/'+bgImage;
	$("#room-background").attr("src", imgPath);
	
	//2. 初始化设备样式图标
	for(var i=0; i<equipData.length; i++){
		// 创建设备元素
		createEquipDom(equipData[i]);
	}

	// 3.初始化背景颜色
    createBacgroundColor(bgColorCode);
}


 	/**
       * 创建背景颜色
       */
      function createBacgroundColor(bgColorCode){
		var bgColors = {
			"1": "black",
			"2": "white",
			"3": "gray",
			"4": "skyblue"
		};

		var bgColor = bgColors[bgColorCode];
		$(".form_head_main").css("background-color",bgColor)
		
	}

/**
 * 创建设备元素
 * @param {Object} data
 */
function createEquipDom(equipData){
	
	var roomDiv = document.getElementById("fire-control-room");
	// if(equipImg && equipDiv){
	// 	equipDiv.removeChild(equipImg);
	// 	roomDiv.removeChild(equipDiv); 
	// }else{
		// 创建存储设备div，确定位置
		var equipDiv = document.createElement("div");
		equipDiv.style.width = "50px";
		equipDiv.style.height = "50px";
		equipDiv.style.position = "absolute";
		equipDiv.style.bottom = equipData.y;
		equipDiv.style.left = equipData.x;
		// equipDiv.style.zoom = "100%";
		equipDiv.className = "equipDiv";

		// 创建显示样式img，根据类型和状态确定图标
		var equipImg = document.createElement("img");
		var imgPath = createEquipIcon(equipData.type, equipData.state,equipData.Quality);
		equipImg.src = "static/assets/icon/" + imgPath;
		equipImg.style.width = "100%";
		equipImg.style.height = "100%";

		//创建提示设备状态的字样
		var equipTips = document.createElement("p");
		equipTips.style.width = "50px";
		equipTips.style.height = "20px";
		equipTips.style.marginTop = "20px";
		equipTips.style.color = "red";
		equipTips.style.fontSize = "12px";
		equipTips.style.textAlign = "center";
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
		equipTips.className = "equipTips";
		equipTips.innerHTML = createtips(equipData.remark);
		
		equipDiv.appendChild(equipImg);
		equipDiv.appendChild(equipTips);
		roomDiv.appendChild(equipDiv);


	
}

/**
 * 根据设备类型和状态确定显示的图标
 * @param {Object} data
 */
function createEquipIcon(type, state,Quality){
	if(Quality == "OPC_QUALITY_GOOD"){
		// var status = state.substr(0, state.indexOf('(')); 
		var status = state; 
		// alert(status)
		var typeStatus = type + "-" + status;
		// var type = type;
		var icons = {
			"02-0" : "temp.png",
			"03-0" : "smoke.png",
			"25-0" : "famen.png",
			"29-0" : "open.png",
			"02-1" : "temp-fire.gif",
			"02-4" : "temp-bug2.gif",
			"02-5" : "temp-open.gif",
			"02-6" : "temp-stop.gif",
			"03-1" : "smoke-fire.gif",
			"03-4" : "smoke-bug2.gif",
			"03-5" : "smoke-open.gif",
			"03-6" : "smoke-stop.gif",
			"25-9" : "mute.gif",
			"25-11" : "reset.gif",
			"29-9" : "mute.gif",
			"29-11" : "reset.gif"
	}
	}else if(Quality == "OPC_QUALITY_NOT_CONNECTED"){
		var typeStatus = type + "-" + 100;
		var icons = {
			"02-100": "break-off.png",
			"03-100": "break-off.png",
			"25-100": "break-off1.png",
			"29-100": "break-off1.png",
		}
	}
	return icons[typeStatus];
}

/**
 * 根据设备状态确定提示字样
 * @param {Object} data
 */

 function createtips(remark){
	 var tips = remark;
	 return tips;
 }

/**
 * 页面加载完毕后需要执行的函数
 */
export function initFireJs(equipData, bgColorCode,bgImage) {

    // 初始化消防监测展示
    initFire(equipData, bgColorCode,bgImage);
};