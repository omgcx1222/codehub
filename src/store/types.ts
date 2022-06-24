export interface IrootState {
  name: string
}

/**
 * login
 */
export interface IuserInfo {
  avatarUrl?: string
  id?: number
  nickname?: string
  token?: string
  username?: string
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
