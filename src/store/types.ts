/**
 * store
 */
export interface IrootState {
  name: string
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
export interface ImomentState {
  momentList: any[]
}
export interface uploadsType {
  momentId: number
  files: any[]
  process: (p: number) => void
}
