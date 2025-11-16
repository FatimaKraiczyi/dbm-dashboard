import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { makeClientsPage, makeMyTicketsPage, makeTicketDetailPage, makeTicketListPage } from '@/main/factories/pages'
import theme from '@/presentation/styles/theme'
import { App } from '@/presentation/components'
import { CurrentUserProvider } from '@/presentation/contexts'
import { RoleHomeRedirect, RoleProtectedRoute } from '@/presentation/routes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <RoleHomeRedirect /> },
      {
        path: 'chamados',
        element: (
          <RoleProtectedRoute allowedRoles={['admin']}>
            {makeTicketListPage()}
          </RoleProtectedRoute>
        ),
      },
      {
        path: 'chamado/:id',
        element: (
          <RoleProtectedRoute allowedRoles={['admin', 'técnico']}>
            {makeTicketDetailPage()}
          </RoleProtectedRoute>
        ),
      },
      {
        path: 'clientes',
        element: (
          <RoleProtectedRoute allowedRoles={['admin']}>
            {makeClientsPage()}
          </RoleProtectedRoute>
        ),
      },
      {
        path: 'meus-chamados',
        element: (
          <RoleProtectedRoute allowedRoles={['técnico']}>
            {makeMyTicketsPage()}
          </RoleProtectedRoute>
        ),
      },
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
