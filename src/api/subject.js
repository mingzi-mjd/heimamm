import axios from 'axios'
import {getToken} from '../utils/token.js'

// 学科模块列表
export function subjectList(params) {
  return axios({
    url:process.env.VUE_APP_BASEURL+'/subject/list',
    method:'get',
    headers:{ token:getToken()},
    withCredentials: true, // 携带cookie
    params
  })
}

// 学科新增
export function addPort(data) {
  return axios({
    url:process.env.VUE_APP_BASEURL+'/subject/add',
    method:'post',
    headers:{ token:getToken()},
    data
  })
}

// 状态修改
export function statusEdit(data) {
  return axios({
    url:process.env.VUE_APP_BASEURL+'/subject/status',
    method:'post',
    headers:{ token:getToken()},
    data
  })
}