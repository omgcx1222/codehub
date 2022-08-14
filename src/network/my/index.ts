import { hqqRequest } from "../index"

export function upload(formData: FormData) {
  return hqqRequest.request({
    method: "post",
    url: `/upload/avatar`,
    data: formData,
    showLoading: {
      errorMessage: "上传头像失败",
      successMessage: "上传头像成功"
    }
  })
}

export function changeInfo(nickname?: string, signature?: string) {
  return hqqRequest.request({
    method: "post",
    url: `/user/info`,
    data: {
      nickname,
      signature
    },
    showLoading: {
      errorMessage: "修改失败",
      successMessage: "修改成功"
    }
  })
}
