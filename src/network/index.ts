import HqqRequest from "./axios"
import Socket from "./socket"

// const HOST = "175.178.104.121"
// const POST = "8889"
const HOST = "192.168.31.94"
const POST = "80"
const BASE_URL = `${HOST}:${POST}`

const hqqRequest = new HqqRequest({
  baseURL: `http://${BASE_URL}`,
  timeout: 10000,
  // 默认携带token
  isToken: true
})

const socket = new Socket({
  url: `ws://${BASE_URL}/socket`
})

export { hqqRequest, socket }
