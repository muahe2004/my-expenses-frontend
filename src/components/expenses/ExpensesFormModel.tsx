import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { getCategories } from '../../api/categories'
import type { Transaction } from '../../api/transactions'
import { useUpdateTransaction } from '../../hooks/useTransactions'

interface Props { transaction: Transaction | null; onClose: () => void }

export default function ExpensesFormModel({ transaction, onClose }: Props) {
  const queryClient = useQueryClient()
  const update = useUpdateTransaction()
  const categories = useQuery({ queryKey: ['categories'], queryFn: () => getCategories(undefined, false) })
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')

  useEffect(() => {
    setDescription(transaction?.description ?? '')
    setCategoryId(transaction?.category.category_id ?? '')
  }, [transaction])

  const handleSubmit = async () => {
    if (!transaction) return
    await update.mutateAsync({ id: transaction.id, data: { description: description || null, category_id: categoryId || null } })
    await queryClient.invalidateQueries({ queryKey: ['transactions'] })
    onClose()
  }

  return <Dialog open={Boolean(transaction)} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>Edit transaction</DialogTitle>
    <DialogContent>
      <Stack spacing={2} sx={{ pt: 1 }}>
        <TextField label="Transaction ID" value={transaction?.transaction_id ?? ''} disabled fullWidth />
        <TextField label="Amount" value={transaction?.amount ?? ''} disabled fullWidth />
        <TextField label="Balance" value={transaction?.balance ?? '—'} disabled fullWidth />
        <TextField label="Transaction date" value={transaction?.transaction_date ?? ''} disabled fullWidth />
        <TextField label="Description" value={description} onChange={(event) => setDescription(event.target.value)} fullWidth />
        <FormControl fullWidth>
          <InputLabel id="transaction-category-label">Category</InputLabel>
          <Select labelId="transaction-category-label" label="Category" value={categoryId} onChange={(event) => setCategoryId(event.target.value)} disabled={categories.isLoading}>
            <MenuItem value=""><em>Unknown</em></MenuItem>
            {categories.data?.map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
          </Select>
        </FormControl>
        {categories.isError && <Alert severity="warning">Unable to load categories.</Alert>}
        {update.isError && <Alert severity="error">Unable to save changes.</Alert>}
      </Stack>
    </DialogContent>
    <DialogActions><Button onClick={onClose}>Cancel</Button><Button onClick={handleSubmit} variant="contained" disabled={update.isPending}>Save</Button></DialogActions>
  </Dialog>
}
