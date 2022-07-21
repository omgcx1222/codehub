import { sendDataType } from "./types"

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
        this.send({ type: "login" })
      }
    }
    this.socket.onmessage = (msg) => {
      const data = JSON.parse(msg.data)
      this.messageCb && this.messageCb(data)
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
