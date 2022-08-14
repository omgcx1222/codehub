export type messageType = "login" | "sendchatMessage" | "createRoom"
export type sendDataType = {
  type: messageType
  data?: any
}
