import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
} from '@mui/material'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import IconButton from '@mui/material/IconButton'
import { useTransactions } from '../../hooks/useTransactions'
import type { Transaction } from '../../api/transactions'
import ExpensesFormModel from './ExpensesFormModel'
import { useState } from 'react'

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat('vi-VN')

function formatAmount(value: string | number | null) {
  if (value === null) return '—'
  return currencyFormatter.format(Number(value))
}

interface ExpensesTableProps { search?: string }

export default function ExpensesTable({ search = '' }: ExpensesTableProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const { data: transactions = [], isLoading, isError } = useTransactions(page, rowsPerPage)
  const filteredTransactions = transactions.filter((transaction) => {
    const query = search.trim().toLowerCase()
    if (!query) return true
    return [transaction.transaction_id, transaction.description, transaction.category.category_name, transaction.account_number]
      .some((value) => value?.toLowerCase().includes(query))
  })

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
  }

  if (isError) {
    return <Alert severity="error">Unable to load expenses. Please try again.</Alert>
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: '63vh',
        // minHeight: 420,
        borderRadius: 3,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
      <Table stickyHeader sx={{ tableLayout: 'fixed', width: '100%' }}>
        <colgroup>
          <col style={{ width: '20%' }} />
          <col style={{ width: '12%' }} />
          <col style={{ width: '12%' }} />
          <col style={{ width: '14%' }} />
          <col style={{ width: '24%' }} />
          <col style={{ width: '12%' }} />
          <col style={{ width: '6%' }} />
        </colgroup>
        <TableHead sx={{ backgroundColor: '#151b23' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, backgroundColor: '#151b23' }}>Transaction ID</TableCell>
            <TableCell align="right" sx={{ fontWeight: 700, backgroundColor: '#151b23' }}>Amount</TableCell>
            <TableCell align="right" sx={{ fontWeight: 700, backgroundColor: '#151b23' }}>Balance</TableCell>
            <TableCell sx={{ fontWeight: 700, backgroundColor: '#151b23' }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 700, backgroundColor: '#151b23' }}>Description</TableCell>
            <TableCell sx={{ fontWeight: 700, backgroundColor: '#151b23' }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 700, backgroundColor: '#151b23' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTransactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                <Typography color="text.secondary">No transactions found.</Typography>
              </TableCell>
            </TableRow>
          ) : filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id} hover>
              <TableCell title={transaction.transaction_id} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {transaction.transaction_id}
              </TableCell>
              <TableCell align="right" sx={{ color: transaction.transaction_type === 'DEBIT' ? 'error.main' : 'success.main', fontWeight: 600 }}>
                {formatAmount(transaction.amount)}
              </TableCell>
              <TableCell align="right">{formatAmount(transaction.balance)}</TableCell>
              <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {transaction.category.category_name || 'Unknown'}
              </TableCell>
              <TableCell
                title={transaction.description || transaction.transaction_id}
                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >
                {transaction.description || transaction.transaction_id}
              </TableCell>
              <TableCell>{dateFormatter.format(new Date(transaction.transaction_date))}</TableCell>
              <TableCell>
                <IconButton
                  aria-label={`Edit transaction ${transaction.transaction_id}`}
                  onClick={() => setSelectedTransaction(transaction)}
                  size="small"
                >
                  <EditRoundedIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Box>
      <TablePagination
        sx={{ flexShrink: 0 }}
        component="div"
        count={transactions.length === rowsPerPage ? (page + 2) * rowsPerPage : (page + 1) * rowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, nextPage) => {
          if (nextPage > page && transactions.length < rowsPerPage) return
          setPage(nextPage)
        }}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(Number(event.target.value))
          setPage(0)
        }}
        rowsPerPageOptions={[5, 10, 20, 50]}
      />
      <ExpensesFormModel transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />
    </TableContainer>
  )
}
