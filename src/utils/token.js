// 定义 token的 key值
const key = 'hmmmToken';

// 保存 token
export function savaToken(token) {
  window.localStorage.setItem(key,token);
}

// 暴露 取 token
export function getToken() {
  return window.localStorage.getItem(key);
}

// 暴露 删 token
export function removeToken() {
  return window.localStorage.removeItem(key);
}