import { apiClient } from './client'

export interface Category {
  id: string
  name: string
  type: 'income' | 'expense'
  status: 'active' | 'inactive'
}

export async function getCategories(type?: Category['type'], includeInactive = true): Promise<Category[]> {
  const response = await apiClient.get<{ items: Category[] }>('/categories', {
    params: {
      limit: 100,
      ...(type ? { type } : {}),
      ...(includeInactive ? {} : { status: 'active' }),
    },
  })
  return response.data.items
}
export type CategoryInput = Pick<Category, 'name' | 'type' | 'status'>
export async function createCategory(data: CategoryInput): Promise<Category> { const response = await apiClient.post<Category>('/categories', data); return response.data }
export async function updateCategory(id: string, data: CategoryInput): Promise<Category> { const response = await apiClient.patch<Category>(`/categories/${id}`, data); return response.data }
export async function deleteCategory(id: string): Promise<void> { await apiClient.delete(`/categories/${id}`) }
