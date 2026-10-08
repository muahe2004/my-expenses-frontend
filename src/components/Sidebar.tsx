import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import { NavLink } from 'react-router'
import { ROUTES } from '../constants/routes'
import { SPECIAL_COLORS } from '../theme'

const drawerWidth = 200
const collapsedWidth = 64
type SidebarProps = { mobileOpen: boolean; onClose: () => void; collapsed: boolean; onToggle: () => void }

export { drawerWidth, collapsedWidth }

export default function Sidebar({ mobileOpen, onClose, collapsed, onToggle }: SidebarProps) {
    const content = (
        <Box sx={{ width: collapsed ? collapsedWidth : drawerWidth, height: '100%', bgcolor: SPECIAL_COLORS.primary, transition: 'width 220ms ease-in-out' }}>
        <List sx={{ px: 1.5, mt: 4 }}>
            <NavItem collapsed={collapsed} to={ROUTES.dashboard} label="Dashboard" icon={<DashboardRoundedIcon />} />
            <NavItem collapsed={collapsed} to={ROUTES.expenses} label="Expenses" icon={<ReceiptLongRoundedIcon />} />
            <NavItem collapsed={collapsed} to="/settings" label="Settings" icon={<SettingsRoundedIcon />} />
        </List>

        </Box>
    )

    return (
        <>
            <Drawer variant="temporary" open={mobileOpen} onClose={onClose} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' } }}>{content}</Drawer><Drawer variant="permanent" open sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { width: collapsed ? collapsedWidth : drawerWidth, borderRight: `1px solid ${SPECIAL_COLORS.borderColor}`, transition: 'width 220ms ease-in-out' } }}>{content}
                <Box 
                    className="caocaicc" 
                    sx={{ 
                        width: 20, height: 20, 
                        bgcolor: collapsed ? '#61C353' : '#F3C055', 
                        borderRadius: 999,
                        position: "absolute",
                        top: 10,
                        right: collapsed ? 22 : 10,
                        cursor: 'pointer',
                        zIndex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }} 
                    onClick={onToggle}
                >
                    {collapsed ? <ChevronRightRoundedIcon sx={{ fontSize: 16 }} /> : <RemoveRoundedIcon sx={{ fontSize: 16 }} />}
                </Box>
            </Drawer>
        </>
    );
}

function NavItem({ to, label, icon, collapsed }: { to: string; label: string; icon: React.ReactNode; collapsed: boolean }) {
    return (
        <ListItemButton 
            component={NavLink} 
            to={to} 
            sx={{ 
                borderRadius: 2, 
                mb: .5, 
                justifyContent: 
                collapsed ? 'center' : 'initial', 
                px: collapsed ? 1 : 2, 
                '&.active': { 
                    bgcolor: 'primary.main', 
                    color: 'primary.contrastText', 
                    '& .MuiListItemIcon-root': { 
                        color: 'inherit' 
                    } 
                } 
            }}>
                <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40, color: 'inherit' }}>
                    {icon}
                </ListItemIcon>
                {!collapsed && <ListItemText primary={label} />}
        </ListItemButton>
    );
}
