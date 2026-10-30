import { AppBar, Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { SPECIAL_COLORS } from '../theme'
import { API_URL } from '../auth/auth'
import { getCurrentUser } from '../api/users'

type HeaderProps = { onMenuClick?: () => void }

export default function Header(_: HeaderProps) {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const { data: user } = useQuery({ queryKey: ['current-user'], queryFn: getCurrentUser })

    async function handleLogout() {
        await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        })
        setAnchorEl(null)
        navigate('/', { replace: true })
    }

    return (
        <AppBar position="fixed" color="inherit" elevation={0} sx={{ py: 1, px: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '1px solid', borderColor: SPECIAL_COLORS.borderColor, zIndex: (theme) => theme.zIndex.drawer - 1, bgcolor: SPECIAL_COLORS.primary }}>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} size="small">
                <Avatar sx={{ width: 36, height: 36, bgcolor: SPECIAL_COLORS.blue }}>
                    {user?.full_name?.trim().charAt(0).toLocaleUpperCase() || '?'}
                </Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => { setAnchorEl(null); navigate('/profile') }}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </AppBar>
    )
}
