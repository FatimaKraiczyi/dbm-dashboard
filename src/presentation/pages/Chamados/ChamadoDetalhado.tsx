import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Avatar, Box, Button, CircularProgress, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Ticket } from '@/domain/models';
import { LoadTicketById } from '@/data/usecases';
import { InMemoryTicketRepository } from '@/infra/repositories';
import { StatusBadge } from '@/presentation/components';
import { formatDate } from '@/presentation/utils';

function parseValue(value: string): number {
  return parseFloat(value.replace('R$', '').replace('.', '').replace(',', '.').trim());
}

export default function ChamadoDetalhado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const repository = useMemo(() => new InMemoryTicketRepository(), []);
  const getTicket = useMemo(() => new LoadTicketById(repository), [repository]);

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!id) {
        if (mounted) setLoading(false);
        return;
      }

      try {
        const data = await getTicket.execute(id);
        if (mounted) {
          setTicket(data ?? null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [getTicket, id]);

  if (loading) {
    return (
      <Box sx={{ p: 6, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!ticket) {
    return (
      <Box sx={{ p: 6 }}>
        <Typography variant="h1" sx={{ color: 'primary.main', mb: 2 }}>
          Chamado não encontrado
        </Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/chamados')} sx={{ textTransform: 'none' }}>
          Voltar para chamados
        </Button>
      </Box>
    );
  }

  const additionalServices = ticket.additionalServices ?? [];
  const baseValue = parseValue(ticket.value);
  const additionalValue = additionalServices.reduce((sum, svc) => sum + parseValue(svc.value), 0);
  const totalValue = baseValue + additionalValue;

  return (
    <Box sx={{ p: 6 }}>
      <Stack direction="row" alignItems="flex-end" spacing={2} mb={3}>
        <Box flex={1}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/chamados')}
            sx={{
              color: '#535964',
              textTransform: 'none',
              fontSize: '12px',
              fontWeight: 700,
              mb: 1,
              p: 0,
            }}
          >
            Voltar
          </Button>
          <Typography variant="h1" sx={{ color: 'primary.main' }}>
            Chamado detalhado
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<CheckCircleIcon />}
            sx={{
              bgcolor: '#E3E5E8',
              color: '#1E2024',
              border: 'none',
              textTransform: 'none',
              px: 2,
            }}
          >
            Encerrar
          </Button>
          <Button
            variant="contained"
            startIcon={<ScheduleIcon />}
            sx={{
              bgcolor: '#1E2024',
              color: '#F9FAFA',
              textTransform: 'none',
              px: 2,
            }}
          >
            Iniciar atendimento
          </Button>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={3}>
        <Box sx={{ flex: 1, maxWidth: 480 }}>
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

          <Paper sx={{ p: 3, border: '1px solid #E3E5E8' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#858B99' }}>
                Serviços adicionais
              </Typography>
              <IconButton size="small" sx={{ bgcolor: '#1E2024', color: '#F9FAFA' }}>
                <AddIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Stack>

            {additionalServices.length > 0 ? (
              <Stack spacing={1}>
                {additionalServices.map((service, index) => (
                  <Box key={service.id}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#1E2024' }}>
                        {service.name}
                      </Typography>
                      <Typography sx={{ fontSize: '12px', color: '#1E2024' }}>{service.value}</Typography>
                      <IconButton size="small" sx={{ color: '#D03E3E' }}>
                        <DeleteIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Stack>
                    {index < additionalServices.length - 1 && <Divider sx={{ my: 1 }} />}
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography sx={{ fontSize: '12px', color: '#858B99', fontStyle: 'italic' }}>
                Nenhum serviço adicional
              </Typography>
            )}
          </Paper>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, border: '1px solid #E3E5E8' }}>
            <Stack spacing={3}>
              <Box>
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#858B99', mb: 1 }}>
                  Técnico responsável
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar sx={{ fontSize: '12px' }}>{ticket.technician.initials}</Avatar>
                  <Box flex={1}>
                    <Typography sx={{ fontSize: '14px', color: '#1E2024' }}>{ticket.technician.name}</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#535964' }}>{ticket.technician.email}</Typography>
                  </Box>
                </Stack>
              </Box>

              <Box>
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#858B99', mb: 1 }}>
                  Valores
                </Typography>
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontSize: '12px', color: '#1E2024' }}>Preço base</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#1E2024' }}>{ticket.value}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontSize: '12px', color: '#1E2024' }}>Adicionais</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#1E2024' }}>
                      {additionalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#1E2024' }}>Total</Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#1E2024' }}>
                      {totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
}
