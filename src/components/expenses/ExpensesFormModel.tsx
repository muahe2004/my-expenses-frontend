import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { getCategories } from '../../api/categories'
import type { Transaction } from '../../api/transactions'
import { useUpdateTransaction } from '../../hooks/useTransactions'
import { validateExpensesForm } from '../../utils/validate'

interface Props { transaction: Transaction | null; onClose: () => void }

export default function ExpensesFormModel({ transaction, onClose }: Props) {
  const queryClient = useQueryClient()
  const update = useUpdateTransaction()
  const categories = useQuery({ queryKey: ['categories'], queryFn: () => getCategories(undefined, false) })
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [errors, setErrors] = useState<{ description?: string; categoryId?: string }>({})

  useEffect(() => {
    setDescription(transaction?.description ?? '')
    setCategoryId(transaction?.category.category_id ?? '')
    setErrors({})
  }, [transaction])

  const handleSubmit = async () => {
    if (!transaction) return
    const validationErrors = validateExpensesForm({ description, categoryId })
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

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
        <TextField label={<RequiredLabel>Description</RequiredLabel>} value={description} onChange={(event) => { setDescription(event.target.value); setErrors((current) => ({ ...current, description: undefined })) }} error={Boolean(errors.description)} helperText={errors.description} fullWidth />
        <FormControl fullWidth error={Boolean(errors.categoryId)}>
          <InputLabel id="transaction-category-label"><RequiredLabel>Category</RequiredLabel></InputLabel>
          <Select labelId="transaction-category-label" label="Category" value={categoryId} onChange={(event) => { setCategoryId(event.target.value); setErrors((current) => ({ ...current, categoryId: undefined })) }} disabled={categories.isLoading}>
            <MenuItem value=""><em>Unknown</em></MenuItem>
            {categories.data?.map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
          </Select>
          {errors.categoryId && <FormHelperText>{errors.categoryId}</FormHelperText>}
        </FormControl>
        {categories.isError && <Alert severity="warning">Unable to load categories.</Alert>}
        {update.isError && <Alert severity="error">Unable to save changes.</Alert>}
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onClose}
        variant="outlined"
      >
        Cancel
      </Button>
      <Button onClick={handleSubmit} variant="contained" disabled={update.isPending}>Save</Button>
    </DialogActions>
  </Dialog>
}

function RequiredLabel({ children }: { children: string }) {
  return <>{children} <Typography component="span" color="error">*</Typography></>
}
