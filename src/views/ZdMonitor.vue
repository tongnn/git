<style scoped lang="css">
    html,
    body {
        width: 100%;
        height: 100%;
    }
    
    * {
        margin: 0;
        padding: 0;
    }
    
    .echarts {
        background-color: #fff;
        z-index: 100 !important;
        /* margin: 40px; */
        height: 450px;
        width: 100%;
    }
    
    .history {
        margin-left: 100px;
    }
    
    #historyData {
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: gray
    }
    
    span {
        display: inline-block;
    }
    
    .eqOne {
        float: left;
        width: 45%;
        margin-left: 3.5%;
        margin-top: 2%;
        height: 60px;
        line-height: 60px;
        background: #EBEBEB;
    }
    
    ol li {
        width: 12px;
        height: 12px;
        background: rgba(239, 216, 59, 1)
    }
    /*.point_select { cursor: pointer; margin: 20px 20px 20px 20px; width: 18px; height: 18px; border-radius: 50%; background: white; float: left; border: 2px solid #CCCCCC; }*/
    
    .point_select {
        cursor: pointer;
        margin: 20px 20px 20px 20px;
        width: 18px;
        height: 18px;
        float: left;
    }
    
    .num_warn {
        font-size: 16px;
        display: inline-block;
        width: 80px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 10px;
    }
    
    #nowTime1,
    #overTime1,
    #nowTime2,
    #overTime2 {
        width: 80px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        background-color: #2E2C48;
        margin-left: 15px;
    }
    
    #test6 {
        background-image: url(../vibrationImg/calendar.png);
        /*设置小图标为背景*/
        background-size: 18px 18px;
        /*设置小图标的 大小*/
        background-position: 148px 2px;
        /*设置小图标的位置*/
        background-repeat: no-repeat;
        /*设置小图标不重复*/
        border: 1px solid gray;
        cursor: pointer;
    }
    
    #alarmA {
        background: white;
    }
    
    #alarmB {
        background: rgba(239, 216, 59, 1);
    }
    
    #alarmC {
        background: rgba(255, 133, 44, 1);
    }
    
    #alarmD {
        background: rgba(255, 70, 70, 1);
    }
    
    #num p {
        color: #828099;
    }
    
    .right-dashboard1 {
        width: 20%;
        height: 100%;
        float: right;
        background-color: #18181E;
    }
    
    .right-dashboard1-title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-family: SimSun;
        color: rgba(199, 206, 242, 1);
        background: -webkit-linear-gradient(left, rgba(24, 24, 30, 1) 10%, rgba(0, 72, 255, 0.8));
        /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, rgba(24, 24, 30, 1) 10%, rgba(0, 72, 255, 0.8));
        /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, rgba(24, 24, 30, 1) 10%, rgba(0, 72, 255, 0.8));
        /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, rgba(24, 24, 30, 1) 10%, rgba(0, 72, 255, 0.8));
        /* 标准的语法（必须放在最后） */
    }
    
    .right-dashboard1-title img {
        margin-left: 19px;
        margin-right: 5px;
        margin-bottom: 3px;
    }
    
    .right-dashboard1-info {
        min-height: 179px;
        max-height: 280px;
        width: 100%;
        overflow: auto;
        background-color: #18181E;
        color: rgba(199, 206, 242, 1)
    }
    
    .tips {
        text-align: center;
        padding-top: 40px;
    }
    
    .tips span {
        width: 100%;
        height: 30px;
        line-height: 30px;
        color: #ccc;
    }
    
    .unnormalTips {
        height: 70px;
        padding-top: 15px;
        padding-left: 20px;
        border-bottom: 1px solid #2E2C48;
    }
    
    .unnormalMsg {
        font-family: SimSun;
    }
    
    .unnormalMsg .name {
        font-size: 13px;
        color: rgba(199, 206, 242, 1);
        font-weight: 500;
    }
    
    .unnormalMsg .place {
        font-size: 12px;
        color: #8084A2;
    }
    
    .unnormalMsg .red-text {
        color: #FF0101;
    }
    
    .unnormalMsg .yellow-text {
        color: #FF8A01;
    }
    
    .unnormalMsg .alarm-text {
        color: #E8CA00;
    }
    
    .hide {
        display: none;
    }
    
    .show {
        display: block;
    }
    
    .border {
        border: 1px solid #1B86FF !important;
        color: #1B86FF;
    }
    /*#more{position:absolute;height: 20px;line-height: 20px;right:5px;top: 10px;}*/
    /*#more1{position:absolute;height: 20px;line-height: 20px;right:5px;top: 10px;}*/
    
    .leg {min-width: 30%;height: 26px;line-height: 26px;text-align: center;background: #2E2C48;margin-left: 1%;margin-top: 2px;cursor: pointer;box-sizing: border-box;}
    
    #bars,
    #bars1 {
        color: #C7CEF2;
    }
    /*设备上点的样式设置*/
    
    .strainDom {
        font-size: 10px;
        position: absolute;
        min-width: 11%;
        min-height: 6.5%;
        background: rgba(236, 234, 244, 1);
        border-radius: 5px;
        color: #4D4D4D;
        cursor: pointer;
    }
    
    .strainDom img {
        position: absolute;
        top: 13px;
        left: 5px;
    }
    
    .strainDom .straincode {
        margin-left: 25px;margin-top:1px;font-size: 1em;
    }
    
    .strainnum {
        margin-left: 27px;
    }
    /* 多选框 */
    #checked{
		text-align: center;
		height: 50px;
		line-height: 50px;
	}
    .active {
        border: 1px solid #1B86FF;
    }
    
    .activeSelect {
        border: 1px solid #1B86FF;
        color: #1B86FF;
        background: url(../../static/img/vib/con_sele.png) no-repeat bottom right
    }
    
    .btn-select {}
    
    .select-box {
        background: url(../../static/img/unsele_s.png);
    }
    
    /* .select-box-unselect {
        background: url(../../static/img/unsele_s.png);
    }
    
    .select-box-select {
        background: url(../../static/img/sele_s.png);
    } */
    
    .border-select {
        border: 1px solid #1B86FF;
    }
    
    #title_1 a {
        color: #8084A2;
    }
    /* #v_sys a:hover{background: #1B86FF;color: white;cursor: pointer;}
	#w_sys a:hover{background: #1B86FF;color: white;cursor: pointer;} */
    
    .analyse {
        width: 100px;
        height: 30px;
        line-height: 30px;
        background: #2E2C48;
        color: #8084A2;
        border-radius: 15px;
        font-size: 14px;
        font-family: SimSun;
        cursor: pointer;
    }
    /*滚动条样式*/
    
     ::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 4px;
        /*高宽分别对应横竖滚动条的尺寸*/
    }
    
     ::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        background: rgba(46, 44, 72, 1);
        border-radius: 2px;
    }
    
     ::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        background: rgba(22, 21, 41, 1);
    }
    
    #customers tr,#monPoint tr {
        height: 40px
    }
    
    #customers tr th, #customers tr td {
        width: 150px;
        text-align: center
    }
    #monPoint tr th, #monPoint tr td {
        width: 200px;
        text-align: center
    }
    #table_r>>>.ivu-table {
        color: #fff;
    }
    #table_r>>>.ivu-table-wrapper{
        /* border: 1px solid #1E1E24; */
    }
    #table_r>>>.ivu-table th {
        background: #2E2C48 !important;
        border: 1px solid #1E1E24;
    }
    #table_r>>>.ivu-table td {
        background: #2E2C48 !important;
        border: 1px solid #1E1E24;
    }
</style>
<template>
	<div id="box" class="animated fadeIn" style="background: #121214;height:calc(100vh - 55px);">

		<div class='row' style="width: 100%;height: 886px;background: #121214;">
			<div class='' style="background: #1E1E24;width: 15%;float: left;height:886px;">
				<div style="overflow:hidden;position:relative;color: #C7CEF2;height:150px;line-height: 150px;background:#2E2C48;">
					<div :style="{backgroundImage: 'url(' + img2 + ')'}" style="position: absolute; top: 50%;margin-top: -25px;margin-left: 12px;width: 50px;height: 50px;border-radius: 50%;border: 1px solid white;float: left;background-repeat:no-repeat; background-size:100% 100%;">

					</div>
					<div id="" style="float: left;width: 85%;">
						<p style="float: left;position: absolute;margin-left: 25%;font-size: 16px;text-shadow: 3px 3px 3px RGBA(0, 43, 183, 0.6);">青岛国际前港公司</p>
						<p style="float: right;position: absolute;right: 5%;font-size: 12px;font-family:SimSun;">切换&nbsp;<span> > </span></p>
					</div>
				</div>
				<div id="num" style="background: rgba(51,49,78,1);width: 80%;height: 50px;box-shadow:0px 0px 5px rgba(0,0,0,0.1);border-radius: 5px;top: -25px;left: 10%;position: relative;">
					<div class="" style="text-align: center;height: 50px;width: 49.5%;float: left;">
						<p id="eqNum" style="margin-top:0px;color: #C7CEF2;font-weight: 500;font-size: 18px;">3</p>
						<p style="font-size: 12px;font-family:SimSun;">监测子系统</p>
					</div>
					<div id="" style="width: 1%;height: 30px;float: left;background: #474565;margin-top: 10px;"></div>
					<div class="" style="text-align: center;height: 50px;width: 49.5%;float: left;">
						<p id="poNum" style="margin-top:0px ;color: #C7CEF2;font-weight: 500;font-size: 18px;">30</p>
						<p style="font-size: 12px;font-family:SimSun;">监测测点数</p>
					</div>
				</div>
				<!--<div id="point" style="height: 40px;line-height: 40px;width: 100%;background: #E5E5E5;">
					<p>测点/设备选择</p>
				</div>-->
				<div id="equ" style="height:40px;line-height: 40px;width: 100%;background: #2E2C48;border-top: 1px solid #2E2C48;">
					<p id="treeAll" style="color: rgba(199,206,242,1);padding-left: 10px;font-size:14px;font-family:SimSun;cursor: pointer;">设备状态汇总</p>
				</div>
				<!--树形控件-->
				
				<div class="" id="tree" style="height: 55%;width: 100%;color: rgba(199,206,242,1);font-size:14px;font-family:SimSun;">
					
					
				</div>

			</div>
			<div class='' style="width: 65%;float: left;height: 886px;padding:0px 10px 10px 10px">
				<div id="treeName" style="width: 100%;height: 40px;line-height: 40px;background: #1E1E24;font-size: 12px;padding-left: 1.5%;color: rgba(199,206,242,1);">
						设备状态汇总
				</div>
				<div id="box1" style="width: 100%;background: #1E1E24;margin-top: 10px;">
					<div id="" style="height: 60px;line-height: 60px;width: 100%;font-size: 18px;font-family:MicrosoftYaHei;margin-top: 2px;border-bottom:1px solid #2E2C48;">

						<p id="all_Pie" style="float: left;width: 50%;height: 60px;text-align: center;color: rgba(199,206,242,1);cursor: pointer;">
							<!--<p id="all_Pie" style="margin-left: 49%;float: left;height: 58px;"> </p>-->
							<span id=""> 设备运行状态汇总</span>
							<p id="one_L" style="height: 2px;background: #C7CEF2;width: 35%;float: left;margin-left: -43%;margin-top: 60px;"></p>
						</p>
						<p  @click="getRepor()" id="month_R" style="float: left;width: 50%;height: 60px;text-align: center;color: rgba(130,128,153,1);cursor: pointer;">
							<!--<p id="month_R" style=";margin-left: 20%;height: 58px;"></p>-->
							<span id="baogao">设备振动月度报告</span>
							<p id="two_L" style="height: 2px;background: #C7CEF2;width: 35%;margin-top: -2px;margin-right: 7%;float: right;display: none;clear: both;"></p>
						</p>
					</div>
					<div id="" style="width: 100%;">
						<div id="all_e1" style="height: 730px;width: 100%;margin-top: 2px;color: rgba(199,206,242,1);margin-top: 40px;">
							<!--<p id="one_L" style="margin-left: 20.5%;height: 2px;background: blue;width: 300px;"></p>-->
							
								<div class='' id="" style="height: 240px;border-radius:10px ;background: #2E2C48;float: left;width: 30%;margin-left: 3%;">
									<div id="" style="text-align: center;height: 40px;line-height: 40px;border-bottom: 1px solid #1E1E24;font-size: 15px;">
										1#卸船机KB
									</div>
									<div id="myChart1" style="width: 100%;height: 200px;">

									</div>
								</div>
								<div class="" id="" style="height: 240px;border-radius:10px ;background: #2E2C48;float: left;width: 30%;margin-left: 2%;">
									<div id="" style="text-align: center;height: 40px;line-height: 40px;border-bottom: 1px solid #1E1E24;font-size: 15px;">
										1#卸船机QS
									</div>
									<div id="myChart2" style="width: 100%;height: 200px;">

									</div>
								</div>
								<div class="" id="" style="height: 240px;border-radius:10px ;background: #2E2C48;float: left;width: 30%;margin-left: 2%;">
									<div id="" style="text-align: center;height: 40px;line-height: 40px;border-bottom: 1px solid #1E1E24;font-size: 15px;">
										1#卸船机XC
									</div>
									<div id="myChart3" style="width: 100%;height: 200px;">

									</div>
								</div>
						</div>
						<div id="line_r" style="height: 768px;width: 100%;display: none;">
							<!--<p id="two_L" style="margin-left: 55.5%;height: 2px;background: blue;width: 250px;"></p>-->
							<div id="" style="color:#C7CEF2;height: 40px;line-height: 40px;width: 90%;margin-left: 5%;background: #1E1E24;border-bottom: 1px solid rgba(46,44,72,1);">
								选择设备：
								<select id="selected" name="" style="color:#C7CEF2;height: 30px;width: 120px;background: rgba(46,44,72,1);border: 0;text-align:center;text-align-last: center;">
									<option value="01">1#卸船机KB</option>
									<option value="02">1#卸船机QS</option>
									<option value="03">1#卸船机XC</option>
								</select>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;选择月份:
								<Date-picker id='month' type="month" v-model="time" format="yyyy-MM" @on-change="handleChange" style="width: 100px;height: 30px;"></Date-picker>

								<!-- <div id="primary" @click="getRepor()" style="cursor: pointer;color:white;background: #1B86FF;width: 100px;height: 30px;border-radius: 15px;text-align: center;line-height: 30px;margin-top: -35px;float:left;margin-left:40%">
									查询
								</div> -->
								<Button  type="primary" shape="circle" size="small" @click="getRepor()" style="width:100px;height: 30px;margin-left:20px;">查询</Button>
								<div id="cmd"  @click="getPdf()" style="color:white;background: #2d8cf0;float: right;width: 100px;height: 30px;border-radius: 15px;text-align: center;line-height: 30px;margin-top: 8px;cursor:pointer;">
									<img src="../../static/img/download.png" style="margin-top: -3px;"/> &nbsp;导出报告
								</div>
							</div>
							<div id="pdfDom">
								<div id="" style="margin-left: 5%;width: 90%;margin-top: 20px;color: #828099;">
									<div id="" style="width: 22.7%;height: 60px;margin-left: 0%;background: #2E2C48;float: left;text-align: center;">
										<p id="b1" style="margin-top: 5px;font-size: 20px;color: #1B86FF;">{{monthData.eqPointCount}}</p>
										<p>设备监测点（个）</p>
									</div>
									<div id="" style="width: 22.7%;height: 60px;margin-left: 3%;background: #2E2C48;float: left;text-align: center;">
										<p id="b2" style="margin-top: 5px;font-size: 20px;color: #1B86FF;">{{monthData.normalCount}}</p>
										<p>本月运行正常点数（个）</p>
									</div>
									<div id="" style="width: 22.7%;height: 60px;margin-left: 3%;background: #2E2C48;float: left;text-align: center;">
										<p id="b3" style="margin-top: 5px;font-size: 20px;color: #1B86FF;">{{monthData.cumuAlarmCount}}</p>
										<p>本月预报警累计次数（次）</p>
									</div>
									<div id="" style="width: 22.7%;height: 60px;margin-right: 0%;background: #2E2C48;float: right;text-align: center;">
										<p id="b4" style="margin-top: 5px;font-size: 20px;color: #1B86FF;">{{monthData.cumuAlarmTime}}</p>
										<p>本月预报警累计时长（分钟）</p>
									</div>
								</div>
								<br /><br /><br />
								<div id="" style="margin-left: 5%;width: 90%;max-height: 650px;overflow-y:auto;margin-top: 30px;">
									<!-- <table id="grid-table" name="trdiv" style="font-size: 10px;padding-right: 0 !important;color:white"></table> -->
									<table id= "customers" style="text-align:center;color:white;background:#2E2C48">
										<tbody id="goaler">
												<tr>
														<th style="width:300px">测点</th>
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
													
													<tr v-for="(item,index) in monthData.dataRows" :key="index">
															<td >{{item.pointName}} </td>
															<td >{{item.minValue}} </td>
															<td >{{item.maxValue}} </td>
															<td >{{item.avgValue}} </td>
															<td >{{item.warnCount}} </td>
															<td >{{item.warnTime}} </td>
															<td >{{item.alarmCount}} </td>
															<td >{{item.alarmTime}} </td>
															<td >{{item.dangeCount}} </td>
															<td >{{item.dangeTime}} </td>
															<td >{{item.advice}} </td>
													</tr>
										</tbody>	
											
											
											
												<!-- <div class="el-table__empty-block"><span class="el-table__empty-text">暂无数据</span></div> -->
									</table>
								</div>
							</div>
						</div>
					</div>

				</div>

				<div id="box2" style="display: none;">
					<div id="" style="height: 60px;line-height: 60px;width: 100%;background: #1E1E24;font-size: 19px;text-align: center;margin-top: 10px;color: #C7CEF2;font-family: '微软雅黑';">
							<p id="q6" style="float: left;width: 50%;height: 60px;text-align: center;color: rgba(199,206,242,1);cursor: pointer;">
							<p id="equip_L" style="height: 2px;background: #C7CEF2;width: 35%;float: left;margin-left: -43%;margin-top: 60px;"></p>
						</p>
						<p id="table_monitor" style="float: left;width: 50%;height: 60px;text-align: center;color: rgba(130,128,153,1);cursor: pointer;">
							<!--<p id="month_R" style=";margin-left: 20%;height: 58px;"></p>-->
							<p id="table_L" style="height: 2px;background: #C7CEF2;width: 35%;margin-top: -2px;margin-right: 7%;float: right;display: none;clear: both;"></p>
						</p>
					</div>
					<div id="legend2" style="height: 40px;line-height: 40px;width: 100%;background: #1E1E24;color: #8084A2;border-top: 1px solid #2E2C48;">
						<span id="" style="float: left;margin-left: 1.5%;">图例:</span>
						<ol style="float: left;margin-left: 1.5%;width: 30%;">

							<li style="float:left;width:12px;margin-left: 0%;margin-top: 14px; height:12px; background:rgba(239,216,59,1)"></li>
							<span style="float: left;margin-left: 5px;">预警</span>
							<li style="float:left;width:12px;margin-left: 3%;margin-top: 14px; height:12px; background:rgba(255, 133, 44, 1)"> </li>
							<span style="float: left;margin-left: 5px;">报警</span>
							<li style="float:left;width:12px;margin-left: 3%;margin-top: 14px; height:12px; background:rgba(255, 70, 70, 1)"> </li>
							<span style="float: left;margin-left: 5px;">危险</span>
						</ol>
						<span id="" style="margin-left: -8%;">
							V：振动数据，单位mm/s&nbsp;&nbsp;&nbsp;T：温度数据，单位℃
						</span>
					</div>
					<div id="" style="height: 730px;width: 100%;background: #1E1E24;">
						<p style="background: #2E2C48;width: 100%;height: 1px;margin-left: 1%;"></p>
						<div id="detail_1">
							<div id="title_1" style="width: 100%;height: 80px;text-align: center;padding-top: 10px;color: #C7CEF2;">
								<p style="margin-bottom: 5px;font-size: 14px;">选择一个及以上的测点进行振动或预警分析</p>
								<span class="analyse" id="v_sys" style="">
										振动分析<!-- <a style="display:inline-block;width:100%;height:100%;border-radius: 15px;">振动分析</a> -->
								</span>
								&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
								<span class="analyse" id="w_sys" style="">
										预警分析<!-- <a style="display:inline-block;width:100%;height:100%;border-radius: 15px;">预警分析</a> -->
								</span>
							</div>
							<div id="allEq" class="imgs" style="font-size: 14px;width: 100%;height:100%;position: relative;">
								<img id="background" style="width: 100%;" src="../vibrationImg/11.png"/>
								<div @click="toggle($event,item.ITEM_ID,item.pointName)" class="strainDom" v-for="(item,index ) in monitorData" :key="index">
									<img class="select-box" src="static/img/unsele_s.png" alt="">
									<span class="straincode">{{item.number}}#:</span>{{item.pointValue}}<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;{{item.temperValue}}
									<!-- <span class="strainnum">{{item.temperValue}}</span> -->
									<span class="strainnum1"></span>
								</div>
							</div>
                            <div id="table_r" style="height: 568px;width: 100%;display: none;">
                                <!-- display: none; -->
								<div id="" style="margin-left: 5%;width: 90%;max-height: 650px;overflow-y:auto;margin-top: 30px;">
									<!-- <table id="grid-table" name="trdiv" style="font-size: 10px;padding-right: 0 !important;color:white"></table> -->
									<!-- <table id= "monPoint" style="text-align:center;color:white;background:#2E2C48">
										<tbody id="pointTable">
                                            <tr>
                                                <th><img class="select-box" src="static/img/unsele_s.png" alt=""></th>
                                                <th>测点编号</th>
                                                <th style="width:300px">测点位置 </th>
                                                <th >振动</th>
                                                <th >温度 </th>
                                            </tr>
													
                                            <tr @click="toggle($event,item.ITEM_ID,item.pointName)" v-for="(item,index) in monitorData" :key="index">
                                                <td><img class="select-box" src="static/img/unsele_s.png" alt=""></td>
                                                <td >{{item.number}} </td>
                                                <td >{{item.pointName}} </td>
                                                <td >{{item.pointValue}} </td>
                                                <td >{{item.temperValue}} </td>
                                            </tr>
										</tbody>	
									</table> -->
                                     <Table class="pointTable" stripe :columns="columns1" :data="monitorData"  @on-selection-change="selectionChange"></Table>
								</div>
						    </div>
						</div>
					</div>
				</div>

				<div id="box3" style="display: none;">
					
					<div id="" style="height:830px;width: 100%;background: #1E1E24;margin-top: 10px;color: #C7CEF2;">
						<div id="" style="width: 100%;">
							<div id="tab_select" style="height: 60px;width: 100%;text-align: center;">
								<div id="v_left" style="cursor: pointer;display: block;float: left;height: 60px;line-height: 60px;text-align: center;font-size: 18px;width: 200px;margin-left: 33%;">
									测点振动分析
									<p id="p1" style="height: 1px;width: 100%;background: #C7CEF2;margin-top: -1px;display: none;"></p>
								</div>
								<div id="w_right" style="cursor: pointer;display: block;float: left;height: 60px;line-height: 60px;text-align: center;font-size: 18px;width: 200px;">
									测点预警分析
									<p id="p2" style="height: 1px;width: 100%;background: #C7CEF2;margin-top: -1px;display: none;"></p>
								</div>
								<p style="float: left;background: #1E1E24;width: 100%;height: 1px;"></p>
							</div>
							
							
							<div id="p_vibration" style="display: none;">
								<div id="selectItem1" style="height: 130px;border-top: 1px solid #2E2C48;">
									<div id="" style="width: 80%;float: left;border-top: 1px solid #2E2C48;padding-left: 2%;">
										<div id="legend3" style="height: 90px;width: 100%;background: #1E1E24;border-bottom: 1px solid #2E2C48;padding-left:9px">
											选择测点：
											<div id="bars" style="overflow: auto;padding-left:55px;margin-top: -20px;height: 85px;">
												<span @click="more(index,$event,item.ITEM_ID)" class="leg" v-for="(item,index) in monitorData" :key="index" :class = "{activeSelect:index==legSpan}" style="cursor: pointer;">{{item.number}}#测点：{{item.pointName}}</span>
											</div>
											<!-- <p @click="changeDiv()" id="more" style="width: 100%;height: 20px;text-align: center;color: #1B86FF;cursor: pointer;cursor: pointer;"> 更多 
												<img src="static/img/strain/unfold.png" alt="">
											</p> -->
											
										</div>
										
										<div id="" style="height: 40px;width: 100%;font-size: 12px;color: #C7CEF2;border-bottom: 1px solid #2E2C48;">
											<!--选择曲线：实时曲线  历史曲线  选择日期：自 2018-05-01 至 2018-05-14-->
											<div id="" style="height: 40px;line-height: 40px;float: left;">
												<div id="" style="">
													选择曲线：<span @click="nowTime1()" id="nowTime1" style="cursor: pointer;">实时曲线</span><span  @click="overTime1()" id="overTime1" style="cursor: pointer;">历史曲线</span>
												</div>
											</div>
											<div id="datePicker" style="height: 40px;line-height: 40px;float: left;padding-left: 2%;">
												选择时间：
												<Date-picker placeholder="开始时间" v-model="startTime1" @on-change="handleChange1" id='timeStart1' style="width: 120px;color:black;"></Date-picker>
												至&nbsp;
												<Date-picker placeholder="结束时间" v-model="endTime1" @on-change="handleChange11" id='timeEnd1' style="width: 120px;color:black;"></Date-picker>
											</div>
										</div>
									</div>
									<div id="" style="float: left;width: 20%;height: 132px;border: 1px solid #2E2C48;border-right:none;">
										<div id="starSys" style="cursor: pointer;margin: auto;margin-top: 27px;text-align: center;width: 100px;height: 30px;line-height: 30px;border-radius: 20px;background: #1B86FF;color: white;">
												开始分析<!--  @click="starSys1"  -->
										</div>
										<div id="replay" @click="replay1()" style="cursor: pointer;margin:auto;margin-top: 10px;text-align: center;width: 100px;height: 30px;line-height: 30px;border-radius: 20px;background: ;color: #1B86FF;border:1px solid #1B86FF">
											重置
										</div>
									</div>
								</div>
                                <div id="checked">
									<Checkbox-group v-model="checkbox1" class="checkbox-type">
										<Checkbox label="振动曲线"></Checkbox><img src="static/img/vib/vibLine.png" alt="">
										<Checkbox label="温度曲线"></Checkbox><img src="static/img/vib/tempLine.png" alt="">
									</Checkbox-group>
								</div>
								<div id="point_line" style="height:550px;width: 96%;margin-left: 2%;">
									<!--折线图-->

								</div>
							</div>
							<div id="p_warn" style="">
								<div id="selectItem2" style="height: 120px;">
									<div id="" style="width: 80%;float: left;border-top: 1px solid #2E2C48;padding-left: 2%;">
										<div id="legend4" style="height: 90px;width: 100%;background: #1E1E24;border-bottom: 1px solid #2E2C48;padding-left:9px">
                                            选择测点：
                                            <div id="bars1" style="overflow: auto;padding-left:55px;margin-top: -20px;height: 85px;">
												<span @click="more1($event,item.ITEM_ID)" class="leg" v-for="(item,index) in monitorData" :key="index" style="cursor: pointer;">{{item.number}}#测点：{{item.pointName}}</span>
											</div>
											<!-- <p @click="changeDiv1()" id="more1" style="width: 100%;height: 20px;text-align: center;color: #1B86FF;cursor: pointer;"> 
													更多<img src="static/img/strain/unfold.png" alt="">
											</p> -->
										</div>
										<div id="" style="height: 40px;width: 100%;font-size: 12px;color: #C7CEF2;border-bottom: 1px solid #2E2C48;">
											<!--选择曲线：实时曲线  历史曲线  选择日期：自 2018-05-01 至 2018-05-14-->
											<div id="" style="height: 40px;line-height: 40px;float: left;">
												<div id="" style="">
													选择曲线：<span @click="nowTime2()" id="nowTime2" style="cursor: pointer;">预警次数分析</span><span  @click="overTime2()" id="overTime2" style="cursor: pointer;">预警时长分析</span>
												</div>
											</div>
											<div id="" style="height: 40px;line-height: 40px;float: left;padding-left: 2%;">
												选择时间：
												<!--<Date-picker v-model="timei" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"> </Date-picker>-->
												<Date-picker placeholder="开始时间" v-model="startTime2" @on-change="handleChange2" id='timeStart2' style="width: 120px;color:black;"></Date-picker>
												至&nbsp;
												<Date-picker placeholder="结束时间" v-model="endTime2" @on-change="handleChange22" id='timeEnd2' style="width: 120px;color:black;"></Date-picker>
											</div>
										</div>
									</div>
									<div id="" style="float: left;width: 20%;height: 132px;border: 1px solid #2E2C48;border-right:none;">
										<div id="starSys2" style="cursor: pointer;margin: auto;margin-top: 27px;text-align: center;width: 100px;height: 30px;line-height: 30px;border-radius: 20px;background: #1B86FF;color: white;">
												开始分析<!--  @click="starSys2" -->
										</div>
										<div id="" @click="replay2()" style="cursor: pointer;margin:auto;margin-top: 10px;text-align: center;width: 100px;height: 30px;line-height: 30px;border-radius: 20px;background: ;color: #1B86FF;border:1px solid #1B86FF">
											重置
										</div>
									</div>
								</div>
								<div id="point_bar" style="height: 600px;width: 96%;margin-left: 2%;">
									<!--柱状图-->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- /.col -->
			<div class="right-dashboard1"  style="">
				<div class="right-dashboard1-title">
					<img src="../vibrationImg/early_warning.png" />预警点信息
				</div>
				<div class="right-dashboard1-info" >
					<div class="tips" v-if="warnMsg.length==0">
						<img src='../../static/img/empty.png'>
						<span>暂无预警信息</span>
					</div>
					<div class="unnormalTips" v-for="(item, index) in warnMsg" :key="index">
						<div class="icon">
							<div class="unnormalMsg">
                                <span style="float:right;color: #8084A2;padding-right: 5px;">{{item.TIME}}</span>
								<p @click="jum($event)" class="name jum1" style="cursor: pointer;">{{item.name}}</p>
								<p class="place">{{item.pos}}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="right-dashboard1-title">
					<img src="../vibrationImg/alarm.png" />报警点信息
				</div>
				<div class="right-dashboard1-info">
					<div class="tips" v-if="alarmMsg.length==0">
						<img src='../../static/img/empty.png'>
						<span>暂无报警信息</span>
					</div>
					<div class="unnormalTips" v-for="(item, index) in alarmMsg" :key="index">
						<div class="icon">
							<div id="unnormalMsg" class="unnormalMsg">
                                <span style="float:right;color: #8084A2;padding-right: 5px;">{{item.TIME}}</span>
								<p @click="jum($event)" class="name jum1" style="cursor: pointer;">{{item.name}}</p>
								<p class="place">{{item.pos}}</p>
							</div>
						</div>
					</div>
 				</div>
				<div class="right-dashboard1-title">
					<img src="../vibrationImg/danger.png" />危险点信息
				</div>
				<div class="right-dashboard1-info">
					<div class="tips" v-if="dangerMsg.length==0">
						<img src='../../static/img/empty.png'>
						<span>暂无危险信息</span>
					</div>
					<div class="unnormalTips" v-for="(item, index) in dangerMsg" :key="index">
						<div class="icon">
							<div class="unnormalMsg">
                                <span style="float:right;color: #8084A2;padding-right: 5px;">{{item.TIME}}</span>
								<p @click="jum($event)" class="name jum1"  style="cursor: pointer;">{{item.name}}</p>
								<p class="place">{{item.pos}}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
    //导出pdf月度报告
    //import '../../static/js/jspdf.min.js'

    import fetch from 'utils/fetch'
    import echarts from 'echarts'

    //import {jsPDF} from 'pdfjs'

    var timer = null;

    import Vue from 'vue'
    import axios from 'axios'

    var timer1 = null;var timer2 = null;
    var timeMon = formatMon(new Date()); //选择月份

    var data1 = [];
    var data2 = [];
    var data3 = [];
    var w_arrName = [];
    var p_arrName = []; //点击分析跳转折线图保存数据的数组
    var w_strName;
    var p_strName;
    var name1 = [];
    var namea;
    var name2 = [];
    var nameb;
    //振动分析时间设置
    var startTime1 = formatDate2(new Date());
    var endTime1 = formatDate1(new Date());
    //预警分析时间设置
    var startTime2 = formatDate2(new Date());
    var endTime2 = formatDate1(new Date());
    var zhendongAndWendu;
    var danwei;//改变预警分析单位
    var kk = [];
    var bb = ['预警', '报警', '危险'];

    var nowData = [];
    var historyData = [];
    var dataAll = [];

    function formatDate1(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    };

    function formatDate2(date) {
        var y = date.getFullYear();
        var m = date.getMonth();
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    };


    function formatMon(date) {
        var y = date.getFullYear();
        var m = date.getMonth();
        m = m < 10 ? '0' + m : m;
        if (m == 0) {
            m = 12
        }
        return y + '-' + m;
    };









    var series1 = [],
        series2 = [];
    var nodeCode;
    var nodeName;
    var baseURL = process.env.BASE_API;

    var arrData = [];
    var arrAxia1 = [],
        arrAxia2 = [];
    var arr6 = []

    var _this = this;


    //echarts变形解决方法
    //series1=[];str=[];

    var initchart1 = function() { //折线图			    

        var optionLine = {
            title: {
                text: ''
            },
            tooltip: {
                enterable: true,
                trigger: 'axis',

            },
            color: ['#FFDE00', '#FF852C', '#FF4646', '#8ACA00', '#2AC527', '#00E295', '#00F1FA', '#00AEFF', '#3E67FF', '#826DFF', '#7E3FFF', '#C446FF', '#F347E9', '#FF49A7', '#FF3B72'],
            legend: {
                show: true, //图例不展示
                //left:'left',
                // backgroundColor: 'red',
                selectedMode: false, //取消点击事件
                top: '5%',
                data: kk,
                //testStyle:{color:'red'}
                textStyle: {
                    color: '#828099' // 图例文字颜色
                }
            },
            grid: {
                left: '5%',
                right: '4%',
                bottom: '3%',
                top: '25%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    //saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    show: true
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#C7CEF2'
                    },
                    formatter: function(val) {
                        var strs = val.split(''); //字符串数组
                        var str = ''
                        for (var i = 0, s; s = strs[i++];) { //遍历字符串数组
                            str += s;
                            if (!(i % 10)) str += '\n'; //按需要求余
                        }
                        return str
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#2E2C48',
                        width: 1, //这里是为了突出显示加上的  
                    }
                },
                boundaryGap: false,
                data: arrAxia1
            },
            yAxis: [
                    {
                        type: 'value',
                        name: '单位:mm/s',
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
            series: series1
        };
        var point_line = echarts.init(document.getElementById('point_line'));

        //point_line.clear();//清空画布
        point_line.setOption(optionLine, true);


        $(function() {
            window.onresize = function() {
                point_line.resize();

            }
            // window.addEventListener('resize', ()=> {  
			// point_line.resize();  
			// // this.alarmBar.resize();  
			// });
        });

        this.resize = function size() {
            var chart1div = document.getElementById('point_line');

            var tabcontent1 = document.getElementById('p_vibration');

            width = tabcontent1.offsetWidth;
            height = tabcontent1.offsetHeight;
            chart1div.style.width = width + 'px';
            chart1div.style.height = height + 'px';

            //chart2.resize(width,height);
            point_line.resize(width, height);

        };

    }
    var initchart2 = function() { //柱状图			    


        var optionBar = {
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function(params) {
                    return "预警：" + params[0].value + "<br/>报警：" + params[1].value + "<br/>危险：" + params[2].value
                },
            },
            barGap: 0.1, //每组柱状图之间的间距
            color: ['#EFD83B', '#FF852C', '#FF4646'],
            legend: {
                //show: true,
                data: ['预警', '报警', '危险'],
                selectedMode: false, //取消点击事件
                top: '5%',
                textStyle: {
                    color: '#828099' // 图例文字颜色
                }

            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '25%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    show: true
                },
                axisLine: {
                    lineStyle: {
                        color: '#2E2C48',
                        width: 1, //这里是为了突出显示加上的  
                    }
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#C7CEF2'
                    },
                    formatter: function(val) {
                        var strs = val.split(''); //字符串数组
                        var str = ''
                        for (var i = 0, s; s = strs[i++];) { //遍历字符串数组
                            str += s;
                            if (!(i % 8)) str += '\n'; //按需要求余
                        }
                        return str
                    }
                },
                data: arrAxia2
            },

            yAxis: {
                name: danwei,
                type: 'value',
                nameTextStyle: {
                    color: "#C7CEF2",
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#C7CEF2'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#2E2C48',
                        width: 1, //这里是为了突出显示加上的  
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: '#2E2C48'
                    }
                }
            },
            series: series2
        };
        var point_bar = echarts.init(document.getElementById('point_bar'));
        //point_bar.clear();
        point_bar.setOption(optionBar, true);

        $(function() {
            window.onresize = function() {
                point_bar.resize();
            }
            // window.addEventListener('resize', ()=> {  
			// point_bar.resize();  
			// });
        });

        this.resize = function size() {

            var chart2div = document.getElementById('point_bar');

            var tabcontent2 = document.getElementById('p_warn');
            width = tabcontent2.offsetWidth;
            height = tabcontent2.offsetHeight;

            chart2div.style.width = width + 'px';
            chart2div.style.height = height + 'px';
            point_bar.resize(width, height);
        };
    }

    function chartresize1() { //折线图
        //console.log("chartresize1");
        var temp = new initchart1();
        temp.resize();

    }

    function chartresize2() { //柱状图
        //console.log("chartresize2");
        var temp = new initchart2();
        temp.resize();
    }



    export default {
        name: 'Zdmonitor',
        data() {
            return {
                img1: require('../vibrationImg/header.png'),
                img2: require('../vibrationImg/Avatar.png'),
                htmlTitle: '振动监测月度报告',
                treeData: {},
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
                        key: 'number'
                    },
                    {
                        title: '测点位置',
                        width: 300,
                        align: 'center',
                        key: 'pointName'
                    },
                    {
                        title: '振动(mm/s)',
                        align: 'center',
                        key: 'pointValue',
                        render: (h, params) => {
                            if (params.row.pointState == 2) {
                                return h('span',{
                                    style: { color: '#EFD83B' },
                                }, params.row.pointValue);//给这个span写样式设置文字颜色
                            }else if(params.row.pointState == 3){
                                return h('span',{
                                    style: { color: '#FF852C' },
                                }, params.row.pointValue);//给这个span写样式设置文字颜色
                            }else if(params.row.pointState == 4){
                                return h('span',{
                                    style: { color: '#FF4D4D' },
                                }, params.row.pointValue);//给这个span写样式设置文字颜色
                            }else {
                                return h('span', params.row.pointValue);;
                            }
                        }
                    },
                    {
                        title: '温度(℃)',
                        align: 'center',
                        key: 'temperValue',
                        render: (h, params) => {
                            if (params.row.pointState == 2) {
                                return h('span',{
                                    style: { color: '#EFD83B' },
                                }, params.row.temperValue);//给这个span写样式设置文字颜色
                            }else if(params.row.pointState == 3){
                                return h('span',{
                                    style: { color: '#FF852C' },
                                }, params.row.temperValue);//给这个span写样式设置文字颜色
                            }else if(params.row.pointState == 4){
                                return h('span',{
                                    style: { color: '#FF4D4D' },
                                }, params.row.temperValue);//给这个span写样式设置文字颜色
                            }else {
                                return h('span', params.row.temperValue);;
                            }
                        }
                    }
                ],
                monitorData: [],
                monthData: {}, //月度报告
                warnMsg: [],
                alarmMsg: [],
                dangerMsg: [],
                time: timeMon, //月度报告日期插件
                partName1:"",
                startTime1: startTime1, //测点振动
                endTime1: endTime1,
                startTime2: startTime2, //测点预警
                endTime2: endTime2,
                nodeCodeForHistory: '', //用于查询历史曲线
                dateValue: '', // 日期
                checkbox1: ["振动曲线"],
                legSpan: -1,//是否显示选中测点样式，默认索引值为-1
                equipItem: {},
                pickerOptions: {
                    disabledDate(time) {
                        //time.getTime()获取的是时间戳，可以随便玩啊。
                        return time.getTime() > Date.now() - (24 * 60 * 60 * 1000) || time.getTime() < (Date.now() - (30 * 24 * 60 * 60 * 1000));
                    }
                },

                // 绘制图表

            }
        },
        created() {

            _this.timeDefaultShow = new Date();
            _this.timeDefaultShow.setMonth(new Date().getMonth() - 1);
        },
        methods: {

            jum(e) { //点击右侧预警设备名称，跳转到对应设备状态图
                //点击右侧设备跳转
                var asq = this;
                this.partName1 = e.currentTarget.innerHTML;
                var partNameLeft = $('.treeList');
                for (var i = 0; i < partNameLeft.length; i++) {
                    if (partNameLeft.eq(i).text() == this.partName1) {
                        $("#treeAll").css("background", "#1E1E24"); //全部设备bg变se
                        $(this).css("background", "#2E2C48"); //当前点击元素
                        $(this).siblings().css("background", "#1E1E24"); //其他元素

                        if (i == 0) {
                            $("#background").attr("src", '../../static/img/11.png');
                        } else if (i == 1) {
                            $("#background").attr("src", '../../static/img/22.png');
                        } else if (i == 2) {
                            $("#background").attr("src", '../../static/img/33.png');
                        } else {
                            $("#background").attr("src", '');
                        }

                        $("#bars .leg").removeClass('activeSelect'); //移除选中状态
                        $("#bars1 .leg").removeClass('activeSelect');

                        $("#box1").hide();
                        $("#box2").show();
                        $("#box3").hide();
                        $("#line_r").hide();
                        $("#treeAll").css("background", "#1E1E24"); //全部设备bg变se

                        partNameLeft.eq(i).css("background", "#2E2C48"); //当前点击元素
                        partNameLeft.eq(i).siblings().css("background", "#1E1E24"); //其他元素


                    }
                }




                $.ajax({
                    type: "post",
                    url: baseURL + "/vibMonitor.htm?param_act=eqPointsData",
                    data: {
                        'selectMachineName': this.partName1
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    success: function(dat) {
                        var data1 = JSON.parse(dat)
                            debugger
                        asq.monitorData = data1;
                        asq.$nextTick(function() {
                            for (var i = 0; i < asq.monitorData.length; i++) {
                                $(".strainDom").eq(i).removeClass("active"); //activeSelect
                                //$(".strainDom").eq(i).removeClass("activeSelect");//activeSelect
                                $(".strainDom").eq(i).find(".select-box").attr("src", "static/img/unsele_s.png");
                                $(".strainDom").eq(i).css("bottom", asq.monitorData[i].y);
                                $(".strainDom").eq(i).css("left", asq.monitorData[i].x);
                                if (asq.monitorData[i].pointState == 1) {
                                    // $(".strainDom").eq(i).css("background", "#ECEAF4")
                                    // $(".strainDom").eq(i).css("color", "#4d4d4d")
                                    $(".strainDom").eq(i).css("background", "#2E2C48")
                                    $(".strainDom").eq(i).css("color", "#C7CEF2")
                                } else if (asq.monitorData[i].pointState == 2) {
                                    $(".strainDom").eq(i).css("background", "#EFD83B")
                                    $(".strainDom").eq(i).css("color", "#1E1E24")
                                } else if (asq.monitorData[i].pointState == 3) {
                                    $(".strainDom").eq(i).css("background", "#FF852C")
                                    $(".strainDom").eq(i).css("color", "#1E1E24")
                                } else if (asq.monitorData[i].pointState == 4) {
                                    $(".strainDom").eq(i).css("background", "#FF4D4D")
                                    $(".strainDom").eq(i).css("color", "#1E1E24")
                                }
                            }

                        })

                        document.getElementById("treeName").innerHTML = asq.partName1;
                        document.getElementById("q6").innerHTML = asq.partName1 + '(图形监测)';
                        document.getElementById("table_monitor").innerHTML = asq.partName1 + '(列表监测)';
                        $('.analyse').css('background', '#2E2C48').css('color', '#8084A2');
                        p_arrName = []; //上次查询清空数据
                        p_strName = "";
                        w_arrName = [];
                        w_strName = "";
                        name1 = [];
                        namea = '';
                        name2 = [];
                        nameb = ''
                        series2 = [];
                        arrAxia2 = [];
                        series1 = [];
                        arrAxia1 = [];
                    },
                    error: function(err) {
                        err
                    }
                });

            },
            // 表格行 checkbox 状态发生变化触发
            selectionChange(selection) {
                debugger
                w_arrName = [];
                p_arrName = [];
                this.selection = selection;
                for(let i =0;i<this.selection.length;i++){
                    w_arrName.push(this.selection[i].ITEM_ID);
                    p_arrName.push(this.selection[i].ITEM_ID);
                }
                this.addEventListenner();
                w_strName = w_arrName.join(',');
                p_strName = p_arrName.join(',');
            },
            getRepor() {
                var that = this;
                // var options=$("#selected option:selected").val(); //获取选中的项
                // var today=new Date();  
                // this.month=today.getFullYear()+'-'+ '0' + (today.getMonth()+1);  

                var options = $("#selected option:selected").text(); //获取下拉选项选中的项
                var today = new Date();
                var month;
                if (today.getMonth() == 0) {
                    month = (today.getFullYear() - 1) + '-' + '12';
                } else {
                    month = today.getFullYear() + '-' + '0' + (today.getMonth());
                }
                options = $("#selected option:selected").text();
                if (timeMon != undefined) {
                    month = timeMon;
                }


                $.ajax({
                    type: "post",
                    data: {
                        'chooseEquip': options,
                        'chooseMonth': month
                    },
                    url: baseURL + "/vibMonitor.htm?param_act=getVbHome&card=onlineMonthlyAnalysis",
                    async: true,
                    success: function(data) {
                        var datar = JSON.parse(data);
                        debugger
                        that.monthData = datar

                        var TbRow = document.getElementById("goaler");
                        if (TbRow != null) {
                            for (var i = 0; i < TbRow.rows.length; i++) {
                                if (TbRow.rows[i].rowIndex % 2 != 0) {
                                    TbRow.rows[i].style.backgroundColor = "#1E1E24";
                                } else if (TbRow.rows[i].rowIndex % 2 == 0) {
                                    TbRow.rows[i].style.backgroundColor = "#2E2C48";
                                }
                            }
                        }
                    },
                    error: function(err) {
                        err
                    }
                });
            },

            handleChange(date) {
                this.dateValue = date;
                timeMon = date;
            },
            handleChange1(date) {
                this.startTime1 = date;
                startTime1 = date;

            },
            handleChange11(date) {
                this.dateValue = date;
                endTime1 = date;
            },
            handleChange2(date) {
                this.dateValue = date;
                startTime2 = date;

            },
            handleChange22(date) {
                this.dateValue = date;
                endTime2 = date;
            },

            //监听
            addEventListenner() {
                if (w_arrName.length > 0) {
                    $('.analyse').css('background', '#1B86FF').css('color', '#FFFFFF'); //background:#2E2C48;color:#8084A2;

                } else {
                    $('.analyse').css('background', '#2E2C48').css('color', '#8084A2'); //background:#1B86FF;color:#FFFFFF;
                }
            },
            //控制选择测点的div的高度
            changeDiv() {
                //通过div 的id获取中间div的对象
                var divObj = document.getElementById("bars");
                //var divObj=document.getElementById("legend3");
                //如果div是显示的话就隐藏，否则就显示
                if (divObj.style.height == "28px") {
                    divObj.style.height = "70px";
                    divObj.style.overflow = "auto";
                    document.getElementById("more").innerHTML = '收起<img src="static/img/strain/fold.png" alt="">';
                    //document.getElementById("more").style.marginBottom = 0;
                } else {
                    divObj.style.height = "28px";
                    divObj.style.overflow = "hidden";
                    document.getElementById("more").innerHTML = '更多<img src="static/img/strain/unfold.png" alt="">';

                }
            },
            changeDiv1() {
                //通过div 的id获取中间div的对象
                var divObj = document.getElementById("bars1");
                //var divObj=document.getElementById("legend3");
                //如果div是显示的话就隐藏，否则就显示
                if (divObj.style.height == "28px") {
                    divObj.style.height = "70px";
                    divObj.style.overflow = "auto";
                    document.getElementById("more1").innerHTML = '收起<img src="static/img/strain/fold.png" alt="">';
                    //document.getElementById("more").style.marginBottom = 0;
                } else {
                    divObj.style.height = "28px";
                    divObj.style.overflow = "hidden";
                    document.getElementById("more1").innerHTML = '更多<img src="static/img/strain/unfold.png" alt="">';

                }
            },
            //点击历史曲线折线图
            nowTime1() {
                //$("#nowTime1")
                $("#nowTime1").addClass('border'); //实时曲线变色
                $("#overTime1").removeClass('border');
                $("#datePicker").hide();
                // $("#bars .leg").removeClass('activeSelect'); //移除选中状态
                // $("#bars1 .leg").removeClass('activeSelect');
                //$(".leg").css("border",'')

                // p_arrName = []; //上次查询清空数据
                // p_strName = "";
                // w_arrName = [];
                // w_strName = "";
                // name1 = [];
                // namea = '';
                // name2 = [];
                // nameb = ''
                // series2 = [];
                // arrAxia2 = [];
                // series1 = [];
                // arrAxia1 = [];
            },
            overTime1() {
                //$("#nowTime1")
                //$(".leg").css("border",'')
                // $("#bars .leg").removeClass('activeSelect'); //移除选中状态
                // $("#bars1 .leg").removeClass('activeSelect');
                $("#nowTime1").removeClass('border'); //实时曲线变色
                $("#overTime1").addClass('border');
                $("#datePicker").show();
                // p_arrName = []; //清空数据
                // p_strName = "";
                // w_arrName = [];
                // w_strName = "";
                // series2 = [];
                // arrAxia2 = [];
                // series1 = [];
                // arrAxia1 = [];
                // name1 = [];
                // namea = ''
                // name2 = [];
                // nameb = ''

            },
            //点击测点预警分析柱状图
            nowTime2() {
                //$("#nowTime1")
                //$(".leg").css("border",'')
                // $("#bars .leg").removeClass('activeSelect'); //移除选中状态
                // $("#bars1 .leg").removeClass('activeSelect');
                $("#nowTime2").addClass('border'); //实时曲线变色
                $("#overTime2").removeClass('border');
                // p_arrName = []; //清空数据
                // p_strName = "";
                // w_arrName = [];
                // w_strName = "";
                // series2 = [];
                // arrAxia2 = [];
                // series1 = [];
                // arrAxia1 = [];
                // name1 = [];
                // namea = '';
                // name2 = [];
                // nameb = '';
            },
            overTime2() {
                //$("#nowTime1")
                //$(".leg").css("border",'')
                // $("#bars .leg").removeClass('activeSelect'); //移除选中状态
                // $("#bars1 .leg").removeClass('activeSelect');
                $("#nowTime2").removeClass('border'); //实时曲线变色
                $("#overTime2").addClass('border');
                // p_arrName = [];
                // p_strName = "";
                // w_arrName = [];
                // w_strName = "";
                // series2 = [];
                // arrAxia2 = [];
                // series1 = [];
                // arrAxia1 = [];
                // name1 = [];
                // namea = '';
                // name2 = [];
                // nameb = '';
                //bb=['预警','报警','危险'];
            },
            //振动模块首页环图部分
            sendPost() {
                //axios.post('server/server-post.php','name=Alex&age=26')  //1.自己拼接为键值对
                
                axios.post(baseURL + '/vibMonitor.htm?param_act=getVbHome&card=all', this.users, { //2.使用transformRequest，在请求发送前将请求数据进行转换
                        transformRequest: [
                            function(data) {
                                let params = '';
                                for (let index in data) {
                                    params += index + '=' + data[index] + '&'
                                }
                                return params;
                            }
                        ]
                    })
                    .then(response => {
                        //console.log('post发送Ajax请求,请求成功', response.data);

                        document.getElementById("eqNum").innerHTML = response.data.eqCount;
                        document.getElementById("poNum").innerHTML = response.data.eqPointCount;
                        //环形图数据response.data.state  1#卸船机KB {"DANGER":"0","ALARM":"1","WARNING":"0","NORMAL":"10"},
                        var arr1 = response.data.state;
                        var arr = [];
                        var obj1, obj2, obj3;
                        var numTotal1,numTotal2,numTotal3;
                        for (var q in arr1) {
                            arr.push(arr1[q]);
                        }
                        obj1 = arr[0];
                        obj2 = arr[1];
                        obj3 = arr[2];
                        var array1 = [];
                        var array2 = [];
                        var array3 = [];
                        for (var p in obj1) {
                            array1.push(obj1[p]);
                        };
                        for (var p in obj2) {
                            array2.push(obj2[p]);
                        };
                        for (var p in obj3) {
                            array3.push(obj3[p]);
                        };
                        //设备检测点的总数
                        numTotal1 = array1[2];
                        numTotal2 = array2[2];
                        numTotal3 = array3[2];
                        //去除数据中的 监测点 总数
                        array1.splice(2,1);
                        array2.splice(2,1);
                        array3.splice(2,1);

                        data1 = [{
                            value: 3,
                            name: '危险'
                        }, {
                            value: 4,
                            name: '报警'
                        }, {
                            value: 5,
                            name: '预警'
                        }, {
                            value: 1,
                            name: '正常'
                        }];
                        data2 = [{
                            value: 3,
                            name: '危险'
                        }, {
                            value: 4,
                            name: '报警'
                        }, {
                            value: 5,
                            name: '预警'
                        }, {
                            value: 1,
                            name: '正常'
                        }];
                        data3 = [{
                            value: 3,
                            name: '危险'
                        }, {
                            value: 4,
                            name: '报警'
                        }, {
                            value: 5,
                            name: '预警'
                        }, {
                            value: 1,
                            name: '正常'
                        }];

                        for (let i = 0, len = array1.length; i < len; i++) {
                            data1[i].value = array1[i]
                        };
                        for (let i = 0, len = array2.length; i < len; i++) {
                            data2[i].value = array2[i]
                        };
                        for (let i = 0, len = array3.length; i < len; i++) {
                            data3[i].value = array3[i]
                        };

                        let myChart1 = echarts.init(document.getElementById('myChart1'));
                        let myChart2 = echarts.init(document.getElementById('myChart2'));
                        let myChart3 = echarts.init(document.getElementById('myChart3'));
                        var arrA = array1;
                        var arrB = array2;
                        var arrC = array3;
                        var a = 0;
                        var b = 0;
                        var c = 0;
                        //for (var i = 0; i < arrA.length; i++) {
                            a = parseInt(numTotal1)
                        // };
                        // for (var i = 0; i < arrB.length; i++) {
                            b = parseInt(numTotal2)
                        //};
                        //for (var i = 0; i < arrC.length; i++) {
                            c = parseInt(numTotal3)
                        // };
                        var total1 = {
                            name: '监测点',
                            value: a
                        };
                        var total2 = {
                            name: '监测点',
                            value: b
                        };
                        var total3 = {
                            name: '监测点',
                            value: c
                        };

                        myChart1.setOption({
                            title: [{
                                text: total1.name,
                                left: '29%',
                                top: '40%',
                                textAlign: 'center',
                                textBaseline: 'middle',
                                textStyle: {
                                    color: 'rgba(199,206,242,1)',
                                    fontWeight: 'normal',
                                    fontSize: 20
                                }
                            }, {
                                text: total1.value,
                                left: '29%',
                                top: '55%',
                                textAlign: 'center',
                                textBaseline: 'middle',
                                textStyle: {
                                    color: 'rgba(199,206,242,1)',
                                    fontWeight: 'normal',
                                    fontSize: 20
                                }
                            }],
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}: {c} ({d}%)"
                            },
                            legend: {
                                icon: 'rect',
                                orient: 'vertical', //图例排列方向
                                align: "left", //图例标记和文本的对齐,left,right
                                selectedMode: false, //取消点击事件
                                x: 'right',
                                top: '18%',
                                left: '65%',
                                textStyle: {
                                    color: 'rgba(199,206,242,1)'
                                },
                                itemGap: 20,
                                data: ['危险', '报警', '预警', '正常'],
                                formatter: function(name) {
                                    if (name === '正常') {
                                        return name + "：" + arrA[3];
                                    } else if (name === '预警') {
                                        return name + "：" + arrA[2];
                                    } else if (name === '报警') {
                                        return name + "：" + arrA[1];
                                    } else if (name === '危险') {
                                        return name + "：" + arrA[0];
                                    }

                                }
                            },
                            color: ['#FF4646', '#FF852C', '#EFD83B', '#005AFF'],
                            series: [{
                                name: '1#卸船机KB',
                                type: 'pie',
                                radius: ['55%', '70%'], //饼图的大小
                                center: ['30%', '50%'], //饼图的位置 
                                avoidLabelOverlap: false,
                                label: {
                                    normal: {
                                        show: false,
                                        position: 'center'
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        borderWidth: 3, //设置border的宽度有多大
                                        borderColor: '#2E2C48',
                                    },

                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data: data1
                            }],
                        });

                        myChart2.setOption({
                            title: [{
                                text: total2.name,
                                left: '29%',
                                top: '40%',
                                textAlign: 'center',
                                textBaseline: 'middle',
                                textStyle: {
                                    color: 'rgba(199,206,242,1)',
                                    fontWeight: 'normal',
                                    fontSize: 20
                                }
                            }, {
                                text: total2.value,
                                left: '29%',
                                top: '55%',
                                textAlign: 'center',
                                textBaseline: 'middle',
                                textStyle: {
                                    color: 'rgba(199,206,242,1)',
                                    fontWeight: 'normal',
                                    fontSize: 20
                                }
                            }],
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}: {c} ({d}%)"
                            },
                            legend: {
                                icon: 'rect',
                                orient: 'vertical', //图例排列方向
                                align: "left", //图例标记和文本的对齐,left,right
                                selectedMode: false, //取消点击事件
                                textStyle: {
                                    color: 'rgba(199,206,242,1)'
                                },
                                x: 'right',
                                top: '18%',
                                left: '65%',
                                itemGap: 20,
                                data: ['危险', '报警', '预警', '正常'],
                                formatter: function(name) {
                                    if (name === '正常') {
                                        return name + "：" + arrB[3];
                                    } else if (name === '预警') {
                                        return name + "：" + arrB[2];
                                    } else if (name === '报警') {
                                        return name + "：" + arrB[1];
                                    } else if (name === '危险') {
                                        return name + "：" + arrB[0];
                                    }
                                }
                            },
                            color: ['#FF4646', '#FF852C', '#EFD83B', '#005AFF'],
                            series: [{
                                name: '1#卸船机QS',
                                type: 'pie',
                                radius: ['55%', '70%'], //饼图的大小
                                center: ['30%', '50%'], //饼图的位置 
                                avoidLabelOverlap: false,
                                label: {
                                    normal: {
                                        show: false,
                                        position: 'center'
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        borderWidth: 3, //设置border的宽度有多大
                                        borderColor: '#2E2C48',
                                    },

                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data: data2
                            }]
                        });

                        myChart3.setOption({
                            title: [{
                                text: total3.name,
                                left: '29%',
                                top: '40%',
                                textAlign: 'center',
                                textBaseline: 'middle',
                                textStyle: {
                                    color: 'rgba(199,206,242,1)',
                                    fontWeight: 'normal',
                                    fontSize: 20
                                }
                            }, {
                                text: total3.value,
                                left: '29%',
                                top: '55%',
                                textAlign: 'center',
                                textBaseline: 'middle',
                                textStyle: {
                                    color: 'rgba(199,206,242,1)',
                                    fontWeight: 'normal',
                                    fontSize: 20
                                }
                            }],
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}: {c} ({d}%)"
                            },
                            legend: {
                                icon: 'rect',
                                orient: 'vertical', //图例排列方向
                                align: "left", //图例标记和文本的对齐,left,right
                                selectedMode: false, //取消点击事件
                                textStyle: {
                                    color: 'rgba(199,206,242,1)'
                                },
                                x: 'right',
                                top: '18%',
                                left: '65%',
                                itemGap: 20,
                                data: ['危险', '报警', '预警', '正常'],
                                formatter: function(name) {
                                    if (name === '正常') {
                                        return name + "：" + arrC[3];
                                    } else if (name === '预警') {
                                        return name + "：" + arrC[2];
                                    } else if (name === '报警') {
                                        return name + "：" + arrC[1];
                                    } else if (name === '危险') {
                                        return name + "：" + arrC[0];
                                    }
                                }
                            },
                            color: ['#FF4646', '#FF852C', '#EFD83B', '#005AFF'],
                            series: [{
                                name: '1#卸船机XC',
                                type: 'pie',
                                radius: ['55%', '70%'], //饼图的大小
                                center: ['30%', '50%'], //饼图的位置 
                                avoidLabelOverlap: false,
                                label: {
                                    normal: {
                                        show: false,
                                        position: 'center'
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        borderWidth: 3, //设置border的宽度有多大
                                        borderColor: '#2E2C48',
                                    },

                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data: data3
                            }]
                        })

                    })
                    .catch(response => {
                        console.log('post发送Ajax请求,请求失败', response)
                    })
            },
            sendPost1() {
                //axios.post('server/server-post.php','name=Alex&age=26')  //1.自己拼接为键值对
                axios.post(baseURL + '/vibMonitor.htm?param_act=getVbHome&card=onlineMonthlyAnalysis&chooseEquip=1%23卸船机&chooseMonth=2018-05-23 16', this.users, { //2.使用transformRequest，在请求发送前将请求数据进行转换
                        transformRequest: [
                            function(data) {
                                let params = '';
                                for (let index in data) {
                                    params += index + '=' + data[index] + '&'
                                }
                                return params;
                            }
                        ]
                    })
                    .then(response => {
                        document.getElementById("b1").innerHTML = response.data.eqPointCount;
                        document.getElementById("b2").innerHTML = response.data.normalCount;
                        document.getElementById("b3").innerHTML = response.data.cumuAlarmCount;
                        document.getElementById("b4").innerHTML = response.data.cumuAlarmTime;
                    })
                    .catch(response => {
                        console.log('post发送Ajax请求,请求失败', response)
                    })
            },
            toggle(event, id, pointNam) {
                debugger
                if (event.currentTarget.childNodes[0].getAttribute("src") == "static/img/unsele_s.png") {
                    event.currentTarget.childNodes[0].setAttribute("src", "static/img/sele_s.png");
                    // event.currentTarget.childNodes[0].attributes[1].nodeValue == "static/img/strain/sele_s.png"; 
                    // event.currentTarget.style.border="1px solid #1B86FF";  

                    event.currentTarget.classList.add("active"); //activeSelect
                    kk.push(pointNam);
                    w_arrName.push(id);
                    w_strName = w_arrName.join(',');


                    p_arrName.push(id);
                    p_strName = p_arrName.join(',');

                } else {
                    event.currentTarget.childNodes[0].setAttribute("src", "static/img/unsele_s.png");
                    event.currentTarget.classList.remove("active");

                    //取消选中时，删除取消的数据
                    var index1 = w_arrName.indexOf(id);
                    var index2 = p_arrName.indexOf(id);
                    w_arrName.splice(index1, 1);
                    p_arrName.splice(index2, 1);
                    w_strName = w_arrName.join(',');
                    p_strName = p_arrName.join(',');

                }
                this.addEventListenner();
            },

            more(index,event, clickId) { //选项在顶部的处理方法
                event;
                clickId;
                //if (event.currentTarget.style.border == "") {
               
                 if(this.checkbox1.length > 1){
                    $(".leg").removeClass("activeSelect");
                     event.currentTarget.classList.toggle("activeSelect");
   
                    console.info(namea);
                    name1 = [];
                    this.legSpan = index;   
                    
                }else if(this.checkbox1.length = 1){
                     event.currentTarget.classList.toggle("activeSelect");
                     //判断选中哪一种

                     //讲上下一起传到
                   
                }
                    if (event.currentTarget.classList.contains("activeSelect")) {
                        name1.push(clickId);
                        name2.push(clickId);
                    } else {
                        var index1 = name1.indexOf(clickId);
                        var index2 = name2.indexOf(clickId);
                        name1.splice(index1, 1);
                        name2.splice(index2, 1);
                        // console.log(pointArr)
                    }
               


            },
            more1(event, clickId) { //选项在顶部的处理方法
                event;
                clickId;

                event.currentTarget.classList.toggle("activeSelect");
               
                if (event.currentTarget.classList.contains("activeSelect")) {
                    name1.push(clickId);
                    name2.push(clickId);
                } else {
                    var index1 = name1.indexOf(clickId);
                    var index2 = name2.indexOf(clickId);
                    name1.splice(index1, 1);
                    name2.splice(index2, 1);
                    // console.log(pointArr)
                }
            },
            // 应力首页右侧报警部分
            reqAlarm() {
                fetch({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    baseURL: baseURL,
                    url: '/vibMonitor.htm?param_act=getVbHome&card=all',
                    method: 'post'
                }).then(res => {
                    //console.log('1')
                    if (res.data != undefined && res.data != "") {
                        var obj = res.data;
                        this.warnMsg = obj.warnList;
                        this.alarmMsg = obj.alarmList;
                        this.dangerMsg = obj.dangeList;
                    }
                }).catch(res => {
                    console.log('请求右侧报警信息,请求失败', res)
                })
            },
            starSys1() {
                var params; 
                for(var i=0;i<this.monitorData.length;i++){
                    if($(".leg").eq(i).hasClass('activeSelect') && $.inArray(this.monitorData[i].ITEM_ID,name1) == -1){
                        name1.push(this.monitorData[i].ITEM_ID);
                    };

                };
                if(name1.length == 0){
                    this.$alert("请选中监测点");
                    return;
                };
                namea = name1.join(',');
                //开始分析是判断是历史曲线还是实时曲线
                var eee = document.getElementById("nowTime1");
                var www = document.getElementById("overTime1");
                if (eee.className == 'border') { //实时曲线
                    //alert('111');
                    w_strName = namea;
                     params = {
                        'card': "pointVivRec",
                        'itemIds': w_strName
                    }
                    
                    $.ajax({ //向后台传递选择的参数，并请求对应数据
                        type: 'post',
                        url: baseURL + '/vibMonitor.htm?param_act=selectTempChart&card=pointVivRec',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        success: function(datas) {
                            debugger //nowData
                            let data1  = JSON.parse(datas);
                            nowData = [];
                            for (var p in data1) {
                                for (let i = 0; i < data1[p].length; i++) {
                                    nowData.push(data1[p][i].TEMPER_VALUE);
                                }
                                
                            }
                            dataAll = nowData;
                            console.log(dataAll)
                        }
                    })
                    
                } else if (www.className == 'border') { //历时曲线
                    params ={
                            'card': "pointVibHis",
                            'itemIds': namea,
                            'startTime': startTime1,
                            'endTime': endTime1,
                    };
                    var _this = this;
                    $.ajax({ //向后台传递选择的参数，并请求对应数据
                        type: 'post',
                        url: baseURL + '/vibMonitor.htm?param_act=selectTempChart&card=pointVibHis',
                        params:{
                            'startTime': startTime1,
                            'endTime': endTime1,
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        success: function(datas) {
                            debugger
                            let data1 = JSON.parse(datas);
                            historyData = [];
                            for (var p in data1) {
                                if(data1[p].length == 0){
                                   _this.$alert("暂无历史数据！");
                                    return
                                }
                                for (let i = 0; i < data1[p].length; i++) {
                                    historyData.push(data1[p][i].TEMPER_VALUE);
                                }
                                
                            }
                            dataAll = historyData;
                                
                        }
                    })
                }
                zhendongAndWendu = this.checkbox1;
                if(name1.length >1 && zhendongAndWendu.length >1){
                    this.$alert("当需要同时展示振动曲线和温度曲线时，只能选择一个测点！");
                    return;
                }
                setTimeout(function(){
                    $.ajax({ //向后台传递选择的参数，并请求对应数据
                    type: 'post',
                    url: baseURL + '/vibMonitor.htm?param_act=selectChart',
                    data: params,

                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    success: function(datas) {
                        var lineData = JSON.parse(datas);
                        series1 = [];
                        arrAxia1 = [];
                        var arrV = [];
                        var str = [];
                        for (var p in lineData) {
                            str.push(p);
                            arrV.push(lineData[p]);

                        }
                        debugger
                        str.unshift("环境温度");
                        kk = str;
                        var temp1 = [];
                        var tempA = [];
                        var tempV = [];
                        
                        let keys = [];
                        
                         if(name1.length == 1){
                             //判断选中了哪一个
                         
                                temp1 = arrV[3];
                                var tempArrX = [];
                                var tempArrY = [];
                                var tempValue = [];
                                for (var k = 0; k < temp1.length; k++) {
                                    //															var MONI_VALUE = temp1[k].MONI_VALUE;
                                    //															var MONI_TIME = temp1[k].MONI_TIME;
                                    tempArrX.push(temp1[k].MONI_VALUE);
                                    tempArrY.push(temp1[k].MONI_TIME);
                                    tempValue.push(temp1[k].TEMPER_VALUE);
                                }
                                
                                arrAxia1 = tempArrY;

                                if( zhendongAndWendu.length > 1){
                                    tempA.push(tempArrX);
                                    tempV.push(tempValue);
                                    tempV.unshift(dataAll);
                                    
                                    keys.unshift(kk[0]);
                                }else if(zhendongAndWendu[0] == "温度曲线" && zhendongAndWendu.length == 1){
                                    tempV.push(tempValue);
                                    tempV.unshift(dataAll);
                                    
                                    
                                    keys.unshift(kk[0]);
                                }else if(zhendongAndWendu[0] == "振动曲线" && zhendongAndWendu.length == 1){
                                    tempA.push(tempArrX);
                                } 
                                for (var i = 0; i < tempA.length; i++) {
                                    series1.push({
                                        name: "振动值",
                                        type: 'line',
                                        smooth: true, //这句就是让曲线变平滑的
                                        //																	stack: '总量',
                                        data: tempA[i], //arr[i][j].MONI_VALUE
                                        markLine: {
                                            data : [
                                                
                                                {
                                                    name: '危险值',
                                                    yAxis: arrV[2],
                                                    // lineStyle: { type: 'solid',color:'black'}
                                                    itemStyle: {
                                                        normal: { lineStyle: { type: 'solid',color:'#FF4646'},label: { show: true, position:'middle'} }
                                                    }
                                                },
                                                {
                                                    name: '报警值',
                                                    yAxis: arrV[1],
                                                    //lineStyle: { type: 'solid',color:'red' }
                                                    itemStyle: {
                                                        normal: { lineStyle: { type: 'solid',color:'#FF852C'},label: { show: true, position:'middle'} }
                                                    }
                                                },
                                                {
                                                    name: '预警值',
                                                    yAxis: arrV[0],
                                                    //lineStyle: { type: 'solid',color:'orange' }
                                                    itemStyle: {
                                                        normal: { lineStyle: { type: 'solid',color:'#FFDE00'},label: { show: true, position:'middle'} }
                                                    }
                                                },

                                            ]
                                        },
                                    })
                                }
                                // kk = ['111','222']
                                 for (var i = 0; i < tempV.length; i++) {
                                     console.log(tempV)
                                    series1.push({
                                        // name: "环境温度",
                                        name: keys[i],
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
                                        data: tempV[i] //arr[i][j].MONI_VALUE
                                    })
                                }
                            }else if(name1.length > 1){                                
                                for (var i = 0; i < arrV.length; i++) {
                                    temp1 = arrV[i];
                                    var tempArrX = [];
                                    var tempArrY = [];
                                    var tempValue = [];
                                    for (var k = 0; k < arrV[i].length; k++) {
                                        //															var MONI_VALUE = temp1[k].MONI_VALUE;
                                        //															var MONI_TIME = temp1[k].MONI_TIME;
                                        tempArrX.push(arrV[i][k].MONI_VALUE);
                                        tempArrY.push(arrV[i][k].MONI_TIME);
                                        tempValue.push(arrV[i][k].TEMPER_VALUE);
                                    }
                                    tempA.push(tempArrX);
                                    tempV.push(tempValue);
                                   

                                    arrAxia1 = tempArrY;
                                }
                                tempV.unshift(dataAll);
                                if(zhendongAndWendu[0] == "温度曲线" && zhendongAndWendu.length == 1){
                                    // tempV = tempValue;
                                       for (var i = 0; i < tempV.length; i++) {
                                            series1.push({
                                                name: kk[i],
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
                                                data: tempV[i] //arr[i][j].MONI_VALUE
                                            })
                                        }
                                    
                                }else if(zhendongAndWendu[0] == "振动曲线" && zhendongAndWendu.length == 1){
                                    // tempA = tempArrX;
                                    for (var i = 0; i < tempA.length; i++) {
                                        series1.push({
                                            name: kk[i],
                                            type: 'line',
                                            smooth: true, //这句就是让曲线变平滑的
                                            //																	stack: '总量',
                                            data: tempA[i], //arr[i][j].MONI_VALUE
                                        })
                                    }
                                } 
                                
                              
                                
                            }

                            chartresize1();
                    }
                });
                },300)
                
               
            },
            replay1() {
                //$('.leg').css('border','');
                $("#bars .leg").removeClass('activeSelect'); //移除选中状态
                $("#bars1 .leg").removeClass('activeSelect');
                p_arrName = [];
                p_strName = "";
                w_arrName = [];
                w_strName = "";
                name1 = [];
                namea = '';
            },
            replay2() {
                //$('.leg').css('border','');
                $("#bars .leg").removeClass('activeSelect'); //移除选中状态
                $("#bars1 .leg").removeClass('activeSelect');
                p_arrName = [];
                p_strName = "";
                w_arrName = [];
                w_strName = "";
                series2 = [];
                arrAxia2 = [];
                name1 = [];
                namea = ''
            },
            starSys2() {
                
                $.ajax({
                    type: "post",
                    data: {
                        'card': "pointAlarmTime",
                        'itemIds': nameb,
                        'startTime': startTime2,
                        'endTime': endTime2,
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    url: baseURL + "/vibMonitor.htm?param_act=selectChart", //预警时长
                    success: function(datat) {
                        p_arrName = [];
                        p_strName = "";
                        w_arrName = [];
                        w_strName = "";
                        series2 = [];
                        arrAxia2 = [];
                        name1 = [];
                        namea = ''


                        var data1 = JSON.parse(datat);

                        var arrV = [];
                        var str = [];
                        for (var p in data1) {
                            str.push(p);
                            arrV.push(data1[p]);

                        }

                        arrAxia2 = str;
                        var temp1 = [];
                        var tempA = [];
                        var alarm = [];
                        var dange = [];
                        var warn = []
                        for (var i = 0; i < arrV.length; i++) {
                            temp1 = arrV[i];
                            var tempArrX = [];
                            var tempArrY = [];

                            for (var p in temp1) {
                                tempArrX.push(temp1[p])
                            }

                            alarm.push(tempArrX[0]);
                            dange.push(tempArrX[1]);
                            warn.push(tempArrX[2]);

                            //arrAxia=tempArrY;
                        }
                        tempA.push(alarm);
                        tempA.push(dange);
                        tempA.push(warn);
                        bb = ['预警', '报警', '危险'];
                        for (var i = 0; i < tempA.length; i++) {
                            series2.push({
                                name: bb[i],
                                type: 'bar',
                                data: tempA[i] //arr[i][j].MONI_VALUE
                            })
                        }
                        chartresize2();
                    }
                });

                p_arrName = [];
                p_strName = "";
                w_arrName = [];
                w_strName = "";
                series2 = [];
                arrAxia2 = [];
                name1 = [];
                namea = ''
            }
        },

        created(){
            bus.$on("equipData", (equipItem) =>{
                this.equipItem = equipItem;
            })
        },
        mounted() {
            this.reqAlarm();
            this.sendPost();
            this.sendPost1();
            //this.boatA();
            //var baseURL = process.env.NODE_ENV === "production"?process.env.BASE_API:'/prod';
            var baseURL = process.env.BASE_API;
            this.getRepor();
            
			
            // 右侧通知栏信息实时刷新
                    
            clearInterval(timer1);        
            timer1 = setInterval(() => {    
            	
            	this.sendPost();
            	        
                fetch({                
                    headers: {                    
                        'Content-Type': 'application/json'                    
                    },
                                        baseURL: baseURL,
                                        url: '/vibMonitor.htm?param_act=getVbHome&card=all',
                                        method: 'post'                
                }).then(res => {                    
                    if (res.data != undefined && res.data != "") {                        
                        var obj = res.data;
                        this.warnMsg = obj.warnList;
                        this.alarmMsg = obj.alarmList;
                        this.dangerMsg = obj.dangeList;          
                    }                
                }).catch(res => {                    
                    console.log('请求右侧报警信息,请求失败', res)                
                })        
            }, 10000)



            //修改时间插件样式
            $(function() {
                $(".ivu-input").css({
                    height: '29px',
                    background: "#2E2C48",
                    border: "none",
                    color: "#C7CEF2"
                })

            });

            //开始分析是判断是历史曲线还是实时曲线
            var eee = document.getElementById("nowTime1");
            var www = document.getElementById("overTime1");
            $("#starSys").on("click", function() {
                //未选中测点时不跳转
                if ($('.leg').hasClass('activeSelect') == false) {
                    // return false;
                    p_arrName = [];
                    p_strName = "";
                    w_arrName = [];
                    w_strName = "";
                    series2 = [];
                    arrAxia2 = [];
                    name1 = [];
                    namea = '';
                    series1 = [];
                    arrAxia1 = [];
                    name2 = [];
                    nameb = '';
                    niutong.$alert("请选中监测点");
                    return;
                }
                niutong.starSys1();
                
            })

            var _this = this;
            //开始分析是判断是预警次数分析还是预警时长分析
            var rrr = document.getElementById("nowTime2");
            var ttt = document.getElementById("overTime2");
            $("#starSys2").on("click", function() {
                p_arrName = [];
                p_strName = "";
                w_arrName = [];
                w_strName = "";
                series2 = [];
                arrAxia2 = [];
                name1 = [];
                namea = '';
                series1 = [];
                arrAxia1 = [];
                name2 = [];
                nameb = '';
                if ($('.leg').hasClass('activeSelect') == false) {
                    // return false;
                    niutong.$alert("请选中监测点");
                    return;
                }
                for(var i=0;i<_this.monitorData.length;i++){
                    if($("#bars1 .leg").eq(i).hasClass('activeSelect') && $.inArray(_this.monitorData[i].ITEM_ID,name2) == -1){
                        name2.push(_this.monitorData[i].ITEM_ID);
                    };

                };
                if(name2.length == 0){
                    this.$alert("请选中监测点");
                    return;
                };
                nameb = name2.join(',');
                if (rrr.className == 'border') { //实时曲线
                    //alert('111');
                    p_strName = nameb;
                    danwei = "单位：次";
                    // bar();
                    $.ajax({
                        type: "post",
                        data: {
                            'card': "pointAlarmCount",
                            'itemIds': nameb,
                            'startTime': startTime2,
                            'endTime': endTime2,
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        url: baseURL + "/vibMonitor.htm?param_act=selectChart", //预警时长
                        success: function(datat) {
                            var data1 = JSON.parse(datat);

                            var arrV = [];
                            var str = [];
                            for (var p in data1) {
                                str.push(p);
                                arrV.push(data1[p]);

                            }
                            series2 = [];
                            arrAxia2 = [];
                            arrAxia2 = str;
                            var temp1 = [];
                            var tempA = [];
                            var alarm = [];
                            var dange = [];
                            var warn = []
                            for (var i = 0; i < arrV.length; i++) {
                                temp1 = arrV[i];
                                var tempArrX = [];
                                var tempArrY = [];

                                for (var p in temp1) {
                                    tempArrX.push(temp1[p])
                                }

                                alarm.push(tempArrX[0]);
                                dange.push(tempArrX[1]);
                                warn.push(tempArrX[2]);

                                //arrAxia=tempArrY;
                            }
                            tempA.push(alarm);
                            tempA.push(dange);
                            tempA.push(warn);
                            bb = ['预警', '报警', '危险'];
                            for (var i = 0; i < tempA.length; i++) {
                                series2.push({
                                    name: bb[i],
                                    type: 'bar',
                                    data: tempA[i] //arr[i][j].MONI_VALUE
                                })
                            }
                            chartresize2();
                        }
                    });
                } else if (ttt.className == 'border') { //历时曲线
                    //('222');
                    danwei = "单位：分钟";
                    $.ajax({
                        type: "post",
                        data: {
                            'card': "pointAlarmTime",
                            'itemIds': nameb,
                            'startTime': startTime2,
                            'endTime': endTime2,
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        url: baseURL + "/vibMonitor.htm?param_act=selectChart", //预警时长
                        success: function(datat) {
                            var data1 = JSON.parse(datat);

                            var arrV = [];
                            var str = [];
                            for (var p in data1) {
                                str.push(p);
                                arrV.push(data1[p]);

                            }
                            series2 = [];
                            arrAxia2 = [];
                            arrAxia2 = str;
                            var temp1 = [];
                            var tempA = [];
                            var alarm = [];
                            var dange = [];
                            var warn = []
                            for (var i = 0; i < arrV.length; i++) {
                                temp1 = arrV[i];
                                var tempArrX = [];
                                var tempArrY = [];

                                for (var p in temp1) {
                                    tempArrX.push(temp1[p])
                                }

                                alarm.push(tempArrX[0]);
                                dange.push(tempArrX[1]);
                                warn.push(tempArrX[2]);

                                //arrAxia=tempArrY;
                            }
                            tempA.push(alarm);
                            tempA.push(dange);
                            tempA.push(warn);
                            bb = ['预警', '报警', '危险'];
                            for (var i = 0; i < tempA.length; i++) {
                                series2.push({
                                    name: bb[i],
                                    type: 'bar',
                                    data: tempA[i] //arr[i][j].MONI_VALUE
                                })
                            }
                            chartresize2();
                        }
                    });

                }
            })




            $("#treeAll").on("click", function() {
                document.getElementById("treeName").innerHTML = '设备状态汇总';
                $("#treeAll").css("background", "#2E2C48")
                $("#box1").show(); //
                $("#all_e1").show(); //all_e1 one_L
                $("#one_L").show();
                $("#two_L").hide();

                $("#box2").hide();
                $("#box3").hide();
                $("#tree p").css("background", "#1E1E24");

                $("#bars .leg").removeClass('activeSelect'); //移除选中状态
                $("#bars1 .leg").removeClass('activeSelect');

            });

            //全部设备与月度报告
            $("#month_R").on("click", function() {
                $("#line_r").show();
                $("#all_e1").hide();
                $("#box2").hide();
                $("#box3").hide();
                $("#one_L").hide();
                $("#two_L").show();
            });
            $("#all_Pie").on("click", function() {
                $("#line_r").hide();
                $("#all_e1").show();
                $("#box2").hide();
                $("#box3").hide();
                $("#one_L").show();
                $("#two_L").hide();
                $('.analyse').css('background', '#2E2C48').css('color', '#8084A2');
            })
            //图形监测与列表监测
            $("#table_monitor").on("click", function() {
                $("#table_r").show();
                $("#allEq").hide();
                // $("#box2").hide();
                // $("#box3").hide();
                $("#equip_L").hide();
                $("#table_L").show();
                $('.analyse').css('background', '#2E2C48').css('color', '#8084A2');
            });
            $("#q6").on("click", function() {
                $("#table_r").hide();
                $("#allEq").show();
                // $("#box2").hide();
                // $("#box3").hide();
                $("#equip_L").show();
                $("#table_L").hide();
            })

            function line() {
                $.ajax({ //向后台传递选择的参数，并请求对应数据
                    type: 'post',
                    url: baseURL + '/vibMonitor.htm?param_act=selectChart',
                    data: {
                        'card': "pointVivRec",
                        'itemIds': w_strName
                    },

                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    success: function(datas) {
                        series1 = [];
                        arrAxia1 = [];
                        var data1 = JSON.parse(datas);
                        console.log(data1)
                        //arrV=[];
                        var arrV = [];
                        var str = [];
                        for (var p in data1) {
                            str.push(p);
                            arrV.push(data1[p]);

                        }

                        kk = str;
                        var temp1 = [];
                        var tempA = [];
                        // var tempV = [];
                        for (var i = 0; i < arrV.length; i++) {
                            temp1 = arrV[i];
                            var tempArrX = [];
                            var tempArrY = [];
                            // var tempValue = [];
                            for (var k = 0; k < temp1.length; k++) {
                                //															var MONI_VALUE = temp1[k].MONI_VALUE;
                                //															var MONI_TIME = temp1[k].MONI_TIME;
                                tempArrX.push(temp1[k].MONI_VALUE);
                                tempArrY.push(temp1[k].MONI_TIME);
                                // tempValue.push(temp1[k].TEMPER_VALUE);
                            }
                            tempA.push(tempArrX);
                            // tempV.push(tempValue);
                            arrAxia1 = tempArrY;
                        }
                        if(w_arrName.length == 1){
                            for (var i = 0; i < tempA.length; i++) {
                                series1.push({
                                    name: kk[i],
                                    type: 'line',
                                    smooth: true, //这句就是让曲线变平滑的
                                    //																	stack: '总量',
                                    data: tempA[i], //arr[i][j].MONI_VALUE
                                    markLine: {
                                        data : [
                                            
                                            {
                                                name: '危险值',
                                                yAxis: arrV[2],
                                                // lineStyle: { type: 'solid',color:'black'}
                                                itemStyle: {
                                                    normal: { lineStyle: { type: 'solid',color:'#FF4646'},label: { show: true, position:'middle'} }
                                                }
                                            },
                                            {
                                                name: '报警值',
                                                yAxis: arrV[1],
                                                //lineStyle: { type: 'solid',color:'red' }
                                                itemStyle: {
                                                    normal: { lineStyle: { type: 'solid',color:'#FF852C'},label: { show: true, position:'middle'} }
                                                }
                                            },
                                            {
                                                name: '预警值',
                                                yAxis: arrV[0],
                                                //lineStyle: { type: 'solid',color:'orange' }
                                                itemStyle: {
                                                    normal: { lineStyle: { type: 'solid',color:'#FFDE00'},label: { show: true, position:'middle'} }
                                                }
                                            },

                                        ]
                                    }
                                })
                            }
                        }else if(w_arrName.length > 1){
                            for (var i = 0; i < tempA.length; i++) {
                                series1.push({
                                    name: kk[i],
                                    type: 'line',
                                    smooth: true, //这句就是让曲线变平滑的
                                    //																	stack: '总量',
                                    data: tempA[i], //arr[i][j].MONI_VALUE
                                })
                            }

                        }
                        

                        chartresize1();
                    }
                })
            };

            function bar() {

                $.ajax({ //向后台传递选择的参数，并请求对应数据
                    type: 'post',
                    url: baseURL + '/vibMonitor.htm?param_act=selectChart',
                    data: {
                        'card': "pointAlarmCount",
                        'itemIds': p_strName,
                        'startTime': startTime1,
                        'endTime': endTime1,
                    },

                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    success: function(datat) {
                        var data1 = JSON.parse(datat);

                        var arrV = [];
                        var str = [];
                        for (var p in data1) {
                            str.push(p);
                            arrV.push(data1[p]);

                        }
                        arrAxia2 = str;
                        var temp1 = [];
                        var bb = [];
                        var tempA = [];
                        var alarm = [];
                        var dange = [];
                        var warn = []
                        for (var i = 0; i < arrV.length; i++) {
                            temp1 = arrV[i];
                            var tempArrX = [];
                            var tempArrY = [];

                            for (var p in temp1) {
                                tempArrX.push(temp1[p]);
                                bb.push(p);
                            }

                            alarm.push(tempArrX[0]);
                            dange.push(tempArrX[1]);
                            warn.push(tempArrX[2]);

                            //arrAxia=tempArrY;
                        }
                        tempA.push(alarm);
                        tempA.push(dange);
                        tempA.push(warn);
                        series2 = [];
                        bb = ['预警', '报警', '危险'];
                        for (var i = 0; i < tempA.length; i++) {
                            series2.push({
                                name: bb[i],
                                type: 'bar',
                                data: tempA[i] //arr[i][j].MONI_VALUE
                            })
                        }
                        chartresize2();
                    }
                })

            }

            var niutong = this;
            //由设备分析跳转折线图
            $("#v_sys").on("click", function() {
				debugger
				//振动分析时间设置
                niutong.startTime1 = formatDate2(new Date());
                niutong.endTime1 = formatDate1(new Date());
                //预警分析时间设置
                niutong.startTime2 = formatDate2(new Date());
                niutong.endTime2= formatDate1(new Date());
			    niutong.checkbox1 = ["振动曲线"];
			    
                //未选中测点时不跳转
                if ($("#allEq").is(':hidden') == false && $('.strainDom').hasClass('active') == false) {
                    niutong.$alert("请选中监测点");
                    return;
                } else if($("#table_r").is(':hidden') == false && niutong.selection.length == 0){
                    niutong.$alert("请选中监测点");
                    return;
                }
                $("#box1").hide();
                $("#box2").hide();
                $("#box3").show();
                $("#p_vibration").show();
                $("#p_warn").hide();
                $("#nowTime1").addClass('border'); //实时曲线变色
                $("#v_left p").show(); //测点分析的下划线
                $("#w_right p").hide();
                //给选中的测点添加样式
                for(var a in w_arrName){
                    for(var i=0;i<niutong.monitorData.length;i++){
                        if(w_arrName[a] == niutong.monitorData[i].ITEM_ID){

                            $("#bars .leg").eq(i).addClass('activeSelect');
                        }
                    }
                }
                document.getElementById("treeName").innerHTML = nodeName + '&nbsp>&nbsp测点振动分析';
                $("#datePicker").hide();
                line();

            });
            //由设备分析跳转柱状图
            var tiao = this;
            $("#w_sys").on("click", function() {
                
                //振动分析时间设置
                tiao.startTime1 = formatDate2(new Date());
                tiao.endTime1 = formatDate1(new Date());
                //预警分析时间设置
                tiao.startTime2 = formatDate2(new Date());
                tiao.endTime2= formatDate1(new Date());
				

                //未选中测点时不跳转
                if ($('.strainDom').hasClass('active') == false) {
                    // return false;
                    // p_arrName = [];
                    // p_strName = "";
                    // w_arrName = [];
                    // w_strName = "";
                    // series2 = [];
                    // arrAxia2 = [];
                    // name1 = [];
                    // namea = '';
                    // series1 = [];
                    // arrAxia1 = [];
                    // name2 = [];
                    // nameb = '';
                    niutong.$alert("请选中监测点");
                    return;
                }


                $("#box1").hide();
                $("#box2").hide();
                $("#box3").show();
                $("#p_vibration").hide();
                $("#p_warn").show();
                $("#w_right p").show(); ////预警分析的下划线
                $("#v_left p").hide();
                //给选中的测点添加样式                
                for(var a in p_arrName){
                    for(var i=0;i<niutong.monitorData.length;i++){
                        if(p_arrName[a] == niutong.monitorData[i].ITEM_ID){

                            $("#bars1 .leg").eq(i).addClass('activeSelect');
                        }
                    }
                }

                $("#nowTime2").addClass('border');
                $("#overTime2").removeClass('border');
                $("#nowTime1").removeClass('border');
                $("#overTime1").removeClass('border');



                kk = ['预警', '报警', '危险']
                document.getElementById("treeName").innerHTML = nodeName + '&nbsp>&nbsp测点预警分析';

                bar();
                series2 = [];
                arrAxia2 = [];
            });

            $.ajax({
                url: baseURL + "/equip.htm?param_act=selectEquip&MONITOR_TYPE=1",
                type: 'post',
                dataType: "json",
                success: function(data) {
                    //					for(var i=0 ;i<data.length;i++){ //几个人有几个checkbox
                    //                		$("#tree").append("<input type='checkbox' value='"+data[i].EQ_CODE+"' name='header'/>"+data[i].EQ_NAME + "<br>");
                    //               	}

                    for (var i = 0; i < data.length; i++) {
                        var partCode, partName;
                        partCode = data[i].EQ_CODE;
                        partName = data[i].EQ_NAME;

                        //动态生成设备树，并添加相应的样式
                        $("#tree").append('<p class="treeList" id="p' + i + '"  code=' + partCode + '>' + partName + '</p>');
                        $(".treeList").css("width", "100%").css("height", "40px").css("line-height", "40px").css("border-bottom", "1px solid #2E2C48").css("padding-left", "10px").css("cursor", "pointer");
                        $("#tree").css("border-top", "1px solid #2E2C48");

                    }
                    var btns = document.getElementsByClassName('treeList');
                    for (var i = 0; i < btns.length; i++) {
                        (function(i) {
                            btns[i].onclick = function() {
                                $(this).unbind('click');
                                //清空折线柱状图数据
                                p_arrName = [];
                                p_strName = "";
                                w_arrName = [];
                                w_strName = "";
                                series2 = [];
                                arrAxia2 = [];
                                name1 = [];
                                namea = '';
                                //重置实时曲线		
                                $("#nowTime1").addClass('border'); //实时曲线变色
                                $("#overTime1").removeClass('border');
                                $("#nowTime2").addClass('border'); //实时曲线变色
                                $("#overTime2").removeClass('border');

                                if (i == 0) {
                                    $("#background").attr("src", '../../static/img/11.png');
                                } else if (i == 1) {
                                    $("#background").attr("src", '../../static/img/22.png');
                                } else if (i == 2) {
                                    $("#background").attr("src", '../../static/img/33.png');
                                } else {
                                    $("#background").attr("src", '');
                                }

                                w_arrName = [];
                                w_strName = "";
                                p_arrName = [];
                                p_strName = "";
                                //var Img = $(".point_select");
                                //Img.attr("src", "static/img/unsele_s.png");
                                //$(".eqOne").css("border","0");
                                $("#bars .leg").removeClass('activeSelect'); //移除选中状态
                                $("#bars1 .leg").removeClass('activeSelect');

                                nodeCode = data[i].EQ_CODE;
                                nodeName = data[i].EQ_NAME;
                                $("#box1").hide();
                                $("#box2").show();
                                $("#box3").hide();
                                $("#line_r").hide();
                                $("#treeAll").css("background", "#1E1E24"); //全部设备bg变se

                                $(this).css("background", "#2E2C48"); //当前点击元素
                                $(this).siblings().css("background", "#1E1E24"); //其他元素
                                // var partName1 = '';
                                niutong.partName1 = data[i].EQ_NAME;
                                document.getElementById("treeName").innerHTML = niutong.partName1;
                                document.getElementById("q6").innerHTML = niutong.partName1 + '(图形监测)';
                                document.getElementById("table_monitor").innerHTML = niutong.partName1 + '(列表监测)';
								three();
								
								
								//页面实时刷新
								clearInterval(timer2);        
					            timer2 = setInterval(() => {    
					            	//console.log("2")
					            	three()
					            }, 10000)
					           
                            }
                        })(i);
                    }


                }
            });
             //对应设备图上标点
            function three(){
                $.ajax({
                    type: "post",
                    url: baseURL + "/vibMonitor.htm?param_act=eqPointsData",
                    data: {
                        'selectMachineName': niutong.partName1
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    success: function(dat) {
                        var data1 = JSON.parse(dat)
                        niutong.monitorData = data1;
                        debugger
                        niutong.$nextTick(function() {
                            for (var i = 0; i < niutong.monitorData.length; i++) {
                                $(".strainDom").eq(i).removeClass("active"); //activeSelect
                                //$(".strainDom").eq(i).removeClass("activeSelect");//activeSelect
                                $(".strainDom").eq(i).find(".select-box").attr("src", "static/img/unsele_s.png");
                                $(".strainDom").eq(i).css("bottom", niutong.monitorData[i].y);
                                $(".strainDom").eq(i).css("left", niutong.monitorData[i].x);
                                if (niutong.monitorData[i].pointState == 1) {
                                    $(".strainDom").eq(i).css("background", "#2E2C48")
                                    $(".strainDom").eq(i).css("color", "#C7CEF2")
                                } else if (niutong.monitorData[i].pointState == 2) {
                                    $(".strainDom").eq(i).css("background", "#EFD83B")
                                    $(".strainDom").eq(i).css("color", "#1E1E24")
                                } else if (niutong.monitorData[i].pointState == 3) {
                                    $(".strainDom").eq(i).css("background", "#FF852C")
                                    $(".strainDom").eq(i).css("color", "#1E1E24")
                                } else if (niutong.monitorData[i].pointState == 4) {
                                    $(".strainDom").eq(i).css("background", "#FF4D4D")
                                    $(".strainDom").eq(i).css("color", "#1E1E24")
                                }
                            }
                            this.addEventListenner();
                        })

                        //折线图与柱状图切换
                        $("#v_left").on("click", function() {
                            p_arrName = [];
                            p_strName = "";
                            w_arrName = [];
                            w_strName = "";
                            series2 = [];
                            arrAxia2 = [];
                            name1 = [];
                            namea = '';
                            series1 = [];
                            arrAxia1 = [];
                            name2 = [];
                            nameb = '';
                            $("#box1").hide();
                            $("#box2").hide();
                            $("#box3").show();
                            $("#p_vibration").show();
                            $("#p_warn").hide();
                            $("#w_right p").hide();
                            $("#v_left p").show();
                            $("#nowTime1").addClass('border');
                            $("#overTime1").removeClass('border');
                            $("#nowTime2").removeClass('border');
                            $("#overTime2").removeClass('border');
                            $("#bars .leg").removeClass('activeSelect'); //移除测点选中状态
                            $("#bars1 .leg").removeClass('activeSelect');
                            document.getElementById("treeName").innerHTML = nodeName + '&nbsp>&nbsp测点振动分析';
                            line();
                        });
                        $("#w_right").on("click", function() {
                            p_arrName = [];
                            p_strName = "";
                            w_arrName = [];
                            w_strName = "";
                            series2 = [];
                            arrAxia2 = [];
                            name1 = [];
                            namea = '';
                            series1 = [];
                            arrAxia1 = [];
                            name2 = [];
                            nameb = '';
                            $("#box1").hide();
                            $("#box2").hide();
                            $("#box3").show();
                            $("#p_warn").show();
                            $("#p_vibration").hide();
                            $("#v_left p").hide();
                            $("#w_right p").show();
                            document.getElementById("treeName").innerHTML = nodeName + '&nbsp>&nbsp测点预警分析';
                            $("#nowTime2").addClass('border');
                            $("#nowTime1").removeClass('border');
                            $("#bars .leg").removeClass('activeSelect'); //移除测点选中状态
                            $("#bars1 .leg").removeClass('activeSelect');
                            bar()
                        });
                    },
                    error: function(err) {

                    }
                });

            }
            setTimeout(() =>{

				// this.myhaldle(
					var partNameLeft = $('.treeList');
                    niutong.partName1 = this.equipItem.name;
                    for (var i = 0; i < partNameLeft.length; i++) {
                        if (partNameLeft.eq(i).text() == this.partName1) {
                            $("#treeAll").css("background", "#1E1E24"); //全部设备bg变se
                            partNameLeft.eq(i).css("background", "#2E2C48"); //当前点击元素
                            partNameLeft.eq(i).siblings().css("background", "#1E1E24"); //其他元素

                            $("#box1").hide();
                            $("#box2").show();
                            $("#box3").hide();
                            $("#line_r").hide();
                            $('#treeName').text(this.equipItem.name);
                            if (i == 0) {
                                $("#background").attr("src", '../../static/img/11.png');
                            } else if (i == 1) {
                                $("#background").attr("src", '../../static/img/22.png');
                            } else if (i == 2) {
                                $("#background").attr("src", '../../static/img/33.png');
                            } else {
                                $("#background").attr("src", '');
                            }

                            three();
                            // $("#treeAll").css("background", "#1E1E24"); //全部设备bg变se

                               


                        }
                                
                    }

			},100)



        },
        destroyed() {
            clearInterval(timer1);
            clearInterval(timer2);
            bus.$off('equipData',  this.handle);
        },
        beforeRouteLeave(to, from, next) {
            clearInterval(timer1);
            clearInterval(timer2);
            next()

        }

    }
</script>