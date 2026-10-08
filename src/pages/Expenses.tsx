import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Box, Button, TextField } from '@mui/material'
import SyncRoundedIcon from '@mui/icons-material/SyncRounded'
import ExpensesTable from "../components/expenses/ExpensesTable";
import { useSyncTransactions } from '../hooks/useTransactions'

export default function Expenses() {
    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const queryClient = useQueryClient()
    const sync = useSyncTransactions()

    const handleSync = async () => {
        await sync.mutateAsync()
        await queryClient.invalidateQueries({ queryKey: ['transactions'] })
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, mb: 3 }}>
                <TextField
                    size="small"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') setSearch(searchInput)
                    }}
                    placeholder="Search expenses..."
                />
                <Button variant="contained" startIcon={<SyncRoundedIcon />} onClick={handleSync} disabled={sync.isPending}>
                    {sync.isPending ? 'Syncing...' : 'Sync transactions'}
                </Button>
            </Box>
            <ExpensesTable search={search} />
        </Box>
    )
}
