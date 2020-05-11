import fetch from 'utils/fetch';
import Vue from 'vue';
export function loginByEmail(usercode, password) {
    // const data = {
    //     usercode,
    //     password
    // };
    var param_act = 'login'
    return fetch({
        headers: {
            'Content-Type': 'application/json',
          },
        method: 'get',
        baseURL: process.env.BASE_API,
        url: '/logon.htm?param_act=login',
        params:{param_act, usercode, password}
    });
}

export function logout() {
    var param_act = 'loginOut'
    return fetch({
        headers: {
            'Content-Type': 'application/json',
          },
        method: 'get',
        baseURL: process.env.BASE_API,
        url: '/logon.htm?param_act=loginOut',
        params:{param_act}
    });
}

export function getInfo(usercode) {
    return fetch({
        headers: {'Content-Type': 'application/json'},
        baseURL: process.env.BASE_API,
        url:'/logon.htm?param_act=funcLists',
        method: 'get',
        params: { usercode }
    });
}

