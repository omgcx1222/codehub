import { createStore } from "vuex"
import loginModule from "./login"

import { IrootState } from "./types"

const store = createStore<IrootState>({
  state() {
    return {
      name: ""
    }
  },
  actions: {},
  mutations: {},
  modules: {
    loginModule
  }
})

// main.ts中调用初始化（根据本地缓存登录）
export function initLogin() {
  store.dispatch("loginModule/localLogin")
}

export default store
