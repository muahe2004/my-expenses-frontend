import { apiClient } from './client'

export const TRANSACTIONS_ENDPOINT = '/transactions'
export const SYNC_TRANSACTIONS_ENDPOINT = '/sync-transactions'

export interface CategoryStatistics {
  category_id: string | null
  name: string
  type: 'income' | 'expense' | null
  status: 'active' | 'inactive' | null
  count: number | null
  transactions: Transaction[] | null
}

export interface StatisticsData {
  start_date: string
  end_date: string
  total_expense: string
  total_income: string
  categories: CategoryStatistics[]
}

export interface StatisticsResponse {
  data: StatisticsData
}

export async function getTransactionStatistics(startDate: string, endDate: string): Promise<StatisticsResponse> {
  const response = await apiClient.get<StatisticsResponse>(`${TRANSACTIONS_ENDPOINT}/statistics`, {
    params: { start_date: startDate, end_date: endDate },
  })
  return response.data
}

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

export async function syncTransactions(startDate: string, endDate: string): Promise<unknown> {
  const response = await apiClient.post(SYNC_TRANSACTIONS_ENDPOINT, null, {
    params: { start_date: startDate, end_date: endDate },
  })
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
