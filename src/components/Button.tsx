import CircularProgress from '@mui/material/CircularProgress'
import MuiButton, { type ButtonProps as MuiButtonProps } from '@mui/material/Button'

export type ButtonProps = MuiButtonProps & {
  loading?: boolean
}

function Button({ loading = false, disabled, children, ...props }: ButtonProps) {
  return (
    <MuiButton {...props} disabled={disabled || loading}>
      {loading ? <CircularProgress color="inherit" size={20} /> : children}
    </MuiButton>
  )
}

export default Button
