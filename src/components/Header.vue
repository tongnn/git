<template>
  <navbar>
    <!-- <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button> -->
    <!-- <ul title="伸缩导航" class="" style="" v-if="this.$route.path != '/home' && this.$route.path != '/zdmonitor' && this.$route.path != '/yinglimonitor' && this.$route.path != '/fireMonitor'">
      <li class="nav-item">
        <a class="nav-link navbar-toggler sidebar-toggler"  @click="sidebarMinimize">&#9776;</a>
      </li>
    </ul> -->
     <!-- <h4>青岛前港设备状态安全检测及故障诊断平台</h4> -->
     <div id="logo" >
       <!-- <img src="" alt=""> -->
      <ul class="nav ml-auto first" style="background:url(../../static/img/nav/bj_nav.png);height:60px;position:relative">
          <p style="width:100%;color:#FFFFFF;font-size:24px;margin-top:15px;text-align:center">青岛前港设备状态安全监测及故障诊断平台</p>
          <li class="nav-item header-item "  v-if="this.isManager=='1' && this.$route.path.indexOf('manager')>0" style="">
              <router-link  tag="div"  to='/'  style="height:55px;" class="nav-link">
                <p class="dropdown-itemp" id="toMonitor">
                监控平台
                </p>   
              </router-link>
          </li>
          <li class="nav-item header-item" v-if = "this.isManager=='1' && !(this.$route.path.indexOf('manager')>0)">
            <router-link tag="div" to='/home1'  style="height:55px;" class="nav-link">
              <p  class="dropdown-itemp" id="toHome">
                系统管理</p>
            </router-link> 
          </li>
          <Dropdown class="nav-item" style="position:absolute;right:1%;top:6px;">
          <div class='super_content'  >
            <a href="javascript:void(0)">
               <span slot="button">
              <!-- <img src="static/img/avatars/6.jpg" class="img-avatar" alt="o"> -->
              <div class="d-md-down-none welcom" style="color:#C7CEF2">{{cookies.username}}
                <img src="static/img/pulldown1.png" alt="">
              </div>
              </span>
            </a></div>
            <Dropdown-menu slot="list">
                     <Dropdown-item > <a href="" @click="Logout"><p  class="dropdown-itemp"><Icon type="power"></Icon>退出</p></a></Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
          <!--<li class="nav-item d-md-down-none">
            <a class="nav-link navbar-toggler aside-menu-toggler"  @click="asideToggle">&#9776;</a>
          </li>-->
        </ul>
     </div>
     <!-- <a class="navbar-brand" style="float:left!important;"></a> -->
    <!-- <a class="navbar-brand" ></a> -->
      <!-- <ul class="nav navbar-nav d-md-down-none" v-if="this.$route.path == '/home' || this.$route.path == '/zdmonitor' || this.$route.path == '/yinglimonitor' || this.$route.path == '/fireMonitor'">
      
        <li class="nav-item header-item">
    

            <router-link tag="div" to='/' class="nav-link navBar">
              <p v-if="this.$route.path != '/home'" style="color:#4D4D4D;background-color: #FFF;" ><img src="static/img/nav/home_s_w.png" alt=""><span style="padding-top:2px;">首页</span></p>
              <p v-if="this.$route.path == '/home'" style="color:white;background-color: #56A5FF;"><img src="static/img/nav/home_s_b.png" alt="">首页</p>
          </router-link> 
        </li>
        <li class="nav-item header-item">
          <router-link tag="div" to='/zdmonitor' class="nav-link navBar">
              <p v-if="this.$route.path != '/zdmonitor'" style="color:#4D4D4D;background-color: #FFF;" ><img src="static/img/nav/vibration_s_w.png" alt="">振动检测</p>
              <p v-if="this.$route.path == '/zdmonitor'" style="color:white;background-color: #56A5FF;"><img src="static/img/nav/vibration_s_b.png" alt="">振动检测</p>
          </router-link> 
        </li>

        <li class="nav-item header-item">
          <router-link tag="div" to='/yinglimonitor' class="nav-link navBar">
            <p v-if="this.$route.path != '/yinglimonitor'" style="color:#4D4D4D;background-color: #FFF;" ><img src="static/img/nav/strain_s_w.png" alt="">应力监测</p>
              <p v-if="this.$route.path == '/yinglimonitor'" style="color:white;background-color: #56A5FF;"><img src="static/img/nav/strain_s_b.png" alt="">应力监测</p>
          </router-link>
        </li>


        <li class="nav-item header-item">
          <router-link tag="div" to='/fireMonitor' class="nav-link navBar">
            <p v-if="this.$route.path != '/fireMonitor'" style="color:#4D4D4D;background-color: #FFF;" ><img src="static/img/nav/fireprotection_s_w.png" alt="">消防监测</p>
              <p v-if="this.$route.path == '/fireMonitor'" style="color:white;background-color: #56A5FF;"><img src="static/img/nav/fireprotection_s_b.png" alt="">消防监测</p>
          </router-link> 
      </li>
    </ul> -->

    
  </navbar>
</template>
<script>
import Vue from 'vue'
import navbar from './Navbar'
import Axios from 'axios'
import fetch from 'utils/fetch'
export default {
  name: 'header',
  components: {
    navbar,
  },
  data() {
    return {
      show:false,
      isManager:0,
    }
  },
  methods: {
    getUserInfo(){
      this.cookies=$.cookie()
      // console.log(this.cookies);
    },
    Logout(e){
         this.$store.dispatch('LogOut').then(() => {
                this.$router.push({ path: '/login' });
              }).catch(err => {
                this.$message.error(err);
              });
    },
    click () {
      // do nothing
    },
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()

      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()

      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    },

    getManagerStatus(){
    return new Promise((resolve,reject) => {
        var param_act = 'isManager';
         var usercode=$.cookie('usercode');
         var baseURL=process.env.BASE_API;
        fetch({
            headers: { 'Content-Type': 'application/json'},
            baseURL:baseURL,
            url: '/logon.htm',
            method:'get',
            params:{param_act,usercode}
        }).then(res =>{
            if(res.data != undefined && res.data.msg==1){
                resolve(1);
            }else{
                resolve(0);
            }
        }).catch((err) => {
            console.log(err);
            resolve(0);
          })
    })
}
  },
  created(){
    // console.log(this.$route.path)
    this.getUserInfo();
    this.getManagerStatus().then(ismanager=>{
      this.isManager=ismanager;
    }); 
  },
  mounted(){
    // console.log(this.$route.path)
  }
}
</script>
<style type="text/css" scoped>
.navbar-nav{padding:0 80px;}
 .header-item .ivu-dropdown-item{
  padding: 15px;
  margin-right: -100px
}
  .header-item{
    position: absolute; 
    left:82.5%;
    top: -50px;
    height: 55px;
    
  }
  .header-item a{
    font-family: MicrosoftYaHei;
    color:#C7CEF2 !important;
    border: 1px solid #fff
  }
  h4{color:#56A5FF;font-size:20px;font-family: YouYuan;}
  #logo{width: 100%;height: 60px;}
  .header-item .navBar{
    width:160px;
    height:30px!important;
    margin-top:13px;
    text-align: center;
    font-size: 16px;
    padding:0 20px;
    line-height:30px;
    margin:20px 20px;
    vertical-align: middle;
  }
  .header-item p{
    border-radius: 20px;
    
  }
  .header-item img{
    padding-right: 10px;
    
  }
  .header-item .dropdown-itemp{
    width:120px;
    text-align: center;
    height:25px!important;
    color:#C7CEF2;
    line-height:25px;
    margin:18px 10px;
    background: #2E2C48;

  }
  .img-avatar{width:45px;height:45px;vertical-align:middle;float:left;}
  .welcom{width:120px;
    margin-top:13px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    color:white;
    margin-right: 20px;
    padding:1px 7px;
    /* border: 1px solid #fff; */
    border-radius: 20px;
    text-align: center;
    background: #2E2C48
  }
  @media (max-width:1200px){
    .navbar-nav{
      display: none;
    }
  }
</style>
