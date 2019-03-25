
const TOKEN_KEN = 'token'

export const getToken = () => window.localStorage.getItem(TOKEN_KEN)

export const setToken = token => window.localStorage.setItem(TOKEN_KEN, token)

export const removeToken = () => window.localStorage.removeItem(TOKEN_KEN)
