import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import DashBoard from './pages/DashBoard'
import { ROUTES } from './constants/routes'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Expenses from './pages/Expenses'
import Settings from './pages/Settings'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path={ROUTES.dashboard} element={<DashBoard />} />
            <Route path={ROUTES.expenses} element={<Expenses />} />
            <Route path={ROUTES.settings} element={<Settings />} />
            <Route path={ROUTES.profile} element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
