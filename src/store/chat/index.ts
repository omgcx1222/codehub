import { Module } from "vuex"
import { IrootState } from "../types"
import { IchatState } from "../types"

const chatModule: Module<IchatState, IrootState> = {
  namespaced: true,
  state: {
    onLineCount: 0,
    touristCount: 0
  },
  actions: {},
  mutations: {
    changeOnLine(state, data) {
      const { onLineCount, touristCount } = data.onLineCount
      state.onLineCount = onLineCount ?? 0
      state.touristCount = touristCount ?? 0
    }
  }
}

export default chatModule