import { Module } from "vuex"
import { IrootState } from "../types"
import { IchatState } from "../types"
import { socket } from "@/network"
import { getStorage } from "@/utils/localStorage"

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
        if (type === "push") {
          room.chats.push(data.list)
          // 判断是否是自己发的消息
          const userInfo = getStorage("userInfo")
          if (userInfo.id !== data.list.author.userId) {
            if (room.tips) {
              room.tips += 1
            } else {
              room.tips = 1
            }
          }
        } else if (type === "all") {
          room.chats = data.list
        }
      }
      // room && room.chats.push(data)
    },
    changeTips(state, roomId) {
      const room = state.chatRooms.find((item) => item.id === roomId)
      if (room && room.tips) {
        room.tips = 0
      }
    }
  }
}

export default chatModule
