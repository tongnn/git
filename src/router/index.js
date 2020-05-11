import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full'
import Full2 from '@/containers/Full2'
import Platfrom from '@/components/platfrom'
import Organization from '@/views/components/Organization'
import equipMonitor from '@/views/components/equipMonitor'
import equipStrain from '@/views/components/equipStrain'
// Views - Pages
import Page404 from '@/views/errorPages/Page404'
import Page500 from '@/views/errorPages/Page500'
/* login */
const Login = _import('login/index');
Vue.use(Router);
export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true },
    {path:'/platfrom',component:Platfrom},
    {path: '/',
      redirect: '/home',
      name: '监控平台',
      component: Full,
      hidden:false,
      children: [
                  {path:'/equipMonitor/:id',name: '振动监测',component:equipMonitor},
                  {path:'/equipStrain/:id',name: '应力监测',component:equipStrain},
                ]
    },
    // {path:'/equipMonitor/:id',name: 'equipMonitor',component:equipMonitor},
    // {path:'/equipStrain/:id',name: 'equipStrain',component:equipStrain},

    {path: '/pages',redirect: '/pages/p404', name: 'Pages',
          component: {
            render (c) { return c('router-view') }
          },
          children: [{path: '404',  name: 'Page404', component: _import('errorPages/Page404') },
                     {path: '500',name: 'Page500',component: _import('errorPages/Page404')},
                    ]
    }
    
]
export default new Router({
  mode: 'hash', 
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
export const asyncRouterMap = [
 {  code:'01616f6ae1dd0036',
    path: '/',
    redirect: '/home',
    name: '监控平台',
    component: Full,
    hidden:false,
    children: [
      {code:'01616f6ae1dd0036',path: '/home',name: '首页',icon:'home_l_g.png',component: _import('Home')},
      {code:'01616f6d798f004b',path: '/zdmonitor',name: '振动监测',icon:'vibration_l_g.png',component: _import('ZdMonitor')},
      {code:'01616f70e8f40066',path: '/yinglimonitor',name: '应力监测',icon:'strain_l_g.png',component: _import('YingliMonitor')},
      {code:'01616f7311eb0075',path: '/fireMonitor',name: '消防安全',icon:'fireprotection.png',component: _import('FireMonitor')},
    ]
  },
   {
    path: '/home1',
    code:'016095edc0840002',
    redirect: '/home1/manager',
    name: '管理平台',
    component: Full2,
    hidden:false, 
    children: [
      {code:'016095edc0840002',path: '/home1/manager',name: '首页',icon:'home_l_g.png',component: _import('Dashboard2')},
      {code:'0160676c6ee40002',path: '/manager/components',name: '系统管理',icon:'system.png',redirect: '/manager/components/organization',
      component: {render (c) { return c('router-view') }},
      children: [ 
                  {code:'0160676ec93b0007',path: 'organization',name: '组织机构',component: _import('components/Organization'), hidden:false, },
                  {code:'016067709dd4000b',path: 'users',name: '用户管理',component: _import('components/Users')},
                  {code:'01606771660a000e',path: 'role',name: '角色管理',component: _import('components/Role')},
                  {code:'016067723fe20011',path: 'impower',name: '功能授权',component: _import('components/Impower')},
                ]
      },
      {code:'0160e3e2ab9d0004',path: '/manager/equips',name: '设备管理',icon:'equipment.png',redirect: '/manager/equips/equipType',
      component: {render (c) { return c('router-view') }},
      children:[
                  {code:'0160e3e5c5fa000a',path:'equipType',name:'设备分类',component: _import('components/equipType'),hidden:false},
                  {code:'0160e3e6f0540010',path:'equipBook',name:'设备台账',component: _import('components/equipBook')}
      ]
      },
      {code:'01611d55a00c00a7',path: '/manager/vibration',name: '振动监测',icon:'vibration_l_g.png',redirect: '/manager/vibration/station',
      component: {render (c) { return c('router-view') }},
      children:[
                  {code:'01611d565f6e00aa',path:'station',name:'测点定义',component: _import('components/station'),hidden:false},
                  {code:'016121a81c900005',path:'earlyWarning',name:'预警设置',component: _import('components/earlyWarning')},
                  {code:'016125fba0a20007',path:'alarmLog',name:'报警记录',component: _import('components/alarmLog')},
                  {code:'0163aeffba0d0004',path:'shakewarnPush',name:'预警推送设置',component: _import('components/shakewarnPush')}                                                                                    
      ]
      },
      {code:'01614b39635e000f',path: '/manager/safe',name: '消防安全',icon:'fireprotection.png',redirect: '/manager/safe/ProDefinition',
      component: {render (c) { return c('router-view') }},
      children:[
                  {code:'01614b3b24750012',path:'ProDefinition',name:'工程定义',component: _import('components/ProDefinition'),hidden:false},
                  {code:'01614b3fbc86001a',path:'fdisk',name:'分区设置',component: _import('components/fdisk')},
                  {code:'01614b40e8090020',path:'deviceType',name:'消防设备分类',component: _import('components/deviceType')},
                  {code:'01614b4312e50027',path:'deviceManagement',name:'消防设备管理',component: _import('components/deviceManagement')} ,
                  {code:'01614b450ce4002f',path:'abnormalInform',name:'异常信息查询',component: _import('components/abnormalInform')},
                  {code:'0163af005e7c0007',path:'firewarnPush',name:'预警推送设置',component: _import('components/firewarnPush')},
                  {code:'0163f6edbb05002c',path:'emergentPlan',name:'应急预案',component: _import('components/emergentPlan')},                                        
                  {code:'016449a195dd0004',path:'partition',name:'分区配置',component: _import('components/partition'), hidden:true,},                                        
                ]
      },
      {code:'0161795e79f3005a',path: '/manager/monitor',name: '应力监测',icon:'strain_l_g.png',redirect: '/manager/monitor/monitorEquip',
      component: {render (c) { return c('router-view') }},
      children:[
                  {code:'01617960df600060',path:'monitorEquip',name:'监测设备',component: _import('components/monitorEquip'),hidden:false},
                  {code:'0161796169b20063',path:'monitorPoint',name:'监测点',component: _import('components/monitorPoint')},
                  {code:'01617962a0510067',path:'earlywarnInfor',name:'预警信息查询',component: _import('components/earlywarnInfor')},
                  {code:'0163af00c699000a',path:'strainwarnPush',name:'预警推送设置',component: _import('components/strainwarnPush')}
      ]
      },
    ]
  },


  { path: '*', redirect: '/pages/404', hidden: true }
  
];
