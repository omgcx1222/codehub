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
    sendMessageAction(store, data: { message: string; chatId: number }) {
      socket.send({ type: "sendPublicChat", data })
    },
    chatRoomsAction(store, data) {
      const room = store.state.chatRooms.find((item) => item.id === data.roomId)
      room && room.chats.push(data)
    }
  },
  mutations: {
    changeOnLine(state, data) {
      const { onLine, tourist } = data.onLineUsers
      state.onLine = onLine ?? []
      state.tourist = tourist ?? []
    },
    changeChatRecord(state, rooms = []) {
      state.chatRooms.push(...rooms)
    }
  }
}

export default chatModule
