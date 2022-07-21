import {
  pubMoment,
  momentList,
  uploads,
  momentDetail,
  commentList,
  replyList,
  pubComment,
  deleteMoment,
  deleteComment,
  likeMoment,
  likeComment
} from "@/network/moment"

import { Module } from "vuex"
import {
  IrootState,
  ImomentState,
  uploadsType,
  ImomentDetail,
  Icomment,
  IchangeMomentListOption,
  changeMomentType
} from "../types"
import { pubMomentBody } from "@/network/moment/types"
// import { commentList as cl } from "@/views/types"

const myModule: Module<ImomentState, IrootState> = {
  namespaced: true,
  state: {
    momentList: [],
    // 0最新，1最热，2关注
    active: 0,
    // 某条动态的详情
    momentDetail: {},
    // 某条动态的评论列表
    commentList: [],
    // 动态某条评论的回复列表（popup弹框内）
    replyList: []
  },
  actions: {
    async momentListAction(store, type: changeMomentType) {
      const activeTab = store.state.active // 记录本次获取数据的activeTab
      const offset = type === "all" ? 0 : store.state.momentList[activeTab]?.length
      const limit = offset + 10
      const res = await momentList({ order: activeTab, offset, limit })
      if (res.status === 200) store.commit("changeMomentList", { list: res.data, type, order: activeTab })
    },

    async pubMomentAction(_, payload: pubMomentBody) {
      const res = await pubMoment({ ...payload })
      return res
    },

    async refreshMomentListAction(store) {
      await store.dispatch("momentListAction", "all")
    },
    async pubSuccess(store) {
      store.dispatch("momentListAction", "all")
      // if (store.state.momentList[0]?.length) store.dispatch("momentListAction", "all")
      // if (store.state.momentList[1]?.length) store.dispatch("momentListAction", "all")
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

    async momentDetailAndCommentListAction(
      { state, commit },
      { momentId, type }: { momentId: string; type: changeMomentType }
    ) {
      const offset = type === "all" ? 0 : state.commentList?.length
      const limit = offset + 10
      // const res = await momentList({ order: activeTab, offset, limit })
      const moment = await momentDetail(momentId)
      const cList = await commentList({ momentId, offset, limit })
      if (moment.status === 200) {
        commit("changeMomentDetail", moment.data)
      }
      if (cList.status === 200) {
        commit("changeCommentList", { list: cList.data, type })
      }
    },

    async replyListAction({ commit }, commentId: number) {
      const res = await replyList(commentId)

      if (res.status === 200) {
        commit("changeReplyList", res.data)
      }
    },

    // 评论或回复
    async pubCommentAction({ commit }, payload: any) {
      const res = await pubComment(payload)
      if (res.status === 200) {
        // 判断是动态的评论 还是评论的回复
        if (payload.commentId) {
          commit("unShiftReply", { id: payload.commentId, reply: res.data[0] })
        } else {
          commit("unShiftComment", res.data[0])
        }
      }
    },

    async deleteMomentAction({ commit }, momentId: number) {
      const res = await deleteMoment(momentId)
      if (res.status === 200) {
        commit("deleteMoment", momentId)
      }
    },

    async deleteComentAction({ commit }, commentId: number) {
      const res = await deleteComment(commentId)
      if (res.status === 200) commit("deleteComment", commentId)
    },

    async likeMomentAction({ commit }, momentId: number) {
      const res = await likeMoment(momentId)
      if (res.status === 200) {
        const isAgree = res.data === "点赞成功" ? 1 : 0
        commit("likeMoment", { momentId, isAgree })
      }
    },

    async likeCommentAction({ commit }, commentId: number) {
      const res = await likeComment(commentId)
      if (res.status === 200) {
        const isAgree = res.data === "点赞成功" ? 1 : 0
        commit("likeComment", { commentId, isAgree })
      }
    }
  },
  mutations: {
    changeActive(state, index: 0 | 1 | 2) {
      state.active = index
    },
    changeMomentList(state, payload: IchangeMomentListOption) {
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
    changeCommentList(state, { list, type }: { list: Icomment[]; type: changeMomentType }) {
      if (type === "all") {
        state.commentList = list
      } else if (type === "push") {
        state.commentList.push(...list)
      } else {
        state.commentList.unshift(...list)
      }
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
      // 判断是否在评论的回复详情页（popup弹框内，目前未在关闭弹框时置空replyList）
      if (state.replyList.length) {
        state.replyList.unshift(option.reply)
      }
    },
    unShiftComment(state, comment: Icomment) {
      state.commentList.unshift(comment)
    },
    likeMoment(state, { momentId, isAgree }: { momentId: number; isAgree: 0 | 1 }) {
      const m = state.momentDetail
      if (m.momentId) {
        m.isAgree = isAgree
        m.agree = isAgree ? m.agree! + 1 : m.agree! - 1
      }
      for (const moment of state.momentList) {
        const m = moment?.find((item) => item.momentId === momentId)
        if (m) {
          m.isAgree = isAgree
          m.agree = isAgree ? m.agree! + 1 : m.agree! - 1
        }
      }
    },
    likeComment(state, { commentId, isAgree }: { commentId: number; isAgree: 0 | 1 }) {
      const c = state.commentList.find((item) => item.id === commentId)
      if (c) {
        c.isAgree = isAgree
        c.agree = isAgree ? c.agree + 1 : c.agree - 1
      }
    },
    deleteMoment(state, momentId: number) {
      const m0 = state.momentList[0]?.findIndex((item) => item.momentId === momentId)
      const m1 = state.momentList[1]?.findIndex((item) => item.momentId === momentId)
      if (m0 != -1) state.momentList[0].splice(m0, 1)
      if (m1 != -1) state.momentList[1].splice(m1, 1)
    },
    deleteComment(state, commentId: number) {
      const c = state.commentList.findIndex((item) => item.id === commentId)
      if (c != -1) state.commentList.splice(c, 1)
    }
  }
}

export default myModule
