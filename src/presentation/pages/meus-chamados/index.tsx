import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import type { Ticket, TicketStatus } from '@/domain/models';
import type { ListTickets, UpdateTicketStatus } from '@/domain/usecases/chamados';
import { PageHeader } from '@/presentation/components';
import { useCurrentUser } from '@/presentation/contexts';
import { useTicketList } from '@/presentation/hooks/chamados';
import { TechnicianTicketCard } from './components';

interface MeusChamadosPageProps {
  listTickets: ListTickets;
  changeStatus: UpdateTicketStatus;
}

const statusSections = [
  { key: 'progress', label: 'Em atendimento', description: 'Chamados em execução' },
  { key: 'open', label: 'Aberto', description: 'Chamados aguardando início' },
  { key: 'done', label: 'Encerrado', description: 'Chamados concluídos' },
] as const;

type StatusKey = (typeof statusSections)[number]['key'];

type TicketsByStatus = Record<StatusKey, Ticket[]>;

export function MeusChamadosPage({ listTickets, changeStatus }: MeusChamadosPageProps) {
  const { user } = useCurrentUser();
  const { tickets, loading, error, reload } = useTicketList(listTickets);
  const [actionError, setActionError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const groupedTickets = useMemo(() => {
    const initial: TicketsByStatus = { open: [], progress: [], done: [] };
    if (!user) {
      return initial;
    }

    const technicianTickets = tickets.filter((ticket) => ticket.technician.email === user.email);

    return technicianTickets.reduce<TicketsByStatus>((acc, ticket) => {
      acc[ticket.status].push(ticket);
      return acc;
    }, initial);
  }, [tickets, user]);

  const handleStatusChange = useCallback(
    async (ticketId: string, nextStatus: TicketStatus) => {
      setActionError(null);
      setUpdatingId(ticketId);
      try {
        await changeStatus.execute({ id: ticketId, status: nextStatus });
        await reload();
      } catch (err) {
        setActionError(err instanceof Error ? err.message : 'Não foi possível atualizar o chamado.');
      } finally {
        setUpdatingId(null);
      }
    },
    [changeStatus, reload],
  );

  if (loading) {
    return (
      <Box sx={{ p: 6, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ p: 6 }}>
      <PageHeader title="Meus chamados" />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {actionError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {actionError}
        </Alert>
      )}

      <Stack spacing={3}>
        {statusSections.map(({ key, label, description }) => {
          const ticketsByStatus = groupedTickets[key];
          return (
            <Box key={key}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                  <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>{label}</Typography>
                  <Typography sx={{ fontSize: '13px', color: '#535964' }}>{description}</Typography>
                </Box>
                <Typography sx={{ fontSize: '12px', color: '#8E95A2' }}>
                  {ticketsByStatus.length} chamados
                </Typography>
              </Stack>
              {ticketsByStatus.length > 0 ? (
                <Box
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: {
                      xs: '1fr',
                      md: 'repeat(2, minmax(0, 1fr))',
                      lg: 'repeat(3, minmax(0, 1fr))',
                    },
                  }}
                >
                  {ticketsByStatus.map((ticket) => (
                    <TechnicianTicketCard
                      key={ticket.id}
                      ticket={ticket}
                      onChangeStatus={handleStatusChange}
                      changing={updatingId === ticket.id}
                    />
                  ))}
                </Box>
              ) : (
                <Typography sx={{ fontSize: '13px', color: '#8E95A2' }}>
                  Nenhum chamado {label.toLowerCase()}
                </Typography>
              )}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
