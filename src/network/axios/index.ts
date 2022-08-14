import axios, { AxiosInstance, AxiosResponse } from "axios"
import { Toast } from "vant"

import { getStorage } from "@/utils/localStorage"

import { HqqRequestConfig } from "../types"
import { ToastWrapperInstance } from "vant/lib/toast/types"
import { IuserInfo } from "@/store/types"

class HqqRequest {
  instance: AxiosInstance
  toast?: ToastWrapperInstance
  requestConfig?: HqqRequestConfig

  constructor(config: HqqRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config: HqqRequestConfig) => {
        if (config.showLoading && config.showLoading.icon) {
          this.toast = Toast.loading({
            duration: 0,
            message: config.showLoading.text
          })
        }

        if (config.isToken) {
          config.headers = config.headers ?? {}

          const token = getStorage<IuserInfo>("userInfo")?.token
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
            // config.headers["content-type"] = ""
          }
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
          if (typeof this.requestConfig.showLoading?.successMessage === "string") {
            Toast({
              message: this.requestConfig.showLoading?.successMessage,
              icon: this.requestConfig.showLoading?.icon ? "success" : ""
            })
          } else if (typeof this.requestConfig.showLoading?.successMessage === "boolean") {
            Toast({
              message: res.data,
              icon: this.requestConfig.showLoading?.icon ? "success" : ""
            })
          }
        }
        this.toast = undefined
        return res
      },
      (err) => {
        this.toast?.clear()
        if (this.requestConfig?.showLoading?.errorMessage) {
          if (typeof this.requestConfig.showLoading?.errorMessage === "string") {
            Toast({
              message: this.requestConfig.showLoading?.errorMessage,
              icon: this.requestConfig.showLoading?.icon ? "fail" : ""
            })
          } else if (typeof this.requestConfig.showLoading?.errorMessage === "boolean") {
            Toast({
              message: err.response.data,
              icon: this.requestConfig.showLoading?.icon ? "fail" : ""
            })
          }
        }
        this.toast = undefined
        return err.response
      }
    )
  }

  request(config: HqqRequestConfig): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      this.requestConfig = config
      this.instance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          console.log(err, "err")
          reject(err)
        })
    })
  }
}

export default HqqRequest
