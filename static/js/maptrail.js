/* 定义全局变量 */
var map;//地图
var center;
var projection1;
var maxZoom;
var minZoom;
var initZoom;
var view;
var controls ;
var trailSource;
var trailLayer;
var point;
var draw;
var layers;
// 
/**
 * 基本地图显示模块
 */


function createTileLayerFactory() {

    // 底图资源
    // var egs = [
    //     {icon:"wx-layer.png", text:"卫星图层"},
    //     {icon:"bz-layer.png", text:"标注图层"},
    //     {icon:"dx-layer.png", text:"地形图层"}
    // ];

    // var wx_title = managerLayer(egs[0].icon, egs[0].text);//卫星图层样式
    // var bz_title = managerLayer(egs[1].icon, egs[1].text);//标注图层样式
    // var dx_title = managerLayer(egs[2].icon, egs[2].text);//地形图层样式

    // var wx_url = "http://172.16.72.22:8080/tile/t/{z}/{y}/{x}"; //卫星服务地址
    var wx_url = "http://10.6.6.249:8086/tile/t/{z}/{y}/{x}";//卫星服务地址
    var wx_bz_url = "http://t4.tianditu.com/DataServer?T=cia_w&X={x}&Y={y}&L={z}"; //卫星标注服务地址

    var dx_url = "http://t4.tianditu.com/DataServer?T=vec_c&x={x}&y={y}&l={z}"; //地形服务地址
    var dx_bz_url = "http://t4.tianditu.com/DataServer?T=cva_c&x={x}&y={y}&l={z}"; //地形标注服务地址

    var satellite = createTile(ol.proj.get("EPSG:4326"), wx_url, 0.8); //卫星图层
    satellite.set("layerType", "satellite");
    var satellite_label = createTile(ol.proj.get("EPSG:3857"), wx_bz_url, 1); //卫星标注图层
    satellite_label.set("layerType", "satellite_label");

    var terrain = createTile(ol.proj.get("EPSG:4326"), dx_url, 0.8); //地形图层
    terrain.set("layerType", "terrain");
    var terrain_label = createTile(ol.proj.get("EPSG:4326"), dx_bz_url, 1); //地形标注图层
    terrain_label.set("layerType", "terrain_label");

    return [satellite];
}


//底图图层
// var baseLayer = new ol.layer.Tile({
//     source: new ol.source.XYZ({
//         projection: projection1,
//         url: "http://t4.tianditu.com/DataServer?T=img_w&X={x}&Y={y}&L={z}",
//         // url:"http://172.16.72.92:8080/tile/t/{z}/{y}/{x}"
//     }),
//     opacity: 0.8
// });
//文字图层
// var wordLayer = new ol.layer.Tile({
//     source: new ol.source.XYZ({
//         projection: projection1,
//         url: "http://t4.tianditu.com/DataServer?T=cia_w&X={x}&Y={y}&L={z}"
//     }),
//     opacity: 1
// });

//初始化地图
function initMap(){

    //视图
    center = [13383356.893794376, 4304427.037708736]; //原来的
    projection1= ol.proj.get("EPSG:3857");
     maxZoom= 18; minZoom = 16; initZoom = 16;// opts=[]
    view= new ol.View({
        center: center, //必需
        projection: projection1, //必需
        zoom: initZoom,
        minZoom: minZoom,
        maxZoom: maxZoom,
        extent:[13381964.306685304,4303175.381370567,13386282.998783415,4306486.060158169]
    });
    layers= createTileLayerFactory();
    //比例尺
    controls= ol.control.defaults().extend([
        new ol.control.ScaleLine()
    ]);
    //创建门机图层，创建堆取料机图层，创建卸船机图层，处理数据填充到地图图层中，
    
    
    //轨迹图层数据源
     trailSource= new ol.source.Vector();
    //轨迹图层
     trailLayer= new ol.layer.Vector({
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
    //
    //创建地图对象
    map = new ol.Map({
        controls: controls,
        view: view,
        // layers: [baseLayer, wordLayer],
        layers:layers,
        target: 'map',
        logo: false
    });
}

// 初始化地图
function initMapJs(base_URL) {
    initMap("map");
};

//=================================
//  公共方法
//=================================
/**
 * 为要素创建wkt字符串
 * @param feature
 */
function createWktFromFeature(feature){  
    var format = new ol.format.WKT();
    var wkt = format.writeFeature(feature);
    return wkt;
}
/* 移除交互控件并清除绘制结果*/
function removeDrawInteraction(){
    map.removeInteraction(draw);
    trailSource.clear();
}
/**
 * 获取地图中心点
 */
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
/**
 * 添加绘制控件
 */

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
    map.addLayer(trailLayer);
}
/**
 * 解绑视图变化事件
 */
function unbindGetMapCenter(){  
    if(centerListener != undefined){
        map.unByKey(centerListener);
    }
}

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
//

/**
 * 清除结果
 */
function clearResult(){
    var resultContain = $("#coord");
    resultContain.empty();
}


export{
    clearResult,addDrawInteraction,createWktFromFeature,getMapCenter,unbindGetMapCenter,initMapJs,removeDrawInteraction
}