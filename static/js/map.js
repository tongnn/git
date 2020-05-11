/**
 * 地图服务脚本，定义了地图展示的基础元素。
 * 作者：Vincent
 * 版本：1.0
 */

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
var timer = null;
var timer1 = null;
var base_URL = process.env.BASE_API;
import echarts from 'echarts'
import { setInterval } from 'timers';

types = [
    {icon:"map_crane1.png", text:"门机",multiple:true,drag:false},
    {icon:"map_dui1.png", text:"堆取料机",multiple:true,drag:false},
    {icon:"map_loader1.png", text:"卸船机",multiple:true,drag:false},
];

/**
 *初始化地图，需要定义几个必要属性。
 * @param id：页面中存储地图的元素的id属性值
 */
function initMap(id){

     // 1.1 设置view中心坐标
    //  center = [13384524.94713286, 4304715.549556213];
     center = [ 13383474.062391015, 4304523.429979865];
    
     // 1.2 设置view分辨率：默认的投影是球形Mercator(EPSG:4326)
     projection = ol.proj.get("EPSG:3857");// 卫星投影
     // 1.3 view基本属性
     opts = {
         initZoom: 16,//初始缩放级别
         maxZoom: 18,//最大缩放级别
         minZoom: 16,//最小缩放级别
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
        rotation: opts.rotation,
        extent:[13381964.306685304,4303175.381370567,13386282.998783415,4306486.060158169]
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

    // 创建堆取料机图层，处理数据填充到地图图层中。
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
            $("#equip-detail").hide();
            equipSelect(e);
        }else if(e.deselected.length > 0){
            // closeInfo();
            // clearInterval(timer)
            // clearInterval(timer1);
            // timer = setTimeout(function(){
                // $("#equip-popup").hide();
            // },15000);
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
    
    var vibSys = data.get("vib");
    var stSys = data.get("strain");
    var fiSys = data.get("fire");
    // console.log(stSys);
    var coordinate = e.selected[0].getGeometry().getCoordinates();
    equipOverlay.setPosition(coordinate);
    $("#equip-popup").show();
    $("#popup-form  #name").html(data.get("name"));
    $(".stState").empty();
    $(".monState").empty();
    $(".fiState").empty();
    // $("#popup-form #oid").html("设备编码<span>"+data.get("oid")+"</span>");
    if(stSys != undefined && stSys.length != 0){
        $("#stState").show();
        for(var x in stSys){
            // createEquipDom(vibSys[x]);
            var html1 = '<a href="javascript:void(0)" class="child1'+x+'">'+stSys[x].EQ_NAME+'</a>';
            $(".stState").append(html1);
            $('.child1'+x).on('click', function() {
                // clearInterval(timer1);
                $("#popup-form  #childName").html($(this).text());
                var index = $(this).attr("class");
                var lastIndex = index.substr(index.length-1,1);
                showDetail(stSys[lastIndex].EQ_CODE,stSys[lastIndex].EQ_NAME,stSys[lastIndex].MONITOR_TYPE,stSys[lastIndex].PARENT_CODE);
            });
            $('.child1'+x).on('mouseout', function() {
                hideDetail()
            });
        }
    }else{
        $("#stState").hide();
    };
    if(vibSys != undefined && vibSys.length != 0){
        $("#monState").show();
        for(var j in vibSys){
            // createEquipDom(vibSys[x]);
            var html2 = '<a href="javascript:void(0)" class="child2'+j+'">'+vibSys[j].EQ_NAME+'</a>';
            $(".monState").append(html2);
            $('.child2'+j).on('click', function() {
                // clearInterval(timer1);
                $("#popup-form  #childName").html($(this).text());
                var index = $(this).attr("class");
                var lastIndex = index.substr(index.length-1,1);
                showDetail(vibSys[lastIndex].EQ_CODE,vibSys[lastIndex].EQ_NAME,vibSys[lastIndex].MONITOR_TYPE,vibSys[lastIndex].PARENT_CODE);
            });
            $('.child2'+j).on('mouseout', function() {
                hideDetail()
            });
        }
    }else{
        $("#monState").hide();
    };
    if(fiSys != undefined && fiSys.length != 0){
        $("#fiState").show();
        for(var y in fiSys){
            // createEquipDom(vibSys[x]);
            var html3 = '<a href="javascript:void(0)" class="child3'+y+'">'+fiSys[y].EQ_NAME+'</a>';
            $(".fiState").append(html3);
            $('.child3'+y).on('click', function() {
                // clearInterval(timer1);
                $("#popup-form  #childName").html($(this).text());
                var index = $(this).attr("class");
                var lastIndex = index.substr(index.length-1,1);
                showDetail(fiSys[lastIndex].EQ_CODE,fiSys[lastIndex].EQ_NAME,fiSys[lastIndex].MONITOR_TYPE,fiSys[lastIndex].PARENT_CODE);
            });
            $('.child3'+y).on('mouseout', function() {
                hideDetail()
                
            });
        }
    }else{
        $("#fiState").hide();
    };


    
}
    //显示设备子系统详情
    function showDetail(eqCode,eqName,monType,parentCode){
        $("#equip-detail").show();
        var params = {
            "param_act":"selectAmonutDis",
            // "EQ_CODE":"1000010301",
            // "EQ_NAME":"56#门机下部运行部分",
            // "PARENT_CODE":"100001",
            // "MONITOR_TYPE":"3"
            "EQ_CODE":eqCode,
            "EQ_NAME":eqName,
            "PARENT_CODE":parentCode,
            "MONITOR_TYPE":monType
        }

        $.ajax({
            type:"post",
            data:params,
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            url:base_URL + '/equip.htm?param_act=selectAmonutDis',//历史折线图
            success:function(data){
                var childSys = JSON.parse(data);
                if(childSys.err == '1'){
                    window.location.href='/';
                }
               
                console.log(childSys);
                // // 基于准备好的dom，初始化echarts实例 
                let myChart1 = echarts.init(document.getElementById('myChart1'));
                var dataType = [];
                var zhanShiSshuJu = [];
                if(childSys.type == 1){
                    var a1 = parseInt(childSys.DANGER) + parseInt(childSys.ALARM) + parseInt(childSys.NORMAL) + parseInt(childSys.WARNING);
                    zhanShiSshuJu =[
                        {value:childSys.DANGER, name:'危险'},
                        {value:childSys.ALARM, name:'报警'},
                        {value:childSys.WARNING, name:'预警'},
                        {value:childSys.NORMAL, name:'正常'}
                    ];
                    dataType = ['正常','预警','报警','危险'];
                }else if(childSys.type == 2){
                    var a1 = parseInt(childSys.CTLERASURE) + parseInt(childSys.CTLRESTORATION) + parseInt(childSys.CONNECTSTATE) + parseInt(childSys.FIREALARM)
                             + parseInt(childSys.DEVSTART) + parseInt(childSys.NORMAL) + parseInt(childSys.DEVSTOP) + parseInt(childSys.BREAKDOWN);
                    zhanShiSshuJu =[
                        {value:childSys.FIREALARM, name:'火警'},
                        {value:childSys.BREAKDOWN, name:'故障'},
                        {value:childSys.CONNECTSTATE, name:'中断'},
                        {value:childSys.NORMAL, name:'正常'},
                        // {value:childSys.DEVSTOP, name:'停止'},
                        // {value:childSys.DEVSTART, name:'启动'},
                        // {value:childSys.CTLERASURE, name:'消音'},
                        // {value:childSys.CTLRESTORATION, name:'复位'},
                    ];
                    dataType = ['正常','中断','故障','火警'];
                }
                var total1 ={name:'监测点',value:a1}; 
                // var total1 ={name:'监测点',value:12};
                // var arr = [3,3,3,1];
                myChart1.setOption(
                    {
                    title:[{
                        text: total1.name,
                        left: '29%',
                        top: '40%',
                        textAlign: 'center',
                        textBaseline: 'middle',
                        textStyle: {
                            color: '#C7CEF2',
                        fontWeight: 'normal',
                        fontFamily: '',
                            fontSize: 14
                        }
                    }, {
                        text: total1.value,
                        left: '29%',
                        top: '55%',
                        textAlign: 'center',
                        textBaseline: 'middle',
                        textStyle: {
                            color: '#C7CEF2',
                            fontWeight: 'normal',
                            fontSize: 20
                        }
                    }],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        icon:'rect',
                        orient: 'vertical',//图例排列方向
                        align:"left",//图例标记和文本的对齐,left,right
                        x: 'right',
                        top:'8%',
                        left:'65%',
                        itemGap:20,
                        textStyle:{color:'rgba(199,206,242,1)'},
                        data:dataType, //ddddd
                        formatter: function(name) {
                            if(name === '正常') {
                                return name + "："+childSys.NORMAL;
                                // return name + "："+3;
                            } else if(name === '预警') {
                                return name + "："+childSys.WARNING;
                                // return name + "："+3;
                            }else if(name === '报警') {
                                return name + "："+childSys.ALARM;
                                // return name + "："+3;
                            }else if(name === '危险') {
                                return name + "："+childSys.DANGER;
                                // return name + "："+3;
                            } else if(name === '故障') {
                                return name + "："+childSys.BREAKDOWN;
                                // return name + "："+3;
                            }else if(name === '火警') {
                                return name + "："+childSys.FIREALARM;
                                // return name + "："+3;
                            }else if(name === '中断') {
                                return name + "："+childSys.CONNECTSTATE;
                                // return name + "："+3;
                            }



                        }
                    },
                    color:['#FF2B2B','#FF6C00','#FFDF03','#005AFF'],
                    series: [
                        {
                            name:'状态',
                            type:'pie',
                            radius: ['55%', '70%'],//饼图的大小
                            center: ['30%', '50%'],//饼图的位置 
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: 3,//断裂间距
                                    borderColor:'#161529',
                                },
                                
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:zhanShiSshuJu,
                        }
                    ],
                })
            }
        })
               					
                    
    }
    clearInterval();
    // 隐藏设备子系统详情
    
    function hideDetail(){
        clearTimeout(timer1);
        timer1 = setTimeout(function(){
            $("#equip-popup").hide();
            $("#equip-detail").hide();
        },15000);
    }



/**
 * 关闭设备信息窗口
 */
function closeInfo(){
    setInterval(function(){
        $("#equip-popup").hide();
    },15000);
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
                            // var tempText = tempFeatures[y].getStyle().getText();
                            // tempText.setFont('16px Microsoft YaHei');
                            // tempText.setFill(new ol.style.Fill({
                            //     color: '#fdfbff'
                            // }));
                        }
                    }
                }
            }else{
                for(var x=0; x<layers.length; x++){
                    // 只改变设备图层样式
                    if(layers[x] instanceof ol.layer.Vector){
                        var tempFeatures = layers[x].getSource().getFeatures();
                        for(var y=0; y<tempFeatures.length; y++){
                            // var tempText = tempFeatures[y].getStyle().getText();
                            // tempText.setFont('12px Microsoft YaHei');
                            // tempText.setFill(new ol.style.Fill({
                            //     color: '#020101'
                            // }));
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
        autoPan: false,
        autoPanAnimation: {
            duration: 100
        }
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
	initSourceData(view,'1', craneSource, base_URL);
	initSourceData(view,'2', shipLoaderSource,base_URL);
	initSourceData(view,'3', shipUnloaderSource,base_URL);


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

function getLayers(){
    return layers;
};
function getView(){
    return view;
};

function getMap(){
    return map ;
};
function getCraneSource(){
    return craneSource ;
};
function getShipLoaderSource(){
    return shipLoaderSource ;
};
function getShipUnloaderSource(){
    return shipUnloaderSource ;
};


export { 
    initMapJs,
    getLayers,
    getView,
    timerCloseAlertBox,
    getMap,
    equipSelect,
    getCraneSource,
    getShipLoaderSource,
    getShipUnloaderSource,
    // showDetail
};



