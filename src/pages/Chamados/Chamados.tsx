import { Box, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { RemoveRedEye } from '@mui/icons-material';
import StatusBadge from '../../components/StatusBadge';
import DataTable from '../../components/DataTable';
import type { DataTableColumn } from '../../components/DataTable';
import { listTickets } from '../../data/tickets';
import type { Ticket } from '../../data/tickets';
import { useEffect, useState, useMemo } from 'react';

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

  const columns = useMemo<DataTableColumn<Ticket>[]>(() => [
    {
      id: 'date',
      label: 'Atualizado em',
      width: 132,
      render: (ticket) => (
        <Typography sx={{ fontSize: '12px' }}>
          {formatDate(ticket.date)}
        </Typography>
      ),
    },
    {
      id: 'id',
      label: 'Id',
      width: 64,
      render: (ticket) => (
        <Typography sx={{ fontSize: '12px', fontWeight: 700 }}>
          {ticket.id}
        </Typography>
      ),
    },
    {
      id: 'title',
      label: 'Título e Serviço',
      render: (ticket) => (
        <>
          <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>
            {ticket.title}
          </Typography>
          <Typography sx={{ fontSize: '12px' }}>
            {ticket.service}
          </Typography>
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
      render: (ticket) => (
        <Typography sx={{ fontSize: '14px' }}>
          {ticket.client.name}
        </Typography>
      ),
    },
    {
      id: 'technician',
      label: 'Técnico',
      width: 160,
      render: (ticket) => (
        <Typography sx={{ fontSize: '14px' }}>
          {ticket.technician.name}
        </Typography>
      ),
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
        <Link to={`/chamados/${ticket.id}`} style={{ textDecoration: 'none' }}>
          <IconButton size="small" sx={{ color: '#1E2024' }}>
            <RemoveRedEye sx={{ fontSize: 14 }} />
          </IconButton>
        </Link>
      ),
    },
  ], []);

  return (
    <Box sx={{ p: 6 }}>
      <Typography variant="h1" sx={{ color: 'primary.main', mb: 3 }}>
        Chamados
      </Typography>
      <DataTable columns={columns} data={tickets} loading={loading} getRowKey={(ticket) => ticket.id} />
    </Box>
  );
}
