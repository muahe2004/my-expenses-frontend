import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import DashBoard from './pages/DashBoard'
import { ROUTES } from './constants/routes'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.dashboard} element={<DashBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
