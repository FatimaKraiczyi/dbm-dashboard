import { Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import type { Ticket } from '@/domain/models';
import { StatusBadge } from '@/presentation/components';
import { formatDate } from '@/presentation/utils';

interface TicketMainCardProps {
  ticket: Ticket;
}

export function TicketMainCard({ ticket }: TicketMainCardProps) {
  return (
    <Paper sx={{ p: 3, mb: 3, border: '1px solid #E3E5E8' }}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: '12px', fontWeight: 700, color: 'text.secondary' }}>{ticket.id}</Typography>
          <StatusBadge status={ticket.status} label={ticket.statusLabel} />
        </Stack>

        <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#1E2024' }}>
          {ticket.title}
        </Typography>

        <Box>
          <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#858B99', mb: 0.5 }}>
            Descrição
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#1E2024' }}>{ticket.description}</Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#858B99', mb: 0.5 }}>
            Categoria
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#1E2024' }}>{ticket.service}</Typography>
        </Box>

        <Stack direction="row" spacing={4}>
          <Box flex={1}>
            <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#858B99', mb: 0.5 }}>
              Criado em
            </Typography>
            <Typography sx={{ fontSize: '12px', color: '#1E2024' }}>{formatDate(ticket.createdAt, true)}</Typography>
          </Box>
          <Box flex={1}>
            <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#858B99', mb: 0.5 }}>
              Atualizado em
            </Typography>
            <Typography sx={{ fontSize: '12px', color: '#1E2024' }}>{formatDate(ticket.date, true)}</Typography>
          </Box>
        </Stack>

        <Box>
          <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#858B99', mb: 1 }}>
            Cliente
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar sx={{ width: 24, height: 24, fontSize: '9px' }}>{ticket.client.initials}</Avatar>
            <Typography sx={{ fontSize: '14px', color: '#1E2024' }}>{ticket.client.name}</Typography>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
