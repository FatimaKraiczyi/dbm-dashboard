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
          <Typography variant='body1' sx={{ color: 'text.secondary' }}>{ticket.id}</Typography>
          <StatusBadge status={ticket.status} label={ticket.statusLabel} />
        </Stack>

        <Typography variant='h3'>
          {ticket.title}
        </Typography>

        <Box>
          <Typography sx={{ color: '#858B99', mb: 0.5 }} variant='body1'>
            Descrição
          </Typography>
          <Typography sx={{ color: '#1E2024' }} variant='subtitle2'>{ticket.description}</Typography>
        </Box>

        <Box>
          <Typography variant='body1' sx={{ color: '#858B99', mb: 0.5 }}>
            Categoria
          </Typography>
          <Typography sx={{ color: '#1E2024' }} variant='subtitle2'>{ticket.service}</Typography>
        </Box>

        <Stack direction="row" spacing={4}>
          <Box flex={1}>
            <Typography sx={{ color: '#858B99', mb: 0.5 }} variant='body1'>
              Criado em
            </Typography>
            <Typography sx={{ color: '#1E2024' }} variant='subtitle2'>{formatDate(ticket.createdAt, true)}</Typography>
          </Box>
          <Box flex={1}>
            <Typography sx={{ color: '#858B99', mb: 0.5 }} variant='body1'>
              Atualizado em
            </Typography>
            <Typography sx={{ color: '#1E2024' }} variant='subtitle2'>{formatDate(ticket.date, true)}</Typography>
          </Box>
        </Stack>

        <Box>
          <Typography sx={{ color: '#858B99', mb: 1 }} variant='body1'>
            Cliente
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar>{ticket.client.initials}</Avatar>
            <Typography sx={{ color: '#1E2024' }} variant='subtitle2'>{ticket.client.name}</Typography>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
