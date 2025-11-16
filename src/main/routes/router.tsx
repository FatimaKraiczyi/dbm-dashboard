import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { makeClientsPage, makeMyTicketsPage, makeSignInPage, makeTicketDetailPage, makeTicketListPage } from '@/main/factories/pages'
import theme from '@/presentation/styles/theme'
import { AppProvider } from '@/presentation/contexts'
import { PrivateRoute, RoleHomeRedirect } from '@/presentation/pages/protected-route'

const router = createBrowserRouter([
  {
    path: '/signin',
    element: makeSignInPage(),
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <RoleHomeRedirect />,
      },
    ],
  },
  {
    element: <PrivateRoute allowedRoles={['admin']} />,
    children: [
      {
        path: '/chamados',
        element: makeTicketListPage(),
      },
      {
        path: '/clientes',
        element: makeClientsPage(),
      },
    ],
  },
  {
    element: <PrivateRoute allowedRoles={['admin', 'técnico']} />,
    children: [
      {
        path: '/chamado/:id',
        element: makeTicketDetailPage(),
      },
    ],
  },
  {
    element: <PrivateRoute allowedRoles={['técnico']} />,
    children: [
      {
        path: '/meus-chamados',
        element: makeMyTicketsPage(),
      },
    ],
  },
])


export function Router() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ThemeProvider>
  )
}
