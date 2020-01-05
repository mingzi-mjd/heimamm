// 登录页面的接口
import axios from 'axios';

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