import HqqRequest from "./axios"

const BASE_URL = "175.178.104.121:8889"
// const BASE_URL = "192.168.198.69:80"

const hqqRequest = new HqqRequest({
  baseURL: `http://${BASE_URL}`,
  timeout: 10000,
  // 默认携带token
  isToken: true
})

export { hqqRequest }
