const checkResponse = response => {
  if (!response.ok) return response.json().then(err => Promise.reject(err))
  return response.json()
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse)
}
