import { Alert, Box } from '@mui/material';
import type { ListClients } from '@/domain/usecases/chamados';
import { PageHeader } from '@/presentation/components';
import { useClientList } from '@/presentation/hooks';
import { ClientsTable } from './components';

interface ClientesPageProps {
  listClients: ListClients;
}

export function ClientesPage({ listClients }: ClientesPageProps) {
  const { clients, loading, error } = useClientList(listClients);

  return (
    <Box sx={{ p: 6 }}>
      <PageHeader title="Clientes" />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <ClientsTable clients={clients} loading={loading} />

    </Box>
  );
}
