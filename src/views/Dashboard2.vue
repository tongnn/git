<template>
  <div class="animated fadeIn">

<Row  :gutter="16" style="margin-top:45px">

    <!-- 监测模块 -->
      <Col :xs="24" :sm="12"   :md="12" :lg="12">

        <div class="state-overview">
            <Col span="12">
                
              <div class="panel purple">
                <div class="symbol">
                      <Icon type="clipboard" size="50" color="white"></Icon>
                  
                </div>
                 <div  class="state-value">
                        <div class="value">
                            设备总数
                        </div>
                         <div class="title">
                          {{eqNumber.eqNum}}
                        </div>
                  </div>
              </div>


            </Col>
            <Col span="12">
               <div  class="panel red">
                  <div class="symbol"> 
                      <Icon type="pricetags" size="50" color="white"></Icon>
                   </div>
                    <div  class="state-value">
                        <div class="value">
                            振动监测(点)
                        </div>
                         <div class="title">
                            {{eqNumber.vibEquipNum}}
                        </div>
                  </div>

                </div>
            </Col>
        </div>


        <div  class="state-overview">
            <Col span="12" >
                
                <div class="panel blue" >
                    <div class="symbol">
                        <Icon type="eye" size="50" color="white"></Icon>
                      
                    </div>
                    <div class="state-value">
                        <div class="value">
                          应力监测(点)
                        </div>
                        <div class="title">
                           {{eqNumber.stEquipNum}}
                        </div>
                    </div>
                </div>

            </Col>
            <Col span="12" >
                <div class="panel green" >
                    <div class="symbol">
                        <Icon type="eye" size="50" color="white"></Icon>
                      
                    </div>
                    <div  class="state-value">
                        <div class="value">
                            消防监测(点)
                        </div>
                         <div class="title">
                            {{eqNumber.fiEquipNum}}
                        </div>
                  </div>
                </div>
            </Col>
        </div>

      </Col>

    

    <!-- 设备分布情况 -->
    <Col  :xs="24" :sm="12"   :md="12" :lg="12" >
        <dash-chart-visitor></dash-chart-visitor>
    </Col>

</Row>

<Row :gutter="16" >
    <!-- 日历 -->
    <Col :xs="12" :sm="12" :md="8" :lg="8"> 
        <vue-calendar></vue-calendar>
    </Col>
    
    <!-- 本月预警分析 -->
    <Col  :xs="24" :sm="12"   :md="16" :lg="16" >
        
        <dash-chart-large></dash-chart-large>

    </Col>
</Row>







   


  </div>
</template>

<script>
import DashChartVisitor from './charts/DashChartVisitor';
import DashChartLarge from './charts/DashChartLarge';
import VueCalendar from './components/VueCalendar';
import fetch from 'utils/fetch'
import Vue from 'vue'
// var baseURL = process.env.BASE_API;
export default {
  components:{DashChartVisitor,DashChartLarge,VueCalendar},
  name: 'dashboard',
        data () {
            return {
                value1: 0,
                value2: 0,
                value3: 0,
                speed:10000,
                eqNumber:{},
            }
        },
        methods:{
              test_logout(){
                 this.$store.dispatch('LogOut').then(() => {
                    this.$router.push({ path: '/login' });
                  }).catch(err => {
                    this.$message.error(err);
                  });
              }
        },
        mounted(){
            fetch({
                headers: {
                    'Content-Type': 'application/json'
                },
                baseURL:process.env.BASE_API,
                url: '/equip.htm?param_act=getEquipNumByType',
                method:'get'
            }).then(res => {
                // console.log(res.data);
                this.eqNumber = res.data;
            })

        }
}
</script>


<style type="text/css" scoped>
@media (max-width:768px){
    .ivu-col-span-xs-12 {display: block;width: 95%;margin-left:10px;}
}
.state-overview{color:#fff}.state-overview .ivu-col{margin-bottom:20px}.state-overview .state-value .value{font-size:18px;color:#fff;font-weight:700;margin-bottom:5px}.state-overview .state-value .title{font-size:18px;color:#fff;}.state-value{width:65%;display:inline-block}.symbol{width:30%;display:inline-block}.state-overview .panel{border-radius:4px;padding:25px 20px}.panel.purple{background:#6a8abe;box-shadow:0 5px 0 #5f7cab}.panel.red{background-color:#fc8675;box-shadow:0 5px 0 #e27869}.panel.blue{background:#5ab6df;box-shadow:0 5px 0 #51a3c8}.panel.green{background:#4acacb;box-shadow:0 5px 0 #42b5b6}.dash_income_chart{float:left}.ivu-row{margin-bottom:20px!important}.dash_income{border-radius:4px;background-color:#fff;height:80px;padding:15px}.staff_name{font-weight:900;font-size:16px}.staff_progress{margin-left:10px;width:90%}.staff_progress p{margin:0}.staff_list{border-radius:4px;margin-top:0;height:90px;display:flex;align-items:center}.animated{background-color:#eff0f4}li{margin-bottom:11px;margin-left:10px;margin-right:10px}.num{font-weight:700}.time{font-size:14px;font-weight:700}.content{padding-left:5px}.dashboard_feature{text-align:center}.demo-carousel{height:600px;line-height:200px;text-align:center;color:#fff;font-size:20px;background:#506b9e}.demo-carousel img{height:100%;width:100%}h3,h4,h5{margin:12px}h3{margin-bottom:20px}p{margin:12px}.row-margin-top{margin-top:30px}.state-info{position:absolute;right:15px;top:20px;margin-bottom:30px}.state-info .panel{margin-bottom:20px;float:right;margin-left:15px}.panel{background-color:#fff;border:1px solid transparent;border-radius:4px;-webkit-box-shadow:0 1px 1px rgba(0,0,0,.05);box-shadow:0 1px 1px rgba(0,0,0,.05)}.panel-body{padding:15px}.state-info .panel .summary{float:left;margin-right:20px}.state-info .panel .summary span{color:#49586e;font-size:13px;font-weight:400;text-transform:uppercase;margin-bottom:10px}.state-info .panel .summary h3.red-txt{color:#fc8675}.state-info .panel .summary h3.green-txt{color:#65cea7}.state-info .panel .summary h3{font-size:200%;font-weight:700;line-height:20px;margin:0}.page-heading h3{color:#49586e;font-size:25px;font-size:11%;font-weight:400;margin:10px 0}.chart-bar{float:right;margin-top:5px}.chart-bar img{display:inline-block;width:68px;height:45px;vertical-align:top}@media screen and (max-width:767px){.state-info{position:static;width:100%;margin-top:15px}.state-info .panel{width:100%}}.panel.blue-box{background:none repeat scroll 0 0 #5ab5de;box-shadow:0 5px 0 #51a3c7;color:#fff}.twt-info h3{font-family:'Open Sans',sans-serif;font-size:16px;font-weight:900;margin:10px 0 30px 0;text-align:center}.twt-info p{font-size:18px;line-height:25px;font-style:italic;margin:0 0 20px 0;text-align:center}.twt-info p a{color:#98fdf4}.media:first-child{margin-top:0}.media.usr-info>.pull-left{margin-right:20px;margin-top:10px}.media>.pull-left{margin-right:10px}.pull-left{float:left}.pull-left{float:left!important}.custom-trq-footer{background:none repeat scroll 0 0 #4eb6b7!important;box-shadow:0 5px 0 #46a3a4;color:#fff;border-top:none}.panel-footer{padding:10px 15px;background-color:#f5f5f5;border-top:1px solid #ddd;border-bottom-right-radius:3px;border-bottom-left-radius:3px}.usr-info .thumb{width:80px;height:80px;border-radius:50%;-webkit-border-radius:50%}.usr-info img{vertical-align:middle}.usr-info h4{color:#658585;margin-bottom:0}.media-heading{margin:0 0 5px}.usr-info .media-body span{color:#ea755c;font-size:12px;margin-bottom:20px;display:inline-block}.usr-info .media-body p{color:#b6bcbc}ul.user-states{list-style-type:none;padding:20px 0}ul.user-states li{text-align:center;float:left;width:33%;font-size:18px;margin:0}
</style>