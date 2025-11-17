import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Avatar, Box, Button, Card, Divider, IconButton, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import type { Ticket, TicketStatus } from '@/domain/models';
import { StatusBadge } from '@/presentation/components';
import { EditOutlined } from '@mui/icons-material';

const STATUS_LABELS: Record<TicketStatus, string> = {
  open: 'Aberto',
  progress: 'Em atendimento',
  done: 'Encerrado',
};

type ActionIconComponent = typeof ScheduleIcon;

interface StatusActionConfig {
  label: string;
  nextStatus?: TicketStatus;
  icon: ActionIconComponent;
}

const STATUS_ACTIONS: Record<TicketStatus, StatusActionConfig> = {
  open: { label: 'Iniciar', nextStatus: 'progress', icon: ScheduleIcon },
  progress: { label: 'Encerrar', nextStatus: 'done', icon: CheckCircleIcon },
  done: { label: 'Encerrado', icon: CheckCircleIcon },
};

interface TechnicianTicketCardProps {
  ticket: Ticket;
  onChangeStatus?: (ticketId: string, nextStatus: TicketStatus) => void | Promise<void>;
  changing?: boolean;
}

export function TechnicianTicketCard({ ticket, onChangeStatus, changing = false }: TechnicianTicketCardProps) {
  const actionConfig = STATUS_ACTIONS[ticket.status];
  const ActionIcon = actionConfig.icon;
  const variantConfig = ticket.status === 'progress' ? 'outlined' : 'contained';
  const actionDisabled = !actionConfig.nextStatus || !onChangeStatus || changing;

  return (
    <Card
      sx={{
        p: 2.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        border: '1px solid #E3E5E8',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.2s ease',
        position: 'relative',
        '&:hover': {
          boxShadow: '0px 6px 16px rgba(0,0,0,0.08)',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        <IconButton
          component={Link}
          to={`/chamado/${ticket.id}`}
          size="small"
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1,  
            bgcolor: (theme) => theme.palette.grey[500],
            color: (theme) => theme.palette.grey[300],
          }}
        >
          <EditOutlined sx={{ fontSize: 16 }} />
        </IconButton>
        <Button
          variant={variantConfig}
          onClick={() => actionConfig.nextStatus && onChangeStatus?.(ticket.id, actionConfig.nextStatus)}
          disabled={actionDisabled}
          startIcon={<ActionIcon sx={{ fontSize: 14 }} />}
          sx={{
            fontSize: '12px',
            bgcolor: variantConfig === 'outlined' ? '#E3E5E8' : '#1E2024',
            color: variantConfig === 'outlined' ? '#1E2024' : '#F9FAFA',
          }}
        >
          {actionConfig.label}
        </Button>
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack spacing={0.5}>
          <Typography variant='body1' sx={{ color: '#8E95A2' }}>{ticket.id}</Typography>
          <Typography variant='h3'>{ticket.title}</Typography>
          <Typography variant='body2' sx={{ color: '#535964' }}>{ticket.service}</Typography>
        </Stack>
        <Box sx={{ width: 32, height: 32 }} />
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant='body2' sx={{ color: '#535964' }}>{new Date(ticket.createdAt).toLocaleString('pt-BR')}</Typography>
        <Typography variant='body1' sx={{ color: '#1E2024' }}>{ticket.value}</Typography>
      </Stack>

      <Divider />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ width: 32, height: 32, fontSize: '12px' }}>{ticket.client.initials}</Avatar>
          <Box>
            <Typography variant='body1' sx={{ color: '#1E2024' }}>{ticket.client.name}</Typography>
            <Typography variant='body2' sx={{ color: '#535964' }}>{ticket.client.email}</Typography>
          </Box>
        </Stack>
        <StatusBadge status={ticket.status} label={STATUS_LABELS[ticket.status]} />
      </Stack>
    </Card>
  );
}
