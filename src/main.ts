import { createApp } from "vue"
import App from "./App.vue"

import router from "./router"
import store from "./store"
import { initLogin } from "./store"

// toast组件的样式
import "vant/es/toast/style"
import "vant/es/image-preview/style"
import { ImagePreview } from "vant"

const app = createApp(App)

app.use(router)
app.use(store)
initLogin()

// 全局注册预览图片
app.config.globalProperties.$imgView = ImagePreview

app.mount("#app")
