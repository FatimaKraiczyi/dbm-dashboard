import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { makeClientsPage, makeTicketDetailPage, makeTicketListPage } from '@/main/factories/pages'
import theme from '@/presentation/styles/theme'
import { App } from '@/presentation/components'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: makeTicketListPage() },
      { path: 'chamados', element: makeTicketListPage() },
      { path: 'chamados/:id', element: makeTicketDetailPage() },
      { path: 'clientes', element: makeClientsPage() },
    ],
  },
])


export function Router() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
