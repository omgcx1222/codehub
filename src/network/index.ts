import HqqRequest from "./axios"

const hqqRequest = new HqqRequest({
  baseURL: "http://175.178.104.121:8889",
  timeout: 10000,
  // 默认携带token
  isToken: true
})

export default hqqRequest
