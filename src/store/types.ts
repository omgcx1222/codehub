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
  chatModule: IchatState
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

export type IloginState = object

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
  momentDetail: ImomentDetail
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
  isAuthorFans?: 0 | 1
  fansCount?: number
  images: string[]
  isAgree?: 0 | 1
  commentCount?: number
}

export interface Icomment {
  isAgree: 0 | 1
  agree: number
  author: { id: number; nickname: string; avatarUrl: string | null }
  fansCount?: number
  isAuthorFans: 0 | 1
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

export type momentOrder = 0 | 1 | 2 // 0-最新 1-最热 2-关注
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

/**
 * moment
 */
export interface IchatState {
  onLine: []
  tourist: []
  chatRooms: IchatRoom[]
}

export interface IchatRoom {
  id: number
  name: string
  chats: IchatMessage[]
}

export interface IchatMessage {
  avatarUrl: string | null
  // id: string
  // message: string
  // nickname: string
  // userId: number
  // createTime: Date
  author: { userId: number; nickname: string; avatarUrl: string | null }
  createTime: Date
  id: number
  message: string
}
