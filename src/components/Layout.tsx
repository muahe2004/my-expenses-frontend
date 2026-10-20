import { Box } from '@mui/material'
import { useState } from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Sidebar, { collapsedWidth, drawerWidth } from './Sidebar'

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  return <Box sx={{ minHeight: '100vh' }}>
    <Header onMenuClick={() => setMobileOpen(true)} />
    <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((value) => !value)} />
    <Box component="main" sx={{ ml: { xs: 0, md: `${sidebarCollapsed ? collapsedWidth : drawerWidth}px` }, pt: { xs: '56px', md: '64px' }, minHeight: '100vh', transition: 'margin-left 220ms ease-in-out' }}>
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}><Outlet /></Box>
    </Box>
  </Box>
}
