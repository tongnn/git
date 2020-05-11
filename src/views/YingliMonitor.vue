<style scoped lang="css">

	#monitor{width: 100%;}
	#monitor .imgs{width:100%; position: relative;}
	#background{width:100%;height:100%;}
	.strainDom{position: absolute; min-width: 11%;min-height: 6.5%;background:#2E2C48;border-radius:5px;color:#C7CEF2;font-size: 10px;cursor: pointer;}
	.strainDom img{position: absolute; top: 13px; left: 5px;}
	.normal{background:#ECEAF4;color:#4D4D4D;}
	.warn{background:#EFD83B;color:#1E1E24;}
	.alarm{background:#FF852C;color:#1E1E24;}
	.danger{background:#FF4D4D;color:#1E1E24;}
	.border{border: 1px solid #1B86FF !important;color: #1B86FF;}
	.leg{min-width: 30%;height: 26px;line-height: 26px;text-align: center;background: #2E2C48;margin-left: 1%;margin-top: 2px;cursor: pointer;box-sizing: border-box;}
	.leg1{min-width: 30%;height: 26px;line-height: 26px;text-align: center;background: #2E2C48;margin-left: 1%;margin-top: 2px;cursor: pointer;box-sizing: border-box;}	
	#bars,#bars1{color: #C7CEF2;}
	.strainDom .straincode{margin-left: 25px;margin-top:1px;font-size: 1em;}
	.strainnum{display:inline-block;margin-left: 28px;font-size: 1em;}
	.active{border:1px solid #1B86FF;}
	.select_active{border:1px solid #1B86FF;color:#1B86FF;background: url(../../static/img/strain/selected_tag.png) no-repeat bottom right;}

	.equ{height:40px;line-height: 40px;padding-left: 10px;border-bottom: 1px solid #2E2C48;cursor:pointer;color:#C7CEF2;font-size:14px;font-family:SimSun;}
	.left-dashboard-title {
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: left;
		color: #333333;
		font-size: 14px;
		background: #E5E5E5;
		padding-left: 10px;
	}

	.left-dashboard-nav .nav-list {
		color: #808080;
		width: 100%;
		background: #FFFFFF;
		height: 40px;
		padding-left: 8px;
		line-height: 40px; 
		font-size: 14px;
	}

	.left-dashboard-nav-active {
	background: rgb(46, 44, 72) !important;
		/* color: #333333 !important; */
	}

	/* middle部分 */
	label{display:inline-block;max-width:100%;margin-bottom:5px;color: #C7CEF2;font-size: 12px;}
	input[type="text"]{
		color: #C7CEF2;
		background-color: #2E2C48;
		border: 0;
	}
	.ivu-btn-small {
		padding: 5px 7px;
		font-size: 12px;
	}
	
	#customers
	{
	font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;
	width:100%;
	
	border-collapse:collapse;
	background-color: #2E2C48;
	color:#C7CEF2;
	overflow-y: auto;
	}
	/*id为customers 的标签里面的td标签和th标签的样式*/
	#customers td, #customers th
	{
	font-size:1em;
	height: 40px;
	border:1px solid #1E1E24;
	padding:3px 7px 2px 7px;
	}
	/*id为customers 的标签里面的th标签的样式*/
	#customers th
	{
	font-size:1.1em;
	text-align:left;
	padding-top:5px;
	padding-bottom:4px;

	}
	/*id为customers的标签里面的class名为alt的tr标签里面的td标签的样式*/
	#customers tr td
	{
	/* color:#000; */
	/* background-color:rgb(253, 253, 251); */
	}
	.el-table__empty-block{width: 245%;background-color:white;border:1px solid #ccc;border-top:none;display:block;}

	.analyse{display: inline-block;width:100px; height:30px;line-height: 30px; background:#2E2C48;color:#8084A2; border-radius: 15px;font-size:14px; font-family:SimSun;cursor: pointer;}
	.btn-select{background:#1B86FF;color:#FFFFFF;}

	.border-select {
		border: 1px solid #1B86FF;
	}
	.pointAnalyse{border-bottom:2px solid #C7CEF2;color:#C7CEF2;}
	.right-dashboard {
		width: 21%;
		height: calc(100vh - 55px);
		overflow: auto;
		float: right;
		background: #18181E;
	}

	.right-dashboard-title {
		width: 100%;
		height: 40px;
		background: linear-gradient(to right, rgba(24,24,30,1) 25%,rgba(0,72,255,0.8));
		line-height: 40px;
		font-size: 14px;
		font-family: SimSun;
		color: #C7CEF2;
	}

	.right-dashboard-title img {
		margin-left: 19px;
		margin-right: 5px;
		margin-bottom: 3px;
	}

	.right-dashboard-info {
		min-height: 70px;
		max-height: 270px;
		width: 100%;
		overflow: auto;
		padding-left:20px;
		/* background-color: #fff; */
	}
	.tips{
		text-align: center;
		padding-top: 20px;
	}
	.tips span{
		width: 100%;
		height: 30px;
		line-height: 30px;
		color: #ccc;
	} 
	.unnormalTips{
	height: 70px;
	padding-top:15px;
	
	border-bottom: 1px solid #2E2C48;
	box-sizing: border-box;
	}

	.unnormalMsg{
	font-family: SimSun;
	color: #C7CEF2;
	
	}
	.unnormalMsg .name{
	font-size: 13px;
	font-weight:500;
	cursor:pointer;
	}
	.unnormalMsg .place{
	font-size: 12px;
	color: #8084A2;
	}
	#checked{
		text-align: center;
		height: 50px;
		line-height: 50px;
	}
	.hide {
		display: none;
	}
	.show {
		display: block;
	}
	@media screen and (max-width: 767px) {
		.form_head { float: left; width: calc(100vw - 450px) }
		.state-info,
		.state-info2 { position: static; width: 80%; margin-top: 15px; }
		.state-info .panel,
		.state-info2 .panel { width: 100%; }
		.form_head_middle { width: 100%; height: 40px; overflow: hidden; margin-top: 10%; border-bottom: #ccc 2px solid; margin-bottom: 10px; }
	}
	
	@media screen and (max-width: 1230px) {
		.form_head { float: right; width: calc(100vw - 450px) }
		.state-info,
		.state-info2 { position: static; width: 80%; margin-top: 15px; }
		.state-info .panel,
		.state-info2 .panel { width: 100%; }
	}
	
	/* @media screen and (max-width: 1530px) {
		.strainnum{
			display: none;
		}
		.strainDom img{
			position: absolute;
			top: 6px;
			left: 5px;
}
	 }
	 @media screen and (min-width: 1530px) {
		.strainnum{
			display: block;
		}
		.strainDom img{
			position: absolute;
			top: 13px;
			left: 5px;
}
	 } */
	
	
	span{display: inline-block;}
	ul li{float: left;width: 45%;margin-left: 3.5%;margin-top: 2%;height:60px;line-height: 60px; background:#EBEBEB;border: 1px solid #1B86FF; }
	ol li{width:12px; height:12px; background:rgba(239,216,59,1)}
	.point_select{cursor: pointer;margin:20px 20px 20px 20px;width: 18px;height: 18px;border-radius: 50%;background: #FFFFFF;float: left;border: 2px solid #FFCCCCCC;}
	.num_warn{font-size: 16px;display: inline-block;width:50px;height: 20px;line-height: 20px;text-align: center;border-radius: 10px;}
	.nowTime,.overTime,.alarmNum,.analyseTime{width: 85px;height: 26px;line-height: 26px;background-color: #2E2C48;text-align: center;cursor: pointer;}
	.type-active{border: 1px solid #1B86FF;color:#1B86FF; }
	
	#test6{ background-image: url(../vibrationImg/calendar.png);/*设置小图标为背景*/ background-size:18px 18px;/*设置小图标的 大小*/ background-position: 148px 2px;/*设置小图标的位置*/ background-repeat:no-repeat ;/*设置小图标不重复*/ border: 1px solid gray; cursor: pointer; }
	
	.ui-jqgrid tr.jqgrow td {
   white-space: normal !important;
   height:auto;
   vertical-align:text-top;
   padding-top:2px;
 }
	.ivu-input {
		height: 26px;
		background: #2E2C48 !important;
		border: none !important;
		color: #C7CEF2 !important;
		font-size: 12px !important;
	}
	#replay{
		color: #1B86FF;
		background-color: #2E2C48;
		border-color: #1B86FF;
	}
	#table_r>>>.ivu-table th {
        background: #2E2C48 !important;
        border: 1px solid #1E1E24;
		color: #C7CEF2;
    }
    #table_r>>>.ivu-table td {
        background: #2E2C48 !important;
        border: 1px solid #1E1E24;
		color: #C7CEF2;
    }
	/*滚动条样式*/
	::-webkit-scrollbar {/*滚动条整体样式*/
	width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
	}
	::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
	background:rgba(46,44,72,1);
	border-radius:2px;
	}
	::-webkit-scrollbar-track {/*滚动条里面轨道*/
	background: rgba(22,21,41,1);
	}
</style>

<template>
  <div class="animated fadeIn" style="height:100%;overflow:hidden;margin: 0;background:#121214;">

    <div class=''>
        <div class=''>
          <div class='' style="width: 15%;height:calc(100vh - 55px);background:#1E1E24;float: left;">
            <div style="overflow: hidden; position: relative; color: rgb(199, 206, 242); height: 150px; line-height: 150px; background: rgb(46, 44, 72);">
                <!-- <div :style="{backgroundImage: 'url(' + img2 + ')'}" style="position: absolute; top: 50%;margin-top: -25px;margin-left: 5%;width: 50px;height: 50px;border-radius: 50%;border: 1px solid white;float: left;background-repeat:no-repeat; background-size:100% 100%;">
                  
                </div> -->
                <div id="" style="float: left;width: 85%;">
					<img src="../vibrationImg/Avatar.png" style="position: absolute; top: 50%;margin-top: -25px;margin-left: 5%;width: 50px;height: 50px;border-radius: 50%;border: 1px solid white;float: left;" alt="">
                  <p id="company" style="max-width:200px;position: absolute;margin-left: 25%;font-size: 16px;"></p>
                  <p style="float: right;position: absolute;right: 5%;font-size: 10px;cursor:pointer;">切换&nbsp;<span> > </span></p>
                </div>
            </div>
            <div id="num" style="background: rgb(51, 49, 78); width: 80%; height: 50px; box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px; border-radius: 5px; top: -25px; left: 10%; position: relative;">
              <div class="" style="text-align: center; height: 50px; width: 49.5%; float: left;">
                <p id="eqNum" style="margin-top: 0px; color: rgb(199, 206, 242); font-weight: 500; font-size: 18px;"></p>
                <p style="font-size:12px;font-family:SimSun;color: #828099;">监测子系统</p>
              </div>
              <div class="" style="text-align: center;width: 50%;float: left;">
                <p id="poNum" style="margin-top: 0px; color: rgb(199, 206, 242); font-weight: 500; font-size: 18px;"></p>
                <p style="font-size:12px;font-family:SimSun;color: #828099;">监测测点</p>
              </div>
            </div>
            

            <div id="pick" style="height: calc(100vh - 200px);width: 100%;">
              <div class="equ left-dashboard-nav-active" style="">
                <p id="treeAll">设备监控子系统</p>
              </div>
              <div class="equ" @click="tabSwitch(item.eqCode,item.eqName)" v-for="(item,index) in eqInfoData" :key="index" style="">
				  <!-- <div> -->
					{{item.eqName}}
					<!-- <p id="treeAll">1号测点位置</p>
					<p id="treeAll">1号测点位置</p>
					<p id="treeAll">1号测点位置</p> -->

				  <!-- </div> -->
              </div>
            </div>
           

			    </div>
        </div>
        <div class='' style="width: 64%;float: left;padding: 10px;height: calc(100vh - 55px);">
          <!-- 顶部标题栏 -->
				<div id="treeName" style="width: 100%;height: 40px;line-height: 40px;background: #1E1E24;font-size: 12px;padding-left: 1.5%;color: #C7CEF2;">
					设备监控子系统
				</div>
				<div id="box1" style="width: 100%;background: #1E1E24;">
					<div id="" style="height: 60px;line-height: 60px;width: 100%;font-size: 18px;font-family:MicrosoftYaHei;margin-top: 2px;border-bottom:1px solid #2E2C48;">
							
							<p id="all_Pie" style="float: left;width: 50%;height: 60px;text-align: center;color:#C7CEF2;cursor:pointer;">
								<!--<p id="all_Pie" style="margin-left: 49%;float: left;height: 58px;"> </p>-->
								<span id=""> 设备运行状态汇总</span>
								<p id="one_L" style="height: 2px;background: #C7CEF2;width: 35%;float: left;margin-left: -43%;margin-top: 60px;"></p>
							</p>
							<p id="month_R" style="float: left;width: 50%;height: 60px;text-align: center;color:#828099;cursor:pointer;">
								<!--<p id="month_R" style=";margin-left: 20%;height: 58px;"></p>-->
								<span id="">设备应力月度报告</span>
								<p id="two_L" style="height: 2px;background: #C7CEF2;width: 35%;margin-right: 7%;float: right;display: none;clear: both;"></p>
							</p>
					</div>
					<div id="">
						<div id="all_e1" style="height: calc(100vh - 175px);width: 100%;padding-top: 20px;">
							<!--<p id="one_L" style="margin-left: 20.5%;height: 2px;background: blue;width: 300px;"></p>-->
							<div class="" id="" style="margin:0 20px;display: flex;flex-direction: row;flex-wrap: wrap;justify-content: flex-start;">
								<div class=''  id="" style="height: 240px;border-radius:10px;margin-right:20px;background: rgb(46, 44, 72);margin-top:10px;">
									<div id="" style="text-align: center;height: 40px;line-height: 40px;border-bottom: 1px solid #1E1E24;font-size: 15px;color:#C7CEF2;">
										{{equipName1}}
									</div>
									<div id="myChart1" style="width: 350px;height: 200px;">
										
									
									</div>
								</div>
								<div class="" id="" style="height: 240px;border-radius:10px;background: rgb(46, 44, 72);margin-top:10px;">
									<div id="" style="text-align: center;height: 40px;line-height: 40px;border-bottom: 1px solid #1E1E24;font-size: 15px;color:#C7CEF2;">
										{{equipName2}}
									</div>
									<div id="myChart2" style="width: 350px;height: 200px;">
									
									</div>
								</div>
								<!-- <div class="col-xs-12 col-sm-6 col-md-4" id="" style="height: 240px;border: 1px solid #ECEAF4;border-radius:10px ;">
									<div id="" style="text-align: center;height: 40px;line-height: 40px;border-bottom: 1px solid #ECEAF4;font-size: 15px;">
										56#门机中部运行部分
									</div>
									<div id="myChart3" style="width: 100%;height: 200px;">
										
									</div>
								</div> -->
							</div>
						</div>
						<div id="line_r" style="height: calc(100vh - 175px);width: 100%;display: none;overflow:auto;">
							<div  style="height: 40px;line-height: 40px;margin-left: 5%;color：#C7CEF2;margin-right: 5%;border-bottom: 1px solid rgba(46,44,72,1);">
								<label>选择设备：</label>
								<select id="selected" name="" style="height: 30px;width: 150px;background: #2E2C48;border: 0;color: #C7CEF2;">
									<option value="01001" style="color：#C7CEF2;">71#门机下部运行部分</option>
									<option value="01002" style="color：#C7CEF2;">71#门机上部旋转部分</option>

								</select>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>选择月份:</label>
								<Date-picker id='month' :value="month" @on-change="handleChange2"  type="month" placeholder="选择月" style="width: 100px;height:26px;background: #2E2C48;border: 0;"></Date-picker>
								
								<Button  type="primary" shape="circle" size="small" @click="monthTable()" style="width:100px;margin-left:20px;">查询</Button>
								<div id="" @click="getPdf()" style="color:white;background: #2d8cf0;float: right;width: 100px;height: 30px;border-radius: 15px;text-align: center;line-height: 30px;margin-top: 8px;cursor:pointer;">
									<img src="../../static/img/download.png" style="margin-top: -3px;"/> &nbsp;导出报告
								</div>
							</div>
							<div id="pdfDom">
								<div id="" style="margin-left: 5%;width: 90%;height:80px;margin-top: 20px;font-size:13px;font-family:SimSun;color:#828099;">
									<div id="" style="width: 22.7%;height: 80px;margin-left: 0%;float: left;text-align: center;background: #2E2C48;margin-bottom:10px;">
										<p style="margin-top: 10px;font-size:22px;font-family:ArialMT;color: #1B86FF;">{{monthData.totalPoint}}</p>
										<p>设备监测点（个）</p>
									</div>
									<div id="" style="width: 22.7%;height: 80px;margin-left: 3%;float: left;text-align: center;background: #2E2C48;margin-bottom:10px;">
										<p style="margin-top: 10px;font-size:22px;font-family:ArialMT;color: #1B86FF;">{{monthData.normalPoint}}</p>
										<p >本月运行正常点数（个）</p>
									</div>
									<div id="" style="width: 22.7%;height: 80px;margin-left: 3%;float: left;text-align: center;background: #2E2C48;margin-bottom:10px;">
										<p style="margin-top: 10px;font-size:22px;font-family:ArialMT;color: #1B86FF;">{{monthData.warnNum}}</p>
										<p>本月预报警累计次数（次）</p>
									</div>
									<div id="" style="width: 22.7%;height: 80px;margin-right: 0%;float: right;text-align: center;background: #2E2C48;margin-bottom:10px;">
										<p style="margin-top: 10px;font-size:22px;font-family:ArialMT;color: #1B86FF;">{{monthData.totalTime}}</p>
										<p>本月预报警累计时长（分钟）</p>
									</div>
								</div>
								<div id="" style="margin-left: 5%;width: 90%;max-height: 600px;overflow-y:auto;">
									<!-- <table id="grid-table" style="font-size: 10px;padding-right: 0 !important;overflow-y:auto;"></table> -->
									<table id= "customers">
										<tr>
											<th style="width：300px;">测点</th>
											<th >最小值 </th>
											<th >最大值 </th>
											<th >平均值 </th>
											<th >预警次数 </th>
											<th >预警时长(min) </th>
											<th >报警次数 </th>
											<th >报警时长(min) </th>
											<th >危险次数 </th>
											<th >危险时长(min) </th>
											<th >建议 </th>
										</tr>
										<tr v-for="(item,index ) in monthData.data" :key="index">
											<td >{{item.point}} </td>
											<td >{{item.min}} </td>
											<td >{{item.max}} </td>
											<td >{{item.avg}} </td>
											<td >{{item.countWarn}} </td>
											<td >{{item.warnTime}} </td>
											<td >{{item.countAlarm}} </td>
											<td >{{item.alarmTime}} </td>
											<td >{{item.countDanger}} </td>
											<td >{{item.dangerTime}} </td>
											<td >{{item.advise}} </td>
										</tr>
											<!-- <div class="el-table__empty-block"><span class="el-table__empty-text">暂无数据</span></div> -->
									</table>
								</div>

							</div>
						</div>						
					</div>

				</div>
				
				<div id="box2" style="display: none;background: #1E1E24;">
					
					<div id="" style="height: calc(100vh - 115px);width: 100%;margin-top: 2px;overflow:auto;">
						<div  style="height: 60px;line-height: 60px;width: 100%;font-size: 18px;text-align:center;color: #C7CEF2;border-bottom: 1px solid #2E2C48;">

							<p id="monTitle" style="float: left;width: 50%;height: 60px;text-align: center;color:#C7CEF2;cursor:pointer;">
								<p id="equip_L" style="height: 1px;background: #C7CEF2;width: 35%;float: left;margin-left: -43%;margin-top: 60px;"></p>
							</p>
							<p id="table_monitor" style="float: left;width: 50%;height: 60px;text-align: center;color: rgba(130,128,153,1);cursor: pointer;">
								<p id="table_L" style="height:1px;background: #C7CEF2;width: 35%;margin-top: -2px;margin-right: 7%;float: right;display: none;clear: both;"></p>
							</p>
						</div>
						<div id="legend2" style="height: 40px;line-height: 40px;width: 100%;background: #1E1E24;color: #8084A2;border-top: 1px solid #2E2C48;">
						<span id="" style="float: left;margin-left: 1.5%;">图例:</span>
						<ol style="float: left;margin-left: 1.5%;width: 20%;">

							<li style="float:left;width:12px;margin-left: 0%;margin-top: 14px; height:12px; background:rgba(239,216,59,1)"></li>
							<span style="float: left;margin-left: 5px;">预警</span>
							<li style="float:left;width:12px;margin-left: 3%;margin-top: 14px; height:12px; background:rgba(255, 133, 44, 1)"> </li>
							<span style="float: left;margin-left: 5px;">报警</span>
							<li style="float:left;width:12px;margin-left: 3%;margin-top: 14px; height:12px; background:rgba(255, 70, 70, 1)"> </li>
							<span style="float: left;margin-left: 5px;">危险</span>
						</ol>
							<span id="">
								V：应变数据，单位με&nbsp;&nbsp;&nbsp;T：温度数据，单位℃
							</span>
						</div>	
						<div id="detail_1">
							<div id="title_1" style="width: 100%;height: 80px;text-align: center;">
								<p style="margin-top: 30px;margin-bottom: 5px;font-size: 14px;color:#C7CEF2;font-family:SimSun;">选择一个及以上的测点进行振动或预警分析</p>
								<span id="v_sys" @click="change1()" class="analyse" style="">
									应力分析
								</span>&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;
								<span id="w_sys"  @click="change2()" class="analyse" style="">
									预警分析
								</span>
							</div>
							<div class='monDetail' style="">
								<Row>
									<div Col span="24" id="monitor">
										<div class="imgs" >
											<img id="background" src="static/img/vibbottom.png" alt="">
											<div @click="toggle($event,index)" class="strainDom" v-for="(item,index ) in monitorData" :key="index">
												<!-- <img class="select-box select-box-unselect" src="static/img/strain/unsele_s.png" alt="">
												<span class="straincode">{{item.pointCode}}#:</span>
												<span class="strainnum"> {{item.value}}</span> -->
												
												<img class="select-box select-box-unselect" src="static/img/strain/unsele_s.png" alt="">
												<span class="straincode">{{item.pointCode}}#:</span>V{{item.value}}<br />
												<span class="strainnum">
														T {{item.tem}} 
												</span>
											</div>
										</div>
									</div>
									<div id="table_r" style="height: 568px;width: 100%;display:none;">
										<div id="" style="margin-left: 5%;width: 90%;max-height: 650px;overflow-y:auto;margin-top: 30px;">
											<Table class="pointTable" stripe :columns="columns1" :data="monitorData"  @on-selection-change="selectionChange"></Table>
										</div>
									</div>
                 	 			</Row>
                			</div>
						</div>
					</div>
				</div>
				
				<div id="box3" style="display: none;background: #1E1E24;">
					
					<div id="" style="height:calc(100vh - 115px);width: 100%;">
						<div id="" style="height: 100%;width: 100%;">
							<div id="tab_select" style="height: 60px;width: 100%;text-align: center;color:#828099;">
								<div id="v_left"  @click="monAnalyse()" class="pointAnalyse" style="float: left;height: 60px;line-height: 60px;text-align: center;font-size: 18px;width: 200px;margin-left: 33%;cursor:pointer;">
									测点应力分析
									<!-- <p style="height: 3px;width: 100%;background: blue;"></p> -->
								</div>
								<div id="w_right"  @click="alarmAnalyse()" class=""  style="float: left;height: 60px;line-height: 60px;text-align: center;font-size: 18px;width: 200px;cursor:pointer;">
									测点预警分析
									<!-- <p style="height: 3px;width: 100%;background: blue;"></p> -->
								</div>
								<p style="float: left;background: #1E1E24;width: 96%;height: 1px;margin-left: 2%;"></p>
							</div>
							<div id="p_vibration" style="display: none;font-size: 12px;color: #C7CEF2;font-family:SimSun;">
								<div style="width: 100%;border-top: 1px solid #2E2C48;height:146px;">
									<div id="" style="width: 80%;float:left;border-top: 1px solid #2E2C48;border-bottom: 1px solid #2E2C48;padding-left: 2%;">
										<div id="legend3" style="float: left;height: 95px;width: 100%;background: #1E1E24;border-bottom: 1px solid #2E2C48;padding-top: 10px;">
											
											选择测点：
											<div class="bars" style="overflow: auto;padding-left:55px;margin-top: -20px;height: 85px;">
												<span @click="toggle1(index,$event,item.pointCode)" class="leg" v-for="(item,index) in monitorData" :class = "{select_active:index==legSpan}" :key="index">{{item.pointCode}}#：{{item.position}}</span>
											</div>
											<!-- <p @click="changeDiv()" id="more" style="width: 100%;height: 20px;line-height:20px;text-align: center;color: #1B86FF;cursor:pointer;"> 更多
												<img src="static/img/strain/unfold.png" alt="">
											</p> -->
											
										</div>
										<div id="pickType" style="float: left;height: 49px;width: 100%;">
											<!--选择曲线：实时曲线  历史曲线  选择日期：自 2018-05-01 至 2018-05-14-->
											<div id="" style="height: 49px;line-height: 49px;float: left;">
													选择曲线：<span class="nowTime type-active">实时曲线</span>&nbsp;
															<span class="overTime">历史曲线</span>
											</div>
											<div id="datePicker" style="height: 49px;line-height:49px;float: left;padding-left: 2%;">
												选择时间：<Date-picker id='timeStart' :value="startTime" @on-change="handleChange"  style="width: 120px;color:black;"></Date-picker>
														至&nbsp;<Date-picker id='timeEnd' :value="endTime" @on-change="handleChange1" style="width: 120px;color:black;"></Date-picker>
											</div>
											
										</div>
									</div>
									<div id="buttonSele" style="padding: 30px;float: right; width: 20%;height: 146px;text-align: center;border-left: 1px solid rgb(46,44,72);border-bottom: 1px solid rgb(46, 44, 72);border-top: 1px solid rgb(46, 44, 72);">
										<!-- <div id="starSys" @click="starSys1" style="margin: auto;margin-top: 27px;text-align: center;width: 100px;height: 30px;line-height: 30px;border-radius: 20px;background: #1B86FF;color: white;">
											开始分析
										</div> -->
										<Button @click="initLineEcharts()" type="primary" shape="circle" style="margin-top: 8px;width:100px;height:30px;">开始分析</Button>
										<Button id="replay" @click="replay()"  shape="circle" style="margin-top: 15px;width:100px;height:30px;">重置</Button>
									</div>

								</div>
								<div id="checked">
									<Checkbox-group v-model="checkbox1" class="checkbox-type">
										<Checkbox label="应力曲线"></Checkbox><img src="static/img/vib/vibLine.png" alt="">
										<Checkbox label="温度曲线"></Checkbox><img src="static/img/vib/tempLine.png" alt="">
									</Checkbox-group>
								</div>
								<div id="point_line" style="height: calc(100vh - 400px);width: 96%;margin-left: 2%;">
									<!--折线图-->
								</div>
							</div>
							<div id="p_warn" style="font-size: 12px;color: #C7CEF2;font-family:SimSun;">
								<div style="width: 100%;border-top: 1px solid #2E2C48;height:146px;">
									<div id="" style="width: 80%;float:left;border-top: 1px solid #2E2C48;border-bottom: 1px solid #2E2C48;padding-left: 2%;">
										<div id="legend3" style="float: left;height: 95px;width: 100%;background: #1E1E24;border-bottom: 1px solid #2E2C48;padding-top: 10px;">
											
											选择测点：
											<div class="bars1" style="overflow: auto;padding-left:55px;margin-top: -20px;height: 85px;">
												<span @click="toggle1(index,$event,item.pointCode)" class="leg1" v-for="(item,index) in monitorData" :key="index">{{item.pointCode}}#：{{item.position}}</span>
											</div>
											<!-- <p @click="changeDiv1()" id="more1" style="width: 100%;height: 20px;line-height:20px;text-align: center;color: #1B86FF;cursor:pointer;"> 更多
												<img src="static/img/strain/unfold.png" alt="">
											</p> -->
											
										</div>
										<div id="pickType" style="float: left;height: 49px;width: 100%;">
											<!--选择曲线：实时曲线  历史曲线  选择日期：自 2018-05-01 至 2018-05-14-->
											<div id="" style="height: 49px;line-height: 49px;float: left;">
													选择曲线：<span class="alarmNum type-active">预警次数分析</span>&nbsp;
															<span class="analyseTime">预警时长分析</span>
											</div>
											<div id="" style="height: 49px;line-height:49px;float: left;padding-left: 2%;">
												选择时间：<Date-picker id='timeStart' :value="startTime" @on-change="handleChange" style="width: 120px;color:black;"></Date-picker>
														至&nbsp;<Date-picker id='timeEnd' :value="endTime" @on-change="handleChange1"  style="width: 120px;color:black;"></Date-picker>
											</div>
										</div>
									</div>
									<div id="buttonSele" style="padding: 30px;float: right; width: 20%;height: 146px;text-align: center;border-left: 1px solid rgb(46,44,72);border-bottom: 1px solid rgb(46, 44, 72);border-top: 1px solid rgb(46, 44, 72);">
    
										<!-- <div id="starSys" @click="starSys1" style="margin: auto;margin-top: 27px;text-align: center;width: 100px;height: 30px;line-height: 30px;border-radius: 20px;background: #1B86FF;color: white;">
											开始分析
										</div> -->
										<Button @click="initLineEcharts1()" type="primary" shape="circle" style="margin-top: 8px;width:100px;height:30px;">开始分析</Button>
										<Button id="replay" @click="replay1()"  type="primary" shape="circle" style="margin-top: 15px;width:100px;height:30px;">重置</Button>
									</div>

								</div>
									<!-- <div id="legend3" style="height: 40px;line-height: 40px;width: 100%;margin-top: 20px;">
										<div id="">
											
											<ol style="float: left;margin-left: 40%;width: 90%;">
												
												<li style="float:left;width:12px;margin-left: 0%;margin-top: 14px; height:12px; background:rgba(239,216,59,1)"></li> 
												<span style="float: left;margin-left: 5px;">预警</span>
												<li style="float:left;width:12px;margin-left: 3%;margin-top: 14px; height:12px; background:rgba(255, 133, 44, 1)"> </li>
												<span style="float: left;margin-left: 5px;">报警</span>
												<li style="float:left;width:12px;margin-left: 3%;margin-top: 14px; height:12px; background:rgba(255, 70, 70, 1)"> </li>
												<span style="float: left;margin-left: 5px;">危险</span>
											</ol>
										</div>
										
									</div> -->
									<!--柱状图-->
									<div id="point_bar" style="height: calc(100vh - 400px);width:96%;margin-left:2%;">
										


									</div>
								
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			 <!-- right-dashboard -->
        <div class="right-dashboard">
            <div class="right-dashboard-title">
                <img src="../vibrationImg/early_warning.png"/>预警点信息
            </div>
            <div class="right-dashboard-info">
				<div class="tips" v-if="warnMsg == []">
					<img src='static/img/left/empty.png'>
					<span>暂无预警信息</span>
				</div>
                <div v-else class="unnormalTips" v-for="(item, index) in warnMsg" :key="index">
					<div class="icon">
						<div class="unnormalMsg">
							<span style="float:right;color: #8084A2;padding-right: 5px;">{{item.time}}</span>
							<p @click="switchButton($event,item.eqCode)" class="name">{{item.eqName}}</p>
							<p class="place">{{item.info}}</p>
						</div>
					</div>
				</div>
            </div>
            <div class="right-dashboard-title">
                <img src="../vibrationImg/alarm.png"/>报警点信息
            </div>
            <div class="right-dashboard-info">
				<div class="tips" v-if="alarmMsg == []">
					<img src='static/img/left/empty.png'>
					<span>暂无报警信息</span>
				</div>
				<div class="unnormalTips" v-for="(item, index) in alarmMsg" :key="index">
					<div class="icon">
						<div class="unnormalMsg">
							<span style="float:right;color: #8084A2;padding-right: 5px;">{{item.time}}</span>
							<p @click="switchButton($event,item.eqCode)" class="name">{{item.eqName}}</p>
							<p class="place">{{item.info}}</p>
						</div>
					</div>
				</div>
                 <!-- <div class="unnormalTips">
					<div class="icon">
						<div class="unnormalMsg">
						<p class="name">3#卸船机XC</p>
						<p class="place">开闭差动减速箱前开闭卷筒输出端Radical[Tach]</p>
						</div>
					</div>
				</div> -->
            </div>
            <div class="right-dashboard-title">
                <img src="../vibrationImg/danger.png"/>危险点信息
            </div>
            <div class="right-dashboard-info">
				<div class="tips" v-if="dangerMsg == []">
					<img src='static/img/left/empty.png'>
					<span>暂无危险信息</span>
				</div>
                 <div class="unnormalTips" v-for="(item, index) in dangerMsg" :key="index">
					<div class="icon">
						<div class="unnormalMsg">
							<span style="float:right;color: #8084A2;padding-right: 5px;">{{item.time}}</span>
							<p  @click="switchButton($event,item.eqCode)" class="name">{{item.eqName}}</p>
							<p class="place">{{item.info}}</p>
						</div>
					</div>
				</div>
            </div>
        </div>




      	
                  
    </div>

    
</div>
</template>





<script>
    import fetch from 'utils/fetch'
    import Vue from 'vue'
	import axios from 'axios'
	import echarts from 'echarts'
	// import MonChart from './charts/monChart';
    var timer = null;
	var data1 = [];
	var baseURL = process.env.BASE_API;
	var pointStr;
	var type,startTime,endTime;
	var pointArr = [];
	var pickPointArr = [];//选中的测点
	var timer1 = null;
export default {
	// components:{MonChart},
  	name: 'Yinglimonitor',
    data() {
		return {
			htmlTitle: '应力监测月度报告',
			selection:[],
			columns1: [
				{
					type: 'selection',
					width: 60,
					align: 'center',
					className: 'border-r'
				},
				{
					title: '测点编号',
					align: 'center',
					key: 'pointCode'
				},
				{
					title: '测点位置',
					width: 300,
					align: 'center',
					key: 'position'
				},
				{
					title: '应变(με)',
					align: 'center',
					key: 'value',
					render: (h, params) => {
						if (params.row.state == 2) {
							return h('span',{
                                style: { color: '#EFD83B' },
                            }, params.row.value);//给这个span写样式设置文字颜色
						}else if(params.row.state == 3){
							return h('span',{
                                style: { color: '#FF852C' },
                            }, params.row.value);//给这个span写样式设置文字颜色
						}else if(params.row.state == 4){
							return h('span',{
                                style: { color: '#FF4D4D' },
                            }, params.row.value);//给这个span写样式设置文字颜色
						}else {
							return h('span', params.row.value);;
						}
					}
				},
				{
					title: '温度(℃)',
					align: 'center',
					key: 'tem',
					render: (h, params) => {
						if (params.row.state == 2) {
							return h('span',{
                                style: { color: '#EFD83B' },
                            }, params.row.tem);//给这个span写样式设置文字颜色
						}else if(params.row.state == 3){
							return h('span',{
                                style: { color: '#FF852C' },
                            }, params.row.tem);//给这个span写样式设置文字颜色
						}else if(params.row.state == 4){
							return h('span',{
                                style: { color: '#FF4D4D' },
                            }, params.row.tem);//给这个span写样式设置文字颜色
						}else {
							return h('span', params.row.tem);;
						}
					}
				}
			],
			monitorData: [],
			eqInfoData: [],
			warnMsg:[],
			alarmMsg:[],
			dangerMsg:[],
			equipName1:"",
			equipName2:"",
			eqCode:"",//子系统节点编码
			eqName:"",
			startTime: '',
            endTime: '',
			month: "",
			monthData: {},
			legSpan: -1,
			checkbox1: ["应力曲线"],
			equipItem: {},
			pickerOptions:{
						disabledDate(time){
						//time.getTime()获取的是时间戳，可以随便玩啊。
						return  time.getTime() > Date.now()-(24*60*60*1000) || time.getTime() < (Date.now()-(30*24*60*60*1000));
						}
			},
			// 绘制图表
			option: {
				tooltip: {
					trigger: 'axis'
				},
				xAxis: [ // x轴
					{
						type: 'category', //类型
						boundaryGap: false,
						data: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'],
						axisLabel: {
							//x轴刻度配置
							interval: 100, // 0:表示全部显示不间隔  auto：表示根据刻度个数和宽度自动设置间隔个数
							// tooltip: {
							// 	show: true
							// }
						}
					}
				],
				yAxis: [{
					name: '（频率）',
					type: 'value',
					max: 100
				}, ],
				series: [{
						name: '震动频率',
						type: 'line', //折线图 
						tooltip: {
							trigger: 'axis'
						},
						smooth: true,
						itemStyle: {
							normal: {
								color: 'rgba(2, 197, 233, 0.2)',
								lineStyle: {
									color: 'rgba(23, 107, 203, 0.2)'
								},
								areaStyle: {
									color: 'rgba(223, 147, 233, 0.2)'
								}
							}
						},
						data: [10, 12, 21, 54, 60, 80, 71]
					},

				]
			},
			// 折线图数据
			option1: {
				title: {
					text: ''
				},
				tooltip: {
					trigger: 'axis',
					showContent: true
				},
				legend: {
					selectedMode: false, //取消点击事件
					data:[],
					top:'5%',
					textStyle: {
						color: '#C7CEF2'
					},
					show:true,
				},
				grid: {
					left: '3%',
					right: '3%',
					bottom: '3%',
					top:'20%',
					containLabel: true
				},
				// toolbox: {
				// 	feature: {
				// 		saveAsImage: {} //保存图片按钮
				// 	}
				// },
				xAxis: {
					type: 'category',
					nameTextStyle:{
						color:"#C7CEF2", 
					},
					axisLabel : {//坐标轴刻度标签的相关设置。
						textStyle: {color: '#C7CEF2'},
						formatter: function(val) {
							var strs = val.split(''); //字符串数组
							var str = ''
							for (var i = 0, s; s = strs[i++];) { //遍历字符串数组
							str += s;
							if (!(i % 10)) str += '\n'; //按需要求余
							}
							return str
						},
						
            		},
					
					axisTick: { //坐标轴刻度是否显示
						show: false
					},
					axisLine:{  //坐标轴样式
						lineStyle:{  
							color:'#2E2C48',  
							width:1,//这里是为了突出显示加上的  
						}  
					},
					boundaryGap: false,
					data: [],
				},
				yAxis: [
					{
						name: '单位:με',
						type: 'value',
						// max: 50
						nameTextStyle:{
							color:"#C7CEF2", 
						},
						axisLabel: { //坐标轴文字样式
							show: true,
							textStyle: {
								color: '#C7CEF2'
							},
							formatter: function (params) {
								var newParamsName = ""; // 最终拼接成的字符串
								var paramsNameNumber = params.length; // 实际标签的个数
								var provideNumber = 6; // 每行能显示的字的个数
								var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
								/**
								* 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
								*/
								// 条件等同于rowNumber>1
								if (paramsNameNumber > provideNumber) {
								/** 循环每一行,p表示行 */
								for (var p = 0; p < rowNumber; p++) {
								var tempStr = ""; // 表示每一次截取的字符串
								var start = p * provideNumber; // 开始截取的位置
								var end = start + provideNumber; // 结束截取的位置
								// 此处特殊处理最后一行的索引值
								if (p == rowNumber - 1) {
								// 最后一次不换行
								tempStr = params.substring(start, paramsNameNumber);
								} else {
								// 每一次拼接字符串并换行
								tempStr = params.substring(start, end) + "\n";
								}
								newParamsName += tempStr; // 最终拼成的字符串
								}
								} else {
								// 将旧标签的值赋给新标签
								newParamsName = params;
								}
								//将最终的字符串返回
								return newParamsName
							}
						},
						axisTick: { //坐标轴刻度是否显示
							show: false
						},
						axisLine:{  //坐标轴样式
							lineStyle:{  
								color:'#2E2C48',  
								width:1,//这里是为了突出显示加上的  
							}  
						},
						splitLine:{ //网格线样式
							show : true,
							lineStyle : {
							width : 1,
							color : '#2E2C48'
							}
						}
					},
					{
                        type: 'value',
                        name: '单位:℃',
                        // min: 0,
                        // max: 20,
                        nameTextStyle: {
                            color: "#C7CEF2",
                        },
						axisLabel: { //坐标轴文字样式
							show: true,
							textStyle: {
								color: '#C7CEF2'
							}
						},
						axisTick: { //坐标轴刻度是否显示
							show: false
						},
						axisLine: { //坐标轴样式
							lineStyle: {
								color: '#2E2C48',
								width: 1, //这里是为了突出显示加上的  
							}
						},
						splitLine: { //网格线样式
							show: true,
							lineStyle: {
								width: 1,
								color: '#2E2C48'
							}
						}
					}
				],
				dataZoom: [{
					type: 'inside',
					start: 0,
					end: 10
				}, {
					start: 0,
					end: 10,
					handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
					handleSize: '80%',
					handleStyle: {
						color: '#fff',
						shadowBlur: 3,
						shadowColor: 'rgba(0, 0, 0, 0.6)',
						shadowOffsetX: 2,
						shadowOffsetY: 2
					}
				}],
				color: ["#FF4646","#FF852C","#FFDE00","#8ACA00","#2AC527","#00E295","#00F1FA","#00AEFF","#3E67FF","#826DFF","#7E3FFF","#C446FF","#F347E9","#FF49A7","#78B7FF","#FF3B72"],
				// "#E467FF","#EE6F13","#E4C700","#78B7FF",
				series: [
					// {
					// 	name: '邮件营销',
					// 	type:'line',
					// 	stack: '总量',
					// 	smooth: true,
					// 	itemStyle: {
					// 		normal: {
					// 			color: '#E467FF',
					// 			lineStyle: {
					// 				color: '#E467FF'
					// 			},
					// 		}
					// 	},
					// 	data:[]
					// },
					// {
					// 	name:'联盟广告',
					// 	type:'line',
					// 	stack: '总量',
					// 	smooth: true,
					// 	itemStyle: {
					// 		normal: {
					// 			color: '#EE6F13',
					// 			lineStyle: {
					// 				color: '#EE6F13'
					// 			},
					// 		}
					// 	},
					// 	data:[]
					// },
					// {
					// 	name:'视频广告',
					// 	type:'line',
					// 	stack: '总量',
					// 	smooth: true,
					// 	itemStyle: {
					// 		normal: {
					// 			color: '#E4C700',
					// 			lineStyle: {
					// 				color: '#E4C700'
					// 			},
					// 		}
					// 	},
					// 	data:[]
					// },
					// {
					// 	name:'直接访问',
					// 	type:'line',
					// 	stack: '总量',
					// 	smooth: true,
					// 	itemStyle: {
					// 		normal: {
					// 			color: '#78B7FF',
					// 			lineStyle: {
					// 				color: '#78B7FF'
					// 			},
					// 		}
					// 	},
					// 	data:[]
					// },
					// {
					// 	name:'搜索引擎',
					// 	type:'line',
					// 	stack: '总量',
					// 	smooth: true,
					// 	itemStyle: {
					// 		normal: {
					// 			color: '#FF4646',
					// 			lineStyle: {
					// 				color: '#FF4646'
					// 			},
					// 		}
					// 	},
					// 	data:[]
					// }
				]
			},
			// 柱状图数据
			option2: {
				tooltip : {
					trigger: 'axis',
					axisPointer : {            // 坐标轴指示器，坐标轴触发有效
						type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				barGap:0.1,//每组柱状图之间的间距
				color:['#EFD83B','#FF852C','#FF4646'],
				legend: {
					selectedMode: false, //取消点击事件
					data:['预警','报警','危险'],
						top:'5%',
						textStyle: {
				            color: '#828099'          // 图例文字颜色
				        }
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top:'25%',
					containLabel: true
				},
				xAxis : {
					type : 'category',
					axisTick:{
						show:false
					},
					nameTextStyle:{
					color:"#C7CEF2", 
					},
					axisLabel: { //坐标轴文字样式
						show: true,
						textStyle: {
							color: '#C7CEF2'
						},
						interval: 0,
						formatter: function (params) {
							var newParamsName = ""; // 最终拼接成的字符串
							var paramsNameNumber = params.length; // 实际标签的个数
							var provideNumber = 7; // 每行能显示的字的个数
							var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
							/**
							* 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
							*/
							// 条件等同于rowNumber>1
							if (paramsNameNumber > provideNumber) {
							/** 循环每一行,p表示行 */
							for (var p = 0; p < rowNumber; p++) {
							var tempStr = ""; // 表示每一次截取的字符串
							var start = p * provideNumber; // 开始截取的位置
							var end = start + provideNumber; // 结束截取的位置
							// 此处特殊处理最后一行的索引值
							if (p == rowNumber - 1) {
							// 最后一次不换行
							tempStr = params.substring(start, paramsNameNumber);
							} else {
							// 每一次拼接字符串并换行
							tempStr = params.substring(start, end) + "\n";
							}
							newParamsName += tempStr; // 最终拼成的字符串
							}
							} else {
							// 将旧标签的值赋给新标签
							newParamsName = params;
							}
							//将最终的字符串返回
							return newParamsName
						}
					},
					axisTick: { //坐标轴刻度是否显示
						show: false
					},
					axisLine:{  //坐标轴样式
						lineStyle:{  
							color:'#2E2C48',  
							width:1,//这里是为了突出显示加上的  
						}  
					},
					data : []
				},
				yAxis :{
					name: '',
					type : 'value',
					nameTextStyle:{
						color:"#C7CEF2", 
					},
					axisLabel: { //坐标轴文字样式
						show: true,
						textStyle: {
							color: '#C7CEF2'
						},
						formatter: function (params) {
							var newParamsName = ""; // 最终拼接成的字符串
							var paramsNameNumber = params.length; // 实际标签的个数
							var provideNumber = 6; // 每行能显示的字的个数
							var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
							/**
							* 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
							*/
							// 条件等同于rowNumber>1
							if (paramsNameNumber > provideNumber) {
							/** 循环每一行,p表示行 */
							for (var p = 0; p < rowNumber; p++) {
							var tempStr = ""; // 表示每一次截取的字符串
							var start = p * provideNumber; // 开始截取的位置
							var end = start + provideNumber; // 结束截取的位置
							// 此处特殊处理最后一行的索引值
							if (p == rowNumber - 1) {
							// 最后一次不换行
							tempStr = params.substring(start, paramsNameNumber);
							} else {
							// 每一次拼接字符串并换行
							tempStr = params.substring(start, end) + "\n";
							}
							newParamsName += tempStr; // 最终拼成的字符串
							}
							} else {
							// 将旧标签的值赋给新标签
							newParamsName = params;
							}
							//将最终的字符串返回
							return newParamsName
						}
					},
					axisTick: { //坐标轴刻度是否显示
						show: false
					},
					axisLine:{  //坐标轴样式
						lineStyle:{  
							color:'#2E2C48',  
							width:1,//这里是为了突出显示加上的  
						}  
					},
					splitLine:{ //网格线样式
						show : true,
						lineStyle : {
						width : 1,
						color : '#2E2C48'
						}
					}
				},
				series : [
					{
						name:'预警',
						type:'bar',
						itemStyle: {
							normal: {
								color: '#EFD83B',
								lineStyle: {
									color: '#EFD83B'
								},
							}
						},
						data:[1, 3, 5, 7, 3, 2, 1]
					},
					{
						name:'报警',
						type:'bar',
						itemStyle: {
							normal: {
								color: '#FF852C',
								lineStyle: {
									color: '#FF852C'
								},
							}
						},
						data:[7, 3 ,1, 2, 1, 5, 4]
					},
					{
						name:'危险',
						type:'bar',
						itemStyle: {
							normal: {
								color: '#FF4646',
								lineStyle: {
									color: '#FF4646'
								},
							}
						},
						data:[8, 4, 2, 6, 2, 1, 1]
					}
				]
			},

		}
	},
	methods: {
		// 选择开始时间
		handleChange(date) {
			this.startTime = date;
		},
		// 选择结束时间
		handleChange1(date) {
			this.endTime = date;
		},
		// 月度分析报告选择月份
		handleChange2(date) {
			this.month = date;
		},
		
		//应力模块首页左侧部分
		sendPost(){
			//axios.post('server/server-post.php','name=Alex&age=26')  //1.自己拼接为键值对
			axios.post(baseURL + '/stMonitor.htm?param_act=stEquipNum',{  //2.使用transformRequest，在请求发送前将请求数据进行转换
				transformRequest:[
					function(data){
						let params='';
						for(let index in data){
							params+=index+'='+data[index]+'&'
						}
						return params;
					}
				]
			}).then(res => {
				// console.log('post发送Ajax请求,请求成功');
				console.log(res.data);
				$("#company").html(res.data.company);
				$("#eqNum").html(res.data.stEquipNum);
				$("#poNum").html(res.data.stPointNum);
				this.eqInfoData = res.data.eqInfo;
				// console.log(this.eqInfoData);

			}).catch(response => {
				console.log('post发送Ajax请求,请求失败',res)
			})   
		},
		//应力首页中间部分
		stEquipNum(){
			this.$nextTick(function(){
				fetch({
					headers: {
						'Content-Type': 'application/json'
						},
						baseURL:baseURL,
						url: '/stMonitor.htm?param_act=allEquipState',
						method:'get'
					}).then(res => {
						console.log(res.data.List);
						var arr = res.data.List;
						var bottomData = arr[0];
						this.equipName1 = bottomData.equipName;		
						var topData = arr[1];
						this.equipName2 = topData.equipName;							
						// 基于准备好的dom，初始化echarts实例 
						let myChart1 = echarts.init(document.getElementById('myChart1'));
						var a1 = bottomData.total;
						var detailMsg = bottomData.data[0];
						var total1 ={name:'监测点',value:a1};
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
								fontFamily: 'SimSun',
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
									fontSize: 24
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
								top:'18%',
								left:'65%',
								itemGap:20,
								textStyle:{color:'rgba(199,206,242,1)'},
								data:['正常','预警','报警','危险'],
								formatter: function(name) {
									if(name === '正常') {
										return name + "："+detailMsg.normal;
									} else if(name === '预警') {
										return name + "："+detailMsg.warn;
									}else if(name === '报警') {
										return name + "："+detailMsg.alarm;
									}else if(name === '危险') {
										return name + "："+detailMsg.danger;
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
											borderColor:'#2E2C48',
										},
										
									},
									labelLine: {
										normal: {
											show: false
										}
									},
									data:[
										{value:detailMsg.danger, name:'危险'},
										{value:detailMsg.alarm, name:'报警'},
										{value:detailMsg.warn, name:'预警'},
										{value:detailMsg.normal, name:'正常'}
							]
								}
							],
						})

						// 基于准备好的dom，初始化echarts实例
						let myChart2 = echarts.init(document.getElementById('myChart2'));
						var a2 =topData.total;
						var detailMsg2 = topData.data[0];
						var total2 ={name:'监测点',value:a2};
						// var arr = [3,4,5,1];
						// 绘制图表
						myChart2.setOption({
							title:[{
								text: total2.name,
								left: '29%',
								top: '40%',
								textAlign: 'center',
								textBaseline: 'middle',
								textStyle: {
									color: '#C7CEF2',
									fontWeight: 'normal',
									fontFamily: 'SimSun',
									fontSize: 14
								}
							}, {
								text: total2.value,
								left: '29%',
								top: '55%',
								textAlign: 'center',
								textBaseline: 'middle',
								textStyle: {
									color: '#C7CEF2',
									fontWeight: 'normal',
									fontSize: 24
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
								top:'18%',
								left:'65%',
								itemGap:20,
								textStyle:{color:'rgba(199,206,242,1)'},
								data:['正常','预警','报警','危险'],
								formatter: function(name) {
									if(name === '正常') {
										return name + "："+detailMsg2.normal;
									} else if(name === '预警') {
										return name + "："+detailMsg2.warn;
									}else if(name === '报警') {
										return name + "："+detailMsg2.alarm;
									}else if(name === '危险') {
										return name + "："+detailMsg2.danger;
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
											borderColor:'#2E2C48',
										},
										
									},
									labelLine: {
										normal: {
											show: false
										}
									},
									data:[
										{value:detailMsg2.danger, name:'危险'},
										{value:detailMsg2.alarm, name:'报警'},
										{value:detailMsg2.warn, name:'预警'},
										{value:detailMsg2.normal, name:'正常'}
									]
								}
							]
						});
					}).catch(res => {
						console.log('请求首页设备信息,请求失败',res)
					})  
				}) 
		},
		// 切换到设备点页面
		tabSwitch(eqCode,eqName){
			this.eqCode = eqCode;
			this.eqName = eqName;
			
			fetch({
				headers: {
					'Content-Type': 'application/json'
					},
					baseURL:baseURL,
					url: '/stMonitor.htm?param_act=singleEquipState&eqCode='+ this.eqCode,
					method:'get'
			}).then(res => {
				// console.log(res.data);
				if(res.data.err == "1"){
					this.monitorData = [];
					this.$alert(res.data.msg);
					return;
				}else{
					this.monitorData = res.data.List;  
					this.$nextTick(function(){
						for(var i=0;i<this.monitorData.length;i++){
							$(".strainDom").eq(i).removeClass("active");
							$(".strainDom").eq(i).find(".select-box").attr("src","static/img/strain/unsele_s.png");
							$(".strainDom").eq(i).css("bottom",this.monitorData[i].y);
							$(".strainDom").eq(i).css("left",this.monitorData[i].x);  
							if(this.monitorData[i].state == 1){
								$(".strainDom").eq(i).css("background", "#2E2C48")
								$(".strainDom").eq(i).css("color", "#C7CEF2")
							}else if(this.monitorData[i].state == 2){
								$(".strainDom").eq(i).css("background", "#EFD83B")
								$(".strainDom").eq(i).css("color", "#1E1E24")
							}else if(this.monitorData[i].state == 3){
								$(".strainDom").eq(i).css("background", "#FF852C")
								$(".strainDom").eq(i).css("color", "#1E1E24")
							}else if(this.monitorData[i].state == 4){
								$(".strainDom").eq(i).css("background", "#FF4D4D")
								$(".strainDom").eq(i).css("color", "#1E1E24")
							}                      
						}   
						this.addEventListenner();          
					})         
				}

			})
		},
		// 表格行 checkbox 状态发生变化触发
            selectionChange(selection) {
                debugger
				pickPointArr = [];
				pointArr = [];
                this.selection = selection;
                for(let i =0;i<this.selection.length;i++){
                    pickPointArr.push(this.selection[i].pointCode - 1);
                    pointArr.push(this.selection[i].pointCode);
                }
                if (pickPointArr.length > 0) {
					$('.analyse').addClass('btn-select');
					
				} else {
					$('.analyse').removeClass('btn-select');
				}
            },
		// 二级页面切换是否设备点是否选中状态
		toggle(event,index){
			event.currentTarget.classList.toggle("active");
			if (event.currentTarget.childNodes[0].getAttribute("src") == "static/img/strain/unsele_s.png") {
				event.currentTarget.childNodes[0].setAttribute("src",  "static/img/strain/sele_s.png"); 
				
				pickPointArr.push(index);
				// console.log(pointCode);
			} else { 
				event.currentTarget.childNodes[0].setAttribute("src", "static/img/strain/unsele_s.png");  
				pickPointArr.splice(index,1);
			}
			this.addEventListenner();
		},
		// echarts图表页面设备点选中切换
		toggle1(index,event,code){
			if(this.checkbox1.length > 1){
				$(".leg").removeClass("select_active");
                     event.currentTarget.classList.toggle("select_active");
					pointArr = [];
                    this.legSpan = index;   
                    
                }else if(this.checkbox1.length = 1){
					event.currentTarget.classList.toggle("select_active");

                }
		},

		//监听
		addEventListenner(){
			if ($(".imgs>.active").length > 0) {
				$('.analyse').addClass('btn-select');
				
			} else {
				$('.analyse').removeClass('btn-select');
			}
		},
		// 应力首页右侧报警部分
		reqAlarm(){
			fetch({
				headers: {
					'Content-Type': 'application/json'
					},
					baseURL:baseURL,
					url: '/stMonitor.htm?param_act=stExpArea',
					method:'get'
				}).then(res => {
					if(res.data != undefined && res.data !=""){
						var obj = res.data.List[0];		
						this.warnMsg = obj.warn;
						this.alarmMsg = obj.alarm;
						this.dangerMsg = obj.danger;
					}
				}).catch(res => {
					console.log('请求右侧报警信息,请求失败',res)
				})   
		},
		//格式化日期
		formatDate(date) {
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			m = m < 10 ? '0' + m : m;
			var d = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			return y + '-' + m + '-' + d;
		},
		// 点击右侧报警信息切换左侧选中按钮
		switchButton(e,eqCode){
			// var _that = this;
			this.eqCode = eqCode;
			var partNameRight = e.currentTarget.innerHTML;
			var partNameLeft = $('.equ');
			for (var i = 0; i < partNameLeft.length; i++) {
				var partNameText = partNameLeft.eq(i).text().trim();
				if (partNameText == partNameRight) {
					partNameLeft.eq(i).addClass('left-dashboard-nav-active');
					partNameLeft.eq(i).siblings().removeClass('left-dashboard-nav-active');
					$('#treeName').text(partNameText);
					$('.leg').removeClass('select_active');
					$('.leg1').removeClass('select_active');
					// var inxx = $(this).index();
						// $('.main-part-content').eq(inxx).removeClass('hide');
						// $('.main-part-content').eq(inxx).siblings('.main-part-content').addClass('hide');
					if (i != 0) {
						$("#box1").hide();
						$("#box2").show();
						$("#box3").hide();
						$(".monDetail").show();
						debugger
						// var monTitle = ;
						// document.getElementById("monTitle").innerHTML= $(this).text() + "(实时监测)";
						$("#monTitle").html(partNameText+ "(图形监测)");
						$("#table_monitor").html(partNameText+ "(列表监测)");
						
						if($("#monTitle").html().indexOf("门机下部运行部分") != -1 ){
							var imgPath = 'static/img/vibbottom.png';
							$("#background").attr("src", imgPath);
						}else if($("#monTitle").html().indexOf("门机上部旋转部分") != -1 ){
						var imgPath = 'static/img/vibtop.png';
							$("#background").attr("src", imgPath);
						}else{
							var imgPath = '';
							$("#background").attr("src", imgPath);
						}
					}
					
				}
			}
			
			fetch({
				headers: {
					'Content-Type': 'application/json'
					},
					baseURL:baseURL,
					url: '/stMonitor.htm?param_act=singleEquipState&eqCode='+ this.eqCode,
					// url: '/stMonitor.htm?param_act=singleEquipState&eqCode=1000010301',
					method:'get'
			}).then(res => {
				// console.log(res.data);
				if(res.data.err == "1"){
					_that.monitorData = [];
					_that.$alert(res.data.msg);
					return;
				}else{
					this.monitorData = res.data.List;  
					console.log(this.monitorData);
					this.$nextTick(function(){
						for(var i=0;i<this.monitorData.length;i++){
							$(".strainDom").eq(i).removeClass("active");
							$(".strainDom").eq(i).find(".select-box").attr("src","static/img/strain/unsele_s.png");
							$(".strainDom").eq(i).css("bottom",this.monitorData[i].y);
							$(".strainDom").eq(i).css("left",this.monitorData[i].x);  
							if(this.monitorData[i].state == 1){
								$(".strainDom").eq(i).css("background", "#2E2C48")
								$(".strainDom").eq(i).css("color", "#C7CEF2")
							}else if(this.monitorData[i].state == 2){
								$(".strainDom").eq(i).css("background", "#EFD83B")
								$(".strainDom").eq(i).css("color", "#1E1E24")
							}else if(this.monitorData[i].state == 3){
								$(".strainDom").eq(i).css("background", "#FF852C")
								$(".strainDom").eq(i).css("color", "#1E1E24")
							}else if(this.monitorData[i].state == 4){
								$(".strainDom").eq(i).css("background", "#FF4D4D")
								$(".strainDom").eq(i).css("color", "#1E1E24")
							}                      
						}   
						this.addEventListenner();          
					})         
				}

			}).catch(res =>{
				this.$alert(res.data.msg);
			})
		},
		// 初始化折线图
		monAnalyse(){
			$('.leg').removeClass('select_active');
			$('.leg1').removeClass('select_active');
			$(".nowTime").addClass("type-active");
			$(".overTime").removeClass("type-active");
			$("#box1").hide();
			$("#box2").hide();
			$("#box3").show();
			$("#p_vibration").show();
			$("#p_warn").hide();
			$("#v_left").addClass("pointAnalyse");
			$("#w_right").removeClass("pointAnalyse");
			$("#datePicker").hide();
			pointArr = [];
			document.getElementById("treeName").innerHTML= this.eqName + '&nbsp>&nbsp测点应力分析';
			this.option1.legend.data = [];
			this.option1.series = [];
			//用于使chart自适应高度和宽度
			this.changEcharts();
			// 使用刚指定的配置项和数据显示图表。
			this.monLine = echarts.init(document.getElementById('point_line'));
			this.monLine.setOption(this.option1,true);
		},
		alarmAnalyse(){
			$('.leg').removeClass('select_active');
			$('.leg1').removeClass('select_active');
			$(".alarmNum").addClass("type-active");
			$(".analyseTime").removeClass("type-active");
			$("#box1").hide();
			$("#box2").hide();
			$("#box3").show();
			$("#p_vibration").hide();
			$("#p_warn").show();
			$("#w_right").addClass("pointAnalyse");
			$("#v_left").removeClass("pointAnalyse");
			pointArr = [];
			document.getElementById("treeName").innerHTML= this.eqName + '&nbsp>&nbsp测点预警分析';
			this.option2.xAxis.data = [];
			this.option2.series[0].data = [];
			this.option2.series[1].data = [];
			this.option2.series[2].data = [];
			//用于使chart自适应高度和宽度
			this.changEcharts1();
			// 使用刚指定的配置项和数据显示图表。
			this.alarmBar = echarts.init(document.getElementById('point_bar'));
			this.alarmBar.setOption(this.option2,true);
		},
		// 初始化折线图
		change1(){
			//未选中监测点时不跳转
			if($('.analyse').hasClass('btn-select') == false){
				this.$alert("请选中监测点");
				return;
			}
			debugger
			if($("#monitor").is(':hidden') == false){
				var length = $(".imgs>.active").length;
					for(var i= 0;i<length;i++){
						var str = $(".imgs>.active").find(".straincode").text().split("#:") + "";
					}
				pointStr = str.substring(0,str.length - 1);
			} else if($("#table_r").is(':hidden') == false){
				pointStr = pointArr.join(",");
			}
			$("#box1").hide();
			$("#box2").hide();
			$("#box3").show();
			$("#p_vibration").show();
			$("#p_warn").hide();
			$("#v_left").addClass("pointAnalyse");
			$("#w_right").removeClass("pointAnalyse");
			//给选中的测点添加样式
			for(var a in pickPointArr){
				$('.leg').eq(pickPointArr[a]).addClass('select_active');
			}
			// $('.leg').removeClass('select_active');
			$(".nowTime").addClass("type-active");
			$(".overTime").removeClass("type-active");
			
			this.checkbox1 = ["应力曲线"];
			// pointArr = [];
			document.getElementById("treeName").innerHTML= this.eqName + '&nbsp>&nbsp测点应力分析';
			if($(".nowTime").hasClass("type-active")){
				type = "today";
				var today=new Date();  
				this.startTime=this.formatDate(today);   
				this.endTime=this.formatDate(today);  
				$("#datePicker").hide();
			}else if($(".analyseTime").hasClass("type-active")){
				type = "history";
				startTime=this.startTime;   
				endTime=this.endTime;   
				$("#datePicker").show();
			}
			// if ($("#allEq").is(':hidden') == false && $('.strainDom').hasClass('active') == false) {
            //         niutong.$alert("请选中监测点");
            //         return;
            //     } else if($("#table_r").is(':hidden') == false && niutong.selection.length == 0){
            //         niutong.$alert("请选中监测点");
            //         return;
			//     }
			
			// pointStr = pointStr.replace(/[\s\S]/g, "*");
			console.log(pointStr);
			
			
			
			//异步请求折线图
			this.$nextTick(function(){
				fetch({
					headers: {
						'Content-Type': 'application/json'
						},
						baseURL:baseURL,
						// url: '/stMonitor.htm?param_act=recordAnalysis&type='+ type +'&pointCode='+ pointStr + '&start=2018-06-06&end=2018-06-07',
						url: '/stMonitor.htm?param_act=recordAnalysis&type='+ type +'&pointCode='+ pointStr + '&start='+ this.startTime + '&end=' + this.endTime,
						method:'get'
				}).then(res => {
					debugger
					console.log(res.data)
					if(res.data != undefined && res.data !=""){
						this.option1.xAxis.data = res.data.time;
						this.option1.series = [];
						var arr = res.data.data;
						// var timeArr = [];
						// var	obj = arr.point;
						for(var j=0;j<arr.length;j++){
							// this.option1.series[j].name = arr[j].point + "号测点位置";
							this.option1.legend.data.push(arr[j].point + "号测点位置");
							if(arr[j].data.length != 0 && pickPointArr.length == 1)	{
								this.option1.series.push({
									name:arr[j].point + "号测点位置",
									type: 'line',
									smooth: true,
									data: arr[j].data,
									markLine: {
                                        data : [
                                            {
                                                name: '预警值',
                                                yAxis: arr[j].warn,
                                                //lineStyle: { type: 'solid',color:'orange' }
                                                itemStyle: {
                                                    normal: { lineStyle: { type: 'solid',color:'#b8af20'},label: { show: true, position:'middle'} }
                                                }
                                            },
                                            {
                                                name: '报警值',
                                                yAxis: arr[j].alarm,
                                                //lineStyle: { type: 'solid',color:'red' }
                                                itemStyle: {
                                                    normal: { lineStyle: { type: 'solid',color:'#c57815'},label: { show: true, position:'middle'} }
                                                }
                                            },
                                            {
                                                name: '危险值',
                                                yAxis: arr[j].danger,
                                                // lineStyle: { type: 'solid',color:'black'}
                                                itemStyle: {
                                                    normal: { lineStyle: { type: 'solid',color:'#b41d1d'},label: { show: true, position:'middle'} }
                                                }
                                            }

                                        ]
                                    }
								});
							}else if(pickPointArr.length > 1){
								this.option1.series.push({
									name:arr[j].point + "号测点位置",
									type: 'line',
									smooth: true,
									data: arr[j].data,
								});
							}else{
								this.$alert("该测点暂无应力值！")
							}

						}
						//用于使chart自适应高度和宽度
						this.changEcharts();
						// 使用刚指定的配置项和数据显示图表。
						this.monLine = echarts.init(document.getElementById('point_line'));
						this.monLine.setOption(this.option1,true);
						
					}else if(res.data.List == undefined && res.data.err == "1"){
						this.$alert(res.data.msg);
					}
				}).catch(res => {
					console.log('请求测点应力信息,请求失败',res)
				})   

			})

			

			

		},
		//用于使chart自适应高度和宽度
		changEcharts() {  
			window.addEventListener('resize', ()=> {  
			this.monLine.resize();  
			// this.alarmBar.resize();  
			});
		},
		//用于使chart自适应高度和宽度
		changEcharts1() {  
			window.addEventListener('resize', ()=> {  
			// this.monLine.resize();  
			this.alarmBar.resize();  
			});
		},
		// 初始化柱状图
		change2(){
			if($('.analyse').hasClass('btn-select') == false){
				// return false;
				this.$alert("请选中监测点");
				return;
			}
			$("#box1").hide();
			$("#box2").hide();
			$("#box3").show();
			$("#p_vibration").hide();
			$("#p_warn").show();
			$("#w_right").addClass("pointAnalyse");
			$("#v_left").removeClass("pointAnalyse");
			//给选中的测点添加样式
			for(var a in pickPointArr){
				$('.leg1').eq(pickPointArr[a]).addClass('select_active');
			}
			// $('.leg').removeClass('select_active');
			$(".alarmNum").addClass("type-active");
			$(".analyseTime").removeClass("type-active");
			// pointArr = [];
			this.checkbox1 = ["应力曲线"];
			document.getElementById("treeName").innerHTML= this.eqName + '&nbsp>&nbsp测点预警分析';
			if($(".alarmNum").hasClass("type-active")){
				type = "times";
			}else if($(".overTime").hasClass("type-active")){
				type = "hours";
			}
			startTime=this.startTime;   
			endTime=this.endTime;   
			
			var length = $(".imgs>.active").length;
				for(var i= 0;i<length;i++){
					var str = $(".imgs>.active").find(".straincode").text().split("#:") + "";
				}
			pointStr = str.substring(0,str.length - 1);
			// pointStr = pointStr.replace(/[\s\S]/g, "*");
			console.log(pointStr);
			
			
			//异步请求折线图
			this.$nextTick(function(){
				fetch({
					headers: {
						'Content-Type': 'application/json'
						},
						baseURL:baseURL,
						// url: '/stMonitor.htm?param_act=warnningAnalysis&type='+ type +'&pointCode='+ pointStr + '&start=2018-05-16&end=2018-05-17',
						url: '/stMonitor.htm?param_act=warnningAnalysis&type='+ type +'&pointCode='+ pointStr + '&start='+ this.startTime + '&end=' + this.endTime,
						method:'get'
				}).then(res => {
					console.log(res.data)
					if(res.data != undefined && res.data !=""){
						this.option2.xAxis.data = [];
						var arr = res.data.List;
						var warnArr = [];
						var alarmArr = [];
						var dangerArr = [];
						for(var j=0;j<arr.length;j++){	
							// this.option1.legend.data.push(arr[j].point + "号测点位置");
							this.option2.xAxis.data.push(arr[j].point);
							warnArr.push(arr[j].warn);
							alarmArr.push(arr[j].alarm);
							dangerArr.push(arr[j].danger);
							this.option2.series[0].data = warnArr;
							this.option2.series[1].data = alarmArr;
							this.option2.series[2].data = dangerArr;

						}
						//用于使chart自适应高度和宽度
						this.changEcharts1();
						// 使用刚指定的配置项和数据显示图表。
						this.alarmBar = echarts.init(document.getElementById('point_bar'));
						this.alarmBar.setOption(this.option2,true);
						
						
					}else if(res.data.List == undefined && res.data.err == "1"){
						this.$alert(res.data.msg);
					}
				}).catch(res => {
					console.log('请求测点报警信息,请求失败',res)
				})   
			})   

			
			
		},

		//控制选择测点的div的高度
		changeDiv(){
			//如果div是显示的话就隐藏，否则就显示
			if($(".bars").css("height")=="28px"){
				$(".bars").css("height","75px");
				$(".bars").css("overflow","auto");
				document.getElementById("more").innerHTML = '收起 <img src="static/img/strain/fold.png" alt="">';
				//document.getElementById("more").style.marginBottom = 0;
			}else if($(".bars").css("height")=="75px"){
				$(".bars").css("height","28px");
				$(".bars").css("overflow","hidden");
				document.getElementById("more").innerHTML = '更多 <img src="static/img/strain/unfold.png" alt="">';
			
			}
		},
		changeDiv1(){
			if($(".bars1").css("height")=="28px"){
				$(".bars1").css("height","75px");
				$(".bars1").css("overflow","auto");
				document.getElementById("more1").innerHTML = '收起 <img src="static/img/strain/fold.png" alt="">';
				//document.getElementById("more").style.marginBottom = 0;
			}else if($(".bars1").css("height")=="75px"){
				$(".bars1").css("height","28px");
				$(".bars1").css("overflow","hidden");
				document.getElementById("more1").innerHTML = '更多 <img src="static/img/strain/unfold.png" alt="">';
			
			}
		},

		//月度报告表
		monthTable(){
			var _this = this;
			var options=$("#selected option:selected").val(); //获取选中的项
			fetch({
				headers: {
					'Content-Type': 'application/json'
					},
					baseURL:baseURL,
					// url:"/stMonitor.htm?param_act=stMonthReport&eqId=01001&date=2018-06",
					url:"/stMonitor.htm?param_act=stMonthReport&eqId="+ options +"&date=" + _this.month,
					method:'get'
			}).then(res => {
				console.log(res.data)
				this.monthData = res.data;
			}).catch(res => {
				console.log('请求月度预警报告信息,请求失败',res)
			})   
		},

		//开始分析折线图重绘
		initLineEcharts(){
			pointArr = [];
			for(var i=0;i<this.monitorData.length;i++){
				if($(".leg").eq(i).hasClass('select_active') && $.inArray(this.monitorData[i].pointCode,pointArr) == -1){
					pointArr.push(this.monitorData[i].pointCode);
				};

			};
			if(pointArr.length == 0){
				this.$alert("请选中监测点");
				return;
			}else if(pointArr.length >1 && this.checkbox1.length >1){
				this.$alert("当需要同时展示振动曲线和温度曲线时，只能选择一个测点！");
				return;
			};
			pointStr = pointArr.join(",");
			// pointStr = pointStr.replace(/[\s\S]/g, "*");
			console.log(pointStr);
			if($(".nowTime").hasClass("type-active")){
				type = "today";
				var today=new Date();   
				this.startTime=this.formatDate(today);   
				this.endTime=this.formatDate(today);  
			}else if($(".overTime").hasClass("type-active")){
				type = "history";
				startTime=this.startTime;   
				endTime=this.endTime;   
			}
			
			
			//异步请求折线图
			this.$nextTick(function(){
				fetch({
					headers: {
						'Content-Type': 'application/json'
						},
						baseURL:baseURL,
						// url: '/stMonitor.htm?param_act=recordAnalysis&type='+ type +'&pointCode='+ pointStr + '&start=2018-06-06&end=2018-06-07',
						url: '/stMonitor.htm?param_act=recordAnalysis&type='+ type +'&pointCode='+ pointStr + '&start='+ this.startTime + '&end=' + this.endTime,
						method:'get'
				}).then(res => {
					console.log(res.data)
					if(res.data != undefined && res.data !=""){
						this.option1.xAxis.data = res.data.time;
						this.option1.series = [];
						var arr = res.data.data;
						var pointSeries = new Object();

						for(var j=0;j<arr.length;j++){
							this.option1.legend.data.push(arr[j].point + "号测点位置");
							
							if(arr[j].data.length != 0)	{
								// var stData = arr[j].data;//应力振动值
								// var tempData = arr[j].temperData;//温度值 
								//判断展示应力值还是温度值
								if(this.checkbox1.length > 1 && pointArr.length == 1){
									this.option1.series.push({
										name:arr[j].point + "#振动值",
										type: 'line',
										smooth: true,
										// stack: '总量',
										data: arr[j].data, 
										markLine: {
											data : [
												{
													name: '预警值',
													yAxis: arr[j].warn,
													//lineStyle: { type: 'solid',color:'orange' }
													itemStyle: {
														normal: { lineStyle: { type: 'solid',color:'#b8af20'},label: { show: true, position:'middle'} }
													}
												},
												{
													name: '报警值',
													yAxis: arr[j].alarm,
													//lineStyle: { type: 'solid',color:'red' }
													itemStyle: {
														normal: { lineStyle: { type: 'solid',color:'#c57815'},label: { show: true, position:'middle'} }
													}
												},
												{
													name: '危险值',
													yAxis: arr[j].danger,
													// lineStyle: { type: 'solid',color:'black'}
													itemStyle: {
														normal: { lineStyle: { type: 'solid',color:'#b41d1d'},label: { show: true, position:'middle'} }
													}
												}

											]
										},
									});
									this.option1.series.push({
										name:arr[j].point + "#温度值",
										type: 'line',
										yAxisIndex: 1,
										smooth: true, //这句就是让曲线变平滑的
										itemStyle:{
											normal:{
												lineStyle:{
													width:2,
													type:'dotted'  //'dotted'虚线 'solid'实线
												}
											}
										},
										data: arr[j].temperData 
									});
								}else if(this.checkbox1[0] == "应力曲线" && this.checkbox1.length == 1){
									//根据选择测点数判断是否展示报警标线
									if(pointArr.length == 1){
										debugger
										pointSeries = {
											name:arr[j].point + "号测点位置",
											type: 'line',
											smooth: true,
											// stack: '总量',
											data: arr[j].data, 
											markLine: {
												data : [
													{
														name: '预警值',
														yAxis: arr[j].warn,
														//lineStyle: { type: 'solid',color:'orange' }
														itemStyle: {
															normal: { lineStyle: { type: 'solid',color:'#b8af20'},label: { show: true, position:'middle'} }
														}
													},
													{
														name: '报警值',
														yAxis: arr[j].alarm,
														//lineStyle: { type: 'solid',color:'red' }
														itemStyle: {
															normal: { lineStyle: { type: 'solid',color:'#c57815'},label: { show: true, position:'middle'} }
														}
													},
													{
														name: '危险值',
														yAxis: arr[j].danger,
														// lineStyle: { type: 'solid',color:'black'}
														itemStyle: {
															normal: { lineStyle: { type: 'solid',color:'#b41d1d'},label: { show: true, position:'middle'} }
														}
													}
			
												]
											},
										}
									}else if(pointArr.length > 1){
										pointSeries = {
											name:arr[j].point + "号测点位置",
											type: 'line',
											smooth: true,
											// stack: '总量',
											data: arr[j].data 
										}

									}
									this.option1.series.push(pointSeries);
									// 	name:arr[j].point + "号测点位置",
									// 	type: 'line',
									// 	smooth: true,
									// 	// stack: '总量',
									// 	data: arr[j].data 
									// });
								}else if(this.checkbox1[0] == "温度曲线" && this.checkbox1.length == 1){
									this.option1.series.push({
										name:arr[j].point + "号测点位置",
										type: 'line',
										yAxisIndex: 1,
										smooth: true, //这句就是让曲线变平滑的
										itemStyle:{
											normal:{
												lineStyle:{
													width:2,
													type:'dotted'  //'dotted'虚线 'solid'实线
												}
											}
										},
										data: arr[j].temperData 
									});
								};
							}else{
								this.$alert("该测点暂无应力值！")
							}

						}
						//用于使chart自适应高度和宽度
						this.changEcharts();
						// 使用刚指定的配置项和数据显示图表。
						this.monLine = echarts.init(document.getElementById('point_line'));
						this.monLine.setOption(this.option1,true);
						
					}else if(res.data.List == undefined && res.data.err == "1"){
						debugger
						this.$alert(res.data.msg);
					}
				}).catch(res => {
					console.log('请求测点振动信息,请求失败',res)
				})   

			})

		},

		//开始分析折线图重绘
		initLineEcharts1(){
			pointArr = [];
			for(var i=0;i<this.monitorData.length;i++){
				if($(".leg1").eq(i).hasClass('select_active') && $.inArray(this.monitorData[i].pointCode,pointArr) == -1){
					pointArr.push(this.monitorData[i].pointCode);
				};

			};
			if(pointArr.length == 0){
				this.$alert("请选中监测点");
				return;
			}
			pointStr = pointArr.join(",");
			// pointStr = pointStr.replace(/[\s\S]/g, "*");
			console.log(pointStr);
			if($(".alarmNum").hasClass("type-active")){
				type = "times";
				this.option2.yAxis.name = '单位：次';
				
			}else if($(".analyseTime").hasClass("type-active")){
				type = "hours";
				this.option2.yAxis.name = '单位：分钟';
			}
			startTime=this.startTime;   
			endTime=this.endTime;   

			//异步请求折线图
			this.$nextTick(function(){
				fetch({
					headers: {
						'Content-Type': 'application/json'
						},
						baseURL:baseURL,
						// url: '/stMonitor.htm?param_act=warnningAnalysis&type='+ type +'&pointCode='+ pointStr + '&start=2018-05-16&end=2018-05-17',
						url: '/stMonitor.htm?param_act=warnningAnalysis&type='+ type +'&pointCode='+ pointStr + '&start='+ this.startTime + '&end=' + this.endTime,
						method:'get'
				}).then(res => {
					console.log(res.data)
					if(res.data != undefined && res.data !=""){
						this.option2.xAxis.data = [];
						var arr = res.data.List;
						var warnArr = [];
						var alarmArr = [];
						var dangerArr = [];
						for(var j=0;j<arr.length;j++){	
							// this.option1.legend.data.push(arr[j].point + "号测点位置");
							this.option2.xAxis.data.push(arr[j].point);
							warnArr.push(arr[j].warn);
							alarmArr.push(arr[j].alarm);
							dangerArr.push(arr[j].danger);
							this.option2.series[0].data = warnArr;
							this.option2.series[1].data = alarmArr;
							this.option2.series[2].data = dangerArr;

						}
						//用于使chart自适应高度和宽度
						this.changEcharts1();
						// 使用刚指定的配置项和数据显示图表。
						this.alarmBar = echarts.init(document.getElementById('point_bar'));
						this.alarmBar.setOption(this.option2,true);
						
						
					}else if(res.data.List == undefined && res.data.err == "1"){
						this.$alert(res.data.msg);
					}
				}).catch(res => {
					console.log('请求测点报警信息,请求失败',res)
				})   
			})  

		},
		// 重置
		replay(){
			$('.leg').removeClass('select_active');
			pointArr = [];
		},
		replay1(){
			$('.leg1').removeClass('select_active');
			pointArr = [];
		},
		myhaldle(){
			alert(1);
		},

	},
	created(){
		bus.$on("equipData", (equipItem) =>{
			this.equipItem = equipItem;
			// console.log(this.equipItem + "这是从上个页面传的值");
		})
	},
	mounted() {
		//首页右侧报警传值
		
		// var that= this;
		$("#treeAll").on("click",function(){
				document.getElementById("treeName").innerHTML= '设备监控子系统';
				$("#box1").show();
				$("#box2").hide();
				$("#box3").hide();
				
			});
		
		// 左侧边栏点击变色
		$('#pick').on('click','.equ',function () {
			
			$(this).addClass('left-dashboard-nav-active');
			$(this).siblings().removeClass('left-dashboard-nav-active');
			$('#treeName').text($(this).text());
			pickPointArr = [];
			$('.leg').removeClass('select_active');
			$('.leg1').removeClass('select_active');
			var inxx = $(this).index();
				// $('.main-part-content').eq(inxx).removeClass('hide');
				// $('.main-part-content').eq(inxx).siblings('.main-part-content').addClass('hide');
			if (inxx != 0) {
				$("#box1").hide();
				$("#box2").show();
				$("#box3").hide();
				$(".monDetail").show();
				// var monTitle = ;
				// document.getElementById("monTitle").innerHTML= $(this).text() + "(实时监测)";
				$("#monTitle").html($(this).text() + "(图形监测)");
				$("#table_monitor").html($(this).text()+ "(列表监测)");
				if($("#monTitle").html().indexOf("门机下部运行部分") != -1 ){
					var imgPath = 'static/img/vibbottom.png';
					$("#background").attr("src", imgPath);
				}else if($("#monTitle").html().indexOf("门机上部旋转部分") != -1 ){
				var imgPath = 'static/img/vibtop.png';
					$("#background").attr("src", imgPath);
				}else{
					var imgPath = '';
					$("#background").attr("src", imgPath);
				}
				
				
			}

		});

		//全部设备与月度报告
		$("#month_R").on("click",function(){
			$("#line_r").show();
			$("#all_e1").hide();
			$("#box2").hide();
			$("#box3").hide();
			$("#one_L").hide();
			$("#two_L").show();
			$("#month_R").css("color","#C7CEF2");
			$("#all_Pie").css("color","#828099");
		});
		$("#all_Pie").on("click",function(){
			$("#line_r").hide();
			$("#all_e1").show();
			$("#box2").hide();
			$("#box3").hide();
			$("#one_L").show();
			$("#two_L").hide();
			$("#all_Pie").css("color","#C7CEF2");
			$("#month_R").css("color","#828099");
		})
		//图形监测与列表监测
            $("#table_monitor").on("click", function() {
                $("#table_r").show();
                $("#monitor").hide();
                $("#equip_L").hide();
                $("#table_L").show();
				$('.analyse').removeClass('btn-select');
				$("#table_monitor").css("color","#C7CEF2");
				$("#monTitle").css("color","#828099");
            });
            $("#monTitle").on("click", function() {
                $("#table_r").hide();
                $("#monitor").show();
                $("#equip_L").show();
				$("#table_L").hide();
				$("#monTitle").css("color","#C7CEF2");
				$("#table_monitor").css("color","#828099");
            })
		
		$('.charts').on('resize', function () {
			this.monLine.resize();
		});
		// 实时曲线和历史曲线切换
		$(".nowTime").on("click",function(){
			$(".nowTime").addClass("type-active");
			$(".overTime").removeClass("type-active");
			$("#datePicker").hide();
		})
		$(".overTime").on("click",function(){
			$(".overTime").addClass("type-active");
			$(".nowTime").removeClass("type-active");
			$("#datePicker").show();
		})
		// 预警次数和预警时长分析切换
		$(".alarmNum").on("click",function(){
			$(".alarmNum").addClass("type-active");
			$(".analyseTime").removeClass("type-active");
		})
		$(".analyseTime").on("click",function(){
			$(".analyseTime").addClass("type-active");
			$(".alarmNum").removeClass("type-active");
		})
		
		var today=new Date();   
		this.startTime=this.formatDate(today);   
		this.endTime=this.formatDate(today);  
		this.month=today.getFullYear()+'-'+ '0' + (today.getMonth());  
			this.sendPost();
			this.stEquipNum();
			this.reqAlarm();
			this.monthTable();
		//var baseURL = process.env.NODE_ENV === "production"?process.env.BASE_API:'/prod';

			setTimeout(() =>{

				// this.myhaldle(
					
					for(var i in this.eqInfoData){
						this.eqCode = this.equipItem.code;
						if(this.eqInfoData[i].eqCode.indexOf(this.equipItem.code) != -1){
							$(".equ").removeClass('left-dashboard-nav-active');
							$(".equ").eq(++i).addClass("left-dashboard-nav-active");
							$('#treeName').text(this.equipItem.name);
							// pickPointArr = [];
							// $('.leg').removeClass('select_active');
							// $('.leg1').removeClass('select_active');
							// var inxx = $(this).index();
							// 	// $('.main-part-content').eq(inxx).removeClass('hide');
							// 	// $('.main-part-content').eq(inxx).siblings('.main-part-content').addClass('hide');
							// if (inxx != 0) {
								$("#box1").hide();
								$("#box2").show();
								$("#box3").hide();
								$(".monDetail").show();
								// var monTitle = ;
								// document.getElementById("monTitle").innerHTML= $(this).text() + "(实时监测)";
								$("#monTitle").html(this.equipItem.name + "(图形监测)");
								$("#table_monitor").html(this.equipItem.name + "(列表监测)");
								if($("#monTitle").html().indexOf("门机下部运行部分") != -1 ){
									var imgPath = 'static/img/vibbottom.png';
									$("#background").attr("src", imgPath);
								}else if($("#monTitle").html().indexOf("门机上部旋转部分") != -1 ){
								var imgPath = 'static/img/vibtop.png';
									$("#background").attr("src", imgPath);
								}else{
									var imgPath = '';
									$("#background").attr("src", imgPath);
								}
								
								fetch({
									headers: {
										'Content-Type': 'application/json'
										},
										baseURL:baseURL,
										url: '/stMonitor.htm?param_act=singleEquipState&eqCode='+ this.eqCode,
										method:'get'
									}).then(res => {
										// console.log(res.data);
										if(res.data.List == undefined && res.data.err == "1"){
											this.$alert(res.data.msg);
										}else{
											this.monitorData = res.data.List;  
											// console.log(this.monitorData);
											this.$nextTick(function(){
												for(var i=0;i<this.monitorData.length;i++){
													// $(".strainDom").eq(i).removeClass("active");
													// $(".strainDom").eq(i).find(".select-box").attr("src","static/img/strain/unsele_s.png");
													$(".strainDom").eq(i).css("bottom",this.monitorData[i].y);
													$(".strainDom").eq(i).css("left",this.monitorData[i].x);  
													if(this.monitorData[i].state == 1){
														$(".strainDom").eq(i).css("background", "#2E2C48")
														$(".strainDom").eq(i).css("color", "#C7CEF2")
													}else if(this.monitorData[i].state == 2){
														$(".strainDom").eq(i).css("background", "#EFD83B")
														$(".strainDom").eq(i).css("color", "#1E1E24")
													}else if(this.monitorData[i].state == 3){
														$(".strainDom").eq(i).css("background", "#FF852C")
														$(".strainDom").eq(i).css("color", "#1E1E24")
													}else if(this.monitorData[i].state == 4){
														$(".strainDom").eq(i).css("background", "#FF4D4D")
														$(".strainDom").eq(i).css("color", "#1E1E24")
													}                      
												}   
												this.addEventListenner();          
											})         
										}

									})
								}

					}
				// );
			},100)
		
		$(function(){
			$(".ivu-input").css({
					height: '30px',
					background:"#2E2C48",
					border:"none",
					color:"#C7CEF2"
				})
			// $(".ui-jqgrid tr.jqgrow td").css({ whiteSpace: 'normal !important'},{ height:'auto' })
		});
		
		//定时获取页面实时数据
		clearInterval(timer1);
		timer1 = setInterval(()=>{
			// 右侧报警请求
			this.reqAlarm();
			if($("#box1").is(':visible')){
				// 首页设备信息汇总
				this.stEquipNum()
			}else{
				// 子系统设备点状态刷新
				fetch({
					headers: {
						'Content-Type': 'application/json'
						},
						baseURL:baseURL,
						url: '/stMonitor.htm?param_act=singleEquipState&eqCode='+ this.eqCode,
						method:'get'
				}).then(res => {
					// console.log(res.data);
					if(res.data.List == undefined && res.data.err == "1"){
						this.$alert(res.data.msg);
					}else{
						this.monitorData = res.data.List;  
						// console.log(this.monitorData);
						this.$nextTick(function(){
							for(var i=0;i<this.monitorData.length;i++){
								// $(".strainDom").eq(i).removeClass("active");
								// $(".strainDom").eq(i).find(".select-box").attr("src","static/img/strain/unsele_s.png");
								$(".strainDom").eq(i).css("bottom",this.monitorData[i].y);
								$(".strainDom").eq(i).css("left",this.monitorData[i].x);  
								if(this.monitorData[i].state == 1){
									$(".strainDom").eq(i).css("background", "#2E2C48")
									$(".strainDom").eq(i).css("color", "#C7CEF2")
								}else if(this.monitorData[i].state == 2){
									$(".strainDom").eq(i).css("background", "#EFD83B")
									$(".strainDom").eq(i).css("color", "#1E1E24")
								}else if(this.monitorData[i].state == 3){
									$(".strainDom").eq(i).css("background", "#FF852C")
									$(".strainDom").eq(i).css("color", "#1E1E24")
								}else if(this.monitorData[i].state == 4){
									$(".strainDom").eq(i).css("background", "#FF4D4D")
									$(".strainDom").eq(i).css("color", "#1E1E24")
								}                      
							}   
							this.addEventListenner();          
						})         
					}

				})
			}
		},10000)
		
		
		

		
	},
	// updated() {
	// 	this.myhaldle();
	// },
	destroyed() {
		clearInterval(timer1);
		bus.$off('equipData',  this.handle);

	},
	beforeRouteLeave(to, from, next) {
		clearInterval(timer1);
		next()

	}

}

//  $(document).ready(function(){
//             alert('页面加载完成');
//         })
</script>


