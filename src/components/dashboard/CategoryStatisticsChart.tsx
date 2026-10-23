import { useMemo } from 'react'
import { PieChart } from '@mui/x-charts/PieChart'
import { Box, Paper, Typography } from '@mui/material'
import type { StatisticsData, TransactionType } from '../../api/transactions'
import { SPECIAL_COLORS } from '../../theme'

const formatMoney = (value: number) => new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
}).format(value)

const sliceColors = ['#6EDAC4', '#C8D943', '#F4C34D', '#B87B61', '#4285F4', '#E6777C', '#A84FC5', '#7555CB', '#4553B0', '#49B2C9']

export default function CategoryStatisticsChart({ statistics, transactionType }: { statistics: StatisticsData; transactionType: TransactionType }) {
  const rows = useMemo(() => {
    const categories = statistics.categories.map((category, index) => {
      const amountByType = (category.transactions ?? []).reduce((total, transaction) => {
        const amount = Math.abs(Number(transaction.amount))
        if (!Number.isFinite(amount)) return total
        if (transaction.transaction_type === transactionType) return total + amount
        return total
      }, 0)
      return { id: category.category_id ?? `uncategorized-${index}`, name: category.name || 'Chưa phân loại', value: amountByType }
    })
      .filter((category) => category.value > 0)
      .sort((a, b) => b.value - a.value)

    const total = categories.reduce((sum, category) => sum + category.value, 0)
    const formatPercent = new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 1 })
    return categories.map((category, index) => ({
      id: category.id,
      value: category.value,
      label: category.name,
      color: sliceColors[index % sliceColors.length],
      percent: `${formatPercent.format(category.value / total * 100)}%`,
    }))
  }, [statistics, transactionType])

  return (
    <Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 }, bgcolor: 'background.default', border: `1px solid ${SPECIAL_COLORS.borderColor}`, borderRadius: 2, boxShadow: '0 8px 24px rgba(90, 90, 90, 0.28)' }}>
      {rows.length === 0 ? (
        <Typography color="text.secondary" sx={{ p: 3 }}>No {transactionType === 'DEBIT' ? 'expense' : 'income'} transactions in this date range.</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', gap: { xs: 5, md: 10 } }}>
          <Box sx={{ width: { xs: '100%', md: 300 }, maxWidth: 300, flexShrink: 0 }}>
            <PieChart
              hideLegend
              series={[{ data: rows, valueFormatter: (item) => formatMoney(item.value) }]}
              height={300}
            />
          </Box>
          <Box sx={{ maxWidth: '100%', overflowX: 'auto' }}>
            <Box component="table" aria-label="Thống kê theo danh mục" sx={{ width: 'max-content', borderCollapse: 'separate', borderSpacing: '0 10px', fontSize: '0.875rem', color: 'text.primary' }}>
              <Box component="tbody">
                {rows.map((row) => (
                  <Box component="tr" key={row.id}>
                    <Box component="td" sx={{ pr: 3.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box component="span" sx={{ flex: '0 0 12px', width: 12, height: 12, borderRadius: '50%', bgcolor: row.color }} />
                        <Typography component="span" sx={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.875rem' }} title={row.label}>{row.label}</Typography>
                      </Box>
                    </Box>
                    <Box component="td" sx={{ pr: 3.5, textAlign: 'right', whiteSpace: 'nowrap', color: 'text.primary' }}>{row.percent}</Box>

                    <Box component="td" sx={{ textAlign: 'right', whiteSpace: 'nowrap', fontWeight: 600, color: transactionType === 'DEBIT' ? SPECIAL_COLORS.red : SPECIAL_COLORS.green }}>{formatMoney(row.value)}</Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Paper>
  )
}
