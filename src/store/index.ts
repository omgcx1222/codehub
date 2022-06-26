import { useStore as useVuexStore } from "vuex"

import { createStore } from "vuex"
import loginModule from "./login"
import myModule from "./login"

import { IrootState, storeType } from "./types"

const store = createStore<IrootState>({
  state() {
    return {
      name: ""
    }
  },
  actions: {},
  mutations: {},
  modules: {
    loginModule,
    myModule
  }
})

export function useStore() {
  return useVuexStore<storeType>()
}

// main.ts中调用初始化（根据本地缓存登录）
export function initLogin() {
  store.dispatch("loginModule/localLoginAction")
}

export default store
