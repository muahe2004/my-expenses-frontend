import { useEffect, useState } from 'react'
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { getCurrentUser, updateCurrentUser, type UserProfile, type UserProfileUpdate } from '../api/users'

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [form, setForm] = useState<UserProfileUpdate>({
    full_name: '',
    phone_number: '',
    address: '',
    bank_name: '',
    currency: 'VND',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    let active = true
    getCurrentUser()
      .then((user) => {
        if (!active) return
        setProfile(user)
        setForm({
          full_name: user.full_name ?? '',
          phone_number: user.phone_number ?? '',
          address: user.address ?? '',
          bank_name: user.bank_name ?? '',
          currency: user.currency ?? 'VND',
        })
      })
      .catch(() => {
        if (active) setError('Unable to load account information. Please try again.')
      })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  function updateField<K extends keyof UserProfileUpdate>(key: K, value: UserProfileUpdate[K]) {
    setForm((current) => ({ ...current, [key]: value }))
    setError('')
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      const user = await updateCurrentUser({
        full_name: form.full_name.trim(),
        phone_number: form.phone_number?.trim() || null,
        address: form.address?.trim() || null,
        bank_name: form.bank_name?.trim() || null,
        currency: form.currency,
      })
      setProfile(user)
      setForm({
        full_name: user.full_name ?? '',
        phone_number: user.phone_number ?? '',
        address: user.address ?? '',
        bank_name: user.bank_name ?? '',
        currency: user.currency ?? 'VND',
      })
      setEditing(false)
    } catch {
      setError('Unable to save your information. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  function handleCancel() {
    if (!profile) return
    setForm({
      full_name: profile.full_name ?? '',
      phone_number: profile.phone_number ?? '',
      address: profile.address ?? '',
      bank_name: profile.bank_name ?? '',
      currency: profile.currency ?? 'VND',
    })
    setError('')
    setEditing(false)
  }

  return (
    <Box sx={{ maxWidth: 760, mx: 'auto' }}>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
      ) : error && !profile ? (
        <Alert severity="error">{error}</Alert>
      ) : profile ? (
        <Box sx={{ border: '1px solid', borderColor: '#2e2e2e', borderRadius: 3, boxShadow: '0 8px 24px rgba(90, 90, 90, 0.28)', p: { xs: 2.5, sm: 4 } }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: '#2C67C5', color: '#fff', fontSize: 28, fontWeight: 700 }}>
              {profile.full_name.trim().charAt(0).toLocaleUpperCase('vi-VN') || '?'}
            </Avatar>
            <Box sx={{ minWidth: 0, flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{profile.full_name || 'Name not provided'}</Typography>
              <Typography color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>{profile.email}</Typography>
            </Box>
            {!editing && (
              <Button
                variant="outlined"
                startIcon={<EditRoundedIcon />}
                onClick={() => { setEditing(true); setError('') }}
                sx={{
                  color: '#fff',
                  borderColor: '#777',
                  '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
                }}
              >
                Edit
              </Button>
            )}
          </Stack>
          <Divider sx={{ mb: 3 }} />

          <Box component="form" onSubmit={handleSave}>
            <Stack spacing={2.5}>
              {error && <Alert severity="error">{error}</Alert>}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 2.5 }}>
                {editing ? (
                  <>
                    <TextField label="Full name" value={form.full_name} onChange={(event) => updateField('full_name', event.target.value)} required fullWidth />
                    <TextField label="Email" value={profile.email} type="email" disabled fullWidth />
                    <TextField label="Phone number" value={form.phone_number ?? ''} onChange={(event) => updateField('phone_number', event.target.value)} fullWidth />
                    <TextField label="Bank name" value={form.bank_name ?? ''} onChange={(event) => updateField('bank_name', event.target.value)} fullWidth />
                    <TextField label="Address" value={form.address ?? ''} onChange={(event) => updateField('address', event.target.value)} fullWidth sx={{ gridColumn: { xs: 'auto', sm: '1 / -1' } }} />
                    <TextField select label="Currency" value={form.currency} onChange={(event) => updateField('currency', event.target.value)} fullWidth>
                      <MenuItem value="VND">VND — Vietnamese đồng</MenuItem>
                      <MenuItem value="USD">USD — US dollar</MenuItem>
                      <MenuItem value="EUR">EUR — Euro</MenuItem>
                    </TextField>
                    <TextField label="Balance" value={`${Number(profile.balance).toLocaleString('en-US')} ${profile.currency}`} disabled fullWidth />
                  </>
                ) : (
                  <>
                    <ProfileValue label="Full name" value={profile.full_name} />
                    <ProfileValue label="Email" value={profile.email} />
                    <ProfileValue label="Phone number" value={profile.phone_number} />
                    <ProfileValue label="Bank name" value={profile.bank_name} />
                    <ProfileValue label="Address" value={profile.address} sx={{ gridColumn: { xs: 'auto', sm: '1 / -1' } }} />
                    <ProfileValue label="Currency" value={profile.currency} />
                    <ProfileValue label="Balance" value={`${Number(profile.balance).toLocaleString('en-US')} ${profile.currency}`} />
                  </>
                )}
              </Box>

              {editing && (
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" disabled={saving}>
                    {saving ? 'Saving...' : 'Save changes'}
                  </Button>
                </Stack>
              )}
            </Stack>
          </Box>
        </Box>
      ) : null}
    </Box>
  )
}

function ProfileValue({ label, value, sx }: { label: string; value: string | null | undefined; sx?: object }) {
  return (
    <Box sx={{ minHeight: 56, px: 1.75, py: 1, border: '1px solid', borderColor: '#494949', borderRadius: 1, ...sx }}>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Typography sx={{ overflowWrap: 'anywhere' }}>{value || 'Not provided'}</Typography>
    </Box>
  )
}
