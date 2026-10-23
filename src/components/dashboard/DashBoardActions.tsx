
import { Box, Paper, Typography } from '@mui/material'
import type { StatisticsData, TransactionType } from '../../api/transactions'
import { SPECIAL_COLORS } from '../../theme'

const formatMoney = (value: number) => new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
}).format(value)

const formatCount = new Intl.NumberFormat('vi-VN')

interface DashBoardActionsProps {
  statistics: StatisticsData
  selectedType: TransactionType
  onSelectType: (type: TransactionType) => void
}

export default function DashBoardActions({ statistics, selectedType, onSelectType }: DashBoardActionsProps) {
  const income = Number(statistics.total_income)
  const expenses = Number(statistics.total_expense)
  const transactions = statistics.categories.reduce(
    (total, category) => total + (category.count ?? category.transactions?.length ?? 0),
    0,
  )

  const cards = [
    { label: 'Income', value: formatMoney(income), color: SPECIAL_COLORS.green, transactionType: 'CREDIT' as const },
    { label: 'Expenses', value: formatMoney(expenses), color: SPECIAL_COLORS.red, transactionType: 'DEBIT' as const },
    { label: 'Balance', value: formatMoney(income - expenses), color: SPECIAL_COLORS.blue },
    { label: 'Transactions', value: formatCount.format(transactions), color: '#65CDE4' },
  ]

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }, gap: 2 }}>
      {cards.map((card) => {
        const isSelected = card.transactionType === selectedType
        const sx = {
          p: { xs: 2, sm: 2.5 },
          textAlign: 'center',
          bgcolor: '#000',
          border: `1px solid ${isSelected ? card.color : SPECIAL_COLORS.borderColor}`,
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(90, 90, 90, 0.28)',
          width: '100%',
        } as const
        const content = <>
          <Typography sx={{ color: card.color, fontSize: { xs: '1.125rem', sm: '1.4rem' }, fontWeight: 700, overflowWrap: 'anywhere' }}>
            {card.value}
          </Typography>
          <Typography sx={{ color: '#bdbdbd', mt: 0.5, fontSize: '0.8rem' }}>{card.label}</Typography>
        </>

        return card.transactionType ? (
          <Paper
            key={card.label}
            component="button"
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelectType(card.transactionType)}
            elevation={0}
            sx={{ ...sx, cursor: 'pointer', '&:hover': { bgcolor: '#101010' }, '&:focus-visible': { outline: `2px solid ${card.color}`, outlineOffset: 2 } }}
          >
            {content}
          </Paper>
        ) : (
          <Paper key={card.label} elevation={0} sx={sx}>{content}</Paper>
        )
      })}
    </Box>
  )
}
