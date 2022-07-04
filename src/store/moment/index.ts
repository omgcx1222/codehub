import {
  pubMoment,
  momentList,
  uploads,
  momentDetail,
  commentList,
  replyList,
  pubComment,
  deleteMoment
} from "@/network/moment"

import { Module } from "vuex"
import {
  IrootState,
  ImomentState,
  uploadsType,
  ImomentDetail,
  Icomment,
  IchangeMomentListOption,
  changeMomentType,
  momentOrder
} from "../types"
import { pubMomentBody } from "@/network/moment/types"
// import { commentList as cl } from "@/views/types"

const myModule: Module<ImomentState, IrootState> = {
  namespaced: true,
  state: {
    momentList: [],
    // 0最新，1最热，2关注
    active: 0,
    momentDetail: {},
    commentList: [],
    replyList: []
  },
  actions: {
    async momentListAction(store, payload: { order: momentOrder; type: changeMomentType }) {
      const offset = payload.type === "all" ? 0 : store.state.momentList[payload.order]?.length
      const limit = offset + 10
      const res = await momentList({ order: store.state.active, offset, limit })
      if (res.status !== 200) return

      store.commit("changeMomentList", { list: res.data, type: payload.type, order: payload.order })
    },

    async pubMomentAction(_, payload: pubMomentBody) {
      const res = await pubMoment({ ...payload })
      return res
    },

    async refreshMomentListAction(store, order: momentOrder) {
      store.dispatch("momentListAction", { order, type: "all" })
    },
    async pubSuccess(store) {
      if (store.state.momentList[0]?.length) store.dispatch("momentListAction", { order: 0, type: "all" })
      if (store.state.momentList[1]?.length) store.dispatch("momentListAction", { order: 1, type: "all" })
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
        if (payload.commentId) {
          commit("unShiftReply", { id: payload.commentId, reply: res.data[0] })
        } else {
          commit("unShiftComment", res.data[0])
        }
      }
    },

    async deleteMomentAction(_, momentId: number) {
      await deleteMoment(momentId)
    }
  },
  mutations: {
    changeActive(state, index: 0 | 1 | 2) {
      state.active = index
    },
    changeMomentList(state, payload: IchangeMomentListOption) {
      if (payload.list.length === 0) return
      if (payload.type === "all") {
        state.momentList[payload.order] = payload.list
      } else if (payload.type === "push") {
        state.momentList[payload.order].push(...payload.list)
      } else {
        state.momentList[payload.order].unshift(...payload.list)
      }
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
