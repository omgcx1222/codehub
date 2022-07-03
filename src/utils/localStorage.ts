export function setStorage(key: string, value: any, local?: "local" | "session") {
  if (local === "session") {
    return window.sessionStorage.setItem(key, JSON.stringify(value))
  }
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getStorage<T = any>(key: string, local?: "local" | "session"): T | any {
  let data = window.localStorage.getItem(key) ?? "{}"
  if (local === "session") {
    data = window.sessionStorage.getItem(key) ?? "{}"
  }

  data = data.replace("\\", " ") // 防止用户恶意修改缓存，JSON.parse携带反斜杠会报错
  data = JSON.parse(data) ?? {}

  return data
}

export function removeStorage(key: string, local?: "local" | "session") {
  if (local === "session") {
    return window.sessionStorage.removeItem(key)
  }
  window.localStorage.removeItem(key)
}
