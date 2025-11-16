import LaunchIcon from '@mui/icons-material/Launch';
import { Avatar, Box, Card, Divider, IconButton, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import type { Ticket, TicketStatus } from '@/domain/models';
import { StatusBadge } from '@/presentation/components';

const STATUS_LABELS: Record<TicketStatus, string> = {
  open: 'Aberto',
  progress: 'Em atendimento',
  done: 'Encerrado',
};

interface TechnicianTicketCardProps {
  ticket: Ticket;
}

export function TechnicianTicketCard({ ticket }: TechnicianTicketCardProps) {
  return (
    <Card
      component={Link}
      to={`/chamados/${ticket.id}`}
      sx={{
        p: 2.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        textDecoration: 'none',
        color: 'inherit',
        border: '1px solid #E3E5E8',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.2s ease',
        '&:hover': {
          boxShadow: '0px 6px 16px rgba(0,0,0,0.08)',
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack spacing={0.5}>
          <Typography sx={{ fontSize: '12px', color: '#8E95A2', fontWeight: 600 }}>{ticket.id}</Typography>
          <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#1E2024' }}>{ticket.title}</Typography>
          <Typography sx={{ fontSize: '13px', color: '#535964' }}>{ticket.service}</Typography>
        </Stack>
        <IconButton size="small" sx={{ bgcolor: '#F4F5F7' }}>
          <LaunchIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontSize: '13px', color: '#535964' }}>{new Date(ticket.createdAt).toLocaleString('pt-BR')}</Typography>
        <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#1E2024' }}>{ticket.value}</Typography>
      </Stack>

      <Divider />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ width: 32, height: 32, bgcolor: '#2E3DA3', fontSize: '12px' }}>{ticket.client.initials}</Avatar>
          <Box>
            <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#1E2024' }}>{ticket.client.name}</Typography>
            <Typography sx={{ fontSize: '12px', color: '#535964' }}>{ticket.client.email}</Typography>
          </Box>
        </Stack>
        <StatusBadge status={ticket.status} label={STATUS_LABELS[ticket.status]} />
      </Stack>
    </Card>
  );
}
