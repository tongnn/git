/**
 * 加载卸船机矢量数据
 */
// $().ready(function(){

//     // 1.判断地图是否初始化完毕，再执行卸船机图层数据初始化
//     var map = $("#map");
//     if(map.data("init") == true){
//         initShipUnloader();
//     }

    // 2.获取后台卸船机要素数据，并填充到卸船机source中
    function initShipUnloaderJs(){

        var data = {
            oid: 300001,
            type: "shipUnloader",
            name: "卸船机一号",
            geom: 'POINT(13383521.113972332 4304582.897586726)'
        };

        var shipUnloaderFeature = wh.transFeatureFromWKT(data.geom);
        shipUnloaderFeature.set("oid", data.oid);
        shipUnloaderFeature.set("type", data.type);
        shipUnloaderFeature.setId(data.oid);
        shipUnloaderFeature.setStyle(wh.createFeatureStyleFactory(data.name, data.type));

        wh.shipUnloaderSource.addFeature(shipUnloaderFeature);
    }

// });

export {initShipUnloaderJs};