import axios, { AxiosInstance } from "axios"
import { HqqRequestConfig } from "../types"

class HqqRequest {
  instance: AxiosInstance
  constructor(config: HqqRequestConfig) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      (config) => {
        config.headers = config.headers ?? {}

        const token = ""
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        return res
      },
      (err) => {
        return err.response
      }
    )
  }

  request(config: HqqRequestConfig) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default HqqRequest
