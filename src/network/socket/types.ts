export type messageType = "login" | "chat" | "system" | "sendPublicChat"
export type sendDataType = {
  type: messageType
  data?: any
}
