import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCategory, deleteCategory, getCategories, updateCategory, type Category, type CategoryInput } from '../api/categories'
export const categoriesQueryKey = ['categories']
export function useCategories(type?: Category['type']) {
  return useQuery({
    queryKey: [...categoriesQueryKey, type],
    queryFn: () => getCategories(type),
  })
}
export function useCreateCategory() { return useMutation({ mutationFn: (data: CategoryInput) => createCategory(data) }) }
export function useUpdateCategory() { return useMutation({ mutationFn: ({ id, data }: { id: string; data: CategoryInput }) => updateCategory(id, data) }) }
export function useDeleteCategory() { const client = useQueryClient(); return useMutation({ mutationFn: (id: string) => deleteCategory(id), onSuccess: () => client.invalidateQueries({ queryKey: categoriesQueryKey }) }) }
