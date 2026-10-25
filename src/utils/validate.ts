export interface ExpensesFormValues {
  description: string
  categoryId: string
}

export interface ExpensesFormErrors {
  description?: string
  categoryId?: string
}

export function validateExpensesForm(values: ExpensesFormValues): ExpensesFormErrors {
  const errors: ExpensesFormErrors = {}

  if (!values.description.trim()) errors.description = 'Description is required.'
  if (!values.categoryId) errors.categoryId = 'Category is required.'

  return errors
}

export interface CategoryFormErrors {
  name?: string
}

export function validateCategoryForm(name: string): CategoryFormErrors {
  if (!name.trim()) return { name: 'Name is required.' }
  return {}
}
