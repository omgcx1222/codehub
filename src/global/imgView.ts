/**
 * 预览图片
 */
import { App } from "vue"
import { ImagePreview } from "vant"

export default {
  install: (app: App<Element>) => {
    app.config.globalProperties.$imgView = ImagePreview
  }
}
