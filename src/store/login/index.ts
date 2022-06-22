import { Module } from "vuex"
import router from "@/router"

import { registerData } from "@/network/login/types"
import { IloginState, IuserInfo } from "./types"
import { IrootState } from "../types"

import { login, register, verifyToken } from "@/network/login/login"
import { setStorage, getStorage } from "@/utils/localStorage"

const loginModule: Module<IloginState, IrootState> = {
  namespaced: true,
  state: {
    userInfo: {}
  },
  actions: {
    // 登录
    async loginAction({ commit }, userInfo: registerData) {
      const res = await login({ username: userInfo.username, password: userInfo.password })
      if (res.status === 200) {
        commit("loginMutation", res.data)
        router.go(-1)
      }
    },

    // 注册
    async registerAction(_, userInfo: registerData) {
      await register(userInfo)
    },

    // 根据本地缓存登录
    async localLogin({ commit }) {
      const userInfo = getStorage<IuserInfo>("userInfo")
      if (userInfo.token) {
        const res = await verifyToken(userInfo.token)
        if (res.status === 200) {
          commit("loginMutation", res.data)
        }
      }
    }
  },
  mutations: {
    loginMutation(state, payload) {
      state.userInfo = payload
      setStorage("userInfo", payload)
    }
  }
}

export default loginModule
