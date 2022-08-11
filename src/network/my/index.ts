import { hqqRequest } from "../index"

export function upload(formData: FormData) {
  return hqqRequest.request({
    method: "post",
    url: `/upload/avatar`,
    data: formData
  })
}
