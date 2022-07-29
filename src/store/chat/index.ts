import { Module } from "vuex"
import { IrootState } from "../types"
import { IchatState } from "../types"

const chatModule: Module<IchatState, IrootState> = {
  namespaced: true,
  state: {
    onLineCount: 0,
    touristCount: 0,
    chatRooms: []
  },
  actions: {},
  mutations: {
    changeOnLine(state, data) {
      const { loginCount, touristCount } = data.onLineCount
      state.onLineCount = loginCount ?? 0
      state.touristCount = touristCount ?? 0
    },
    changeChatRecord(state, data) {
      const { chatRooms = [] } = data
      state.chatRooms = chatRooms
    }
  }
}

export default chatModule
