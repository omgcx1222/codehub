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
