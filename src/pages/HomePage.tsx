import { Alert, Box, Snackbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../components/Button'
import { ROUTES } from '../constants/routes'
import { API_URL, checkAuthentication } from '../auth/auth'

import googleIcon from '/google.png'


function App() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const oauthError = new URLSearchParams(window.location.search).get('error')

  useEffect(() => {
    if (oauthError) {
      window.history.replaceState({}, document.title, window.location.pathname)
      return
    }

    checkAuthentication().then((authenticated) => {
      if (authenticated) {
        navigate(ROUTES.dashboard, { replace: true })
      }
    })
  }, [navigate, oauthError])

  function handleGoogleLogin() {
    if (!API_URL) {
      setError('URL is not defined')
      return
    }

    window.location.assign(`${API_URL}/auth/google`)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
      }}
    >
      <Typography variant="h1">MY EXPENSES</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleGoogleLogin}
        startIcon={
          <img
            src={googleIcon}
            alt=""
            width={20}
            height={20}
          />
        }
      >
        Sign Up With Google
      </Button>
      <Snackbar
        open={Boolean(error || oauthError)}
        autoHideDuration={5000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default App;
