// 登录页面的接口
import axios from 'axios';

export function getInfo() {
  return axios({
    url: process.env.VUE_APP_BASEURL + '/info',
    method:'get',
    // 配置请求头信息
    headers:{token:window.localStorage.getItem('hmmmToken')},
  })
}