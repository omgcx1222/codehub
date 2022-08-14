import { Module } from "vuex"
import { IrootState, ImyState } from "../types"
import { upload, changeInfo } from "@/network/my"
import { setStorage } from "@/utils/localStorage"

const myModule: Module<ImyState, IrootState> = {
  namespaced: true,
  state: {
    follow: {},
    fans: {},
    moment: {},
    comment: {}
  },
  actions: {
    async uploadAvatarAction(store, file) {
      const formData = new FormData()
      formData.append("avatar", file.file)
      const res = await upload(formData)
      if (res?.data?.url) {
        const userInfo = { ...store.rootState.userInfo }
        userInfo.avatarUrl = res.data.url
        store.commit("changeUserInfo", userInfo, { root: true })
        setStorage("userInfo", userInfo)
      }
    },
    async changeInfoAction(store, info) {
      const res = await changeInfo(info.nickname, info.signature)
      if (res.status === 200) {
        const userInfo = { ...store.rootState.userInfo }
        userInfo.nickname = info.nickname
        userInfo.signature = info.signature
        store.commit("changeUserInfo", userInfo, { root: true })
        setStorage("userInfo", userInfo)
        return true
      }
    }
  },
  mutations: {}
}

export default myModule
