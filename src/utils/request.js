const checkResponse = response => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)

export function request(url, options) {
   return fetch(url, options).then(checkResponse)
}