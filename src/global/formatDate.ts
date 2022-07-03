/**
 * 时间格式化，xxx之前
 */
import { App } from "vue"

import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/zh"
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.locale("zh")

export default {
  install: (app: App<Element>) => {
    app.config.globalProperties.$formatDate = (date: string, unit: "minute" | "hour" | "day" | "year" = "day") => {
      // console.log(dayjs().diff(dayjs.utc(date).format("YYYY-MM-DD HH:mm"), "day"))

      const currentDate = dayjs()
      const byDate = dayjs.utc(date).format("YYYY-MM-DD HH:mm")

      if (currentDate.diff(byDate, unit) > 1) {
        if (currentDate.diff(byDate, "year") > 1) {
          return byDate
        }
        return dayjs.utc(date).format("MM-DD HH:mm")
      }
      return currentDate.to(byDate)
    }
  }
}
