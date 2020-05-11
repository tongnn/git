/**
 * 加载门机矢量数据
 */
//$().ready(function(){

    // 1.判断地图是否初始化完毕，再执行门机图层数据初始化
    // var map = $("#map");
    // if(map.data("init") == true){
    //     initCrane();
    // }
    // import { transFeatureFromWKT，createFeatureStyleFactory } from 'static/js/map-factory'

    // 2.获取后台门机要素数据，并填充到门机source中
    function initCraneJs(){

        var data = [
            {
                oid: 100001,
                type: "crane",
                name: "门机一号",
                geom: 'POINT(13384259.20902671 4304536.318772613)'
            },
            {
                oid: 100002,
                type: "crane",
                name: "门机二号",
                geom: 'POINT(13384328.480083594 4304511.83503699)'
            }
        ];


        // for(var x=0; x<data.length; x++){
        //     var craneFeature = transFeatureFromWKT(data[x].geom);
        //     craneFeature.set("oid", data[x].oid);
        //     craneFeature.set("name", data[x].name);
        //     craneFeature.set("type", data[x].type);
        //     craneFeature.setId(data[x].oid);
        //     craneFeature.setStyle(createFeatureStyleFactory(data[x].name, data[x].type));
        //     craneSource.addFeature(craneFeature);
        // }
        var craneFeature = wh.transFeatureFromWKT(data.geom);
        craneFeature.set("oid", data.oid);
        craneFeature.set("type", data.type);
        craneFeature.setId(data.oid);
        craneFeature.setStyle(wh.createFeatureStyleFactory(data.name, data.type));

        wh.craneSource.addFeature(craneFeature);
    }

//});

export { initCraneJs };
