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