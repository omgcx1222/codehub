export declare type mometnListBody = {
  order?: 0 | 1 | 2 // 0-最新 1-最热 2-关注
  limit?: number
  offset?: number
}
export declare type cometnListBody = {
  momentId: string
  limit?: number
  offset?: number
}

export declare type pubMomentBody = {
  content: string
}
