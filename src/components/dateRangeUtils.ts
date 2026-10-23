export type DateRangePreset = 'today' | 'this-week' | 'last-week' | 'this-month' | 'last-month' | 'custom'

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

export function getPresetRange(preset: Exclude<DateRangePreset, 'custom'>, now = new Date()): DateRangeValue {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekday = (today.getDay() + 6) % 7

  switch (preset) {
    case 'today':
      return { startDate: formatLocalDate(today), endDate: formatLocalDate(today) }
    case 'this-week':
      return { startDate: formatLocalDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - weekday)), endDate: formatLocalDate(today) }
    case 'last-week':
      return {
        startDate: formatLocalDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - weekday - 7)),
        endDate: formatLocalDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - weekday - 1)),
      }
    case 'this-month':
      return { startDate: formatLocalDate(new Date(today.getFullYear(), today.getMonth(), 1)), endDate: formatLocalDate(today) }
    case 'last-month':
      return {
        startDate: formatLocalDate(new Date(today.getFullYear(), today.getMonth() - 1, 1)),
        endDate: formatLocalDate(new Date(today.getFullYear(), today.getMonth(), 0)),
      }
  }
}
