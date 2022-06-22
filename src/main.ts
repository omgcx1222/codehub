import { createApp } from "vue"
import App from "./App.vue"

import router from "./router"
import store from "./store"
import { initLogin } from "./store"

// toast组件的样式
import "vant/es/toast/style"

const app = createApp(App)

app.use(router)
app.use(store)
initLogin()

app.mount("#app")
