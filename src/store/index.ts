import { useStore as useVuexStore } from "vuex"

import { createStore } from "vuex"
import loginModule from "./login"
import myModule from "./my"
import momentModule from "./moment"
import chatModule from "./chat"

import { follow, getIp } from "@/network/common"
import { IrootState, storeType, IuserInfo } from "./types"
import { getStorage, setStorage } from "@/utils/localStorage"

const store = createStore<IrootState>({
  state() {
    return {
      userInfo: {},
      theme: [
        { name: "light", svg: require("@/assets/img/light.svg") },
        { name: "dark", svg: require("@/assets/img/dark.svg") }
      ],
      currentTheme: 0
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
    },
    initTheme(store) {
      const i = getStorage("theme")
      const index = Number(i)
      if (index < store.state.theme.length) {
        return store.commit("changeTheme", index)
      }
      store.commit("changeTheme", 0)
    },

    async initIp(store) {
      const res = await getIp()
      if (res.status === 200) {
        const { ip, address } = res.data
        store.commit("changeUserInfo", { ...store.state.userInfo, ip, address })
      }
    }
  },
  mutations: {
    changeUserInfo(state, userInfo: IuserInfo) {
      state.userInfo = { ...userInfo }
      setStorage("userInfo", userInfo)
    },

    changeTheme(state, index: number) {
      const documentDOM = document.documentElement
      documentDOM.setAttribute("theme", state.theme[index].name)
      state.currentTheme = index
      setStorage("theme", index)
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

export function initTheme() {
  store.dispatch("initTheme")
}

export function initIp() {
  store.dispatch("initIp")
}

export default store
