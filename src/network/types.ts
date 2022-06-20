import { AxiosRequestConfig } from "axios"

export interface HqqRequestConfig extends AxiosRequestConfig {
  showLoading?: {
    text: string
    errorMessage?: string | boolean
    successMessage?: string
    icon?: "success" | "error" | "warning"
  }
}
