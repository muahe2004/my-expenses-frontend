import { useState } from 'react'
import { Alert, Box, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import type { Category } from '../../api/categories'
import { useCategories, useDeleteCategory } from '../../hooks/useCategories'
import SettingsFormModel from './SettingsFormModel'

export default function SettingsTable({ search = '' }: { search?: string }) {
  const [selected, setSelected] = useState<Category | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const categories = useCategories()
  const remove = useDeleteCategory()
  const filteredCategories = (categories.data ?? []).filter((category) => {
    const query = search.trim().toLowerCase()
    return !query || category.name.toLowerCase().includes(query) || category.type.toLowerCase().includes(query) || category.status.toLowerCase().includes(query)
  })

  if (categories.isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
  if (categories.isError) return <Alert severity="error">Unable to load categories. Please try again.</Alert>

  const visibleCategories = filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  return (
    <TableContainer component={Paper} sx={{ maxHeight: '63vh', borderRadius: 3, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
        <Table stickyHeader sx={{ tableLayout: 'fixed', width: '100%' }}>
          <colgroup><col style={{ width: '43%' }} /><col style={{ width: '20%' }} /><col style={{ width: '20%' }} /><col style={{ width: '17%' }} /></colgroup>
          <TableHead sx={{ backgroundColor: '#151b23' }}><TableRow>
            <TableCell sx={{ fontWeight: 700, backgroundColor: '#151b23' }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 700, backgroundColor: '#151b23' }}>Type</TableCell>
            <TableCell sx={{ fontWeight: 700, backgroundColor: '#151b23' }}>Status</TableCell>
            <TableCell align="right" sx={{ fontWeight: 700, backgroundColor: '#151b23' }}>Actions</TableCell>
          </TableRow></TableHead>
          <TableBody>{visibleCategories.length === 0 ? <TableRow><TableCell colSpan={4} align="center" sx={{ py: 6 }}><Typography color="text.secondary">No categories found.</Typography></TableCell></TableRow> : visibleCategories.map((category) => <TableRow key={category.id} hover>
            <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={category.name}>{category.name}</TableCell>
            <TableCell sx={{ textTransform: 'capitalize' }}>{category.type}</TableCell>
            <TableCell sx={{ textTransform: 'capitalize' }}>{category.status}</TableCell>
            <TableCell align="right"><IconButton aria-label={`Edit category ${category.name}`} onClick={() => setSelected(category)} size="small" sx={{ color: 'text.primary' }}><EditRoundedIcon fontSize="small" /></IconButton><IconButton aria-label={`Delete category ${category.name}`} size="small" color="error" disabled={remove.isPending} onClick={() => { if (window.confirm(`Delete ${category.name}?`)) remove.mutate(category.id) }}><DeleteRoundedIcon fontSize="small" /></IconButton></TableCell>
          </TableRow>)}</TableBody>
        </Table>
      </Box>
      <TablePagination sx={{ flexShrink: 0 }} component="div" count={filteredCategories.length} page={page} rowsPerPage={rowsPerPage} onPageChange={(_, nextPage) => setPage(nextPage)} onRowsPerPageChange={(event) => { setRowsPerPage(Number(event.target.value)); setPage(0) }} rowsPerPageOptions={[5, 10, 20, 50]} />
      <SettingsFormModel category={selected} open={Boolean(selected)} onClose={() => setSelected(null)} />
    </TableContainer>
  )
}
