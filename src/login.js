import router from './router'
import store from './store'
import vue from 'vue'
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css' 
import fetch from 'utils/fetch'
// permissiom judge
function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true
    if (!permissionRoles) return true
    return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
function getSessionStatus(){
    return new Promise((resolve,reject) => {
        var param_act = 'isSessionValid';
        fetch({
            headers: {'Content-Type': 'application/json',},
            baseURL:process.env.BASE_API,
            url: '/logon.htm?param_act='+param_act,
            method:'get'
        }).then(res =>{
            if(res.data != undefined && res.data.isSessionValid==1){
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
// register global progress.
const whiteList = ['/login', '/authredirect'] 
router.beforeEach((to, from, next) => {
    NProgress.start() 
   getSessionStatus().then(isSessionValid=>{
        if (isSessionValid) { 
            if (to.path === '/login') {
                next({ path: '/' })
            } 
            else { 
                if (store.getters.funcCode.length === 0) { 
                    store.dispatch('GetInfo').then(res => { 
                        const funcCode=res.data.funcCode
                        // console.log(funcCode)
                        store.dispatch('GenerateRoutes', { funcCode }).then(() => { 
                            router.addRoutes(store.getters.addRouters) 
                            next({...to }) 
                        })
                    }).catch(() => {
                        store.dispatch('LogOut').then(() => {
                            window.location.reload();
                            next({ path: '/login' })
                        })
                    })
                } else {
                    store.dispatch('getNowRoutes', to);
                    if (hasPermission(store.getters.funcCode, to.code)) {
                        next() 
                    } else {
                        next({ path: '/', query: { noGoBack: true } })
                    }
                }
            }
        } else {
            if (whiteList.indexOf(to.path) !== -1) { 
                next()
            } else {
                next('/login') 
                NProgress.done()
            }
        }
    }); 
 })
router.afterEach(() => {
    NProgress.done() 
})