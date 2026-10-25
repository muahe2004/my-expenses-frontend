export const DATE_RANGE_PRESET = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  THIS_WEEK: 'this-week',
  LAST_WEEK: 'last-week',
  THIS_MONTH: 'this-month',
  LAST_MONTH: 'last-month',
  CUSTOM: 'custom',
} as const

export type DateRangePreset = typeof DATE_RANGE_PRESET[keyof typeof DATE_RANGE_PRESET]

export interface DateRangeValue {
  startDate: string
  endDate: string
}

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getPresetRange(preset: Exclude<DateRangePreset, typeof DATE_RANGE_PRESET.CUSTOM>, now = new Date()): DateRangeValue {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekday = (today.getDay() + 6) % 7

  switch (preset) {
    case DATE_RANGE_PRESET.TODAY:
      return { startDate: formatLocalDate(today), endDate: formatLocalDate(today) }
    case DATE_RANGE_PRESET.YESTERDAY: {
      const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
      return { startDate: formatLocalDate(yesterday), endDate: formatLocalDate(yesterday) }
    }
    case DATE_RANGE_PRESET.THIS_WEEK:
      return { startDate: formatLocalDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - weekday)), endDate: formatLocalDate(today) }
    case DATE_RANGE_PRESET.LAST_WEEK:
      return {
        startDate: formatLocalDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - weekday - 7)),
        endDate: formatLocalDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - weekday - 1)),
      }
    case DATE_RANGE_PRESET.THIS_MONTH:
      return { startDate: formatLocalDate(new Date(today.getFullYear(), today.getMonth(), 1)), endDate: formatLocalDate(today) }
    case DATE_RANGE_PRESET.LAST_MONTH:
      return {
        startDate: formatLocalDate(new Date(today.getFullYear(), today.getMonth() - 1, 1)),
        endDate: formatLocalDate(new Date(today.getFullYear(), today.getMonth(), 0)),
      }
  }
}
