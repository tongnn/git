/**
 * 创建底图图层
 * @returns {*[]}
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

    var wx_url = "http://172.16.72.159:8080/tile/t/{z}/{y}/{x}"; //卫星服务地址
    // var wx_url = "http://10.6.6.249:8086/tile/t/{z}/{y}/{x}";//卫星服务地址
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

/**
 * 创建设备图层
 * @param source：矢量数据
 * @param title：图层控制样式
 * @returns {ol.layer.Vector}
 */
function createVectorLayerFactory(source, title) {
    return new ol.layer.Vector({
        source: source,
        title: title
    });
}

/**
 * 创建图层样式
 * @param icon：展示图标
 * @param text：文字描述
 */
function managerLayer(icon, text) {
    // return "<img src=static/assets/icon/" + icon + "><span>"+text+"</span>"
    return "<img src=static/assets/icon/" + icon + "><span>" + text + "</span>"
}

/**
 * 创建底图瓦片
 * @param projection：投影
 * @param url：瓦片地址
 * @param opacity：图层透明度，默认是1
 * @returns {ol.layer.Tile}
 */
function createTile(projection, url, opacity) {
    return new ol.layer.Tile({
        source: new ol.source.XYZ({
            projection: projection,
            url: url
        }),
        opacity: opacity
    });
}

/**
 * 初始化矢量数据
 * @param {Object} equiptype：设备类型
 * @param {Object} source：矢量数据
 */


function initSourceData(view, type, source, base_URL) {
    view.setZoom(16);
    // var base_URL =process.env.BASE_API; 
    var url = base_URL + "/equip.htm";
    // var url ="http:172.16.72.250:8085/equip.htm";

    var example = {
        param_act: 'selectEquips',
        major: type
    };

    $.get(url, example, function(dat) {
        arr = JSON.parse(dat);
        // console.log(arr)
        // 清除所有source
        source.clear();
        // debugger
        // var childSys = arr.childSystem;

        for (var x = 0; x < arr.length; x++) {

            var feature = transFeatureFromWKT(arr[x].COORDINATE);
            if (feature) {
                feature.set("oid", arr[x].EQ_CODE);
                feature.set("name", arr[x].EQ_NAME);
                feature.set("type", arr[x].EQ_MAJOR);
                feature.set("strain", arr[x].st);
                feature.set("vib", arr[x].vb);
                feature.set("fire", arr[x].fi);
                feature.set("monitorType", arr[x].MONITOR_TYPE);
                feature.setId(arr[x].ID);
                feature.setStyle(createFeatureStyleFactory(arr[x].EQ_MAJOR));
                source.addFeature(feature);
            }
        }
        // for (var i=0; i<childSys.length; i++) {
        //     var feature = transFeatureFromWKT(arr[x].COORDINATE);
        //     feature.set("oid", arr[x].EQ_CODE);
        //     feature.set("name", arr[x].EQ_NAME);
        //     feature.set("type", arr[x].EQ_MAJOR);
        //     feature.set("vbState", arr[x].vbState);
        //     feature.set("monitorType", arr[x].MONITOR_TYPE);
        //     feature.setId(arr[x].ID);
        //     feature.setStyle(createFeatureStyleFactory(arr[x].EQ_MAJOR));
        //     source.addFeature(feature);
        // }

    })
}

/**
 * 从WKT字符串中解析要素
 * @param wktStr:存储坐标的字符串
 * @returns {ol.Feature}
 */
function transFeatureFromWKT(wktStr) {
    var format = new ol.format.WKT();
    var feature = format.readFeature(wktStr);
    return feature;
}

/**
 * 创建设备图层样式
 * @param name：标注
 * @param type：设备类型
 */
function createFeatureStyleFactory(type) {
    return new ol.style.Style({
        // 文字图层
        // text: new ol.style.Text({
        //     text: name,
        //     font: '12px Microsoft YaHei',
        //     offsetY: 25,
        //     fill: new ol.style.Fill({
        //         color: '#020101'
        //     })
        // }),
        // 图标图层
        image: createFeatureIconFactory(type)
    });
}

/**
 * 创建设备图标
 * @param type：设备类型
 */
function createFeatureIconFactory(type) {
    // var type = type + "_" + monitorType;
    var icons = {
        "1": "map_crane.png",
        "2": "map_dui.png",
        "3": "map_loader.png",
    };
    var icon = icons[type];
    return new ol.style.Icon({
        src: "static/assets/icon/" + icon,
        scale: 1
    });
}

// export { 
//     initSourceData,
//     createTileLayerFactory
// };