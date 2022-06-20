import { Module } from "vuex"
import { registerData } from "@/network/login/types"
import { IloginState } from "./types"
import { IrootState } from "../types"

import { login, register } from "@/network/login/login"

const loginModule: Module<IloginState, IrootState> = {
  state: {
    userInfo: {}
  },
  actions: {
    async loginAction({ commit }, userInfo: registerData) {
      const res = await login({ username: userInfo.username, password: userInfo.password })
    },
    async registerAction({ commit }, userInfo: registerData) {
      const res = await register(userInfo)
    }
  },
  mutations: {}
}

export default loginModule
