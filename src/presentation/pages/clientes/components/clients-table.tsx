import { Avatar, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import type { Client } from '@/domain/models';
import { DataTable, type DataTableColumn } from '@/presentation/components';

interface ClientsTableProps {
  clients: Client[];
  loading: boolean;
}

export function ClientsTable({ clients, loading }: ClientsTableProps) {
  const columns = useMemo<DataTableColumn<Client>[]>(
    () => [
      {
        id: 'name',
        label: 'Nome',
        render: (client) => (
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ width: 32, height: 32, fontSize: '12px' }}>{client.initials}</Avatar>
            <Typography variant='subtitle2' sx={{color: '#1E2024'}}>
              {client.name}</Typography>
          </Stack>
        ),
      },
      {
        id: 'email',
        label: 'E-mail',
        render: (client) => <Typography variant='subtitle2' sx={{color: '#1E2024'}}>{client.email}</Typography>,
      },
    ],
    [],
  );

  return <DataTable columns={columns} data={clients} loading={loading} />;
}
