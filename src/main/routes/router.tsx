import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { makeClientsPage, makeMyTicketsPage, makeTicketDetailPage, makeTicketListPage } from '@/main/factories/pages'
import theme from '@/presentation/styles/theme'
import { App } from '@/presentation/components'
import { CurrentUserProvider } from '@/presentation/contexts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: makeTicketListPage() },
      { path: 'chamados', element: makeTicketListPage() },
      { path: 'chamados/:id', element: makeTicketDetailPage() },
      { path: 'clientes', element: makeClientsPage() },
      { path: 'meus-chamados', element: makeMyTicketsPage() },
    ],
  },
])


export function Router() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CurrentUserProvider>
        <RouterProvider router={router} />
      </CurrentUserProvider>
    </ThemeProvider>
  )
}
