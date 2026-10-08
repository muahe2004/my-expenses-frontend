import { createTheme } from '@mui/material/styles'

export const BREAK_POINTS = {

}

export const SPECIAL_COLORS = {
    primary: "#000000",
    secondary: "#212121",
    third: "#151b23",
    actionColor: "#2C67C5",
    white: '#FFFFFF',
    red: '#EE5F5F',
    borderColor: "#2e2e2e"
}

const theme = createTheme({
    palette: {
        background: {
            default: SPECIAL_COLORS.primary,
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
    },
    components: {
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    backgroundColor: SPECIAL_COLORS.secondary,
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: '#151b23',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: `1px solid ${SPECIAL_COLORS.borderColor}`,
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: SPECIAL_COLORS.actionColor,
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: SPECIAL_COLORS.primary,
                    border: `1px solid ${SPECIAL_COLORS.borderColor}`,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: SPECIAL_COLORS.secondary,
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: SPECIAL_COLORS.secondary,
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    backgroundColor: SPECIAL_COLORS.secondary,
                },
            },
        },
    }
})

export default theme
