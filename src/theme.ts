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
    green: "#2e7d32",
    blue: "#2C67C5",
    borderColor: "#2e2e2e",
    inputBackground: "#1b1b1b",
    inputBorder: "#494949",
}

const theme = createTheme({
    palette: {
        background: {
            // for MUI component
            default: SPECIAL_COLORS.primary,
            // paper: '#FFFFFF',
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
        MuiCssBaseline: {
            styleOverrides: {
                // for body off web
                body: {
                    backgroundColor: SPECIAL_COLORS.primary,
                },
            },
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    backgroundColor: SPECIAL_COLORS.primary,
                    border: `1px solid ${SPECIAL_COLORS.borderColor}`,
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
                    borderBottom: `2px solid ${SPECIAL_COLORS.borderColor}`,
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: 'currentColor',
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: 'currentColor',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: SPECIAL_COLORS.primary,
                    border: `2px solid ${SPECIAL_COLORS.borderColor}`,
                    boxShadow: '0 8px 24px rgba(90, 90, 90, 0.28)',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: SPECIAL_COLORS.inputBackground,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: SPECIAL_COLORS.inputBorder,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: SPECIAL_COLORS.inputBorder,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: SPECIAL_COLORS.inputBorder,
                        borderWidth: '1px',
                    },
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: SPECIAL_COLORS.inputBackground,
                    '&:before': {
                        borderBottomColor: SPECIAL_COLORS.inputBorder,
                    },
                    '&:hover:before': {
                        borderBottomColor: SPECIAL_COLORS.inputBorder,
                    },
                    '&.Mui-focused:before': {
                        borderBottomColor: SPECIAL_COLORS.inputBorder,
                    },
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    backgroundColor: SPECIAL_COLORS.inputBackground,
                    '&:before': {
                        borderBottomColor: SPECIAL_COLORS.inputBorder,
                    },
                    '&:hover:before': {
                        borderBottomColor: SPECIAL_COLORS.inputBorder,
                    },
                    '&.Mui-focused:before': {
                        borderBottomColor: SPECIAL_COLORS.inputBorder,
                    },
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: SPECIAL_COLORS.primary,
                    color: SPECIAL_COLORS.white,
                    border: `2px solid ${SPECIAL_COLORS.borderColor}`,
                    boxShadow: '0 8px 24px rgba(90, 90, 90, 0.28)',
                    backgroundImage: 'none',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: SPECIAL_COLORS.third,
                    },
                    '&.Mui-selected': {
                        backgroundColor: SPECIAL_COLORS.third,
                    },
                    '&.Mui-selected:hover': {
                        backgroundColor: SPECIAL_COLORS.third,
                    },
                },
            },
        },
    }
})

export default theme
