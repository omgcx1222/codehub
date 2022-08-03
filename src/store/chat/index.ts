import { Module } from "vuex"
import { IrootState } from "../types"
import { IchatState } from "../types"

const chatModule: Module<IchatState, IrootState> = {
  namespaced: true,
  state: {
    onLine: [],
    tourist: [],
    chatRooms: []
  },
  actions: {},
  mutations: {
    changeOnLine(state, data) {
      const { onLine, tourist } = data.onLineUsers
      state.onLine = onLine ?? []
      state.tourist = tourist ?? []
    },
    changeChatRecord(state, data) {
      const { chatRooms = [] } = data
      state.chatRooms = chatRooms
    }
  }
}

export default chatModule
