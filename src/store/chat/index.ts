import { Module } from "vuex"
import { IrootState, IchatState, IchatRoom } from "../types"
import { socket } from "@/network"
import { getStorage, setStorage } from "@/utils/localStorage"
import router from "@/router"

const chatModule: Module<IchatState, IrootState> = {
  namespaced: true,
  state: {
    onLine: [],
    tourist: [],
    chatRooms: []
  },
  actions: {
    // 发送消息
    sendchatMessageAction(store, data) {
      socket.send({ type: "sendchatMessage", data })
    },
    createRoomAction(store, data) {
      socket.send({ type: "createRoom", data })
    },
    reConnectionAction() {
      socket.send({ type: "login" })
    }
    // 根据聊天室id获取聊天记录
    // getChatListAction(store, roomId: number) {
    //   socket.send({ type: "getChatList", data: { roomId } })
    // }
  },
  mutations: {
    getlocalRoomsAction(state) {
      let rooms
      if (!getStorage("userInfo")?.token) {
        rooms = getStorage("youke_rooms")
      } else {
        rooms = getStorage("rooms")
      }

      if (rooms instanceof Array) {
        state.chatRooms = rooms
      }
    },
    // 改变在线用户信息
    changeOnLine(state, data) {
      const { onLine, tourist } = data.onLineUsers
      state.onLine = onLine ?? []
      state.tourist = tourist ?? []
    },
    changeChatRooms(state, rooms: IchatRoom[]) {
      state.chatRooms.forEach((item, index) => {
        let start = item.chats.length - 1
        const indey = item.chats.findIndex((item2) => item2.isRead === 0)
        if (indey !== -1) {
          start = indey - 1
        }
        // 同步本地isRead状态
        for (let i = start; i >= 0; i--) {
          if (rooms[index]?.chats[i]?.isRead !== undefined) {
            rooms[index].chats[i].isRead = 1
          }
        }
      })
      state.chatRooms = rooms
      if (!getStorage("userInfo")?.token) {
        return setStorage("youke_rooms", rooms)
      }

      setStorage("rooms", rooms)
    },
    // 添加聊天室消息
    addChatMessage(state, data) {
      const room = state.chatRooms.find((item) => item.id === data.id)
      if (room) {
        if (router.currentRoute.value.path === "/chatDetail") {
          data.chats.isRead = 1
        }

        room.chats.push(data.chats)
        if (!getStorage("userInfo")?.token) {
          return setStorage("youke_rooms", state.chatRooms)
        }
        setStorage("rooms", state.chatRooms)
      } else {
        socket.send({ type: "login" })
      }
      // room && room.chats.push(data)
    },
    changeIsRead(state, roomId) {
      const room = state.chatRooms.find((item) => item.id === roomId)
      if (room) {
        room.chats.forEach((item) => {
          item.isRead = 1
        })
      }
      if (!getStorage("userInfo")?.token) {
        return setStorage("youke_rooms", state.chatRooms)
      }
      setStorage("rooms", state.chatRooms)
    },

    roomDetail(state, data) {
      console.log(router)

      router.push({
        path: "/chatDetail",
        query: {
          id: data.roomId
        }
      })
      socket.send({ type: "login" })
      // state.chatRooms.push({ id: data.roomId, chats: [], name: data.name, img: data.img, tips: 0 })
    }
  },
  getters: {
    tips(state) {
      let num = 0
      state.chatRooms.forEach((room) => {
        const n = room?.chats?.reduce((pre, cur) => {
          return pre + (cur?.isRead === 0 ? 1 : 0)
        }, 0)
        room.tips = n
        num += n
      })

      return num || ""
    }
  }
}

export default chatModule
