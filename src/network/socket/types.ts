export type messageType = "login" | "system" | "sendPublicChat" | "getChatList"
export type sendDataType = {
  type: messageType
  data?: any
}
