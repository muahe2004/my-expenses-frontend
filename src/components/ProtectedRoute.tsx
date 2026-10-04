import { Navigate, Outlet, useLocation } from 'react-router'
import { isAuthenticated } from '../auth/auth'

function ProtectedRoute() {
  const location = useLocation()

  if (!isAuthenticated()) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute
