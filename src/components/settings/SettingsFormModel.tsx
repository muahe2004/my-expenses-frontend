import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import type { Category } from '../../api/categories'
import { categoriesQueryKey, useCreateCategory, useUpdateCategory } from '../../hooks/useCategories'
import { validateCategoryForm } from '../../utils/validate'

export default function SettingsFormModel({ category, open, onClose }: { category: Category | null; open: boolean; onClose: () => void }) {
  const client = useQueryClient()
  const create = useCreateCategory()
  const update = useUpdateCategory()
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState<string>()
  const [type, setType] = useState<Category['type']>('expense')
  const [status, setStatus] = useState<Category['status']>('active')

  // The dialog is reopened for a different record; reset its editable fields then.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setName(category?.name ?? '')
    setNameError(undefined)
    setType(category?.type ?? 'expense')
    setStatus(category?.status ?? 'active')
  }, [category, open])

  const submit = async () => {
    const errors = validateCategoryForm(name)
    setNameError(errors.name)
    if (Object.keys(errors).length > 0) return

    const data = { name: name.trim(), type, status }
    if (category) await update.mutateAsync({ id: category.id, data })
    else await create.mutateAsync(data)
    await client.invalidateQueries({ queryKey: categoriesQueryKey })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{category ? 'Edit category' : 'Add category'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            autoFocus
            label={<RequiredLabel>Name</RequiredLabel>}
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              if (nameError) setNameError(undefined)
            }}
            error={Boolean(nameError)}
            helperText={nameError}
            fullWidth
          />
          <FormControl component="fieldset">
            <ToggleButtonGroup exclusive value={type} onChange={(_, nextType: Category['type'] | null) => { if (nextType) setType(nextType) }} aria-label="Category type" fullWidth>
              <ToggleButton value="expense" aria-label="Expense category">Expense</ToggleButton>
              <ToggleButton value="income" aria-label="Income category">Income</ToggleButton>
            </ToggleButtonGroup>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="category-status-label">Status</InputLabel>
            <Select labelId="category-status-label" label="Status" value={status} onChange={(event) => setStatus(event.target.value as Category['status'])}>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          {(update.isError || create.isError) && <Alert severity="error">Unable to save category.</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={submit} variant="contained" disabled={update.isPending || create.isPending}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

function RequiredLabel({ children }: { children: string }) {
  return <>{children} <Typography component="span" color="error">*</Typography></>
}
