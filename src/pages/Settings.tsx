import { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import SettingsTable from '../components/settings/SettingsTable'
import SettingsFormModel from '../components/settings/SettingsFormModel'

export default function Settings() {
    const [search, setSearch] = useState(''); const [input, setInput] = useState(''); const [open, setOpen] = useState(false)
    return <Box><Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 3 }}><TextField size="small" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') setSearch(input) }} placeholder="Search categories..." /><Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setOpen(true)}>Add category</Button></Box><SettingsTable search={search} /><SettingsFormModel category={null} open={open} onClose={() => setOpen(false)} /></Box>
}
