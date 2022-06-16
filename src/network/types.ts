import { AxiosRequestConfig } from "axios"

export interface HqqRequestConfig extends AxiosRequestConfig {
  showLoading?: {
    text: string
    // icon: "success" | "error" | "warning"
  }
}
