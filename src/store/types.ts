/**
 * store
 */
export interface IrootState {
  userInfo: IuserInfo
}

export interface IstoreModuel {
  loginModule: IloginState
  myModule: ImyState
  momentModule: ImomentState
}

export type storeType = IrootState & IstoreModuel

/**
 * login
 */
export interface IuserInfo {
  avatarUrl?: string
  id?: number
  nickname?: string
  token?: string
  username?: string
  signature?: string
  followCount?: number
  fansCount?: number
  userRank?: string | number
  getAgreeCount?: string
}

export interface IloginState {
  userInfo: IuserInfo
}

/**
 * my
 */
export interface ImyState {
  follow: object
  fans: object
  moment: object
  comment: object
}

/**
 * moment
 */
export interface ImomentState {
  momentList: ImomentDetail[][]
  // 0最新，1最热，2关注
  active: 0 | 1 | 2
  momentDetail: ImomentDetail | object
  commentList: Icomment[]
  replyList: Icomment[]
}
export interface uploadsType {
  momentId: number
  files: any[]
  process: (p: number) => void
}
export interface momentPage {
  order: 0 | 1 | 2
  page: number
}
export interface ImomentDetail {
  momentId?: number
  content?: string
  createTime?: string
  updateTime?: string
  author?: {
    id: number
    nickname: string
    avatarUrl: string | null
  }
  agree?: number
  authorFans?: number
  images?: string | null
}

export interface Icomment {
  isAgree: number
  agree: number
  author: { id: number; nickname: string; avatarUrl: string | null }
  authorFans?: number
  childCount?: number
  commentId: number
  content: string
  createTime: string
  id: number
  momentId: number
  replyChild?: Icomment[]
  replyAuthor?: { id: number; nickname: string; avatarUrl: string | null }
  replyUserId: number
}

export interface IchangeMomentListOption {
  list: any[]
  order: momentOrder
  type: changeMomentType
}

export type momentOrder = 0 | 1 | 2
export type changeMomentType = "push" | "unshift" | "all"

// export interface Ireply {
//   isAgree: number
//   agree: number
//   author: { id: number; nickname: string; avatarUrl: string | null }
//   commentId: number
//   content: string
//   createTime: string
//   id: number
//   momentId: number
//   replyAuthor: { id: number; nickname: string; avatarUrl: string | null }
//   replyUserId: number
// }
