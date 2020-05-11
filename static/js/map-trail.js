//换个有设备的地图试一试
/**
 * 地图服务脚本，定义了地图展示的基础元素。
 * 作者：Vincent
 * 版本：1.0
 */
var point;
/**
 * 定义全局变量
 */
var map;//地图
var layers;//图层
var controls;//控件
var interactions;//交互
var view;//视图
var center;//初始化视图中心坐标
var projection;//投影
var opts;//视图基本属性
var types;//图例资源

var craneLayer;//门机图层
var shipLoaderLayer;//装船机图层
var shipUnloaderLayer;//卸船机图层

var craneSource;//门机矢量数据
var shipLoaderSource;//装船机矢量数据
var shipUnloaderSource;//卸船机矢量数据

var equipOverlay;//设备信息覆盖

types = [
    {icon:"crane-layer.png", text:"门机",multiple:true,drag:false},
    {icon:"shipLoader-layer.png", text:"装船机",multiple:true,drag:false},
    {icon:"shipUnloader-layer.png", text:"卸船机",multiple:true,drag:false}
];

/**
 *初始化地图，需要定义几个必要属性。
 * @param id：页面中存储地图的元素的id属性值
 */
function initMap(id){

     // 1.1 设置view中心坐标
     center = [13384524.94713286, 4304715.549556213];
     // 1.2 设置view分辨率：默认的投影是球形Mercator(EPSG:4326)
     projection = ol.proj.get("EPSG:3857");// 卫星投影
     // 1.3 view基本属性
     opts = {
         initZoom: 15,//初始缩放级别
         maxZoom: 18,//最大缩放级别
         minZoom: 0,//最小缩放级别
         duration: 1000,//动画间隔
         rotation :0//旋转
    };

    /**
     * 1. 创建二维视图，一定需要明确中心位置center以及投影（分辨率）projection，还有初始缩放级别zoom
     * 可能需要一些属性设置opts
     */
    // center = transProOnSatellite(center);
    view = new ol.View({
        center: center,
        projection: projection,
        zoom: opts.initZoom,
        maxZoom: opts.maxZoom,
        minZoom: opts.minZoom,
        rotation: opts.rotation
    });

    //2.1 创建基础图层：底图
    layers = createTileLayerFactory();

    //2.2 创建地图控件：比例尺
    controls = ol.control.defaults({
        attribution: false
    }).extend([
        new ol.control.ScaleLine()
    ]);

    //2.3 创建地图交互
    interactions = ol.interaction.defaults({
        //设置地图旋转
        pinchRotate: false,
         //设置鼠标双击缩放
         doubleClickZoom: false
    });

     // 创建门机图层，处理数据填充到地图图层中。
     craneSource = new ol.source.Vector();
     var craneTitle = managerLayer(types[0].icon, types[0].text);
     craneLayer = createVectorLayerFactory(craneSource, craneTitle);
     craneLayer.set("layerType", "craneLayer");
     layers.push(craneLayer);

    // 创建装船机图层，处理数据填充到地图图层中。
    shipLoaderSource = new ol.source.Vector();
    var shipLoaderTitle = managerLayer(types[1].icon, types[1].text);
    shipLoaderLayer = createVectorLayerFactory(shipLoaderSource, shipLoaderTitle);
    shipLoaderLayer.set("layerType", "shipLoaderLayer");
    layers.push(shipLoaderLayer);

    // 创建卸船机图层，处理数据填充到地图图层中。
    shipUnloaderSource = new ol.source.Vector();
    var shipUnloaderTitle = managerLayer(types[2].icon, types[2].text);
    shipUnloaderLayer = createVectorLayerFactory(shipUnloaderSource, shipUnloaderTitle);
    shipUnloaderLayer.set("layerType", "shipUnloaderLayer");
    layers.push(shipUnloaderLayer);

    /**
     * 2. 创建地图，一定需要一个二维视图view，N个图层layers，一个存储map的容器target；
     * 可能需要N个地图控件controls，是否使用logo？
     */
    map = new ol.Map({
        controls: controls,
        interactions: interactions,
        layers: layers,
        view: view,
        target: id,
        logo: false
    });

    // 添加地图控件，切换图层
    var layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: '切换图层'
    });
    map.addControl(layerSwitcher);

     // 添加地图交互，鼠标移动
     var pointerMove = new ol.interaction.Select({
        condition: ol.events.condition.pointerMove
     });

     map.addInteraction(pointerMove);
    // 如果鼠标选择到元素，显示设备信息；否则，关闭窗口。
    pointerMove.on('select', function(e){
        if(e.selected.length > 0){
            equipSelect(e);
        }else if(e.deselected.length > 0){
            closeInfo();
        }
    });

    
    // 地图初始化时只显示卫星相关图层
    for(var x=0; x<layers.length; x++){
        // 判断图层类型，控制图层显隐
        if(layers[x] instanceof ol.layer.Tile && layers[x].get("layerType").indexOf("terrain") != -1){
            layers[x].setVisible(false);
        }
    }
}


/**
 * 显示设备信息
 * @param e：被选择的元素
 */
function equipSelect(e){
    var data = e.selected[0];
    // var id = data.get("oid");
    // alert(id)
    var coordinate = e.selected[0].getGeometry().getCoordinates();
    // equipOverlay.setPosition(coordinate);
    $("#equip-popup").show();
    $("#popup-form  #name").html(data.get("name"));
    $("#popup-form #oid").html("设备编码:<span>"+data.get("oid")+"</span>");
    if(data.get("monState") != undefined && data.get("monState") != ""){
        $("#popup-form  #monState").css("display","block");
        $("#popup-form  #stState").empty();
        $("#popup-form  #monState").html("振动状态:<span>"+data.get("monState")+"</span>");
        if(data.get("monState") != "正常"){
            $("#popup-form  #monState span").addClass("unusual");
        }else{
            $("#popup-form  #monState span").removeClass("unusual");
        }
    }else{
        $("#popup-form  #monState").css("display","none");
    };

    if(data.get("stState") != undefined && data.get("stState") != ""){
        $("#popup-form  #stState").css("display","block");
        $("#popup-form  #monState").empty();        
        $("#popup-form  #stState").html("应力状态:<span>"+data.get("stState")+"</span>");
        if(data.get("stState") != "正常"){
            $("#popup-form  #stState span").addClass("unusual");
        }else{
            $("#popup-form  #stState span").removeClass("unusual");
        }
    
    }else{
        $("#popup-form  #stState").css("display","none");
    }
    // return id;
}
/**
 * 关闭设备信息窗口
 */
function closeInfo(){
    setTimeout(function(){
        $("#equip-popup").hide();
    },5000);
}
function timerCloseAlertBox(){
    $("#equip-popup").hide();
}


/**
 *  给view绑定propertychange事件，一定缩放比例下改变设备标注样式
 */
function onPropertychange(view, layers) {

    view.on("propertychange", function propertyChangeHandler(event) {
        if (event.key == "resolution") {
            var zoom = view.getZoom();

            var flag = zoom >= 17;
            if(flag){
                for(var x=0; x<layers.length; x++){
                    // 只改变设备图层样式
                    if(layers[x] instanceof ol.layer.Vector){
                        var tempFeatures = layers[x].getSource().getFeatures();
                        for(var y=0; y<tempFeatures.length; y++){
                            var tempText = tempFeatures[y].getStyle().getText();
                            tempText.setFont('16px Microsoft YaHei');
                            tempText.setFill(new ol.style.Fill({
                                color: '#fdfbff'
                            }));
                        }
                    }
                }
            }else{
                for(var x=0; x<layers.length; x++){
                    // 只改变设备图层样式
                    if(layers[x] instanceof ol.layer.Vector){
                        var tempFeatures = layers[x].getSource().getFeatures();
                        for(var y=0; y<tempFeatures.length; y++){
                            var tempText = tempFeatures[y].getStyle().getText();
                            tempText.setFont('12px Microsoft YaHei');
                            tempText.setFill(new ol.style.Fill({
                                color: '#020101'
                            }));
                        }
                    }
                }
            }
        }
    });

}

/**
 *  初始化图例
 */
function initImgEg(){
    $.each(types,function(k,s){
        $(".img-eg ul").append("<li data-multiple="+s.multiple+" data-drag="+s.drag+"><img src=static/assets/icon/"+s.icon+"><span>"+s.text+"</span><input type='hidden'></li>");
    })
}


/**
 * 初始化工具栏
 * @param toolBar：存储工具栏的元素
 */
function initToolBar(toolBar){
    toolShowOrHidden();
}

/**
 * 设置所有导航栏的显隐
 */
function toolShowOrHidden(){
    // 图例的显示隐藏
    $(".img-ishow").click(function(){
        $(".img-eg").toggle();
    });
    $("#equip-popup").hide();
}

/**
 *  初始化弹窗
 */
function initOverlay() {
    // 弹窗事件绑定元素
    var equipContainer = document.getElementById('equip-popup');

    // 设备信息弹窗
    equipOverlay = new ol.Overlay(({
        element: equipContainer,
        autoPan: false
    }));

    map.addOverlay(equipOverlay);
}



/**
 * 页面加载完毕后需要执行的函数
 */

function initMapJs(base_URL) {
    

    // 初始化地图
    initMap("map");

    // 初始化三种设备的矢量数据
	initSourceData('1', craneSource, base_URL);
	initSourceData('2', shipLoaderSource,base_URL);
	initSourceData('3', shipUnloaderSource,base_URL);


    // 如果图层数量超过3个，启动不同分辨率显示不同图层样式
    if (layers.length > 3) {
        onPropertychange(view, layers);
    }

    // 初始化图例
    initImgEg();

    // 初始化工具栏
    initToolBar("tool-bar");

    // 初始化设备信息弹窗
    initOverlay();


};


//完成的
// /* 定义全局变量*/
// var map;//地图
// var point;
// /* 基本地图显示模块*/
// function loadMap(){
//     var maxZoom = 18, minZoom = 12, initZoom = 16;
//     var projection1 = ol.proj.get("EPSG:3857");
//     //底图图层
//     var baseLayer = new ol.layer.Tile({
//         source: new ol.source.XYZ({
//             projection: projection1,
//             url: "http://t4.tianditu.com/DataServer?T=img_w&X={x}&Y={y}&L={z}"
//         }),
//         opacity: 0.8
//     });
//     //文字图层
//     var wordLayer = new ol.layer.Tile({
//         source: new ol.source.XYZ({
//             projection: projection1,
//             url: "http://t4.tianditu.com/DataServer?T=cia_w&X={x}&Y={y}&L={z}"
//         }),
//         opacity: 1
//     });
//     //比例尺
//     var controls = ol.control.defaults().extend([
//         new ol.control.ScaleLine()
//     ]);
//     //视图
//     var center = [13383356.893794376, 4304427.037708736];
//     var view = new ol.View({
//         center: center, //必需
//         projection: projection1, //必需
//         zoom: initZoom,
//         minZoom: minZoom,
//         maxZoom: maxZoom
//     });
//     //创建地图对象
//         map = new ol.Map({
//         controls: controls,
//         view: view,
//         layers: [baseLayer, wordLayer],
//         target: 'map',
//         logo: false
//     });
// }
//=================================
//  公共方法
//=================================
/**
 * 显示执行结果
 * @param result
 * @param cover-是否覆盖原内容
 */
function displayResult(result, cover){
	point = result;
    var resultContain = $("#coord");
    if((typeof cover)=="boolean" && cover){
        resultContain.html("<p>" + result + "</p>");
    }else{
        resultContain.prepend("<p>" + result + "</p>");
    }
}
/* 为要素创建wkt字符串  @param feature*/
function createWktFromFeature(feature){
    var format = new ol.format.WKT();
    var wkt = format.writeFeature(feature);
    return wkt;
}
/* 获取地图中心点*/
var centerListener;
function getMapCenter(){
    var center = view.getCenter();
    var zoom = view.getZoom();
    var resolution = view.getResolution();
    var projection = view.getProjection().getCode();

    var info = "";
    info += "<p>中心点：<br/><span style='color: #0051ff;'>" + center + "</span></p>";
    info += "<p>缩放等级：<br/><span style='color: #0051ff;'>" + zoom + "</span></p>";
    info += "<p>分辨率：<br/><span style='color: #0051ff;'>" + resolution + "</span></p>";
    info += "<p>投影坐标系：<br/><span style='color: #0051ff;'>" + projection + "</span></p>";
    displayResult(info, true);
    //绑定视图变化事件
    centerListener = map.on("moveend", function(){
        console.log("视图变化了");
        var center = view.getCenter();
        var zoom = view.getZoom();
        var resolution = view.getResolution();
        var projection = view.getProjection().getCode();
        var info = "";
        info += "<p>中心点：<br/><span style='color: #0051ff;'>" + center + "</span></p>";
        info += "<p>缩放等级：<br/><span style='color: #0051ff;'>" + zoom + "</span></p>";
        info += "<p>分辨率：<br/><span style='color: #0051ff;'>" + resolution + "</span></p>";
        info += "<p>投影坐标系：<br/><span style='color: #0051ff;'>" + projection + "</span></p>";
        displayResult(info, true);
    });
}
/* 解绑视图变化事件*/
function unbindGetMapCenter(){
    if(centerListener != undefined){
        map.unByKey(centerListener);
    }
}
/* 地图轨迹模块*/
//轨迹图层数据源
var trailSource = new ol.source.Vector();
//轨迹图层
var trailLayer = new ol.layer.Vector({
    source: trailSource,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    })
});
// map.addLayer(trailLayer);
/**
 * 添加绘制控件
 */
var draw;
function addDrawInteraction(){
    draw = new ol.interaction.Draw({
        source: trailSource,
        type: "Point"  //Point、LineString、Polygon
    });
    //绑定绘制相关事件
    draw.on("drawstart", function(evt){
    });
    draw.on("drawend", function(evt){
        var wkt = createWktFromFeature(evt.feature);
        displayResult(wkt, false);
    });
    map.addInteraction(draw);
}
/* 选择坐标点*/
function choosePoint(){
	if(point != null){
		var points = splitPoint(point);
		
		var x = parent.document.getElementById('pointX');
		var y = parent.document.getElementById('pointY');
		
		$('#pointX').val(points[0]);
		$('#pointY').val(points[1]);
		console.info(points);
	}
}
/*拆分坐標字符串 * @param {Object} point */
function splitPoint(point){
	var points = point.split(" ");
	var pointX = points[0];
	var pointY = points[1];
	pointX = pointX.substring(6);
	pointY = pointY.substring(0, pointY.length - 1);
	return [pointX, pointY];
}
/*清除结果*/
function clearResult(){
    var resultContain = $("#coord");
    resultContain.empty();
}
/* 移除交互控件并清除绘制结果*/
function removeDrawInteraction(){
    map.removeInteraction(draw);
    trailSource.clear();
}

export{
    loadMap,
    unbindGetMapCenter,
    addDrawInteraction,
    removeDrawInteraction,
    initMapJs
}