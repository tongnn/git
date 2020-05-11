import { loginByEmail, logout, getInfo } from 'api/login';
import Cookies from 'js-cookie';

const user = {
  state: {
    funcCode:[],
    user: '',
    status: '',
    email: '',
    code: '',
    uid: undefined,
    auth_type: '',
    usercode: Cookies.get('usercode'),    
    name: '',
    username: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },
  mutations: {
    SET_funcCode: (state, funcCode) => {
      state.funcCode = funcCode;
    },
    SET_AUTH_TYPE: (state, type) => {
      state.auth_type = type;
    },
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_UID: (state, uid) => {
      state.uid = uid;
    },
    SET_EMAIL: (state, email) => {
      state.email = email;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_USERNAME: (state, name) => {
      state.username = username;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = '';
    }
  },
  actions: {
    // 邮箱登录
    LoginByEmail({ commit }, userInfo) {
      const usercode = userInfo.usercode.trim();
      return new Promise((resolve, reject) => {
        loginByEmail(usercode, userInfo.password).then(response => {
          // const data = response.data;
          // console.log(response.data);
          // Cookies.set('Admin-Token', response.data.token);
          // commit('SET_TOKEN', data.token);
          // commit('SET_EMAIL', usercode);
          // resolve();
          // 修改登录逻辑
          const data = response.data;
          console.log(data);
          if(response.data.msg == 1){
            // if(response.data.username =="管理员账号" || response.data.username =="超级管理员"){
              Cookies.set('username', response.data.username);
              Cookies.set('usercode', response.data.usercode);
              // Cookies.set('Admin-Token', "admin");
              // commit('SET_TOKEN', "admin");
            // }else{
            //   Cookies.set('username', response.data.username);              
            //   Cookies.set('Admin-Token', "other");
            //   commit('SET_TOKEN', "other");
            // }
            resolve("success");
          }else{
            resolve(response.data.msg);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 假登录
    FoolLogin({ commit }, userInfo){
      const usercode = userInfo.usercode.trim();
      return new Promise((resolve, reject) => {
            Cookies.set('Admin-Token', "admin");//设置cookie过期时间
            commit('SET_TOKEN', "admin");
            commit('SET_EMAIL', "admin@wz.com");
            resolve("success");   
      });
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.usercode).then(response => {
          const data = response.data;
          // console.log(data)
          // commit('SET_MANAGER', data.msg);
          commit('SET_funcCode', data.funcCode);
          commit('SET_ROLES', data.role);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_UID', data.uid);
          commit('SET_INTRODUCTION', data.introduction);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 第三方验证登录
    LoginByThirdparty({ commit, state }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_CODE', code);
        loginByThirdparty(state.status, state.email, state.code, state.auth_type).then(response => {
          commit('SET_TOKEN', response.data.token);
          Cookies.set('Admin-Token', response.data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(res => {
          // console.log(res.data)
          // if()
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          Cookies.remove();
          resolve();
          // window.location.reload();
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        Cookies.remove('Admin-Token');
        alert("has logout");
        resolve();
      });
    },
    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_ROLES', [role]);
        commit('SET_TOKEN', role);
        Cookies.set('Admin-Token', role);
        resolve();
      })
    }
  }
};
export default user;