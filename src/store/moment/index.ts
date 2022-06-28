import { pubMoment, momentList, uploads } from "@/network/moment"

import { Module } from "vuex"
import { IrootState } from "../types"
import { ImomentState } from "../types"
import { pubMomentBody, mometnListBody, uploadsType } from "@/network/moment/types"

const myModule: Module<ImomentState, IrootState> = {
  namespaced: true,
  state: {
    momentList: []
  },
  actions: {
    async pubMomentAction(_, payload: pubMomentBody) {
      const res = await pubMoment({ ...payload })
      return res
    },

    async momentListAction(_, payload: mometnListBody) {
      const res = await momentList({ ...payload })
      return res.data
    },

    async uploadsAction(_, payload: uploadsType) {
      for (const f of payload.files) {
        const formData = new FormData()
        formData.append("picture", f.file)
        await uploads(payload.momentId, formData)
      }
    }
  },
  mutations: {}
}

export default myModule
