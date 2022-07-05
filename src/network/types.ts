import { AxiosRequestConfig } from "axios"

export interface HqqRequestConfig extends AxiosRequestConfig {
  showLoading?: {
    text?: string // 加载时文本
    errorMessage?: string | boolean // 请求失败文本，传入boolean（true或false都一样）值表示使用接口返回的错误信息
    successMessage?: string | boolean // 请求成功文本
    icon?: boolean
  }
  isToken?: boolean
}
