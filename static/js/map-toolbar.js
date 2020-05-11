/**
 * 处理工具栏功能
 */
var tempSource;//所有的source
var tempFeatures;//所有的feature


/**
 * 关键字查询设备信息
 */
function queryEquip(view,layers,isTips){
    var equipKey = $("#equipKey").val();
    var equipType = $("#equipType").val();

    var equips = [];

    if(equipKey == "" && isTips){
        layer.info("请输入查询关键字");
    }else{
        queryEquipsByKey(equipType, equipKey, equips,layers);
        if(equips.length == 0 && isTips){
            layer.info("未查询到相关设备");
        }else{
            console.info(equips);
            view.setZoom(17);
        }

    }
    return equips;
}

/**
 * 处理关键字查询设备，加入设备数组
 * @param equipType：设备类型
 * @param equipKey：关键字
 * @param equips：存储设备信息的数组
 */
function queryEquipsByKey(equipType, equipKey, equips,layers) {
    for (var x = 0; x < layers.length; x++) {
        var visible = layers[x].getVisible();
        // console.log(visible)
        if (layers[x] instanceof ol.layer.Vector && visible == true) {
            tempSource =  layers[x].getSource();
            tempFeatures = tempSource.getFeatures();
            for (var y = 0; y < tempFeatures.length; y++) {
                var tempOid = tempFeatures[y].get("oid");                
                var tempType = tempFeatures[y].get("type");
                var tempName = tempFeatures[y].get("name");
              
                // if(equipType =="全部" && tempName.indexOf(equipKey) != -1){
                //     var equip = {
                //         oid: tempFeatures[y].get("oid"),
                //         name: tempFeatures[y].get("name"),
                //         type: tempFeatures[y].get("type"),
                //         vbState:tempFeatures[y].get("vbState"),
                //         stState:tempFeatures[y].get("stState"),
                //         fiState:tempFeatures[y].get("fiState"),
                //         monType:tempFeatures[y].get("monitorType")
                //     };
                    
                //     equips.push(equip);
                // }else 
                if (equipType !="全部" && tempType == equipType && tempName.indexOf(equipKey) != -1) {
                    var equip = {
                        oid: tempFeatures[y].get("oid"),
                        name: tempFeatures[y].get("name"),
                        type: tempFeatures[y].get("type"),
                        strain:tempFeatures[y].get("strain"),
                        vib:tempFeatures[y].get("vib"),
                        fire:tempFeatures[y].get("fire"),
                        monType:tempFeatures[y].get("monitorType")
                    };
                    
                    equips.push(equip);
                }else if(tempType != equipType || tempName.indexOf(equipKey) == -1) {
                    tempSource.removeFeature(tempFeatures[y]);
                    // tempSource.setstyle(null);
                }
                
            }
        }
    }
}

/**
 * 显示查询的设备
 */
function flyToEquip(oid,map,layers,view){
    var oid = oid;//todo
    var center;
    var duration = 2000;

    // 从三种设备矢量数据中获取要素，解析坐标作为定位中心坐标
    for(var x=0; x<layers.length; x++){
        if(layers[x] instanceof ol.layer.Vector){
            var tempFeatures = layers[x].getSource().getFeatures();
            for(var y=0; y<tempFeatures.length; y++){
                if(tempFeatures[y].get("oid") == oid){
                    center = tempFeatures[y].getGeometry().getCoordinates();
                    var tempText = tempFeatures[y].getStyle().getText();
                    var tempImage = tempFeatures[y].getStyle().getImage().getSrc();
                    // console.log(tempImage);
                    // tempImage.setSrc('static/assets/icon/temp.png');
                
                }
            }
        }
    }

    // 更新视图中心时生成过渡动画
    var pan = ol.animation.pan({
        duration: duration,
        source: view.getCenter()
    });
    // 生成一个动画转换，在接近最终值时“反弹”分辨率。
    var bounce = ol.animation.bounce({
        duration: duration,
        resolution: 2 * view.getResolution()
    });
    // 更新视图之前要执行的动画
    map.beforeRender(pan, bounce);
    view.setCenter(center);
}

/**
 * 地图复位，回到初始化状态
 */
function reset(view){
    view.setCenter([ 13383474.062391015, 4304523.429979865]);
    view.setZoom(16);
}

/**
 * 切换到卫星相关图层
 */
function switchSatellite(layers){
    for(var x=0; x<layers.length; x++){
        // 判断图层类型，显示卫星图层
        if(layers[x] instanceof ol.layer.Tile && layers[x].get("layerType").indexOf("satellite") != -1){
            layers[x].setVisible(true);
        }
        // 判断图层类型，隐藏地形图层
        if(layers[x] instanceof ol.layer.Tile && layers[x].get("layerType").indexOf("terrain") != -1){
            layers[x].setVisible(false);
        }
    }
}

/**
 * 切换到地形相关图层
 */
function switchTerrain(layers){
    for(var x=0; x<layers.length; x++){
        // 判断图层类型，显示地形图层
        if(layers[x] instanceof ol.layer.Tile && layers[x].get("layerType").indexOf("terrain") != -1){
            layers[x].setVisible(true);
        }
        // 判断图层类型，隐藏卫星图层
        if(layers[x] instanceof ol.layer.Tile && layers[x].get("layerType").indexOf("satellite") != -1){
            layers[x].setVisible(false);
        }
    }
}

/**
 * 查询设备详情
 */
function queryEquipInfo(oid,base_URL){
	var oid = $("#equip-popup #oid").html();
	var url = base_URL + "/equip.htm";
	// var url = "http://172.16.72.80:8084/equip.htm";
	var example = {
		param_act: 'selectEquipInfoByECode',
		equipcode: oid
	};
	
	$.post(url, example, function(data){
        data = JSON.parse(data);
        console.log(data)
		return data;
	})
}


export {
    queryEquip,
    queryEquipsByKey,
    flyToEquip,
    reset,
    switchSatellite,
    switchTerrain,
    queryEquipInfo


}