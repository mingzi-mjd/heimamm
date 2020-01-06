// 登录页面的接口
import axios from 'axios';
import {getToken} from '../utils/token.js'

export function login(data) {
  return axios({
    url: process.env.VUE_APP_BASEURL + "/login",
    method: "post",
    withCredentials: true, // 携带cookie
    data
  })
}

export function registerBtn(data) {
  return axios({
    url: process.env.VUE_APP_BASEURL + '/register',
    method: 'post',
    withCredentials: true, // 携带cookie
    data
  })
}

export function registerMessage(data) {
  return axios({
    url: 'http://183.237.67.218:3002/sendsms',
    method: "post",
    withCredentials: true, // 携带cookie
    data
  })
}

export function getInfo() {
  return axios({
    url: process.env.VUE_APP_BASEURL + '/info',
    method:'get',
    // 配置请求头信息
    // headers:{token:window.localStorage.getItem('hmmmToken')},
    headers:{token:getToken()}
  })
}

// 退出登录
export function logout() {
  return axios({
    url:process.env.VUE_APP_BASEURL+'/logout',
    method:'get',
    headers: {token:getToken()}
  })
}