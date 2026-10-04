const ACCESS_TOKEN_KEY = 'access_token'

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function saveAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

export function isAuthenticated() {
  return Boolean(getAccessToken())
}

export const API_URL = import.meta.env.VITE_API_URL
