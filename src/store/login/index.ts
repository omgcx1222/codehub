import { Module } from "vuex"
import router from "@/router"

import { registerData } from "@/network/login/types"
import { IrootState, IloginState, IuserInfo } from "../types"

import { login, register, verifyToken } from "@/network/login"
import { setStorage, getStorage, removeStorage } from "@/utils/localStorage"

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
        setStorage("userInfo", res.data)
        router.go(-1)
      }
    },

    // 注册
    async registerAction(_, userInfo: registerData) {
      await register(userInfo)
    },

    // 根据本地缓存登录
    async localLoginAction({ commit }) {
      const userInfo = getStorage<IuserInfo>("userInfo")

      if (userInfo.token) {
        const res = await verifyToken()

        if (res.status === 200) {
          commit("loginMutation", res.data)
          setStorage("userInfo", res.data)
        } else {
          removeStorage("userInfo")
        }
      }
    },

    loginOutAction({ commit }) {
      commit("loginOutMutation")
      removeStorage("userInfo")
    }
  },
  mutations: {
    loginMutation(state, payload) {
      state.userInfo = payload
    },
    loginOutMutation(state) {
      state.userInfo = {}
    }
  }
}

export default loginModule
