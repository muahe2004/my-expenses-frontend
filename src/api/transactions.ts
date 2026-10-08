import { apiClient } from './client'

export const TRANSACTIONS_ENDPOINT = '/transactions'
export const SYNC_TRANSACTIONS_ENDPOINT = '/sync-transactions'

export type TransactionType = 'DEBIT' | 'CREDIT'

export interface Transaction {
  id: string
  transaction_id: string
  category: {
    category_id: string | null
    category_name: string | null
  }
  account_number: string | null
  transaction_type: TransactionType
  amount: string | number
  balance: string | number | null
  description: string | null
  transaction_date: string
  user_id: string
}

export async function getTransactions(skip = 0, limit = 10): Promise<Transaction[]> {
  const response = await apiClient.get<Transaction[]>(TRANSACTIONS_ENDPOINT, { params: { skip, limit } })
  return response.data
}

export async function syncTransactions(): Promise<unknown> {
  const response = await apiClient.post(SYNC_TRANSACTIONS_ENDPOINT)
  return response.data
}

export interface TransactionUpdate {
  category_id: string | null
  description: string | null
}

export async function updateTransaction(id: string, data: TransactionUpdate): Promise<Transaction> {
  const response = await apiClient.patch<Transaction>(`${TRANSACTIONS_ENDPOINT}/${id}`, data)
  return response.data
}
