import { useMutation, useQuery } from '@tanstack/react-query'
import { getTransactions, syncTransactions, updateTransaction, type TransactionUpdate } from '../api/transactions'

export function useTransactions(page = 0, pageSize = 10) {
  return useQuery({
    queryKey: ['transactions', page, pageSize],
    queryFn: () => getTransactions(page * pageSize, pageSize),
  })
}

export function useUpdateTransaction() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TransactionUpdate }) => updateTransaction(id, data),
  })
}

export function useSyncTransactions() {
  return useMutation({ mutationFn: syncTransactions })
}
