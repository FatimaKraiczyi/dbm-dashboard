import { Box, Typography, Avatar, Stack, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import DataTable from '../../components/DataTable';
import type { DataTableColumn } from '../../components/DataTable';
import { listClients } from '../../data/users';
import type { Client } from '../../data/users';

export default function Clientes() {
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await listClients();
        if (mounted) setClients(data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleOpen = (client: Client) => {
    setSelectedClient(client);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClient(null);
  };

  const columns = useMemo<DataTableColumn<Client>[]>(() => [
    {
      id: 'name',
      label: 'Nome',
      render: (client) => (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ width: 32, height: 32, fontSize: '12px' }}>
            {client.initials}
          </Avatar>
          <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>
            {client.name}
          </Typography>
        </Stack>
      ),
    },
    {
      id: 'email',
      label: 'E-mail',
      render: (client) => <Typography sx={{ fontSize: '14px' }}>{client.email}</Typography>,
    },
    {
      id: 'actions',
      label: ' ',
      width: 88,
      align: 'center',
      render: (client) => (
        <Stack direction="row" spacing={0.5} justifyContent="center">
          <IconButton size="small" sx={{ color: '#D03E3E' }}>
            <DeleteIcon sx={{ fontSize: 14 }} />
          </IconButton>
          <IconButton size="small" sx={{ color: '#1E2024' }} onClick={() => handleOpen(client)}>
            <EditIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Stack>
      ),
    },
  ], []);

  return (
    <Box sx={{ p: 6 }}>
      <Typography variant="h1" sx={{ color: 'primary.main', mb: 3 }}>
        Clientes
      </Typography>

      <DataTable columns={columns} data={clients} loading={loading} getRowKey={(client) => client.id} />

      {/* Client Detail Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#1E2024' }}>
              Cliente
            </Typography>
            <IconButton size="small" onClick={handleClose}>
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Stack spacing={3} alignItems="center">
            <Avatar sx={{ width: 60, height: 60, bgcolor: '#2E3DA3', fontSize: '20px' }}>
              {selectedClient?.initials}
            </Avatar>
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Box>
                <Typography sx={{ fontSize: '10px', fontWeight: 700, color: '#535964', textTransform: 'uppercase', mb: 0.5 }}>
                  Nome
                </Typography>
                <Typography sx={{ fontSize: '16px', color: '#1E2024' }}>
                  {selectedClient?.name}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '10px', fontWeight: 700, color: '#535964', textTransform: 'uppercase', mb: 0.5 }}>
                  e-mail
                </Typography>
                <Typography sx={{ fontSize: '16px', color: '#1E2024' }}>
                  {selectedClient?.email}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleClose}
            sx={{
              bgcolor: '#1E2024',
              color: '#F9FAFA',
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 400,
            }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
