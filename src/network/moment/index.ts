import hqqRequest from "../index"
import { mometnListBody, pubMomentBody } from "./types"

export function momentList(payload: mometnListBody) {
  return hqqRequest.request({
    method: "get",
    url: "/moment",
    params: {
      ...payload
    }
    // showLoading: {
    //   errorMessage: true
    // }
  })
}
export function pubMoment(data: pubMomentBody) {
  return hqqRequest.request({
    method: "post",
    url: "/moment",
    data
  })
}
export function uploads(momentId: number, formData: any) {
  return hqqRequest.request({
    method: "post",
    url: `/upload/${momentId}/picture`,
    data: formData
  })
}
