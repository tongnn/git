<template>
  <div class="animated fadeIn"  style="width:100%;height:calc(100vh - 55px);overflow-y:hidden; margin: 0; float:left;">
      <div id="collect">
        <p>设备信息汇总（单位：台）</p>
      </div>
      <div class="monitorMsg" style="margin:20px 5px;overflow:auto;display: flex;flex-direction: row;flex-wrap: wrap;justify-content: flex-start;">
        <div id="vibMon" class="monitor col-md-4 col-sm-6 col-xs-12">
          <router-link tag="div" to='/zdmonitor' class="nav-link navBar nav-title">
            振动监测  
            <span class="title-r">></span>
          </router-link>
          <div class="stateCount">
            <p><span class="common regular"></span>正常：<span class="countNum">{{vbNormal}}</span></p>
            <p><span class="common unnormal"></span>异常：<span class="countNum">{{vbException}}</span></p>
            <!-- <img src="static/img/left/vib-b.png" alt=""> -->
          </div>
        </div>
        <div id="stMon" class="monitor col-md-4 col-sm-6 col-xs-12">
          <router-link tag="div" to='/yinglimonitor' class="nav-link navBar nav-title">
            应力监测  
            <span class="title-r">></span>
          </router-link>
          <div class="stateCount">
            <p><span class="common regular"></span>正常：<span class="countNum">{{stNormal}}</span></p>
            <p><span class="common unnormal"></span>异常：<span class="countNum">{{stException}}</span></p>
            <!-- <img src="static/img/left/st-b.png" alt=""> -->
          </div>
        </div>
        <div id="fireMon" class="monitor col-md-4 col-sm-6 col-xs-12">
          <router-link tag="div" to='/fireMonitor' class="nav-link navBar nav-title">
            消防监测  
            <span class="title-r">></span>
          </router-link>
          <div class="stateCount">
            <p><span class="common regular"></span>正常：<span class="countNum">{{fiNormal}}</span></p>
            <p><span class="common unnormal"></span>异常：<span class="countNum">{{fiException}}</span></p>
            <!-- <img src="static/img/left/fire-b.png" alt=""> -->
          </div>
        </div>
      </div>
      <div id="collect">
        <span>火警提示</span>
        <img src="static/img/right/fire_sss.png" alt="">
      </div>
      <div class="firetips" style="">
        <div class="unnormalTips" v-for="(item,index) in fireAlarmRecord" :key="index">
           
          <div class="icon">
            <!-- <img src="static/img/left/fire-icon.png" alt=""> -->
            <div class="unnormalMsg" @click="routerPush(item)">
              <span style="float:right;color: #8084A2;padding-right: 5px;">{{item.SendTime}}</span>
              <p class="name">{{item.PART_NAME}}</p>
              <span class="place">{{item.LOCATION_DESCRIB}}
                <!-- <span class="red-text">火警报警</span> -->
                </span>
            </div>
          </div>
        </div>
        <!-- <div class="unnormalTips">
          <div class="icon">
            <img src="static/img/left/crane-icon.png" alt="">
            <div class="unnormalMsg">
              <p class="name">22号堆取料机</p>
              <p class="place">上电气室PLC柜<span class="red-text">火警报警</span></p>
            </div>
          </div>
        </div> -->
      </div>
      <div id="collect">
        <p>设备警告</p>
      </div>
      <div class="equiptips" style="">
        <div class="unnormalTips" v-for="(item,index) in equipAlarmRecord" :key="index">
          <div class="icon">
            <!-- <img src="static/img/left/shiploader-icon.png" alt=""> -->
            <div class="unnormalMsg" @click="get(item)">
              <span style="float:right;color: #8084A2;padding-right: 5px;">{{item.TIME}}</span>
              <p class="name">{{item.levelType}}监测: {{item.name}}</p>
              <p class="place">{{item.pos}}
                <span v-if="item.levelDes.indexOf('预警') != -1" class="alarm-text">{{item.VALUE}}({{item.levelDes}})</span>
                <span v-if="item.levelDes.indexOf('报警') != -1" class="yellow-text">{{item.VALUE}}({{item.levelDes}})</span>
                <span v-if="item.levelDes.indexOf('危险') != -1" class="red-text">{{item.VALUE}}({{item.levelDes}})</span>
              </p>
            </div>
          </div>
        </div>
       
        
      </div>
  </div>
</template>

<style type="text/css">
  .wanimated{
    padding-right: 0px;
      margin-right: 0px;
  }
</style>


<style scoped>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}
#collect{
  width: 100%;
  height: 40px;
  background: linear-gradient(to right, rgba(24,24,30,1) 25%,rgba(0,72,255,0.8));
  line-height: 40px;
  padding-left:18px;
  font-size: 14px;
  font-family: SimSun;
  color:#C7CEF2;
}
.monitor{
  height: 105px;
  padding:0 5px;
}
.monitor .nav-title{
  height: 30px;
  background-color: #454365;
  line-height: 30px;
  color: #C7CEF2;
  padding: 0 8px;
}
.monitor .nav-title .title-r{
  float:right;
}
.stateCount{
  height: 70px;
  padding-top:17px;
  padding-left:10px;
  background: #2E2C48;
  color: #C7CEF2;
  /* Firefox4.0- */
  /* -moz-box-shadow:0px 2px 5px 1px #E6E6E6; */
  /* Safari and Google chrome10.0- */
  /* -webkit-box-shadow:0px 2px 5px 1px #E6E6E6; */
  /* Firefox4.0+ 、 Google chrome 10.0+ 、 Oprea10.5+ and IE9 */
  /* box-shadow:0px 2px 5px 1px #E6E6E6; */
  position: relative;
}
.stateCount .common{
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right:5px;
}
.stateCount .regular{
  background-color:#59EF87;
}
.stateCount .unnormal{
  background-color:#FF4729;
}
/* .stateCount .countNum{
  font-family: ArialMT;
  font-size: 14px;
  color: #333;
  font-weight:600;
} */
.stateCount img{
  position: absolute;
  bottom:0;
  right: 0px;
}
.firetips,.equiptips{
  min-height: 40px;
  width: 100%;
  position: relative;
}
.equiptips{
  max-height: calc(100vh - 380px);
  overflow: auto;
}
.unnormalTips{
  min-height: 70px;
  padding-top:15px;
  padding-left:20px;
  border-bottom: 1px solid #2E2C48;
}
.unnormalTips .icon{
  /* position: relative; */
}
.unnormalMsg{
  font-family: SimSun;
  color: #C7CEF2;
  cursor: pointer;
  /* position: absolute;
  left:50px;
  top:0px; */
}
.unnormalMsg .name{
  font-size: 13px;
  font-weight:500;
}
.unnormalMsg .place{
  font-size: 12px;
  color: #8084A2;
}
.unnormalMsg .red-text{
  color: #FF0101;
}
.unnormalMsg .yellow-text{
  color: #FF8A01;
}
.unnormalMsg .alarm-text{
  color: #E8CA00;
}

/*滚动条样式*/
	::-webkit-scrollbar {/*滚动条整体样式*/
	width: 5px !important;;  /*高宽分别对应横竖滚动条的尺寸*/
	}
	::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
	background:rgba(46,44,72,1) !important;;
	border-radius:2px;
	}
	::-webkit-scrollbar-track {/*滚动条里面轨道*/
	background: rgba(22,21,41,1) !important;;
	}
</style>

<script>
  import fetch from 'utils/fetch'
  import '../../static/css/bootstrap.min.css'
  // page specific plugin styles 
  import '../../static/js/jquery.min.js'
  import '../../static/js/bootstrap.min.js'
  var baseURL=process.env.BASE_API;
  var timer = null;
  
  export default {
    name: 'mapAside',

    data(){
      return {
        fireAlarmRecord:[],//火警提示
        equipAlarmRecord:[],//设备警告提示
        vbNormal:"",//振动正常值
        vbException:"",//振动异常值
        stNormal:"",//应力正常值
        stException:"",//应力异常值
        fiNormal:"",//消防正常值
        fiException:"",//消防异常值
        equipItem:{}
      }
    },
    methods:{
      get(equipItem){
        // console.log(equipItem);
        this.equipItem = equipItem;
        // bus.$emit("equipData", this.equipItem)
        if(equipItem.levelType.indexOf("振动") != -1){
          this.$router.push({ path: "/zdmonitor"});

        }else if(equipItem.levelType.indexOf("应力") != -1){
          this.$router.push({ path: "/yinglimonitor"});
        }

      },
      routerPush(item){
        debugger;
        this.$router.push({ path: "/fireMonitor"});
      }
    },
    created(){
        var _this = this;
        // 设备汇总信息请求
        fetch({
            headers: { 'Content-Type': 'application/json'},
            baseURL:baseURL,
            url: '/homeShow.htm?param_act=showStateAmount',
            method:'get',
            // params:{param_act}
          }).then(res =>{
            if(res.data != undefined && res.data !=""){
              var stateAmount = res.data;
              this.vbNormal = stateAmount[0].normal;
              this.vbException = stateAmount[0].exception;
              this.stNormal = stateAmount[1].normal;
              this.stException = stateAmount[1].exception;
              this.fiNormal = stateAmount[2].normal;
              this.fiException = stateAmount[2].exception;
              // console.log(stateAmount);
            }
          }).catch((err) => {
            console.log(err);
        })
        // 火警提示请求
        var param_act = "showFireAlaRecord";
        fetch({
            headers: { 'Content-Type': 'application/json'},
            baseURL:baseURL,
            url: '/homeShow.htm',
            method:'get',
            params:{param_act}
        }).then(res =>{
          if(res.data != undefined && res.data !=""){
            // $(".firetips").empty();
            $(".firetips .unnormalTips").show();
            this.fireAlarmRecord = res.data;
            // console.log(this.fireAlarmRecord);
          }else{
              $(".firetips .unnormalTips").hide();
              $(".firetips").html("<img src='static/img/left/empty.png'><span>暂无火警信息</span>");
              $(".firetips span").css("display","inline-block");
              $(".firetips span").css("width","100%");
              $(".firetips span").css("height","30px");
              $(".firetips").css("text-align","center");
              $(".firetips").css("padding-top","20px");              
              $(".firetips span").css("line-height","30px");
              $(".firetips span").css("color","#ccc");
          }
        }).catch((err) => {
          console.log(err);
        })
        // 设备警告请求
        fetch({
            headers: { 'Content-Type': 'application/json'},
            baseURL:baseURL,
            url: '/homeShow.htm?param_act=showEqAlaRecord',
            method:'get',
            // params:{param_act}
        }).then(res =>{
            // console.log(res.data)
          if(res.data != undefined && res.data !=""){
            $(".equiptips").empty();
            $(".equiptips .unnormalTips").show();
            this.equipAlarmRecord = res.data;
          }else{
              $(".equiptips .unnormalTips").hide();
              $(".equiptips").html("<img src='static/img/left/empty.png'><span>暂无设备警告</span>");
              $(".equiptips span").css("display","inline-block");
              $(".equiptips span").css("width","100%");
              $(".equiptips span").css("height","30px");
              $(".equiptips").css("text-align","center");
              $(".equiptips").css("padding-top","20px");
              $(".equiptips span").css("line-height","30px");
              $(".equiptips span").css("color","#ccc");
          }
        }).catch((err) => {
          console.log(err);
        })

            clearInterval(timer);
						timer = setInterval(()=>{
              // 设备汇总信息请求
              fetch({
                  headers: { 'Content-Type': 'application/json'},
                  baseURL:baseURL,
                  url: '/homeShow.htm?param_act=showStateAmount',
                  method:'get',
                  // params:{param_act}
                }).then(res =>{
                  if(res.data != undefined && res.data !=""){
                    var stateAmount = res.data;
                    _this.vbNormal = stateAmount[0].normal;
                    _this.vbException = stateAmount[0].exception;
                    _this.stNormal = stateAmount[1].normal;
                    _this.stException = stateAmount[1].exception;
                    _this.fiNormal = stateAmount[2].normal;
                    _this.fiException = stateAmount[2].exception;
                    // console.log(stateAmount);
                  }
                }).catch((err) => {
                  console.log(err);
              })
              // 火警提示请求
              var param_act = "showFireAlaRecord";
              fetch({
                  headers: { 'Content-Type': 'application/json'},
                  baseURL:baseURL,
                  url: '/homeShow.htm',
                  method:'get',
                  params:{param_act}
              }).then(res =>{
                if(res.data != undefined && res.data !=""){
                  // $(".firetips").empty();
                  $(".firetips .unnormalTips").show();
                  _this.fireAlarmRecord = res.data;
                  // $(".firetips .unnormalTips").html("3333")
                  // console.log(this.fireAlarmRecord);
                }else{
                    $(".firetips .unnormalTips").hide();
                    $(".firetips").html("<img src='static/img/left/empty.png'><span>暂无火警信息</span>");
                    $(".firetips span").css("display","inline-block");
                    $(".firetips span").css("width","100%");
                    $(".firetips span").css("height","30px");
                    $(".firetips").css("text-align","center");
                    $(".firetips").css("padding-top","20px");              
                    $(".firetips span").css("line-height","30px");
                    $(".firetips span").css("color","#ccc");
                }
              }).catch((err) => {
                console.log(err);
              });
              // 设备警告请求
              fetch({
                  headers: { 'Content-Type': 'application/json'},
                  baseURL:baseURL,
                  url: '/homeShow.htm?param_act=showEqAlaRecord',
                  method:'get',
                  // params:{param_act}
              }).then(res =>{
                  // console.log(res.data)
                if(res.data != undefined && res.data !=""){
                  // $(".equiptips").empty();
                  $(".equiptips .unnormalTips").show();
                  _this.equipAlarmRecord = res.data;
                }else{
                    $(".equiptips .unnormalTips").hide();
                    $(".equiptips").html("<img src='static/img/left/empty.png'><span>暂无设备警告</span>");
                    $(".equiptips span").css("display","inline-block");
                    $(".equiptips span").css("width","100%");
                    $(".equiptips span").css("height","30px");
                    $(".equiptips").css("text-align","center");
                    $(".equiptips").css("padding-top","20px");
                    $(".equiptips span").css("line-height","30px");
                    $(".equiptips span").css("color","#ccc");
                }
              }).catch((err) => {
                console.log(err);
              })
            },5000)
            
    },
    
    destroyed() {
       bus.$emit("equipData", this.equipItem);
        
      clearInterval(timer);
    },
    beforeRouteLeave (to, from, next){
    		clearInterval(timer);
    		next()

		}
  }
</script>