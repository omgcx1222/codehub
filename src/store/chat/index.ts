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
    sendMessageAction(store, data: { message: string; roomId: number }) {
      socket.send({ type: "sendPublicChat", data })
    },
    getChatListAction(store, roomId: number) {
      socket.send({ type: "getChatList", data: { roomId } })
    }
  },
  mutations: {
    changeOnLine(state, data) {
      const { onLine, tourist } = data.onLineUsers
      state.onLine = onLine ?? []
      state.tourist = tourist ?? []
    },
    changeChatRooms(state, rooms) {
      state.chatRooms = rooms
    },
    addChatMessage(state, { data, type }) {
      const room = state.chatRooms.find((item) => item.id === data.roomId)
      if (room) {
        console.log(room)
        if (type === "push") {
          room.chats.push(data.list)
        } else if (type === "all") {
          room.chats = data.list
        }
      }
      // room && room.chats.push(data)
    }
    // changeChatList(state, data) {
    //   const room = state.chatRooms.find((item) => item.id === data.roomId)
    // }
  }
}

export default chatModule
