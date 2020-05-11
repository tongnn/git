<template>
    <div style="height:100%;margin: 0;width: 100%">
            <!-- 平面设计模块 -->
        <div class="both-content" id="flat">
            <!-- 侧边栏 -->
            <div class="left-dashboard">
                <!-- 机器类型选择 -->
                <nav class="left-nav">
                    <div class="nav-list">
                        <div class="nav-label">选择机柜或空调</div>
                        <div class="nav-zone">
                            <div class="nav-box">
                                <p class="nav-box-title">机柜</p>
                                <div class="nav-box-machine drag" type="machine">
                                    <img src="../../../static/3D/img/machine.png" class="drag-img" id="drag-machine">
                                </div>
                            </div>
                            <div class="nav-box">
                                <p class="nav-box-title">空调</p>
                                <div class="nav-box-machine drag" type="air">
                                    <img src="../../../static/3D/img/air.png" class="drag-img" id="drag-air">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nav-list">
                        <div class="nav-label">选择设备</div>
                        <div class="equip-box">
                            <div class="equip-title">烟感</div>
                            <div class="equip-moudle drag" type="smoke">
                                <img src="../../../static/3D/img/smoke.png">
                            </div>
                        </div>
                        <div class="equip-box">
                            <div class="equip-title">温感</div>
                            <div class="equip-moudle drag" type="temperature">
                                <img src="../../../static/3D/img/temperature.png">
                            </div>
                        </div>
                        <div class="equip-box">
                            <div class="equip-title">控制器</div>
                            <div class="equip-moudle drag" type="control">
                                <img src="../../../static/3D/img/control.png">
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <!-- 右侧模块 -->
            <div class="right-dashboard1">
                <div class="right-dashboard-top">
                    <!-- 创建电气室 -->
                    <div class="create-axis">
                        <span class="axis-label"> W：</span>
                        <input type="text" id="grid-width" class="coordinate-input">
                        <img class="items-link" src="../../../static/3D/img/link.png">
                        <span class="axis-label"> H：</span>
                        <input type="text" id="grid-length" class="coordinate-input">
                        <button id="create-button" class="create-button">创建网格</button>
                        <button id="submit-button" class="create-button">提交</button>
                        <button id="cancel-button" class="create-button">取消</button>
                    </div>
                </div>
                <div class="right-dashboard-bottom" id="right-dashboard-bottom">
                    <div class="axis-orign"></div>
                    <!-- 标尺 -->
                    <div id="axis-x"></div>
                    <div id="axis-y"></div>
                    <!-- 画布 -->
                    <div class="painting" id="painting"></div>
                </div>
            </div>
        </div>
        <!-- 3D预览模块 -->
        <div id="three-dimensional">
        </div>
        <!-- 2D 3D 切换按钮组 -->
        <div id="fixed-btn">
            <button id="tab1-button" class="tab1-button tab2-style">2D预览</button>
            <button id="tab2-button" class="tab2-button tab1-style">3D预览</button>
        </div>
        <!-- 面板控件 -->
        <div id="fixed-panel">
            <ul>
                <li>
                    <div id="panel-title">选择机柜或空调</div>
                </li>
                <li class="items-li1">
                    <div class="items-title">名称</div>
                </li>
                <li class="items-li2">
                    <div class="items-info">
                        <input id="machineName" class="items-input" type="text" placeholder="请输入名称">
                    </div>
                </li>
                <li class="items-li1">
                    <div class="items-title">位置</div>
                </li>
                <li class="items-li2">
                    <div class="items-info info-axis">
                        <span class="items-axis">X:</span>
                        <input id="machineAxis-x" class="items-input-num" type="text">
                        <img class="items-link" src="../../../static/3D/img/link.png">
                        <span class="items-axis">Y:</span>
                        <input id="machineAxis-y" class="items-input-num" type="text">
                    </div>
                </li>
                <li class="items-li3">
                    <button class="items-btn" id="items-btn">确认</button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import '../../../static/3D/js/d3-threeD.js'
import '../../../static/3D/js/OrbitControls.js'
import '../../../static/3D/js/ThreeBSP.js'
import '../../../static/3D/js/dat.gui.min.js'
import '../../../static/3D/js/utils.1.js'
// 消防脚本
import utils from '../../../static/3D/js/utils.1.js'
import '../../../static/3D/js/textures.js'
import '../../../static/3D/js/Car.js'
export default {
    name: 'partition',
    data () {
        return {
            ontology : '',
            delList  : [],
        }
    },
    mounted() {
        $('.breadcrumb').addClass('hide');
        // 修复工具栏bug
        var tooltip = document.getElementsByClassName('tooltip');
        if(tooltip.length>0){
            for(var i = 0; i < tooltip.length; i++) {
                tooltip[i].style.display='none';
            }
        }
        // 点击跳转链接消除拖拽体
        window.addEventListener("popstate", function(e) {
            $('.machine-zone').remove();
            $('.img-zone').remove();
        }, false);
        $(".nav-item").click(function(event){
            $('.machine-zone').remove();
            $('.img-zone').remove();
            $('.breadcrumb').removeClass('hide');

        });

        // 生成标尺
        var xRuler = document.getElementById('axis-x');
        var yRuler = document.getElementById('axis-y');
        var scale;

        // x-标尺
        var xLength = parseInt(xRuler.offsetWidth / 10);
        for (var i = 1; i < xLength; i++) {
            // 5px
            if (i % 5 == 0 && i % 2 != 0) {
                scale = document.createElement('div');
                scale.setAttribute('class', 'x-minor');
                scale.style.left = i * 10 + "px";
                xRuler.appendChild(scale);
            }
            // 10px
            else if (i % 10 == 0) {
                scale = document.createElement('div');
                scale.setAttribute('class', 'x-major');
                scale.style.left = i * 10 + "px";
                scale.innerText = i * 10 - 100;
                xRuler.appendChild(scale);
                // 1px
            } else {
                scale = document.createElement('div');
                scale.setAttribute('class', 'x-micro');
                scale.style.left = i * 10 + "px";
                xRuler.appendChild(scale);
            }
        }

        // y-标尺 
        var yLength = parseInt(yRuler.offsetHeight / 10);
        for (var i = 1; i < yLength; i++) {
            // 5px
            if (i % 5 == 0 && i % 2 != 0) {
                scale = document.createElement('div');
                scale.setAttribute('class', 'y-minor');
                scale.style.top = i * 10 + "px";
                yRuler.appendChild(scale);
            }
            // 10px            
            else if (i % 10 == 0) {
                scale = document.createElement('div');
                scale.setAttribute('class', 'y-major');
                scale.style.top = i * 10 + "px";
                scale.innerText = i * 10 - 100;
                yRuler.appendChild(scale);
            }
            // 1px            
            else {
                scale = document.createElement('div');
                scale.setAttribute('class', 'y-micro');
                scale.style.top = i * 10 + "px";
                yRuler.appendChild(scale);
            }
        }

        // 电气室的高度
        var gridLength;
        // 电气室的宽度
        var gridWidth;
        // 机柜
        var machineHtml = '<div class="machine"> \
                                <div class="machine-center"> \
                                    <div class="machine-position"></div> \
                                </div> \
                            </div> \
                            <div class="machine-title"> \
                                <div class="machine-title-input"></div> \
                        </div>';
        // 空调                    
        var airHtml = '<div class="machine"> \
                            <div class="air-center"> \
                                <div class="air-position"></div> \
                            </div> \
                        </div> \
                        <div class="machine-title"> \
                            <div class="machine-title-input"></div> \
                    </div> ';
        // 烟感
        var smokeHtml = '<img src="../../../static/3D/img/smoke.png" width="100%">';
        // 温感
        var temperatureHtml = '<img src="../../../static/3D/img/temperature.png" width="100%">';
        // 控制器
        var controlHtml = '<img src="../../../static/3D/img/control.png" width="100%">';
        // 实际拖拽体
        var oTemp;
        // 翻转体
        var rotate;
        // 悬浮层级
        var zIndex1 = 10;
        var zIndex2 = 20;
        // 初始化页面
        var baseURL = process.env.BASE_API;
        // 获取路由传递参数 
        var partCode = this.$route.query.selected;
        var _this = this;

        $.post(baseURL + '/fiSafety.htm?param_act=fiSafetyGetRoomDesign', {
            partCode: partCode
            },function (result) {
            var data = JSON.parse(result);
            var partSize = [];
            if(data.partSize){
                partSize = (data.partSize).split('*');
                gridLength = parseInt(partSize[1]);
                gridWidth = parseInt(partSize[0]);
        
                // 电气室的长度/宽度-文本框赋值
                document.getElementById('grid-length').value = gridLength;
                document.getElementById('grid-width').value = gridWidth;      
                // 初始化电气室
                var right = document.getElementById('painting');
                var houseHtml = '<div id = "love-house"></div>';
                right.innerHTML = houseHtml;
                var house = document.getElementById('love-house');
                house.style.width = gridWidth + 'px';
                house.style.height = gridLength + 'px';          
            }

            var x;
            var y;
            var arr = [];
            var code;
            var type;
            var name;
            var axis;
            for(var i=0;i<data.cabList.length;i++){
                arr = (data.cabList[i].CABINET_COORDINATE).split(',');
                x = parseInt(arr[0]);
                y = parseInt(arr[2]);
                code = data.cabList[i].ID;
                if(data.cabList[i].CABINET_TYPE == '0'){
                    type = 'machine';
                }else if(data.cabList[i].CABINET_TYPE == '1'){
                    type = 'air';
                }
                name = data.cabList[i].CABINET_NAME;
                axis = "(" + data.cabList[i].CABINET_COORDINATE + ")";
                dragLayout(x,y,code,type,name,axis);
            }
            for(var i=0;i<data.eqList.length;i++){
                arr = (data.eqList[i].EQ_COORDINATE).split(',');
                x = parseInt(arr[0]);
                y = parseInt(arr[2]);
                code = data.eqList[i].ID;
                if(data.eqList[i].EQ_TYPE == '02'){
                    type = 'temperature';
                }else if(data.eqList[i].EQ_TYPE == '03'){
                    type = 'smoke';
                }else if(data.eqList[i].EQ_TYPE == '25'||'29'){
                    type = 'control';
                }
                name = data.eqList[i].EQ_NAME;
                axis = "(" + data.eqList[i].EQ_COORDINATE + ")";
                dragLayout(x,y,code,type,name,axis);
            }
            var describLine = document.getElementsByClassName('machine-title-input');
            for (var i = 0; i < data.cabList.length; i++) {
                describLine[i].innerText = data.cabList[i].CABINET_NAME;
            }
            // 初始化拖拽布局
            function dragLayout(x,y,code,type,name,axis){
                var zone = document.getElementById('love-house');
                // x轴距离浏览器窗口顶部的位置
                var xTop = zone.getBoundingClientRect().top + zone.offsetHeight / 2;
                // y轴距离浏览器窗口左部的位置
                var yLeft = zone.getBoundingClientRect().left + zone.offsetWidth / 2;
                // 获取拖拽体
                var disX;
                var disY;
                oTemp = document.createElement("div");
                // 追加拖拽体到页面
                document.body.appendChild(oTemp);
                oTemp.setAttribute("code", code);
                oTemp.setAttribute("name", name);
                oTemp.setAttribute("axis", axis);
                if (type == 'machine') {
                    // 添加多个类名
                    oTemp.classList.add("machine-zone", "machine-line");
                    oTemp.setAttribute("type", "outer");
                    oTemp.innerHTML = machineHtml;
                    oTemp.style.zIndex = zIndex1;
                    disX = x + yLeft - (oTemp.offsetWidth / 2);
                    disY = y + xTop + 50 - oTemp.offsetHeight;
                }
                // 空调拖拽
                else if (type == "air") {
                    oTemp.classList.add("machine-zone", "air-line");
                    oTemp.setAttribute("type", "outer");
                    oTemp.innerHTML = airHtml;
                    oTemp.style.zIndex = zIndex1;
                    disX = x + yLeft - (oTemp.offsetWidth / 2);
                    disY = y + xTop + 50 - oTemp.offsetHeight;
                } else if (type == "smoke") {
                    oTemp.classList.add("img-zone", "smoke-line");
                    oTemp.setAttribute("type", "inner");
                    oTemp.innerHTML = smokeHtml;
                    oTemp.style.zIndex = zIndex2;
                    disX = x + yLeft - (oTemp.offsetWidth / 2);
                    disY = y + xTop - (oTemp.offsetHeight /2);
                } else if (type == "temperature") {
                    oTemp.classList.add("img-zone", "temperature-line");
                    oTemp.setAttribute("type", "inner");
                    oTemp.innerHTML = temperatureHtml;
                    oTemp.style.zIndex = zIndex2;
                    disX = x + yLeft - (oTemp.offsetWidth / 2);
                    disY = y + xTop - (oTemp.offsetHeight /2);                    
                } else if (type == "control") {
                    oTemp.classList.add("img-zone", "control-line");
                    oTemp.setAttribute("type", "inner");
                    oTemp.innerHTML = controlHtml;
                    oTemp.style.zIndex = zIndex2;
                    disX = x + yLeft - (oTemp.offsetWidth / 2);
                    disY = y + xTop - (oTemp.offsetHeight /2);
                } else {
                    console.log("类型错误");
                }

                oTemp.style.left = disX + "px";
                oTemp.style.top = disY + "px";
                dragD(oTemp);           
            }
        })

        // 创建电气室
        var createGrid = document.getElementById('create-button');
        createGrid.addEventListener('click', function () {
            // 判断长宽是否存在
            gridLength = document.getElementById('grid-length').value;
            gridWidth = document.getElementById('grid-width').value;
            // 获取输入框内的长宽
            var reg = /^[1-9][0-9]{0,}$/;
            if(!reg.test(gridLength) || !reg.test(gridWidth)){
                _this.$alert('请输入数字!', '通知', {
                    confirmButtonText: '确定'
                });
                return false;
            }
            // 创建电气室
            var right = document.getElementById('painting');
            var house = document.getElementById('love-house'); 
            if(!house){
                var houseHtml = '<div id="love-house"></div>';
                right.innerHTML = houseHtml;
                house = document.getElementById('love-house'); 
            }
            house.style.width = gridWidth + "px";
            house.style.height = gridLength + "px";
        })
        // 赋予拖拽能力
        var oDrag = document.getElementsByClassName('drag');
        for (var i = 0; i < oDrag.length; i++) {
            drag(oDrag[i]);
        }

        // 拖拽模块
        function drag(oDrag) {
            var disX = 0;
            var disY = 0;
            var iL = 0;
            var iT = 0;

            // 鼠标点击
            oDrag.onmousedown = function (event) {
                // 电气室若未创建则拖拽无效
                var house = document.getElementById('love-house');
                if (!house) {
                    return false;
                }
                var event = event || window.event;
                // 获取要拖拽div的对应类型
                var type = this.getAttribute('type');
                oTemp = document.createElement("div");

                // 机柜拖拽
                if (type == 'machine') {
                    // 添加多个类名
                    oTemp.classList.add("machine-zone", "machine-line");
                    oTemp.setAttribute("type", "outer");
                    oTemp.setAttribute("name", "");
                    oTemp.setAttribute("axis", "");
                    oTemp.setAttribute("code", "");
                    oTemp.innerHTML = machineHtml;
                    oTemp.style.zIndex = zIndex1;
                    // 旋转动画
                    rotate = document.getElementById('drag-machine');
                    rotate.style.transform = "rotateX(90deg)";
                    rotate.src = '../../../static/3D/img/machine-top.png';
                    rotate.style.width = 84 + 'px';
                    rotate.style.height = 84 + 'px';
                    rotate.style.marginTop = 50 + 'px';
                    rotate.style.transform = "rotateX(180deg)";
                }
                // 空调拖拽
                else if (type == "air") {
                    oTemp.classList.add("machine-zone", "air-line");
                    oTemp.setAttribute("type", "outer");
                    oTemp.innerHTML = airHtml;
                    oTemp.style.zIndex = zIndex1;
                    // 旋转动画
                    rotate = document.getElementById('drag-air');
                    rotate.style.transform = "rotateX(90deg)";
                    rotate.src = '../../../static/3D/img/air-top.png';
                    rotate.style.width = 84 + 'px';
                    rotate.style.height = 84 + 'px';
                    rotate.style.marginTop = 50 + 'px';
                    rotate.style.transform = "rotateX(180deg)";
                } else if (type == "smoke") {
                    oTemp.classList.add("img-zone", "smoke-line");
                    oTemp.setAttribute("type", "inner");
                    oTemp.innerHTML = smokeHtml;
                    oTemp.style.zIndex = zIndex2;
                } else if (type == "temperature") {
                    oTemp.classList.add("img-zone", "temperature-line");
                    oTemp.setAttribute("type", "inner");
                    oTemp.innerHTML = temperatureHtml;
                    oTemp.style.zIndex = zIndex2;
                } else if (type == "control") {
                    oTemp.classList.add("img-zone", "control-line");
                    oTemp.setAttribute("type", "inner");
                    oTemp.innerHTML = controlHtml;
                    oTemp.style.zIndex = zIndex2;
                } else {
                    console.log("类型错误");
                }
                // 设置 position 的 top left属性
                oTemp.style.left = this.currentStyle ? this.currentStyle["left"] : getComputedStyle(this, null)["left"];
                oTemp.style.top = this.currentStyle ? this.currentStyle["top"] : getComputedStyle(this, null)["top"];
                // 追加拖拽体到页面
                document.body.appendChild(oTemp);
                // 创建x-min辅助线
                var xline1 = document.createElement('div');
                xline1['id'] = 'sup-xline1';
                xline1.style.left = this.currentStyle ? this.currentStyle["left"] : getComputedStyle(this, null)["left"];
                xline1.style.top = this.currentStyle ? this.currentStyle["top"] : getComputedStyle(this, null)["top"];
                document.body.appendChild(xline1);
                // 创建x-max辅助线
                var xline2 = document.createElement('div');
                xline2['id'] = 'sup-xline2';
                xline2.style.left = this.currentStyle ? this.currentStyle["left"] : getComputedStyle(this, null)["left"];
                xline2.style.top = this.currentStyle ? this.currentStyle["top"] : getComputedStyle(this, null)["top"];
                document.body.appendChild(xline2);
                // 创建y-min辅助线
                var yline1 = document.createElement('div');
                yline1['id'] = 'sup-yline1';
                yline1.style.left = this.currentStyle ? this.currentStyle["left"] : getComputedStyle(this, null)["left"];
                yline1.style.top = this.currentStyle ? this.currentStyle["top"] : getComputedStyle(this, null)["top"];
                document.body.appendChild(yline1);
                // 创建y-max辅助线
                var yline2 = document.createElement('div');
                yline2['id'] = 'sup-yline2';
                yline2.style.left = this.currentStyle ? this.currentStyle["left"] : getComputedStyle(this, null)["left"];
                yline2.style.top = this.currentStyle ? this.currentStyle["top"] : getComputedStyle(this, null)["top"];
                document.body.appendChild(yline2);
                // 实际拖拽体的中心
                disX = oTemp.offsetWidth / 2;
                disY = oTemp.offsetHeight / 2;
                // 鼠标移动
                document.onmousemove = function (event) {
                    var event = event || window.event;
                    iL = event.clientX - disX;
                    iT = event.clientY - disY;
                    var maxL = document.documentElement.clientWidth - oTemp.offsetWidth;
                    var maxT = document.documentElement.clientHeight - oTemp.offsetHeight;
                    var oTempWidth = oTemp.offsetWidth;
                    var oTempHeight = oTemp.offsetHeight;
                    // 限制在当前浏览器窗口内拖动
                    iL <= 0 && (iL = 0);
                    iT <= 0 && (iT = 0);
                    iL >= maxL && (iL = maxL);
                    iT >= maxT && (iT = maxT);
                    if(oTemp.classList.contains('machine-zone')==true){
                        xline2.style.top = iT + oTempHeight - 50 + "px";
                    }else{
                        xline2.style.top = iT + oTempHeight + "px";
                    }
                    // 实际拖拽体的位置
                    oTemp.style.left = iL + "px";
                    oTemp.style.top = iT + "px";
                    // x-min辅助线的位置
                    xline1.style.left = 0;
                    xline1.style.top = iT + "px";
                    // x-max辅助线的位置
                    xline2.style.left = 0;
                    // xline2.style.top = iT + oTempHeight + "px";
                    // y-min辅助线的位置          
                    yline1.style.left = iL + "px";
                    yline1.style.top = 0;
                    // y-max辅助线的位置          
                    yline2.style.left = iL + oTempWidth + "px";
                    yline2.style.top = 0;
                    return false;
                };
                // 鼠标抬起
                document.onmouseup = function (event) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    // 移除辅助线
                    document.body.removeChild(xline1);
                    document.body.removeChild(xline2);
                    document.body.removeChild(yline1);
                    document.body.removeChild(yline2);
                    var event = event || window.event;
                    // 拖拽体
                    var width;
                    var height;
                    // 拖拽体与浏览器窗口距离
                    var left;
                    var top;
                    // 拖拽范围
                    var xMin;
                    var xMax;
                    var yMin;
                    var yMax;
                    // 父级容器
                    var zone;
                    // 机箱和空调移入到电气室中
                    if (oTemp.getAttribute('type') == 'outer') {
                        // 电气室宽度
                        zone = document.getElementById('love-house');
                        width = zone.offsetWidth;
                        // 电气室高度
                        height = zone.offsetHeight;
                        // 获取电气室到浏览器的距离
                        left = zone.getBoundingClientRect().left;
                        top = zone.getBoundingClientRect().top;
                        xMin = left + disX;
                        yMin = top + disY;
                        xMax = left + width - disX;
                        yMax = top + height - disY;
                        if ((event.clientX < xMin) || (event.clientX > xMax) || (event.clientY < yMin) || (event.clientY > yMax)) {
                            document.body.removeChild(oTemp);
                        }
                        dragD(oTemp);
                    }
                    // 温感、烟感、控制器移入到机箱顶部
                    else if (oTemp.getAttribute('type') == 'inner') {
                        zone = document.getElementsByClassName('machine-zone');
                        var arr = [];
                        for (var i = 0; i < zone.length; i++) {
                            width = zone[i].offsetWidth;
                            height = zone[i].offsetHeight;
                            left = zone[i].offsetLeft;
                            top = zone[i].offsetTop;
                            xMin = left + disX + 15;
                            xMax = left + width - disX - 15;
                            yMin = top + disY + 5;
                            yMax = top + height - disY - 5;
                            if ((event.clientX < xMin) || (event.clientX > xMax) || (event.clientY < yMin) || (event.clientY > yMax)) {
                                arr.push(0);
                            } else {
                                arr.push(1);
                            }
                        }
                        // 数组中不存在1，表示未能移入机柜顶部有效范围
                        if (arr.indexOf(1) == '-1') {
                            document.body.removeChild(oTemp);
                        }
                        dragD(oTemp);
                    }
                    if (oDrag.children[0].getAttribute('id') == 'drag-machine') {
                        rotate.style.transform = "rotateX(0deg)";
                        rotate.src = '../../../static/3D/img/machine.png';
                        rotate.style.width = 83 + 'px';
                        rotate.style.height = 147 + 'px';
                        rotate.style.marginTop = 14 + 'px';
                    } else if (oDrag.children[0].getAttribute('id') == 'drag-air') {
                        rotate.style.transform = "rotateX(0deg)";
                        rotate.src = '../../../static/3D/img/air.png';
                        rotate.style.width = 83 + 'px';
                        rotate.style.height = 147 + 'px';
                        rotate.style.marginTop = 14 + 'px';
                    }
                };
                this.setCapture && this.setCapture();
                return false
            }
        }

        var panel = document.getElementById('fixed-panel');
        // 拖拽删除
        function dragD (oTemp) {
            var disX =0;
            var disY = 0;
            var iL = 0;
            var iT = 0;
            var x1;
            var y1;
            var x2;
            var y2;
            var x3;
            var y3;
            var flag = '';
            oTemp.onmousedown = function (event) {
                flag = true;
                var event = event || window.event;
                disX = oTemp.offsetWidth / 2;
                disY = oTemp.offsetHeight / 2;
                x1 = event.clientX;
                y1 = event.clientY;
                x3 = oTemp.offsetLeft;
                y3 = oTemp.offsetTop;
                // 创建x-min辅助线
                var xline1 = document.createElement('div');
                xline1['id'] = 'sup-xline1';
                document.body.appendChild(xline1);
                // 创建x-max辅助线
                var xline2 = document.createElement('div');
                xline2['id'] = 'sup-xline2';
                document.body.appendChild(xline2);
                // 创建y-min辅助线
                var yline1 = document.createElement('div');
                yline1['id'] = 'sup-yline1';
                document.body.appendChild(yline1);
                // 创建y-max辅助线
                var yline2 = document.createElement('div');
                yline2['id'] = 'sup-yline2';
                document.body.appendChild(yline2);

                document.onmousemove = function (event) {
                    var event = event || window.event;
                    iL = event.clientX - disX;
                    iT = event.clientY - disY;
                    x2 = event.clientX;
                    y2 = event.clientY;
                    var oTempWidth = oTemp.offsetWidth;
                    var oTempHeight = oTemp.offsetHeight;
                    if(x1!=x2 && y1!=y2){
                        flag = false;
                        if(oTemp.classList.contains('machine-zone')==true){
                            xline2.style.top = iT + oTempHeight - 50 + "px";
                        }else{
                            xline2.style.top = iT + oTempHeight + "px";
                        }
                        oTemp.style.left = iL+"px";
                        oTemp.style.top = iT+"px";
                        // x-min辅助线的位置
                        xline1.style.left = 0;
                        xline1.style.top = iT + "px";
                        // x-max辅助线的位置
                        xline2.style.left = 0;
                        // xline2.style.top = iT + oTempHeight + "px";
                        // y-min辅助线的位置
                        yline1.style.left = iL + "px";
                        yline1.style.top = 0;
                        // y-max辅助线的位置
                        yline2.style.left = iL + oTempWidth + "px";
                        yline2.style.top = 0;
                    }
                    return false;
                }

                document.onmouseup = function (event) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    // 移除辅助线
                    document.body.removeChild(xline1);
                    document.body.removeChild(xline2);
                    document.body.removeChild(yline1);
                    document.body.removeChild(yline2);
                    // 去除选中效果
                    var machineZone = document.getElementsByClassName('machine');
                    for(var i=0;i<machineZone.length;i++){
                        machineZone[i].style.borderTop = 'none';
                        machineZone[i].style.borderBottom = 'none';
                        machineZone[i].style.borderLeft = '5px solid #666666';
                        machineZone[i].style.borderRight = '5px solid #666666';
                        machineZone[i].style.background = 'none';
                    }
                    var imgZone = document.getElementsByClassName('img-zone');
                    for(var i=0;i<imgZone.length;i++){
                        imgZone[i].style.border = 'none';
                        imgZone[i].style.background = 'none';
                    }
                    // 判断为点击事件非拖拽事件
                    var input = document.getElementById('machineName');
                    var axisX = document.getElementById('machineAxis-x');
                    var axisY = document.getElementById('machineAxis-y');
                    if(flag == true){
                        var panelTitle = document.getElementById('panel-title');
                        oTemp.classList.contains('machine-line') && (panelTitle.innerText = '机柜信息');
                        oTemp.classList.contains('air-line') && (panelTitle.innerText = '空调信息');
                        oTemp.classList.contains('smoke-line') && (panelTitle.innerText = '烟感信息');
                        oTemp.classList.contains('temperature-line') && (panelTitle.innerText = '温感信息');
                        oTemp.classList.contains('control-line') && (panelTitle.innerText = '控制器信息');
                        _this.ontology = oTemp;
                        input.readOnly=false;
                        if(oTemp.classList.contains('machine-zone')==true){
                            oTemp.children[0].style.borderTop = '1px solid #1B86FF';
                            oTemp.children[0].style.borderBottom = '1px solid #1B86FF';
                            oTemp.children[0].style.borderLeft = '5px solid #1B86FF';
                            oTemp.children[0].style.borderRight = '5px solid #1B86FF';
                            oTemp.children[0].style.background = '#01234A';
                        }else{
                            oTemp.getAttribute('code') && (input.readOnly=true);
                            oTemp.style.border = '1px solid #1B86FF';
                            oTemp.style.background = '#01234A';
                        }
                        // 获取当前拖拽体的页面坐标与名称
                        axisX.value=(oTemp.offsetWidth/2)+oTemp.offsetLeft-530;
                        axisY.value=(oTemp.offsetHeight/2)+oTemp.offsetTop-250;
                        input.value=oTemp.getAttribute('name');
                        // 面板显示
                        panel.style.display = 'block';
                    }else{
                        // 拖拽体
                        var width;
                        var height;
                        // 拖拽体与浏览器窗口距离
                        var left;
                        var top;
                        // 拖拽范围
                        var xMin;
                        var xMax;
                        var yMin;
                        var yMax;
                        // 父级容器
                        var zone;
                        // 电气室宽度
                        zone = document.getElementById('love-house');
                        width = zone.offsetWidth;
                        // 电气室高度
                        height = zone.offsetHeight;
                        // 获取电气室到浏览器的距离
                        left = zone.getBoundingClientRect().left;
                        top = zone.getBoundingClientRect().top;
                        xMin = left + disX;
                        yMin = top + disY;
                        xMax = left + width - disX;
                        yMax = top + height - disY;
                        // 获取当前拖拽体的页面坐标与名称
                        axisX.value=(oTemp.offsetWidth/2)+oTemp.offsetLeft-530;
                        axisY.value=(oTemp.offsetHeight/2)+oTemp.offsetTop-250;
                        if ((event.clientX < xMin) || (event.clientX > xMax) || (event.clientY < yMin) || (event.clientY > yMax)) {
                            _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                var id = oTemp.getAttribute('code');
                                var del;
                                if(oTemp.classList.contains('machine-zone')){
                                    del = {
                                        "ID": id,
                                        "TYPE": 'cab'
                                    }
                                }else{
                                    del = {
                                        "ID": id,
                                        "TYPE": 'equip'
                                    }
                                }
                                _this.delList.push(del);
                                document.body.removeChild(oTemp);
                                panel.style.display = 'none';
                                _this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }).catch(() => {
                                oTemp.style.left = x3 + "px";
                                oTemp.style.top = y3 + "px";
                                _this.$message({
                                    type: 'info',
                                    message: '已取消删除'
                                });
                            });
                        }
                    }
                }
            }
            // this.setCapture && this.setCapture();
            return false;
        }

        // 点击画板，面板隐藏
        var painting = document.getElementById('painting');
        painting.addEventListener('click',function(){
            // 去选中效果
            var machineZone = document.getElementsByClassName('machine');
            for(var i=0;i<machineZone.length;i++){
                machineZone[i].style.borderTop = 'none';
                machineZone[i].style.borderBottom = 'none';
                machineZone[i].style.borderLeft = '5px solid #666666';
                machineZone[i].style.borderRight = '5px solid #666666';
                machineZone[i].style.background = 'none';
            }
            var imgZone = document.getElementsByClassName('img-zone');
            for(var i=0;i<imgZone.length;i++){
                imgZone[i].style.border = 'none';
                imgZone[i].style.background = 'none';
            }
            // 面板隐藏
            panel.style.display = 'none';
        })
        // 面板-确认按钮
        var panelBtn = document.getElementById('items-btn');
        panelBtn.addEventListener('click',function(){
            var input = document.getElementById('machineName');
            var axisX = document.getElementById('machineAxis-x');
            var axisY = document.getElementById('machineAxis-y');
            var zone = document.getElementById('love-house');
            var input = document.getElementById('machineName');
            // x轴距离浏览器窗口顶部的位置
            var xTop = zone.getBoundingClientRect().top + zone.offsetHeight / 2;
            // y轴距离浏览器窗口左部的位置
            var yLeft = zone.getBoundingClientRect().left + zone.offsetWidth / 2;
            // 真实坐标
            var axis;
            // 根据输入的x、y坐标改变当前模块的位置
            var xChange = (axisX.value - (_this.ontology.offsetWidth/2)+ 530) + "px";
            var yChange = (axisY.value - (_this.ontology.offsetHeight/2)+ 250) + "px";
            _this.ontology.style.left = xChange;
            _this.ontology.style.top = yChange;
            // 真实坐标
            if(_this.ontology.classList.contains('machine-zone')==true){
                var x = (_this.ontology.offsetLeft + _this.ontology.offsetWidth / 2) - yLeft;
                var y = 0;
                var z = (_this.ontology.offsetTop + _this.ontology.offsetHeight - 50) - xTop;    
                axis = "(" + x +","+ y + "," + z + ")";
                _this.ontology.children[1].children[0].innerText = input.value;
            }else if(_this.ontology.classList.contains('img-zone')==true){
                var x = (_this.ontology.offsetLeft + _this.ontology.offsetWidth / 2) - yLeft;
                var y = 220;
                var z = (_this.ontology.offsetTop + _this.ontology.offsetHeight / 2) - xTop;
                axis = "(" + x +","+ y + "," + z + ")";
            }
            var reg = /\d{10}/;
            if (reg.test(input.value)){
                _this.ontology.setAttribute('name',input.value);
                _this.ontology.setAttribute('axis',axis);
            } else {
                 _this.$alert('请输入10位数字!', '通知', {
                    confirmButtonText: '确定'
                });
                return false;
            }

            // 去除选中效果
            var machineZone = document.getElementsByClassName('machine');
            for(var i=0;i<machineZone.length;i++){
                machineZone[i].style.borderTop = 'none';
                machineZone[i].style.borderBottom = 'none';
                machineZone[i].style.borderLeft = '5px solid #666666';
                machineZone[i].style.borderRight = '5px solid #666666';
                machineZone[i].style.background = 'none';
            }
            var imgZone = document.getElementsByClassName('img-zone');
            for(var i=0;i<imgZone.length;i++){
                imgZone[i].style.border = 'none';
                imgZone[i].style.background = 'none';
            }
            // 面板隐藏
            panel.style.display = 'none';                                                                                                                                                              
        })

        var zone;
        // 机箱位置
        var machinePositionArr = [];
        var airPositionArr = [];
        var smokePositionArr = [];
        var temperaturePositionArr = [];
        var controllerPositionArr = [];
        var fontPositionArr = [];
        var describArr = [];
        var machineNamePositionArr = [];
        var airNamePositionArr = [];
        var machineNameArr = [];
        var airNameArr = [];

        // 获取坐标数据
        function data(machinePositionArr, airPositionArr, smokePositionArr, temperaturePositionArr, controllerPositionArr, fontPositionArr, describArr,machineNameArr,machineNamePositionArr,airNameArr,airNamePositionArr) {
            zone = document.getElementById('love-house');
            // x轴距离浏览器窗口顶部的位置
            var xTop = zone.getBoundingClientRect().top + zone.offsetHeight / 2;
            // y轴距离浏览器窗口左部的位置
            var yLeft = zone.getBoundingClientRect().left + zone.offsetWidth / 2;
            // 获取拖拽体
            var machineLine = document.getElementsByClassName('machine-line');
            var airLine = document.getElementsByClassName('air-line');
            var smokeLine = document.getElementsByClassName('smoke-line');
            var temperatureLine = document.getElementsByClassName('temperature-line');
            var controllerLine = document.getElementsByClassName('control-line');
            var describLine = document.getElementsByClassName('machine-title-input');
            // 机柜名称坐标根据机柜坐标计算
            var equipLine = document.getElementsByClassName('machine-zone');
            for (var i = 0; i < describLine.length; i++) {
                describArr.push(describLine[i].innerText);
            }
            for (var i = 0; i < machineLine.length; i++) {
                machineNameArr.push(machineLine[i].children[1].children[0].innerText);
            }
            for (var i = 0; i < airLine.length; i++) {
                airNameArr.push(airLine[i].children[1].children[0].innerText);
            }
            font(equipLine, fontPositionArr);
            equip(machineLine, machinePositionArr);
            equip(airLine, airPositionArr);
            coordinate(smokeLine, smokePositionArr);
            coordinate(temperatureLine, temperaturePositionArr);
            coordinate(controllerLine, controllerPositionArr);
            font(machineLine,machineNamePositionArr)
            font(airLine,airNamePositionArr)
            // 机柜名称坐标
            function font(obj, positonArr) {
                for (var i = 0; i < obj.length; i++) {
                    var arr = [];
                    var x = obj[i].offsetLeft + 10 - yLeft;
                    var y = 280;
                    var z = obj[i].offsetTop + obj[i].offsetHeight - 45 - xTop;
                    arr.push(x, y, z);
                    positonArr.push(arr);
                }
            }
            // 烟感、温感、控制器坐标
            function coordinate(obj, positonArr) {
                for (var i = 0; i < obj.length; i++) {
                    var arr = [];
                    var x = (obj[i].offsetLeft + obj[i].offsetWidth / 2) - yLeft;
                    var y = 220;
                    var z = (obj[i].offsetTop + obj[i].offsetHeight / 2) - xTop;
                    arr.push(x, y, z);
                    positonArr.push(arr);
                }
            }
            // 机柜与空调坐标
            function equip(obj, positonArr) {
                for (var i = 0; i < obj.length; i++) {
                    var arr = [];
                    var x = (obj[i].offsetLeft + obj[i].offsetWidth / 2) - yLeft;
                    var y = 0;
                    var z = (obj[i].offsetTop + obj[i].offsetHeight - 50) - xTop;
                    arr.push(x, y, z);
                    positonArr.push(arr);
                }
            }
        }

        // tab页切换
        var tab1Btn = document.getElementById('tab1-button');
        var tab2Btn = document.getElementById('tab2-button');
        var flat = document.getElementById('flat');
        var three = document.getElementById('three-dimensional');
        // 平面视图切换
        tab1Btn.addEventListener('click', function () {
            // 显示与隐藏
            tab1Btn.classList.remove('tab1-style');
            tab1Btn.classList.add('tab2-style');
            tab2Btn.classList.remove('tab2-style');
            flat.style.display = 'block';
            three.style.display = 'none';
            // 清空canvas
            three.innerHTML = '';
        })
        // 3D视图切换
        tab2Btn.addEventListener('click', function () {
            tab2Btn.classList.remove('tab1-style');
            tab2Btn.classList.add('tab2-style');
            tab1Btn.classList.remove('tab2-style');
            data(machinePositionArr, airPositionArr, smokePositionArr, temperaturePositionArr, controllerPositionArr, fontPositionArr, describArr,machineNameArr,machineNamePositionArr,airNameArr,airNamePositionArr);
            threeRoom(gridWidth, gridLength, machinePositionArr, airPositionArr, smokePositionArr, temperaturePositionArr, controllerPositionArr, describArr);
            // 数据清空
            machinePositionArr = [];
            airPositionArr = [];
            smokePositionArr = [];
            temperaturePositionArr = [];
            controllerPositionArr = [];
            fontPositionArr = [];
            describArr = [];
            // 显示与隐藏
            flat.style.display = 'none';
            three.style.display = 'block';
        })
        // 取消按钮
        var cancelButton = document.getElementById('cancel-button');
        cancelButton.addEventListener('click',function(){
            // 点击跳转链接消除拖拽体
            $('.machine-zone').remove();
            $('.img-zone').remove();
            $('.breadcrumb').removeClass('hide');
            _this.$router.push('/manager/safe/fdisk');
        })
        // 提交数据
        var submitBtn = document.getElementById('submit-button');
        submitBtn.addEventListener('click', function () {
            var partSize = gridWidth + '*' + gridLength;
            // 获取坐标数据
            data(machinePositionArr, airPositionArr, smokePositionArr, temperaturePositionArr, controllerPositionArr, fontPositionArr, describArr,machineNameArr,machineNamePositionArr,airNameArr,airNamePositionArr);
            var machineLine = document.getElementsByClassName('machine-line');
            var airLine = document.getElementsByClassName('air-line');
            var smokeLine = document.getElementsByClassName('smoke-line');
            var temperatureLine = document.getElementsByClassName('temperature-line');
            var controllerLine = document.getElementsByClassName('control-line');
            var machineCodeArr = [];
            var airCodeArr = [];
            var smokeCodeArr = [];
            var temperatureCodeArr = [];
            var controllerCodeArr = [];
            var smokeNameArr = [];
            var temperatureNameArr = [];
            var controllerNameArr = [];
            var flag = true;
            code(machineLine,machineCodeArr);
            code(airLine,airCodeArr);
            code(smokeLine,smokeCodeArr);
            code(temperatureLine,temperatureCodeArr);
            code(controllerLine,controllerCodeArr);
            equipName(smokeLine,smokeNameArr);
            equipName(temperatureLine,temperatureNameArr);
            equipName(controllerLine,controllerNameArr);
            function code(obj,arr) {
                for(i=0;i<obj.length;i++){
                    arr.push(obj[i].getAttribute('code'));
                }
            }
            function equipName(obj,arr){
                for(i=0;i<obj.length;i++){
                    arr.push(obj[i].getAttribute('name'));
                    if(!obj[i].getAttribute('name')){
                        flag = false;
                        _this.$alert('设备名称信息不完整', '通知', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                                });
                            }
                        });
                    }
                }
            }
            // 设备信息
            var equip = '';
            // 组件信息
            var model = '';
            var cabList = [];
            var eqList = [];
            for(i = 0; i < machinePositionArr.length; i++) {
                var a = machinePositionArr[i];
                var b = machineNamePositionArr[i];
                var c = machineNameArr[i];
                var d = machineCodeArr[i];
                equip = {
                    "CABINET_NAME": c,
                    "CABINET_COORDINATE": a.join(','),
                    "ID": d,
                    "CABINET_TYPE": "0",
                    "DESCRIB_COORDINATE": b.join(',')
                }
                cabList.push(equip);
                // equip += "["+ a + "]" + "-"+ "[" + b + "]" + "-" + c  + "-" +  "0" + "~";
            }
            for(i = 0; i < airPositionArr.length; i++) {
                var a = airPositionArr[i];
                var b = airNamePositionArr[i];
                var c = airNameArr[i];
                var d = airCodeArr[i];
                equip = {
                    "CABINET_NAME": c,
                    "CABINET_COORDINATE": a.join(','),
                    "ID": d,
                    "CABINET_TYPE": "1",
                    "DESCRIB_COORDINATE": b.join(',')
                }
                cabList.push(equip);
                // equip += "["+ a + "]" + "-"+ "[" + b + "]" + "-" + c  + "-" +  "1" + "~";
            }
            for(i = 0; i < smokePositionArr.length; i++) {
                var a = smokePositionArr[i];
                var b = smokeNameArr[i];
                var d = smokeCodeArr[i];
                // model += "smoke:"+"["+ a + "]" + "~";
                model = {
                "EQ_TYPE": "03",
                "EQ_NAME": b,
                "EQ_COORDINATE": a.join(','),
                "ID": d
                // model += "temperature:"+"["+ a + "]" + "~";
                }    
                eqList.push(model);
            }     
            for(i = 0; i < temperaturePositionArr.length; i++) {
                var a = temperaturePositionArr[i];
                var b = temperatureNameArr[i];
                var d = temperatureCodeArr[i];
                var model = {
                "EQ_TYPE": "02",
                "EQ_NAME": b,
                "EQ_COORDINATE": a.join(','),
                "ID": d
                // model += "temperature:"+"["+ a + "]" + "~";
                }
                eqList.push(model);
            }
            for(i = 0; i < controllerPositionArr.length; i++) {
                var a = controllerPositionArr[i];
                var b = controllerNameArr[i];
                var d = controllerCodeArr[i];
                model = {
                "EQ_TYPE": "25",
                "EQ_NAME": b,
                "EQ_COORDINATE": a.join(','),
                "ID": d
                // model += "temperature:"+"["+ a + "]" + "~";
                }    
                eqList.push(model);
                // model += "controller:"+"["+ a + "]" + "~";
            } 
            // 去除末尾逗号
            // equip = equip.substr(0, equip.length - 1);
            // model = model.substr(0, model.length - 1);
            if(flag == true){
                $.post(baseURL + '/fiSafety.htm?param_act=fiSafetySaveRoomDesign', {
                partCode:partCode,
                partSize:partSize,
                cabList:JSON.stringify( cabList ),
                eqList:JSON.stringify( eqList ),
                delList:JSON.stringify( _this.delList )
                },function (result) {
                    // 点击跳转链接消除拖拽体
                    $('.machine-zone').remove();
                    $('.img-zone').remove();
                    $('.breadcrumb').removeClass('hide');
                    _this.$router.push('/manager/safe/fdisk');
                })
            }
        })

        // 3D电气室
        function threeRoom(gridWidth, gridLength, machinePositionArr, airPositionArr, smokePositionArr, temperaturePositionArr, controllerPositionArr, describArr) {
            var scene, camera
            var renderer
            var width, height
            // var stats
            var config = {
                isMobile: false,
                background: 0x1e1e24
            }
            // canvas的长宽
            var flat = document.getElementById('flat')
            width = flat.offsetWidth
            height = flat.offsetHeight

            scene = new THREE.Scene() // 新建一个场景
            camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000) // 新建一个透视摄像机, 并设置 视场, 视野长宽比例, 可见远近范围
            // 摄像机的位置
            camera.position.set(0, 1000, 1000)
            camera.lookAt(scene.position) // 设置摄像机观察的方向

            renderer = new THREE.WebGLRenderer({
                antialias: true
            }) // 新建一个渲染器, 渲染器用来输出最终结果
            renderer.setSize(width, height) // 设置渲染的尺寸, 在这里是浏览器尺寸
            renderer.setClearColor(config.background) // 设置背景的颜色
            renderer.shadowMap.enabled = true // 设置是否开启投影, 开启的话, 光照会产生投影
            renderer.shadowMap.type = THREE.PCFSoftShadowMap // 设置投影类型, 这边是柔和投影
            document.getElementById('three-dimensional').appendChild(renderer.domElement);// renderer.domElement 是渲染器用来显示结果的 canvas 标签

            // 检查客户端
            checkUserAgent()
            // 设置辅助线 以及鼠标插件
            buildAuxSystem()
            // 设置光照
            buildLightSystem()
            // 构造建筑物
            buildbuilding(gridWidth, gridLength, machinePositionArr, airPositionArr, smokePositionArr, temperaturePositionArr, controllerPositionArr, describArr)
            // 加载
            loop()
            // 窗口自适应
            onWindowResize()

            function checkUserAgent() {
                var n = navigator.userAgent;
                if (n.match(/Android/i) || n.match(/webOS/i) || n.match(/iPhone/i) || n.match(/iPad/i) || n.match(/iPod/i) || n.match(/BlackBerry/i)) {
                    config.isMobile = true
                    camera.position.set(420, 420, 420)
                    renderer.shadowMap.enabled = false
                }
            }

            function buildbuilding(gridWidth, gridLength, machinePositionArr, airPositionArr, smokePositionArr, temperaturePositionArr, controllerPositionArr, describArr) {
                // 创建底座 长/宽/高
                var planeGeometry = new THREE.BoxBufferGeometry(gridWidth, 10, gridLength)
                // 设置材质
                var texturePlane = new THREE.TextureLoader().load("../../../static/3D/img/floor.jpg");
                texturePlane.wrapS = THREE.RepeatWrapping;
                texturePlane.wrapT = THREE.RepeatWrapping;
                texturePlane.repeat.set(8, 8);
                var materialPlane = new THREE.MeshLambertMaterial({
                    map: texturePlane,
                    color: 0xC6E2FF
                });
                var plane = new THREE.Mesh(planeGeometry, materialPlane);
                plane.rotation.z = -Math.PI
                plane.position.y = -1
                // 添加地板
                scene.add(plane)
                // 机柜名称
                fontModel(fontPositionArr, describArr)
                // room(gridWidth,gridLength)
                // 机柜
                machine(machinePositionArr)
                // 空调
                air(airPositionArr)
                // 烟感
                smoke(smokePositionArr)
                // 温感
                temperature(temperaturePositionArr)
                // 控制器
                controller(controllerPositionArr)

                // 创建3D文字
                function fontModel(fontPositionArr, describArr) {
                    var fontModel
                    var font
                    var loader = new THREE.FontLoader()
                    var fontPosition = fontPositionArr
                    var fontarray = describArr
                    loader.load("../../../static/3D/font/MicrosoftYaHei_Regular.json", function (res) {
                        for (var i = 0; i < fontPosition.length; i++) {
                            font = new THREE.TextBufferGeometry(fontarray[i], {
                                font: res,
                                size: 11,
                                height: 1
                            })
                            font.computeBoundingBox() // 运行以后设置font的boundingBox属性对象，如果不运行无法获得。
                            var material = new THREE.MeshLambertMaterial({})
                            fontModel = new THREE.Mesh(font, material)
                            //设置位置  
                            var fontClone = fontModel.clone()
                            fontClone.position.set(fontPosition[i][0], fontPosition[i][1], fontPosition[i][2])
                            scene.add(fontClone)
                        }
                    })
                }

                // 房间主结构
                function room(gridWidth,gridLength) {
                    // 墙
                    var w = gridWidth
                    var l = gridLength
                    var wall1 = new THREE.Object3D()

                    var wallBottomGeometry = new THREE.BoxGeometry(20,90, l)
                    var wallBottom = utils.makeMesh('phong', wallBottomGeometry, 0xC6E2FF)
                    wallBottom.position.set(0, 45, 0)
                    wall1.add(wallBottom)
                    var holeGeometry = new THREE.BoxGeometry(4,200, l-10)
                    var hole = utils.makeMesh('glass', holeGeometry, 0x00BFFF,0.6)
                    hole.position.set(0, 145, 0)
                    wall1.add(hole)
                    var wallTopGeometry = new THREE.BoxGeometry(20,30, l)
                    var wallTop = utils.makeMesh('phong', wallTopGeometry, 0xC6E2FF)
                    wallTop.position.set(0,240,0)
                    wall1.add(wallTop)
                    wall1.position.set((-w/2)-10,-5 ,0)
                    scene.add(wall1)
                    
                    var wall2 = wall1.clone()
                    wall2.position.set((w/2)+10,-5 ,0)
                    scene.add(wall2)
                }

                // 烟感
                function smoke(smokePositionArr) {
                    var smokePosition = smokePositionArr
                    for (var i = 0; i < smokePosition.length; i++) {
                        var smoke = createSmoke(smokePosition[i][0], smokePosition[i][1], smokePosition[i][2])
                        scene.add(smoke)
                    }
                }

                // 烟感模型
                function createSmoke(x, y, z) {
                    var smoke = new THREE.Object3D()
                    var smokeBaseGeometry = new THREE.CylinderGeometry(20, 20, 10, 40, 5)
                    var smokeBase = utils.makeMesh('lambert', smokeBaseGeometry, 0xE8E8E8)
                    smokeBase.position.set(0, 96, 0)
                    smoke.add(smokeBase)

                    var smokeUpGeometry = new THREE.CylinderGeometry(16, 16, 4, 40, 5)
                    var smokeUp = utils.makeMesh('glass', smokeUpGeometry, 0x008B00, 0.4)
                    /* smokeUp.rotation.x = 0.5*Math.PI */
                    smokeUp.position.set(0, 102, 0)
                    smoke.add(smokeUp)

                    var smokeCoverGeometry = new THREE.CylinderGeometry(8, 10, 5, 40, 5)
                    var smokeCover = utils.makeMesh('lambert', smokeCoverGeometry, 0xE8E8E8)
                    /* smokeUp.rotation.x = 0.5*Math.PI */
                    smokeCover.position.set(0, 106, 0)
                    smoke.add(smokeCover)
                    smoke.position.set(x, y, z)

                    return smoke
                }

                // 温感
                function temperature(temperatureArr) {
                    var temperaturePosition = temperatureArr
                    for (var i = 0; i < temperaturePosition.length; i++) {
                        var temperature = createTemperature(temperaturePosition[i][0], temperaturePosition[i][1], temperaturePosition[i][2])
                        scene.add(temperature)
                    }
                }

                // 温感模型
                function createTemperature(x, y, z) {
                    var temperature = new THREE.Object3D()
                    // var temperatureBaseGeometry = new THREE.CylinderGeometry(5,8,1,40,40)
                    // var temperatureBase = utils.makeMesh('phong',temperatureBaseGeometry,0xE8E8E8)
                    // temperatureBase.position.set(-104,96,-50)
                    // temperature.add(temperatureBase)

                    var temperaturePillarGeometry = new THREE.CylinderGeometry(20, 20, 10, 40, 40)
                    var temperaturePillar = utils.makeMesh('phong', temperaturePillarGeometry, 0xE8E8E8)
                    temperaturePillar.position.set(0, 96, 0)
                    temperature.add(temperaturePillar)

                    var temperatureUpGeometry = new THREE.CylinderGeometry(20, 20, 8, 40, 5)
                    var temperatureUp = utils.makeMesh('glass', temperatureUpGeometry, 0x000080, 0.8)
                    /* smokeUp.rotation.x = 0.5*Math.PI */
                    temperatureUp.position.set(0, 107, 0)
                    temperature.add(temperatureUp)

                    var temperatureCoverGeometry = new THREE.SphereGeometry(20, 20, 6, 0, Math.PI * 2, 0, Math.PI / 2)
                    var temperatureCover = utils.makeMesh('phong', temperatureCoverGeometry, 0xE8E8E8)
                    temperatureCover.position.set(0, 110, 0)
                    temperature.add(temperatureCover)
                    temperature.position.set(x, y, z)

                    return temperature
                }

                // 控制器
                function controller(controllerPositionArr) {
                    var controllerPosition = controllerPositionArr
                    for (var i = 0; i < controllerPosition.length; i++) {
                        var controller = createController(controllerPosition[i][0], controllerPosition[i][1], controllerPosition[i][2])
                        scene.add(controller)
                    }
                }

                // 控制器模型
                function createController(x, y, z) {
                    var controller = new THREE.Object3D()

                    var controllerBaseGeometry = new THREE.BoxGeometry(40, 30, 40)
                    var controllerBase = utils.makeMesh('phong', controllerBaseGeometry, 0xE8E8E8)
                    controllerBase.position.set(0, 103, 0)
                    controller.add(controllerBase)

                    var controllerLeftBarGeometry = new THREE.BoxGeometry(9, 26, 43)
                    var controllerLeftBar = utils.makeMesh('glass', controllerLeftBarGeometry, 0x848484, 0.9)
                    controllerLeftBar.position.set(-20, 96, 0)
                    controller.add(controllerLeftBar)
                    var controllerRightBar = controllerLeftBar.clone()
                    controllerRightBar.position.set(20, 96, 0)
                    controller.add(controllerRightBar)

                    var lampGeometry = new THREE.CircleGeometry(1.4, 36, 0, Math.PI * 2)
                    var lampGreen = utils.makeMesh('glass', lampGeometry, 0x00EE00, 0.9)
                    lampGreen.position.set(-10, 107, 20)
                    controller.add(lampGreen)
                    var lampYellow = utils.makeMesh('glass', lampGeometry, 0xEEEE00, 0.9)
                    lampYellow.position.set(-5, 107, 20)
                    controller.add(lampYellow)
                    var lampRed = utils.makeMesh('glass', lampGeometry, 0xEE0000, 0.9)
                    lampRed.position.set(0, 107, 20)
                    controller.add(lampRed)

                    var controllerButtonGeometry = new THREE.BoxGeometry(10, 6, 0.5)
                    var controllerButton = utils.makeMesh('phong', controllerButtonGeometry, 0x4A708B)
                    controllerButton.castShadow = false
                    controllerButton.position.set(-3, 98, 20)
                    controller.add(controllerButton)

                    var controllerButtonClone = controllerButton.clone()
                    controllerButtonClone.position.set(9, 98, 20)
                    controller.add(controllerButtonClone)

                    controller.position.set(x, y, z)
                    return controller
                }

                // 机柜
                function machine(machinePositionArr) {
                    var machine = new THREE.Object3D()
                    var machinePosition = machinePositionArr

                    var textureFront = new THREE.TextureLoader().load("../../../static/3D/img/rack_front_door.jpg");
                    var materialFront = new THREE.MeshPhongMaterial({
                        map: textureFront
                    });
                    var machineFrontGeometry = new THREE.BoxGeometry(2, 300, 150)
                    var machineFront = new THREE.Mesh(machineFrontGeometry, materialFront);
                    machineFront.rotation.y = -0.5 * Math.PI
                    machineFront.position.set(0, 152, 0)
                    machine.add(machineFront)

                    var textureBack = new THREE.TextureLoader().load("../../../static/3D/img/rack_door_back.jpg");
                    var materialBack = new THREE.MeshPhongMaterial({
                        map: textureBack
                    });
                    var machineBackGeometry = new THREE.BoxGeometry(2, 300, 150)
                    var machineBack = new THREE.Mesh(machineBackGeometry, materialBack);
                    machineBack.rotation.y = -0.5 * Math.PI
                    machineBack.position.set(0, 152, -140)
                    machine.add(machineBack)

                    var textureLeft = new THREE.TextureLoader().load("../../../static/3D/img/rack_panel.jpg");
                    var materialLeft = new THREE.MeshPhongMaterial({
                        map: textureLeft,
                        color: 0x383838
                    });
                    var machineLeftGeometry = new THREE.BoxGeometry(2, 300, 140)
                    var machineLeft = new THREE.Mesh(machineLeftGeometry, materialLeft);
                    machineLeft.position.set(-75, 152, -70)
                    machine.add(machineLeft)

                    var machineRight = machineLeft.clone()
                    machineRight.position.set(75, 152, -70)
                    machine.add(machineRight)

                    var textureBottom = new THREE.TextureLoader().load("../../../static/3D/img/rack_panel.jpg");
                    var materialBottom = new THREE.MeshPhongMaterial({
                        map: textureBottom,
                        color: 0x383838
                    });
                    var machineBottomGeometry = new THREE.BoxGeometry(150, 2, 140)
                    var machineBottom = new THREE.Mesh(machineBottomGeometry, materialBottom);
                    machineBottom.position.set(0, 2, -70)
                    machine.add(machineBottom)

                    var textureTop = new THREE.TextureLoader().load("../../../static/3D/img/rack_panel.jpg");
                    var materialTop = new THREE.MeshPhongMaterial({
                        map: textureTop,
                        color: 0x383838
                    });
                    var machineTopGeometry = new THREE.BoxGeometry(140, 40, 150)
                    var machineTop = new THREE.Mesh(machineTopGeometry, materialTop);
                    machineTop.position.set(0, 290, -70)
                    machine.add(machineTop)

                    for (var i = 0; i < machinePosition.length; i++) {
                        var machineClone = machine.clone()
                        machineClone.position.set(machinePosition[i][0], machinePosition[i][1], machinePosition[i][2])
                        scene.add(machineClone)
                    }
                }
            }

            function air(airPositionArr) {
                var air = new THREE.Object3D()
                var airPosition = airPositionArr
                var textureFront = new THREE.TextureLoader().load("../../../static/3D/img/rack_inside.jpg");
                var materialFront = new THREE.MeshBasicMaterial({
                    map: textureFront,
                    color: 0xFFFFFF
                });
                var machineFrontGeometry = new THREE.BoxGeometry(2, 300, 150)
                var machineFront1 = new THREE.Mesh(machineFrontGeometry, materialFront);

                var airHole1Geometry = new THREE.BoxGeometry(2, 60, 120)
                var airHole1 = utils.makeMesh('phong', airHole1Geometry, 0x4A708B)

                airHole1.position.y = 87

                var airHole2Geometry = new THREE.BoxGeometry(2, 40, 35)
                var airHole2 = utils.makeMesh('phong', airHole2Geometry, 0x4A708B)
                airHole2.position.y = -118

                var airHole3 = airHole2.clone()
                airHole3.position.z = 45

                var airHole4 = airHole2.clone()
                airHole4.position.z = -45

                var airHole1BSP = new ThreeBSP(airHole1)
                var machineFront1BSP = new ThreeBSP(machineFront1)
                var machineFront1ResultBSP = utils.bsp('subtract', machineFront1BSP, airHole1BSP)

                var airHole2BSP = new ThreeBSP(airHole2)
                var machineFront2ResultBSP = utils.bsp('subtract', machineFront1ResultBSP, airHole2BSP)

                var airHole3BSP = new ThreeBSP(airHole3)
                var machineFront3ResultBSP = utils.bsp('subtract', machineFront2ResultBSP, airHole3BSP)

                var airHole4BSP = new ThreeBSP(airHole4)
                var machineFront4ResultBSP = utils.bsp('subtract', machineFront3ResultBSP, airHole4BSP)
                var machineFront = utils.bspMesh('phong', 0xEBEBEB, machineFront4ResultBSP)

                var textureGrid = new THREE.TextureLoader().load("../../../static/3D/img/flag.jpg");
                var materialGrid = new THREE.MeshBasicMaterial({
                    map: textureGrid,
                    color: 0xFFFFFF
                })
                var textureGrid1 = new THREE.TextureLoader().load("../../../static/3D/img/eee.png");
                var materialGrid1 = new THREE.MeshBasicMaterial({
                    map: textureGrid1,
                    color: 0xFFFFFF
                })
                var airGrid1Geometry = new THREE.BoxGeometry(120, 60, 2)
                var airGrid1 = new THREE.Mesh(airGrid1Geometry, materialGrid);
                airGrid1.position.z = 0
                airGrid1.position.y = 240
                air.add(airGrid1)

                var airGrid2Geometry = new THREE.BoxGeometry(35, 40, 2)
                var airGrid2 = new THREE.Mesh(airGrid2Geometry, materialGrid1)
                airGrid2.position.z = 0
                airGrid2.position.y = 35
                air.add(airGrid2)

                var airGrid3 = airGrid2.clone()
                airGrid3.position.x = 45
                air.add(airGrid3)

                var airGrid4 = airGrid2.clone()
                airGrid4.position.x = -45
                air.add(airGrid4)

                var textureLock = new THREE.TextureLoader().load("../../../static/3D/img/lock.png");
                var materialLock = new THREE.MeshBasicMaterial({
                    map: textureLock,
                    color: 0xFFFFFF
                })
                var LockGeometry = new THREE.BoxGeometry(18, 24, 10)
                var Lock = new THREE.Mesh(LockGeometry, materialLock)
                Lock.position.y = 166
                Lock.position.x = 0
                air.add(Lock)

                machineFront.rotation.y = -0.5 * Math.PI
                machineFront.position.set(0, 152, 0)
                air.add(machineFront)

                var textureBack = new THREE.TextureLoader().load("../../../static/3D/img/rack_inside.jpg");
                var materialBack = new THREE.MeshPhongMaterial({
                    map: textureBack,
                    color: 0xFFFFFF
                })
                var machineBackGeometry = new THREE.BoxGeometry(2, 300, 150)
                var machineBack = new THREE.Mesh(machineBackGeometry, materialBack);
                machineBack.rotation.y = -0.5 * Math.PI
                machineBack.position.set(0, 152, -140)
                air.add(machineBack)

                var textureLeft = new THREE.TextureLoader().load("../../../static/3D/img/rack_inside.jpg");
                var materialLeft = new THREE.MeshPhongMaterial({
                    map: textureLeft,
                    color: 0xFFFFFF
                })
                var machineLeftGeometry = new THREE.BoxGeometry(2, 300, 140)
                var machineLeft = new THREE.Mesh(machineLeftGeometry, materialLeft);
                machineLeft.position.set(-75, 152, -70)
                air.add(machineLeft)

                var machineRight = machineLeft.clone()
                machineRight.position.set(75, 152, -70)
                air.add(machineRight)

                var textureBottom = new THREE.TextureLoader().load("../../../static/3D/img/rack_inside.jpg");
                var materialBottom = new THREE.MeshPhongMaterial({
                    map: textureBottom,
                    color: 0xFFFFFF
                })
                var machineBottomGeometry = new THREE.BoxGeometry(150, 2, 140)
                var machineBottom = new THREE.Mesh(machineBottomGeometry, materialBottom);
                machineBottom.position.set(0, 2, -70)
                air.add(machineBottom)

                var textureTop = new THREE.TextureLoader().load("../../../static/3D/img/rack_inside.jpg");
                var materialTop = new THREE.MeshPhongMaterial({
                    map: textureTop,
                    color: 0x63B8FF
                })
                var machineTopGeometry = new THREE.BoxGeometry(140, 40, 150)
                var machineTop = new THREE.Mesh(machineTopGeometry, materialTop);
                machineTop.position.set(0, 290, -70)
                air.add(machineTop)

                for (var i = 0; i < airPosition.length; i++) {
                    var airClone = air.clone()
                    airClone.position.set(airPosition[i][0], airPosition[i][1], airPosition[i][2])
                    scene.add(airClone)
                }
            }

            // 光
            function buildLightSystem() {
                if (!config.isMobile) {
                    // 平行的一束光，模拟从很远处照射的太阳光
                    // DirectionalLight( color, intensity )
                    // color — 光的颜色值，十六进制，默认值为0xffffff.
                    // intensity — 光的强度，默认值为1.  
                    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
                    directionalLight.position.set(500, 1000, 500);
                    directionalLight.target.position.set(0, 0, 0);
                    directionalLight.castShadow = false;

                    var d = 300;
                    // 正交投影相机
                    // var camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
                    directionalLight.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 500, 1600);
                    directionalLight.shadow.bias = 0.0001;
                    directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
                    scene.add(directionalLight)
                    // 环境光( AmbientLight )：笼罩在整个空间无处不在的光
                    var light = new THREE.AmbientLight(0xffffff, 0.3)
                    scene.add(light)
                } else {
                    // 半球光光源( HemisphereLight )
                    var hemisphereLight = new THREE.HemisphereLight(0xEBEBEB, 1)
                    scene.add(hemisphereLight)
                    var light = new THREE.AmbientLight(0xffffff, 0.15)
                    scene.add(light)
                }
            }

            function buildAuxSystem() {
                // stats = new Stats()
                // stats.setMode(0)
                // stats.domElement.style.position = 'absolute'
                // stats.domElement.style.left = '5px'
                // stats.domElement.style.top = '5px'
                // document.body.appendChild(stats.domElement)

                // var axisHelper = new THREE.AxesHelper(200)
                // scene.add(axisHelper)

                // 创建网格辅助线
                /* var gridHelper = new THREE.GridHelper(320, 32)
                scene.add(gridHelper) */

                var controls = new THREE.OrbitControls(camera, renderer.domElement)
                //使动画循环使用时阻尼或自转 意思是否有惯性
                controls.enableDamping = true
                //动态阻尼系数 就是鼠标拖拽旋转灵敏度
                controls.dampingFactor = 0.25
                //旋转速度
                controls.rotateSpeed = 0.35
            }

            function loop() {
                // stats.update()
                renderer.render(scene, camera) // 渲染器开始渲染, scene 和 camera 是必须参数, 因为场景里有动画, 所以放在 loop 里循环
                requestAnimationFrame(loop)
            }

            function onWindowResize(inxx) {
                window.addEventListener('resize', function () {
                    width = window.innerWidth
                    height = window.innerHeight
                    camera.aspect = width / height;
                    camera.updateProjectionMatrix()
                    renderer.setSize(width, height)
                })
            }
        }        
    }
}
</script>

<style type="text/css">
    body{
        overflow: hidden;
    }

    .sidebar-minimized.sidebar-fixed .main {
        margin-left: 140px !important;
    }

    .main .container-fluid {
        padding: 0 !important;
    }

    .container-fluid{
        width: 100%;
        height: 100%;
    }

    button {
    outline: none;
    }

    .both-content {
    width: 100%;
    height: 100%;
    }

    .left-dashboard {
    width: 260px;
    height: 100%;
    float: left;
    }

    .nav-list{
    overflow: hidden;
    }

    .nav-zone{
    padding: 0 10px 20px 10px;
    overflow: hidden;
    }

    .nav-label {
    width: 100%;
    height: 40px;
    background: #2E2C48;
    color: #C7CEF2;
    line-height: 40px;
    padding-left: 10px;
    box-sizing: border-box;
    font-size:14px;
    }

    .nav-box{
    width: 110px;
    overflow: hidden;
    float: left;
    }

    .nav-box:nth-child(odd){
    margin-right:20px;
    }

    .nav-box-machine{
    width:100%;
    height:180px;     
    border:1px solid #2E2C48;    
    box-sizing: border-box;
    }

    .nav-box-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #C7CEF2;
    }

    .equip-box{
    width:100%;
    padding-right:20px;
    margin-top:20px;       
    overflow:hidden; 
    }

    .equip-title{
    width:90px;
    height:80px;
    line-height:80px;
    text-align:center;
    color: #C7CEF2;
    font-size:14px;
    float:left;
    }

    .equip-moudle{
    width:150px;
    height:80px;
    border:1px solid #2E2C48; 
    float:left; 
    }

    .equip-moudle{
    padding: 20px 55px;
    box-sizing: border-box;
    }

    .right-dashboard1 {
    height: 100%;
    margin-left: 260px;
    padding: 0 10px 10px 10px;
    box-sizing: border-box;
    overflow: hidden;
    background: #18181E;
    position: relative;
    }

    .right-dashboard-top{
    height: 60px;
    background: #1E1E24;
    width: 100%;
    line-height: 60px;
    }

    .coordinate-input[type="text"],.coordinate-input[type="text"]:focus,.coordinate-input[type="text"]:hover{
        box-sizing: border-box;
        background: #121214;
        width: 100px;
        height: 28px;
        color: #c7cef2;
        font-size: 12px;
        border: 1px solid #4a485d;
        box-sizing: border-box;
    }

    .create-axis{
    padding-left: 30px;
    height: 100%;
    }

    .axis-label{
    color:#828099;
    font-size:12px;
    }

    .create-button{
    background: #1B86FF;
    width: 100px;
    height: 28px;
    border-radius: 14px;
    color:#FFFFFF;
    font-size: 14px;
    text-align: center;
    border:1px solid #1B86FF;
    box-sizing: border-box;
    line-height: normal;
    }

    #create-button{
    margin: 0px 70px 0 30px;
    }

    .tab1-button{
    width: 80px;
    height: 28px;
    color: #FFFFFF;
    font-size: 14px;
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
    box-sizing: border-box;
    background: #2E2C48;
    border:1px solid #2E2C48;
    }

    #tab2-button{
    margin-left: -5px;
    }

    .tab2-button{
    width: 80px;
    height: 28px;
    color: #FFFFFF;
    font-size: 14px;
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
    box-sizing: border-box;
    background: #2E2C48;
    border:1px solid #2E2C48;
    }

    .tab1-style{
    background: #2E2C48;
    border:1px solid #2E2C48;
    }

    .tab2-style{
    background: #1B86FF;
    border:1px solid #1B86FF;
    }

    #submit-button{
    margin-left: 200px;
    }

    .right-dashboard-bottom{
    height:calc(100% - 70px);
    margin-top: 10px; 
    overflow: hidden;
    }

    .axis-orign{
    width: 20px;
    height: 20px;
    background: #242427;
    float: left;
    }

    #axis-x{
    width: 100%;
    height: 20px;
    background: #303038;
    left: 20px;
    top: -20px;
    position: relative;
    overflow: hidden;
    }

    #axis-y{
    width: 20px;
    height: 100%;
    background: #303038;
    left: 0;
    top: -20px;
    position: relative;
    float: left;
    overflow: hidden;
    }

    .x-micro{
    background: #8E8E8E;
    width: 1px;
    height: 5px;
    bottom: 0;
    position: absolute;
    }

    .x-minor{
    background: #8E8E8E;
    width: 1px;
    height: 10px;
    bottom: 0;
    position: absolute;
    }

    .x-major{
    background: #8E8E8E;
    width: 1px;
    height: 20px;
    bottom: 0;
    position: absolute;
    font-size: 12px;
    color: #8E8E8E;
    text-indent: 1px;
    }

    .y-micro{
    background: #8E8E8E;
    width: 5px;
    height: 1px;
    left: 0;
    position: absolute;
    }

    .y-minor{
    background: #8E8E8E;
    width: 10px;
    height: 1px;
    left: 0;
    position: absolute;
    }

    .y-major{
    background: #8E8E8E;
    width: 20px;
    height: 1px;
    left: 0;
    position: absolute;
    font-size: 12px;
    color: #8E8E8E;
    word-wrap: break-word;
    padding-left:8px;
    box-sizing: border-box;
    }

    .painting{
    overflow: hidden;
    display: flex;
    /*   align-items: center;
    justify-content: center; */
    padding: 100px;
    height:calc(100% - 20px);
    margin-top: -20px;
    }

    #love-house{
    border: 10px solid #2E2C48;
    background: #292930;
    box-sizing: border-box;
    }

    .machine-zone{
    width: 150px;
    height: 190px;
    position: absolute;
    cursor: pointer;
    }

    .machine{
    width: 150px;
    height: 140px;
    border-left: 5px solid #666666;
    border-right: 5px solid #666666;
    padding: 0 5px;
    box-sizing: border-box;
    }

    .machine-position{
    width:120px;
    height: 130px;
    border: 1px dashed #666666;
    box-sizing: border-box;
    }

    .machine-center{
    width: 130px;
    height: 100%;
    background: #333333;
    padding: 5px;
    box-sizing: border-box;
    }

    .air-position{
    width:120px;
    height: 130px;
    border: 1px dashed #9DDDFF;
    box-sizing: border-box;
    }

    .air-center{
    width: 130px;
    height: 100%;
    background: #2898D4;
    padding: 5px;
    box-sizing: border-box;
    }

    .machine-title-input{
    width: 150px;
    height: 30px;
    color: #e6e6e6;
    font-size: 12px;
    margin-top: 20px;
    box-sizing: border-box;
    padding-left: 10px;
    text-align: center;
    padding: 0 5px;
    }

    .axis-content {
    height: 100%;
    float: left;
    }

    .three-content {
    width: 50%;
    height: 100%;
    float: right;
    }

    .left-nav {
    width: 100%;
    height: 100%;
    background: #1E1E24;
    }

    .left-nav ul {
    margin: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    }

    .left-nav ul li {
    margin: 0 15px 20px 15px;
    list-style: none;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-right: 10px;
    background: blue;
    color: #FFFFFF;
    }

    .machine-type {
    opacity: 0.9;
    filter: alpha(opacity=30);
    position: absolute;
    width: 50px;
    height: 50px;
    cursor: move;
    border: 1px solid #888;
    background: #000;
    }

    .air-type {
    opacity: 0.9;
    filter: alpha(opacity=30);
    position: absolute;
    width: 50px;
    height: 50px;
    cursor: move;
    border: 1px solid #888;
    background: red;
    }

    #temp {
    opacity: 0.3;
    filter: alpha(opacity=30);
    position: absolute;
    background: #3e3e3e;
    width: 50px;
    height: 50px;
    }

    .drag-grid {
    float: left;
    border-collapse: collapse;
    }

    .img-zone{
    width: 40px;
    height: 40px;
    position: absolute;
    vertical-align: middle;
    cursor: move;
    }

    #sup-yline1{
    width: 1px;
    background: #1B86FF;
    height: 100%;
    position: absolute;
    z-index: 999;
    }

    #sup-xline1{
    height: 1px;
    background: #1B86FF;
    width: 100%;
    position: absolute;
    z-index: 999;
    }

    #sup-yline2{
    width: 1px;
    background: #1B86FF;
    height: 100%;
    position: absolute;
    z-index: 999;
    }

    #sup-xline2{
    height: 1px;
    background: #1B86FF;
    width: 100%;
    position: absolute;
    z-index: 999;
    }

    .drag-img{
    margin: 14px 13px;
    transition: all 1s ease-out;
    }
    .drag{
        cursor: move;
    }
    .hide{
    display: none;
    }

    #fixed-btn{
    position: fixed;
    top: 70px;
    left: 890px;
    z-index: 999;
    cursor: pointer;
    }

    #three-dimensional{
    width: 100%;
    height: 100%;
    background: #1E1E24;
    display: none;
    }

    canvas{
    position: absolute;
    z-index: 998;
    }

    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
    /* WebKit browsers */ 
    color: #666666; 
    } 

    input:-moz-placeholder, textarea:-moz-placeholder { 
    /* Mozilla Firefox 4 to 18 */ 
    color: #666666; 
    } 

    input::-moz-placeholder, textarea::-moz-placeholder { 
    /* Mozilla Firefox 19+ */ 
    color: #666666; 
    } 

    input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
    /* Internet Explorer 10+ */ 
    color: #666666; 
    }

    .toolbar{
    width: 32px;
    height: 480px;
    background: rgba(255, 255, 255, 0.75);
    border-radius: 5px;
    z-index: 999;
    position: relative;
    top: 75px;
    left: 10px;
    float: left;
    }

    #cancel-button{
    margin-left: 10px;
    }

    #fixed-panel {
    position: fixed;
    top: 60px;
    right: 0;
    width: 260px;
    height: calc(100% - 60px);
    z-index: 999;
    background: #1e1e24;
    display: none;
    }

    #fixed-panel ul {
    list-style: none;
    overflow: hidden;
    }

    #fixed-panel ul li {
    color: #c7cef2;
    overflow: hidden;
    padding-left: 20px;
    }

    .items-title {
    line-height: 40px;
    height: 40px;
    float: left;
    width: 220px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(18, 18, 20, 1);
    font-size: 14px;
    }

    .items-info {
    line-height: 50px;
    height: 50px;
    float: left;
    width: 220px;
    box-sizing: border-box;
    }

    .items-li1 {
    height: 40px;
    line-height: 40px;
    }

    .items-li2 {
    height: 50px;
    line-height: 50px;
    border-bottom: 2px solid rgba(18, 18, 20, 1);
    }

    .items-btn {
    width: 100px;
    height: 28px;
    background: rgba(27, 134, 255, 1);
    border-radius: 14px;
    border: none;
    font-size: 14px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    margin-left: 60px;
    margin-top: 100px;
    cursor: pointer;
    }

    .items-input[type="text"],.items-input[type="text"]:focus,.items-input[type="text"]:hover,.items-input[readonly] {
    color: #c7cef2;
    border: 1px solid #4a485d;
    box-sizing: border-box;
    background: #121214 !important;
    padding-left: 10px;
    height: 30px;
    font-size: 12px;
    box-sizing: border-box;
    width: 220px;
    }

    .items-axis {
    color: #828099;
    }

    .info-axis {
    color: #828099;
    }

    .items-input-num[type="text"],.items-input-num[type="text"]:focus,.items-input-num[type="text"]:hover {
    color: #c7cef2;
    border: 1px solid #4a485d;
    box-sizing: border-box;
    background: #121214;
    padding-left: 10px;
    height: 28px;
    font-size: 12px;
    width: 70px;
    margin-left: 5px;
    }

    #panel-title {
    width: 100%;
    height: 40px;
    background: #2e2c48;
    color: #c7cef2;
    line-height: 40px;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 14px;
    }

    #fixed-panel ul li:first-child {
    padding-left: 0;
    }

</style>
