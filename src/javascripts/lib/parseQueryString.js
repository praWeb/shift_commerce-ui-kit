export default function parseQueryString(queryString) {
  let searchParams = new URLSearchParams(queryString.slice(1))
  return searchParams
}
