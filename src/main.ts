import { createApp } from "vue"
import App from "./App.vue"

import router from "./router"
import store from "./store"
import { initLogin } from "./store"
import formatDate from "./global/formatDate"
import imgView from "./global/imgView"

// toast组件的样式
import "vant/es/toast/style"
import "vant/es/image-preview/style"

const app = createApp(App)

app.use(router)
app.use(store)
app.use(formatDate)
app.use(imgView)
initLogin()

app.mount("#app")
