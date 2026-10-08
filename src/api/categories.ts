import { apiClient } from './client'

export interface Category {
  id: string
  name: string
  status: 'active' | 'inactive'
}

export async function getCategories(): Promise<Category[]> {
  const response = await apiClient.get<{ items: Category[] }>('/categories', {
    params: { limit: 100, status: 'active' },
  })
  return response.data.items
}
