import { lazy, Suspense, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material'
import { getTransactionStatistics, type TransactionType } from '../api/transactions'
import DateRange from '../components/DateRange'
import { getPresetRange, type DateRangeValue } from '../components/dateRangeUtils'
import DashBoardActions from '../components/dashboard/DashBoardActions'

const CategoryStatisticsChart = lazy(() => import('../components/dashboard/CategoryStatisticsChart'))

function DashBoard() {
    const [range, setRange] = useState<DateRangeValue>(() => getPresetRange('this-month'))
    const [selectedType, setSelectedType] = useState<TransactionType>('DEBIT')
    const { data, isLoading, isError } = useQuery({
        queryKey: ['transaction-statistics', range.startDate, range.endDate],
        queryFn: () => getTransactionStatistics(range.startDate, range.endDate),
    })

    return (
        <Stack spacing={2}>
            <DateRange value={range} onApply={setRange} />

            {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>}
            {isError && <Alert severity="error">Không thể tải thống kê. Vui lòng thử lại.</Alert>}

            {data && (
                <>
                    <DashBoardActions statistics={data.data} selectedType={selectedType} onSelectType={setSelectedType} />
                    <Suspense fallback={<Typography color="text.secondary">Đang tải biểu đồ...</Typography>}>
                        <CategoryStatisticsChart statistics={data.data} transactionType={selectedType} />
                    </Suspense>
                </>
            )}
        </Stack>
    )
}

export default DashBoard
