import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Alert, Box, TextField } from '@mui/material'
import ExpensesTable from "../components/expenses/ExpensesTable";
import SynnTransactionActions from '../components/expenses/SynnTransactionActions'
import { DATE_RANGE_PRESET, getPresetRange, type DateRangeValue } from '../utils/dateRangeUtils'
import { useSyncTransactions } from '../hooks/useTransactions'

export default function Expenses() {
    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [range, setRange] = useState<DateRangeValue>(() => getPresetRange(DATE_RANGE_PRESET.YESTERDAY))
    const queryClient = useQueryClient()
    const sync = useSyncTransactions()

    const handleSync = async (selectedRange: DateRangeValue = range) => {
        try {
            await sync.mutateAsync(selectedRange)
            setRange(selectedRange)
            await queryClient.invalidateQueries({ queryKey: ['transactions'] })
            await queryClient.invalidateQueries({ queryKey: ['transaction-statistics'] })
        } catch (error) {
            console.error('Failed to sync transactions:', error)
        }
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1, mb: 3 }}>
                <TextField
                    size="small"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') setSearch(searchInput)
                    }}
                    placeholder="Search expenses..."
                />
                <SynnTransactionActions value={range} onApply={handleSync} loading={sync.isPending} />
            </Box>
            {sync.isError && <Alert severity="error" sx={{ mb: 2 }}>Unable to sync transactions. Please try again.</Alert>}
            <ExpensesTable search={search} />
        </Box>
    )
}
