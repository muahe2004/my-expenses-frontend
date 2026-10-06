import { AppBar, Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { SPECIAL_COLORS } from '../theme'
import { API_URL } from '../auth/auth'

type HeaderProps = { onMenuClick?: () => void }

export default function Header(_: HeaderProps) {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

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
                <Avatar sx={{ width: 36, height: 36 }}>A</Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </AppBar>
    )
}
