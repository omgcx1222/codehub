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
      detail?: boolean,
      type?: "YYYY-MM-DD HH:mm" | "MM-DD HH:mm" | "HH:mm" | "MM-DD"
    ) => {
      // console.log(dayjs().diff(dayjs.utc(date).format("YYYY-MM-DD HH:mm"), "day"))

      const currentDate = dayjs()
      const handleDate = dayjs.utc(date)
      // const handleDate = dayjs(date)
      // console.log(date, handleDate.format("YYYY-MM-DD HH:mm"))

      if (type) {
        return handleDate.format(type)
      }

      if (currentDate.year() - handleDate.year() < 1) {
        if (currentDate.month() - handleDate.month() < 1 && currentDate.date() - handleDate.date() <= 2) {
          if (currentDate.day() - handleDate.day() === 0) {
            return handleDate.format("HH:mm")
          }
          return "昨天 " + handleDate.format("HH:mm")
        }
        return handleDate.format(detail ? "MM-DD HH:mm" : "MM-DD")
      }
      return handleDate.format(detail ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD")
    }
  }
}
