import { sendDataType } from "./types"
import { getStorage } from "@/utils/localStorage"
import store from "@/store"

class Socket {
  socket: WebSocket
  state: 0 | 1
  messageCb?: (data: object) => void
  errorCb?: (data: object) => void

  constructor({ url }: { url: string }) {
    this.socket = new WebSocket(url)
    this.state = 0

    this.socket.onopen = (s: any) => {
      if (s.target.readyState === 1) {
        this.state = 1
        const userInfo = getStorage("userInfo")
        this.send({ type: "login", data: { userInfo } })
        // setTimeout(() => {
        //   this.send({ type: "sendPublicChat", data: { userInfo, chatId: 1, message: 666 } })
        // }, 2000)
      }
    }
    this.socket.onmessage = (msg) => {
      const { data, type } = JSON.parse(msg.data)

      switch (type) {
        case "onLine":
          store.commit("chatModule/changeOnLine", data)
          break
        case "dropLine":
          store.commit("chatModule/changeOnLine", data)
          break
        case "chatRecord":
          store.commit("chatModule/changeChatRecord", data)
          break

        default:
          break
      }

      // this.messageCb && this.messageCb(data)
    }
    this.socket.onerror = (err) => {
      this.errorCb && this.errorCb(err)
    }
  }

  onMessage(cb: (data: object) => void) {
    this.messageCb = cb
  }
  send(data: sendDataType) {
    try {
      const d = JSON.stringify(data)
      this.socket.send(d)
    } catch (error) {
      console.log(error)
    }
  }
  onError(cb: (data: object) => void) {
    this.errorCb = cb
  }
  close() {
    this.socket.close()
  }
}

export default Socket
