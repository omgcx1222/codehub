import { Module } from "vuex"
import { IrootState } from "../types"
import { ImyState } from "../types"

const myModule: Module<ImyState, IrootState> = {
  namespaced: true,
  state: {
    follow: {},
    fans: {},
    moment: {},
    comment: {}
  },
  actions: {},
  mutations: {}
}

export default myModule
