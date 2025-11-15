import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './assets/styles/theme'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
