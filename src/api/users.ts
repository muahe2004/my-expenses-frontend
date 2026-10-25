import { apiClient } from './client'

export const CURRENT_USER_ENDPOINT = '/users/me'

export interface UserProfile {
  id: string
  full_name: string
  email: string
  google_id: string | null
  phone_number: string | null
  address: string | null
  bank_name: string | null
  balance: string
  currency: string
  status: string
  created_at: string
  updated_at: string
}

export type UserProfileUpdate = Pick<UserProfile, 'full_name' | 'phone_number' | 'address' | 'bank_name' | 'currency'>

export async function getCurrentUser(): Promise<UserProfile> {
  const response = await apiClient.get<UserProfile>(CURRENT_USER_ENDPOINT)
  return response.data
}

export async function updateCurrentUser(data: UserProfileUpdate): Promise<UserProfile> {
  const response = await apiClient.patch<UserProfile>(CURRENT_USER_ENDPOINT, data)
  return response.data
}
