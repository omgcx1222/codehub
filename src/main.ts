import { createApp } from "vue"
import App from "./App.vue"

import router from "./router"
import store from "./store"
import { initLogin } from "./store"
import formatDate from "./global/formatDate"
import imgView from "./global/imgView"
import { Lazyload } from "vant"

// toast image-preview dialog 组件的样式
import "vant/es/toast/style"
import "vant/es/dialog/style"
import "vant/es/image-preview/style"

const app = createApp(App)

app.use(router)
app.use(store)
app.use(formatDate)
app.use(imgView)
app.use(Lazyload)
initLogin()

app.mount("#app")
