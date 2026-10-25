import { Box } from '@mui/material'
import DateRange from '../DateRange'
import { DATE_RANGE_PRESET, type DateRangeValue } from '../dateRangeUtils'

interface SynnTransactionActionsProps {
  value: DateRangeValue
  onApply: (range: DateRangeValue) => void
  loading: boolean
}

export default function SynnTransactionActions({ value, onApply, loading }: SynnTransactionActionsProps) {
  return (
    <Box>
      <DateRange value={value} onApply={onApply} initialPreset={DATE_RANGE_PRESET.YESTERDAY} applyLabel="Sync" loading={loading} />
    </Box>
  )
}
