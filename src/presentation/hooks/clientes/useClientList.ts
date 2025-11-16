import { useCallback, useEffect, useState } from 'react';
import type { Client } from '@/domain/models';
import type { ListClients } from '@/domain/usecases/chamados';

interface UseClientListResult {
  clients: Client[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export function useClientList(listClients: ListClients): UseClientListResult {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await listClients.execute();
      setClients(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível carregar os clientes.');
    } finally {
      setLoading(false);
    }
  }, [listClients]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { clients, loading, error, reload };
}
