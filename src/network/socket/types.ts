export type messageType = "connect" | "chat" | "system"
export type sendDataType = {
  type: messageType
  data: any
}
