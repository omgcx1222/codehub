import hqqRequest from "../index"
import { loginData, registerData } from "./types"

export function login(data: loginData) {
  return hqqRequest.request({
    method: "post",
    url: "/login",
    data,
    showLoading: {
      text: "正在登录",
      errorMessage: "账号或密码错误",
      successMessage: "登录成功"
    }
  })
}

export function register(data: registerData) {
  return hqqRequest.request({
    method: "post",
    url: "/user",
    data,
    showLoading: {
      text: "正在注册",
      errorMessage: true,
      successMessage: "注册成功"
    }
  })
}
