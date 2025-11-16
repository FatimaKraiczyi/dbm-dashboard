import { useCallback, useEffect, useState } from 'react';
import type { Ticket } from '@/domain/models';
import type { ListTickets } from '@/domain/usecases/chamados';

interface UseTicketListResult {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export function useTicketList(listTickets: ListTickets): UseTicketListResult {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await listTickets.execute();
      setTickets(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível carregar os chamados.');
    } finally {
      setLoading(false);
    }
  }, [listTickets]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { tickets, loading, error, reload };
}
