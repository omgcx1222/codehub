import { pubMoment, momentList, uploads, momentDetail, commentList } from "@/network/moment"

import { Module } from "vuex"
import { IrootState, ImomentState, uploadsType, momentPage, momentItem } from "../types"
import { pubMomentBody } from "@/network/moment/types"

const myModule: Module<ImomentState, IrootState> = {
  namespaced: true,
  state: {
    momentList: {
      news: { list: [], page: 0 },
      host: { list: [], page: 0 },
      follow: { list: [], page: 0 }
    }
  },
  actions: {
    async pubMomentAction(_, payload: pubMomentBody) {
      const res = await pubMoment({ ...payload })
      return res
    },

    async momentListAction(store, payload: momentPage) {
      const offset = (payload.page - 1) * 10
      const limit = offset + 10
      const res = await momentList({ order: payload.order, offset, limit })

      // 0最新，1最热，2关注
      if (payload.order === 0) {
        return store.commit("changeMomentListNews", { list: res.data, page: payload.page })
      } else if (payload.order === 1) {
        return store.commit("changeMomentListHost", { list: res.data, page: payload.page })
      }
      store.commit("changeMomentListFollow", { list: res.data, page: payload.page })
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
          payload.process(p / l)
        } else {
          payload.process(-1)
        }
      }
    },

    async momentDetailAndCommentListAction(_, momentId: string) {
      const moment = await momentDetail(momentId)
      const cList = await commentList(momentId)
      return {
        moment: moment.data,
        commentList: cList.data
      }
    }
  },
  mutations: {
    changeMomentListNews(state, payload: momentItem) {
      state.momentList.news.list.push(...payload.list)
      state.momentList.news.page = payload.page
    },
    changeMomentListHost(state, payload: momentItem) {
      state.momentList.host.list.push(...payload.list)
      state.momentList.host.page = payload.page
    },
    changeMomentListFollow(state, payload: momentItem) {
      state.momentList.follow.list.push(...payload.list)
      state.momentList.follow.page = payload.page
    }
  }
}

export default myModule
