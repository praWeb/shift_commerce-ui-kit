export default function randomString(length) {
  let str = ""
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  for(var i = 0; i < (length || 15); i++) {
    str += chars[Math.floor(Math.random() * (chars.length - 1))]
  }
  return str
}
