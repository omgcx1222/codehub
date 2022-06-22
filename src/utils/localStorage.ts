export function setStorage(key: string, value: any, local = true) {
  if (local) {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }
}
export function getStorage<T = any>(key: string, local?: "local" | "session"): T {
  let data = window.localStorage.getItem(key) ?? ""
  if (local === "session") {
    data = window.sessionStorage.getItem(key) ?? ""
  }

  return JSON.parse(data)
}
