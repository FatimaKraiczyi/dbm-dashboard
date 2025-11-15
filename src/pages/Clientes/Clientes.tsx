import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Stack, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
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

  return (
    <Box sx={{ p: 6 }}>
      <Typography variant="h1" sx={{ color: '#2E3DA3', mb: 3 }}>
        Clientes
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
                <TableCell>Nome</TableCell>
                <TableCell sx={{ width: 400 }}>E-mail</TableCell>
                <TableCell sx={{ width: 88, textAlign: 'center' }}>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#2E3DA3', fontSize: '12px' }}>
                        {client.initials}
                      </Avatar>
                      <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#1E2024' }}>
                        {client.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ fontSize: '14px', color: '#1E2024' }}>
                    {client.email}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                      <IconButton
                        size="small"
                        sx={{ bgcolor: '#E3E5E8', color: '#D03E3E' }}
                      >
                        <DeleteIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ bgcolor: '#E3E5E8', color: '#1E2024' }}
                        onClick={() => handleOpen(client)}
                      >
                        <EditIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

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
