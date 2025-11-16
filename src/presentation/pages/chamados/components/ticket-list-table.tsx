import { IconButton, Typography } from '@mui/material';
import { RemoveRedEye } from '@mui/icons-material';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Ticket } from '@/domain/models';
import { DataTable, StatusBadge, type DataTableColumn } from '@/presentation/components';
import { formatDate } from '@/presentation/utils';

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
          <Typography sx={{ fontSize: '12px' }}>{formatDate(ticket.date, true)}</Typography>
        ),
      },
      {
        id: 'id',
        label: 'Id',
        width: 64,
        render: (ticket) => (
          <Typography sx={{ fontSize: '12px', fontWeight: 700 }}>{ticket.id}</Typography>
        ),
      },
      {
        id: 'title',
        label: 'Título e Serviço',
        render: (ticket) => (
          <>
            <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>{ticket.title}</Typography>
            <Typography sx={{ fontSize: '12px' }}>{ticket.service}</Typography>
          </>
        ),
      },
      {
        id: 'value',
        label: 'Valor total',
        width: 104,
        render: (ticket) => <Typography sx={{ fontSize: '14px' }}>{ticket.value}</Typography>,
      },
      {
        id: 'client',
        label: 'Cliente',
        width: 160,
        render: (ticket) => <Typography sx={{ fontSize: '14px' }}>{ticket.client.name}</Typography>,
      },
      {
        id: 'technician',
        label: 'Técnico',
        width: 160,
        render: (ticket) => <Typography sx={{ fontSize: '14px' }}>{ticket.technician.name}</Typography>,
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
            <IconButton size="small" sx={{ color: '#1E2024' }}>
              <RemoveRedEye sx={{ fontSize: 14 }} />
            </IconButton>
          </Link>
        ),
      },
    ],
    [],
  );

  return <DataTable columns={columns} data={tickets} loading={loading} getRowKey={(ticket) => ticket.id} />;
}
