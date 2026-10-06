export const API_URL = import.meta.env.VITE_API_URL

export async function checkAuthentication() {
  if (!API_URL) {
    return false
  }

  const response = await fetch(`${API_URL}/auth/google/status`, {
    credentials: 'include',
  })

  return response.ok
}
