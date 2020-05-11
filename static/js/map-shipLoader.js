/**
 * 加载装船机矢量数据
 */
// $().ready(function(){

//     // 1.判断地图是否初始化完毕，再执行装船机图层数据初始化
//     var map = $("#map");
//     if(map.data("init") == true){
//         initShipLoader();
//     }

    // 2.获取后台装船机要素数据，并填充到装船机source中
    function initShipLoaderJs(){

        var data = {
            oid: 200001,
            type: "shipLoader",
            name: "装船机一号",
            geom: 'POINT(13382478.465133378 4303768.962668343)'
        };

        var shipLoaderFeature = wh.transFeatureFromWKT(data.geom);
        shipLoaderFeature.set("oid", data.oid);
        shipLoaderFeature.set("type", data.type);
        shipLoaderFeature.setId(data.oid);
        shipLoaderFeature.setStyle(wh.createFeatureStyleFactory(data.name, data.type));

        wh.shipLoaderSource.addFeature(shipLoaderFeature);
    }

// });

export { initShipLoaderJs };