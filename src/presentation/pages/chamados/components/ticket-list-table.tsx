import { IconButton, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Ticket } from '@/domain/models';
import { DataTable, StatusBadge, type DataTableColumn } from '@/presentation/components';
import { formatDate } from '@/presentation/utils';
import { EditOutlined } from '@mui/icons-material';

interface TicketListTableProps {
  tickets: Ticket[];
  loading: boolean;
}

export function TicketListTable({ tickets, loading }: TicketListTableProps) {
  const columns = useMemo<DataTableColumn<Ticket>[]>(
    () => [
      {
        id: 'date',
        label: 'Atualizado em',
        width: 132,
        render: (ticket) => (
          <Typography variant='body2' sx={{color: '#1E2024'}}>{formatDate(ticket.date, true)}</Typography>
        ),
      },
      {
        id: 'id',
        label: 'Id',
        width: 64,
        render: (ticket) => (
          <Typography variant='body1'>{ticket.id}</Typography>
        ),
      },
      {
        id: 'title',
        label: 'Título e Serviço',
        render: (ticket) => (
          <>
            <Typography variant='subtitle1' sx={{color: '#1E2024'}}>{ticket.title}</Typography>
            <Typography variant='body2' sx={{color: '#1E2024'}}>{ticket.service}</Typography>
          </>
        ),
      },
      {
        id: 'value',
        label: 'Valor total',
        width: 104,
        render: (ticket) => <Typography variant='subtitle2' sx={{color: '#1E2024'}}>{ticket.value}</Typography>,
      },
      {
        id: 'client',
        label: 'Cliente',
        width: 160,
        render: (ticket) => <Typography  variant='subtitle2' sx={{color: '#1E2024'}}>{ticket.client.name}</Typography>,
      },
      {
        id: 'technician',
        label: 'Técnico',
        width: 160,
        render: (ticket) => <Typography variant='subtitle2' sx={{color: '#1E2024'}}>{ticket.technician.name}</Typography>,
      },
      {
        id: 'status',
        label: 'Status',
        width: 152,
        align: 'center',
        render: (ticket) => <StatusBadge status={ticket.status} label={ticket.statusLabel} />,
      },
      {
        id: 'action',
        label: '',
        width: 52,
        align: 'center',
        render: (ticket) => (
          <Link to={`/chamado/${ticket.id}`} style={{ textDecoration: 'none' }}>
            <IconButton size="small" sx={{ color: '#535964' }}>
              <EditOutlined sx={{ fontSize: 16 }} />
            </IconButton>
          </Link>
        ),
      },
    ],
    [],
  );

  return <DataTable columns={columns} data={tickets} loading={loading} getRowKey={(ticket) => ticket.id} />;
}
