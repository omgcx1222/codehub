import { Module } from "vuex"
import { IrootState } from "../types"
import { IchatState } from "../types"
import { socket } from "@/network"

const chatModule: Module<IchatState, IrootState> = {
  namespaced: true,
  state: {
    onLine: [],
    tourist: [],
    chatRooms: []
  },
  actions: {
    sendMessageAction(state, data: { message: string; chatId: number }) {
      socket.send({ type: "sendPublicChat", data })
    }
  },
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
