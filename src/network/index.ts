import HqqRequest from "./axios"

const hqqRequest = new HqqRequest({
  baseURL: "http://175.178.104.121:8888",
  timeout: 10000
})

export default hqqRequest
