/**
 * store
 */
export interface IrootState {
  name: string
}

export interface IstoreModuel {
  loginModule: IloginState
  myModule: ImyState
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
