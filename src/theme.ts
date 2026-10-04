import { createTheme } from '@mui/material/styles'

export const BREAK_POINTS = {

}

export const SPECIAL_COLORS = {
    primary: "#000000",
    secondary: "#212121",
    white: '#FFFFFF',
    red: '#EE5F5F',
}

const theme = createTheme({
    palette: {
        background: {
            default: SPECIAL_COLORS.secondary,
            paper: '#FFFFFF',
        },
        primary: {
            main: SPECIAL_COLORS.primary,
            contrastText: SPECIAL_COLORS.white,
        },
        secondary: {
            main: SPECIAL_COLORS.secondary,
            contrastText: SPECIAL_COLORS.white,
        },
        error: {
            main: SPECIAL_COLORS.red,
            contrastText: SPECIAL_COLORS.white,
        },
        text: {
            primary: SPECIAL_COLORS.white,
            disabled: '#999999',
        },
    },
    typography: {
        fontFamily: 'Noto Sans, sans-serif',
        fontSize: 14,
        fontWeightRegular: 400,
        
        h1: {
            fontSize: 48,
            // [`@media (max-width:780px)`]: {
            //     fontSize: 40,
            // },
            fontWeight: 900,
            lineHeight: 65 / 48,
        }
    }
})

export default theme