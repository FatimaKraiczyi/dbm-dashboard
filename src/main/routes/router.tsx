import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter, Route, Routes,  } from 'react-router-dom'
import { makeClientsPage as MakeClients, makeMyTicketsPage as MakeTicket, makeSignInPage as MakeSignIn, makeTicketDetailPage as MakeTicketDetail, makeTicketListPage as MakeListTicket } from '@/main/factories/pages'
import theme from '@/presentation/styles/theme'
import { SessionProvider } from '@/presentation/contexts'
import { PrivateRoute } from '@/presentation/pages/protected-route'

export function Router() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<MakeSignIn />} />
            <Route element={<PrivateRoute allowedRoles={['admin']} />}>
              <Route path="/chamados" element={<MakeListTicket />} />
              <Route path="/clientes" element={<MakeClients />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={['admin', 'técnico']} />}>
              <Route path="/chamado/:id" element={<MakeTicketDetail />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={[ 'técnico']} />}>
              <Route path="/meus-chamados" element={<MakeTicket />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </ThemeProvider>
  )
}
