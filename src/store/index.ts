import { createStore } from "vuex"
import loginModule from "./login"

import { IrootState } from "./types"

const store = createStore<IrootState>({
  state() {
    return {
      name: ""
    }
  },
  actions: {},
  mutations: {},
  modules: {
    loginModule
  }
})

export default store
