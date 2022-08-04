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
    app.config.globalProperties.$formatDate = (
      date: string,
      unit: "minute" | "month" | "day" | "year" = "day",
      type?: "YYYY-MM-DD HH:mm" | "MM-DD HH:mm" | "HH:mm" | "MM-DD"
    ) => {
      // console.log(dayjs().diff(dayjs.utc(date).format("YYYY-MM-DD HH:mm"), "day"))

      const currentDate = dayjs()
      const oldDate = dayjs.utc(date).format("YYYY-MM-DD HH:mm")

      if (currentDate.diff(oldDate, unit) > 1) {
        if (currentDate.diff(oldDate, "year") > 1) {
          return oldDate
        }
        // if(currentDate.diff(oldDate, "month") > 1) {
        //   return dayjs.utc(date).format("YYYY-MM-DD HH:mm")
        // }
        return dayjs.utc(date).format(type ? type : "MM-DD HH:mm")
      }
      return currentDate.to(oldDate)
    }
  }
}
