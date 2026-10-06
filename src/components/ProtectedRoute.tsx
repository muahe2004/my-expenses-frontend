import { Navigate, Outlet, useLocation } from 'react-router'
import { useEffect, useState } from 'react'
import { API_URL } from '../auth/auth'

function ProtectedRoute() {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    fetch(`${API_URL}/auth/google/status`, { credentials: 'include' })
      .then((response) => setIsAuthenticated(response.ok))
      .catch(() => setIsAuthenticated(false))
  }, [])

  if (isAuthenticated === null) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute
