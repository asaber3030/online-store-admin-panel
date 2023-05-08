export default function useStorage(key, value) {
  if (localStorage.getItem(key) != undefined) {
    return localStorage.getItem(key)
  }
  return localStorage.setItem(key, value)
  return value
}
