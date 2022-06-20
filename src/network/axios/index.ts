import axios, { AxiosInstance } from "axios"
import { HqqRequestConfig } from "../types"
import { Toast } from "vant"
import { ToastWrapperInstance } from "vant/lib/toast/types"

class HqqRequest {
  instance: AxiosInstance
  toast?: ToastWrapperInstance
  requestConfig?: HqqRequestConfig

  constructor(config: HqqRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config: HqqRequestConfig) => {
        if (config.showLoading) {
          this.toast = Toast.loading({
            duration: 0,
            message: config.showLoading.text
          })
        }
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
        this.toast?.clear()
        if (this.requestConfig?.showLoading?.successMessage) {
          Toast.success(this.requestConfig.showLoading?.successMessage)
        }
        return res
      },
      (err) => {
        this.toast?.clear()
        if (this.requestConfig?.showLoading?.errorMessage) {
          if (typeof this.requestConfig.showLoading?.errorMessage === "string") {
            Toast.fail(this.requestConfig.showLoading?.errorMessage)
          } else if (typeof this.requestConfig.showLoading?.errorMessage === "boolean") {
            Toast.fail(err.response.data)
          }
        }
        return err.response
      }
    )
  }

  request(config: HqqRequestConfig) {
    return new Promise((resolve, reject) => {
      this.requestConfig = config
      this.instance
        .request(config)
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default HqqRequest
