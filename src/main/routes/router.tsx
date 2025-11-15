import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { TicketProvider } from '@/presentation/contexts'
import Chamados from '@/presentation/pages/Chamados/Chamados'
import ChamadoDetalhado from '@/presentation/pages/Chamados/ChamadoDetalhado'
import Clientes from '@/presentation/pages/Clientes/Clientes'
import theme from '@/presentation/styles/theme'
import { AppLayout } from '../../presentation/pages/app-layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Chamados /> },
      { path: 'chamados', element: <Chamados /> },
      { path: 'chamados/:id', element: <ChamadoDetalhado /> },
      { path: 'clientes', element: <Clientes /> },
    ],
  },
])


export function Router() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TicketProvider>
        <RouterProvider router={router} />
      </TicketProvider>
    </ThemeProvider>
  )
}
