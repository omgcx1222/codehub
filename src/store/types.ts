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
export interface momentItem {
  list: object[]
  page: number
}
export interface ImomentState {
  momentList: {
    news: momentItem
    host: momentItem
    follow: momentItem
  }
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
