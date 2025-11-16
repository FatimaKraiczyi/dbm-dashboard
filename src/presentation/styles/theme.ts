import { createTheme } from "@mui/material";

const designTokens = {
  colors: {
    grayscale: {
      100: "#151619", // darkest
      200: "#1E2024",
      300: "#535964",
      400: "#858B99",
      500: "#E3E5E8",
      600: "#F9FAFA", // lightest
    },
    blue: {
      light: "#8996EB",
      dark: "#2E3DA3",
    },
    feedback: {
      progress: "#355EC5",
      open: "#CC3D6A",
      done: "#508B26",
    },
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: designTokens.colors.blue.dark,
      light: designTokens.colors.blue.light,
    },
    secondary: {
      main: designTokens.colors.grayscale[500],
    },
    background: {
      default: designTokens.colors.grayscale[600],
      paper: designTokens.colors.grayscale[600],
    },
    text: {
      primary: designTokens.colors.grayscale[100],
      secondary: designTokens.colors.grayscale[300],
    },
    divider: designTokens.colors.grayscale[500],
    success: {
      main: designTokens.colors.feedback.done,
    },
    error: {
      main: designTokens.colors.feedback.open,
    },
    info: {
      main: designTokens.colors.feedback.progress,
    },
  },
  typography: {
    fontFamily: '"Lato", sans-serif',
    h1: {
      fontSize: "1.5rem", // 24px
      fontWeight: 700,
      lineHeight: "1.4",
      color: designTokens.colors.blue.dark,
    },
    h2: {
      fontSize: "1.25rem", // 20px
      fontWeight: 700,
      lineHeight: "1.4",
    },
    h3: {
      fontSize: "1rem", // 16px
      fontWeight: 700,
      lineHeight: "1.4",
      color: designTokens.colors.grayscale[100],
    },
    h4: {
      fontSize: "1rem", // 16px
      fontWeight: 400,
      lineHeight: "1.4",
      color: designTokens.colors.grayscale[200],
    },
    subtitle1: {
      fontSize: "0.875rem", // 14px
      fontWeight: 700,
      lineHeight: "1.4",
      color: designTokens.colors.grayscale[600],
    },
    subtitle2: {
      fontSize: "0.875rem", // 14px
      fontWeight: 400,
      lineHeight: "1.4",
      color: designTokens.colors.grayscale[600],
    },
    body1: {
      fontSize: "0.75rem", // 12px
      fontWeight: 700,
      lineHeight: "1.4",
    },
    body2: {
      fontSize: "0.75rem", // 12px
      fontWeight: 400,
      lineHeight: "1.4",
    },
    caption: {
      fontSize: "10px",
      fontWeight: 700,
      lineHeight: "1.4",
      textTransform: "uppercase",
      color: designTokens.colors.grayscale[400],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "5px",
          fontWeight: 700,
        },
        contained: {
          backgroundColor: designTokens.colors.grayscale[200],
          color: designTokens.colors.grayscale[600],
          "&:hover": {
            backgroundColor: designTokens.colors.grayscale[100],
          },
        },
        outlined: {
          borderColor: designTokens.colors.grayscale[500],
          color: designTokens.colors.grayscale[300],
          "&:hover": {
            backgroundColor: designTokens.colors.grayscale[600],
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: designTokens.colors.grayscale[600],
          border: `1px solid ${designTokens.colors.grayscale[500]}`,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "999px",
          fontWeight: 400,
          fontSize: "0.75rem", // 12px
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: designTokens.colors.grayscale[100],
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: designTokens.colors.blue.dark,
          color: designTokens.colors.grayscale[600],
          fontWeight: 700,
        },
      },
    },
  },
});

export default theme