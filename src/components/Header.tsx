import { AppBar, Avatar, Box } from '@mui/material'
import { SPECIAL_COLORS } from '../theme'

type HeaderProps = { onMenuClick?: () => void }

export default function Header(_: HeaderProps) {
    return (
        <AppBar position="fixed" color="inherit" elevation={0} sx={{ py: 1, px: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '1px solid', borderColor: SPECIAL_COLORS.borderColor, zIndex: (theme) => theme.zIndex.drawer - 1, bgcolor: SPECIAL_COLORS.primary }}>
            <Box sx={{ flexGrow: 1 }} />
            <Avatar sx={{ width: 36, height: 36 }}>A</Avatar>
        </AppBar>
    )
}
