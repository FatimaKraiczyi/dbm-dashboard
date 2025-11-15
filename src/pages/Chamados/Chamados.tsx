import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Stack, IconButton, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import StatusBadge from '../../components/StatusBadge';
import { listTickets } from '../../data/tickets';
import type { Ticket } from '../../data/tickets';
import { useEffect, useState } from 'react';

function formatDate(dateIso: string) {
  const d = new Date(dateIso);
  return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export default function Chamados() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await listTickets();
        if (mounted) setTickets(data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Box sx={{ p: 6 }}>
      <Typography variant="h1" sx={{ color: '#2E3DA3', mb: 3 }}>
        Chamados
      </Typography>
      {loading ? (
        <Stack alignItems="center" justifyContent="center" sx={{ height: 240 }}>
          <CircularProgress size={32} />
        </Stack>
      ) : (
        <TableContainer component={Paper} sx={{ border: '1px solid #E3E5E8' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#F9FAFA' }}>
                <TableCell sx={{ width: 112 }}>Atualizado em</TableCell>
                <TableCell sx={{ width: 64 }}>Id</TableCell>
                <TableCell>Título e Serviço</TableCell>
                <TableCell sx={{ width: 104 }}>Valor total</TableCell>
                <TableCell sx={{ width: 160 }}>Cliente</TableCell>
                <TableCell sx={{ width: 160 }}>Técnico</TableCell>
                <TableCell sx={{ width: 152 }}>Status</TableCell>
                <TableCell sx={{ width: 52, textAlign: 'center' }}>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell sx={{ fontSize: '12px', color: '#1E2024' }}>
                    {formatDate(ticket.date)}
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px', fontWeight: 700, color: '#1E2024' }}>
                    {ticket.id}
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#1E2024' }}>
                      {ticket.title}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: '#1E2024' }}>
                      {ticket.service}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: '14px', color: '#1E2024' }}>
                    {ticket.value}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar sx={{ width: 20, height: 20, bgcolor: '#2E3DA3', fontSize: '9px' }}>
                        {ticket.client.initials}
                      </Avatar>
                      <Typography sx={{ fontSize: '14px', color: '#1E2024' }}>
                        {ticket.client.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar sx={{ width: 20, height: 20, bgcolor: '#2E3DA3', fontSize: '9px' }}>
                        {ticket.technician.initials}
                      </Avatar>
                      <Typography sx={{ fontSize: '14px', color: '#1E2024' }}>
                        {ticket.technician.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={ticket.status} label={ticket.statusLabel} />
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Link to={`/chamados/${ticket.id}`} style={{ textDecoration: 'none' }}>
                      <IconButton size="small" sx={{ bgcolor: '#E3E5E8', color: '#1E2024' }}>
                        <EditIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
