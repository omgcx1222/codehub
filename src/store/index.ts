import { createStore } from "vuex"

const store = createStore({
  state() {
    return {
      userInfo: {
        name: "hqq"
      }
    }
  }
})

export default store
