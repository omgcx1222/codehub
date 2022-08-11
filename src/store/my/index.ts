import { Module } from "vuex"
import { IrootState } from "../types"
import { ImyState } from "../types"
import { upload } from "@/network/my"

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
        store.rootState.userInfo.avatarUrl = res.data.url
      }
    },
    async changeInfoAction(store, info) {
      console.log(info)

      // await upload(formData)
    }
  },
  mutations: {}
}

export default myModule
