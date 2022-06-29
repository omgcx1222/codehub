import { pubMoment, momentList, uploads } from "@/network/moment"

import { Module } from "vuex"
import { IrootState, ImomentState, uploadsType } from "../types"
import { pubMomentBody, mometnListBody } from "@/network/moment/types"

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
      let p = 0
      const l = payload.files.length
      for (const f of payload.files) {
        const formData = new FormData()
        formData.append("picture", f.file)
        const res = await uploads(payload.momentId, formData)
        if (res.status === 200) {
          p++
          const p2 = (p / l).toFixed(2)
          payload.process(Number(p2))
        } else {
          payload.process(-1)
        }
      }
    }
  },
  mutations: {}
}

export default myModule
