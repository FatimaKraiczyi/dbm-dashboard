import { useCallback, useEffect, useMemo, useState } from 'react';
import { LoadTicketById, LoadTickets } from '@/data/usecases';
import { InMemoryTicketRepository } from '@/infra/repositories';
import type { Ticket } from '@/domain/models';

export function useTickets() {
  const repository = useMemo(() => new InMemoryTicketRepository(), []);
  const listTickets = useMemo(() => new LoadTickets(repository), [repository]);
  const getTicket = useMemo(() => new LoadTicketById(repository), [repository]);

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const ticketsList = await listTickets.execute();
      setTickets(ticketsList);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [listTickets]);

  const loadTicketById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const ticket = await getTicket.execute(id);
      return ticket ?? null;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [getTicket]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  return {
    tickets,
    loading,
    error,
    loadTickets,
    loadTicketById,
  };
}
