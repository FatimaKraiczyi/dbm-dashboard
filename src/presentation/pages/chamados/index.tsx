import { Alert, Box } from '@mui/material';
import type { ListTickets } from '@/domain/usecases/chamados';
import { PageHeader } from '@/presentation/components';
import { useTicketList } from '@/presentation/hooks';
import { TicketListTable } from './components';

interface ChamadosPageProps {
  listTickets: ListTickets;
}

export function ChamadosPage({ listTickets }: ChamadosPageProps) {
  const { tickets, loading, error } = useTicketList(listTickets);

  return (
    <Box sx={{ p: 6 }}>
      <PageHeader title="Chamados" />
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <TicketListTable tickets={tickets} loading={loading} />
    </Box>
  );
}

export default ChamadosPage;
