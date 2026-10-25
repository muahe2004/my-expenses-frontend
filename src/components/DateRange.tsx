import { useState } from 'react'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import { Box, Button, CircularProgress, FormControl, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { SPECIAL_COLORS } from '../theme'
import { DATE_RANGE_PRESET, getPresetRange, type DateRangePreset, type DateRangeValue } from './dateRangeUtils'

const options: Array<{ value: DateRangePreset; label: string }> = [
  { value: DATE_RANGE_PRESET.TODAY, label: 'Today' },
  { value: DATE_RANGE_PRESET.YESTERDAY, label: 'Yesterday' },
  { value: DATE_RANGE_PRESET.THIS_WEEK, label: 'This Week' },
  { value: DATE_RANGE_PRESET.THIS_MONTH, label: 'This Month' },
  { value: DATE_RANGE_PRESET.CUSTOM, label: 'Custom Range' },
]

interface DateRangeProps {
  value: DateRangeValue
  onApply: (range: DateRangeValue) => void
  initialPreset?: DateRangePreset
  applyLabel?: string
  loading?: boolean
}

export default function DateRange({ value, onApply, initialPreset = DATE_RANGE_PRESET.THIS_MONTH, applyLabel = 'Apply', loading = false }: DateRangeProps) {
  const [preset, setPreset] = useState<DateRangePreset>(initialPreset)
  const [customStart, setCustomStart] = useState(value.startDate)
  const [customEnd, setCustomEnd] = useState(value.endDate)
  const invalidCustomRange = preset === DATE_RANGE_PRESET.CUSTOM && (!customStart || !customEnd || customStart > customEnd)

  const apply = () => {
    if (invalidCustomRange) return
    onApply(preset === DATE_RANGE_PRESET.CUSTOM
      ? { startDate: customStart, endDate: customEnd }
      : getPresetRange(preset))
  }

  return (
    <Paper elevation={0} sx={{ width: 'fit-content', maxWidth: '100%', bgcolor: SPECIAL_COLORS.primary, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 210 }}>
          <Select
            aria-label="Date Range"
            value={preset}
            MenuProps={{ slotProps: { paper: { sx: { mt: 1 } } } }}
            onChange={(event) => {
              const nextPreset = event.target.value as DateRangePreset
              if (nextPreset === DATE_RANGE_PRESET.CUSTOM) {
                setCustomStart(value.startDate)
                setCustomEnd(value.endDate)
              }
              setPreset(nextPreset)
            }}
            startAdornment={<CalendarMonthRoundedIcon sx={{ ml: 0.5, mr: 1, fontSize: 20 }} />}
            sx={{
              bgcolor: '#000',
              borderRadius: 1,
              boxShadow: '0 8px 24px rgba(90, 90, 90, 0.28)',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: SPECIAL_COLORS.borderColor },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: SPECIAL_COLORS.borderColor },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: SPECIAL_COLORS.borderColor },
            }}
          >
            {options.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
          </Select>
        </FormControl>
        {preset === DATE_RANGE_PRESET.CUSTOM && (
          <>
            <TextField label="Từ ngày" type="date" size="small" value={customStart} onChange={(event) => setCustomStart(event.target.value)} slotProps={{ inputLabel: { shrink: true } }} sx={{ width: 165 }} />
            <TextField label="Đến ngày" type="date" size="small" value={customEnd} onChange={(event) => setCustomEnd(event.target.value)} slotProps={{ inputLabel: { shrink: true } }} sx={{ width: 165 }} />
          </>
        )}
        <Button className={loading ? 'loading' : undefined} variant="contained" onClick={apply} disabled={invalidCustomRange || loading} sx={{ height: 40, minWidth: 80, px: 2, fontSize: 16, bgcolor: SPECIAL_COLORS.blue, color: SPECIAL_COLORS.white, '&:hover': { bgcolor: SPECIAL_COLORS.actionColor } }}>
          {loading ? <CircularProgress size={20} aria-label="Loading" /> : applyLabel}
        </Button>
      </Box>
      {invalidCustomRange && <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>Vui lòng chọn khoảng ngày hợp lệ.</Typography>}
    </Paper>
  )
}
