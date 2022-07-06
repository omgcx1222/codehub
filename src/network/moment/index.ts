import { hqqRequest } from "../index"
import { mometnListBody, pubMomentBody } from "./types"

export function momentList(payload: mometnListBody) {
  return hqqRequest.request({
    method: "get",
    url: "/moment",
    params: {
      ...payload
    }
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

export function momentDetail(momentId: string) {
  return hqqRequest.request({
    method: "get",
    url: `/moment/${momentId}`
    // showLoading: {
    //   errorMessage: true
    // }
  })
}

export function commentList(momentId: string) {
  return hqqRequest.request({
    method: "get",
    url: "/comment",
    params: {
      momentId
    }
  })
}

export function replyList(commentId: number) {
  return hqqRequest.request({
    method: "get",
    url: "/comment",
    params: {
      commentId
    },
    showLoading: {
      errorMessage: true
    }
  })
}

export function pubComment(payload: object) {
  return hqqRequest.request({
    method: "post",
    url: "/comment",
    data: {
      ...payload
    },
    showLoading: {
      successMessage: "发表成功",
      errorMessage: true
    }
  })
}

export function deleteMoment(momentId: number) {
  return hqqRequest.request({
    method: "delete",
    url: `/moment/${momentId}`,
    showLoading: {
      text: "正在删除",
      errorMessage: true,
      successMessage: "删除成功"
    }
  })
}

export function likeMoment(momentId: number) {
  return hqqRequest.request({
    method: "post",
    url: `/moment/${momentId}/like`,
    showLoading: {
      successMessage: true,
      icon: false
    }
  })
}
