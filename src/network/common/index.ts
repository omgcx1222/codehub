import { hqqRequest } from "../index"

export function follow(followId: number) {
  return hqqRequest.request({
    method: "post",
    url: "/user/follow",
    data: {
      followId
    },
    showLoading: {
      successMessage: true,
      icon: false,
      errorMessage: true
    }
  })
}
