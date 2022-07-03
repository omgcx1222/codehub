import { pubMoment, momentList, uploads, momentDetail, commentList, replyList, pubComment } from "@/network/moment"

import { Module } from "vuex"
import { IrootState, ImomentState, uploadsType, momentPage, momentItem, ImomentDetail, Icomment } from "../types"
import { pubMomentBody } from "@/network/moment/types"
// import { commentList as cl } from "@/views/types"

const myModule: Module<ImomentState, IrootState> = {
  namespaced: true,
  state: {
    momentList: {
      news: { list: [], page: 0 },
      host: { list: [], page: 0 },
      follow: { list: [], page: 0 }
    },
    momentDetail: {},
    commentList: [],
    replyList: []
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
      if (res.status !== 200) return

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

    async momentDetailAndCommentListAction({ commit }, momentId: string) {
      const moment = await momentDetail(momentId)
      const cList = await commentList(momentId)
      if (moment.status === 200) {
        commit("changeMomentDetail", moment.data)
      }
      if (cList.status === 200) {
        commit("changeCommentList", cList.data)
      }
    },

    async replyListAction({ commit }, commentId: number) {
      const res = await replyList(commentId)
      if (res.status === 200) {
        commit("changeReplyList", res.data)
      }
    },

    async pubCommentAction({ commit }, payload: any) {
      const res = await pubComment(payload)
      if (res.status === 200) {
        // 1-评论动态  2-回复评论  3-回复评论的回复
        console.log(res.data[0])
        if (payload.commentId) {
          commit("unShiftReply", { id: payload.commentId, reply: res.data[0] })
        } else {
          commit("unShiftComment", res.data[0])
        }
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
    },
    changeMomentDetail(state, momentDetail: ImomentDetail) {
      state.momentDetail = momentDetail
    },
    changeCommentList(state, commentList: Icomment[]) {
      state.commentList = commentList
    },
    changeReplyList(state, replyList: Icomment[]) {
      state.replyList = replyList
    },
    unShiftReply(state, option: { id: number; reply: Icomment }) {
      const c = state.commentList.find((item) => item.id === option.id)
      if (c) {
        c.childCount = Number(c.childCount) + 1
        c.replyChild?.unshift(option.reply)
      }
      if (state.replyList.length) {
        state.replyList.unshift(option.reply)
      }
    },
    unShiftComment(state, comment: Icomment) {
      state.commentList.unshift(comment)
    }
  }
}

export default myModule
