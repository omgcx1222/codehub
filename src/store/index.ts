import { useStore as useVuexStore } from "vuex"

import { createStore } from "vuex"
import loginModule from "./login"
import myModule from "./my"
import momentModule from "./moment"
import chatModule from "./chat"

import { follow } from "@/network/common"
import { IrootState, storeType, IuserInfo } from "./types"

const store = createStore<IrootState>({
  state() {
    return {
      userInfo: {}
    }
  },
  actions: {
    async followAction(store, followId: number) {
      const res = await follow(followId)
      if (res.data === "关注成功") {
        store.commit("momentModule/follow", { followId, isFollow: 1 })
      } else if (res.data === "取消关注") {
        store.commit("momentModule/follow", { followId, isFollow: 0 })
      }
    },

    getlocalRoomsAction(store) {
      store.commit("chatModule/getlocalRoomsAction")
    }
  },
  mutations: {
    changeUserInfo(state, userInfo: IuserInfo) {
      state.userInfo = { ...userInfo }
    }
  },
  modules: {
    loginModule,
    myModule,
    momentModule,
    chatModule
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
