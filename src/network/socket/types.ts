export type messageType = "login" | "chat" | "system" | "chatMessage"
export type sendDataType = {
  type: messageType
  data?: any
  token?: string
}
