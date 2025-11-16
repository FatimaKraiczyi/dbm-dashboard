import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Ticket, TicketStatus } from '@/domain/models';
import type {
  AddTicketAdditionalService,
  AddTicketAdditionalServiceInput,
  GetTicket,
  RemoveTicketAdditionalService,
  UpdateTicketStatus,
} from '@/domain/usecases/chamados';

interface UseTicketDetailParams {
  id: string | undefined;
  loadTicket: GetTicket;
  changeStatus: UpdateTicketStatus;
  addAdditionalService: AddTicketAdditionalService;
  removeAdditionalService: RemoveTicketAdditionalService;
}

interface TicketTotals {
  additionalValue: number;
  totalValue: number;
}

interface UseTicketDetailResult {
  ticket: Ticket | null;
  loading: boolean;
  updatingStatus: boolean;
  managingService: boolean;
  error: string | null;
  totals: TicketTotals;
  handleStatusChange: (status: TicketStatus) => Promise<void>;
  handleAddService: (service: AddTicketAdditionalServiceInput['service']) => Promise<void>;
  handleRemoveService: (serviceId: string) => Promise<void>;
}

function parseValue(value: string): number {
  return parseFloat(value.replace('R$', '').replace('.', '').replace(',', '.').trim());
}

export function useTicketDetail({
  id,
  loadTicket,
  changeStatus,
  addAdditionalService,
  removeAdditionalService,
}: UseTicketDetailParams): UseTicketDetailResult {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [managingService, setManagingService] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!id) {
        if (mounted) setLoading(false);
        return;
      }

      try {
        setError(null);
        const data = await loadTicket.execute(id);
        if (mounted) {
          setTicket(data ?? null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Não foi possível carregar o chamado.');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    void load();

    return () => {
      mounted = false;
    };
  }, [id, loadTicket]);

  const totals = useMemo(() => {
    if (!ticket) {
      return { additionalValue: 0, totalValue: 0 } satisfies TicketTotals;
    }

    const additionalServices = ticket.additionalServices ?? [];
    const baseValue = parseValue(ticket.value);
    const additionalValue = additionalServices.reduce((sum, svc) => sum + parseValue(svc.value), 0);
    const totalValue = baseValue + additionalValue;

    return { additionalValue, totalValue } satisfies TicketTotals;
  }, [ticket]);

  const handleStatusChange = useCallback(
    async (status: TicketStatus) => {
      if (!ticket || ticket.status === status) {
        return;
      }

      setUpdatingStatus(true);
      try {
        const updated = await changeStatus.execute({ id: ticket.id, status });
        if (updated) {
          setTicket(updated);
        }
      } finally {
        setUpdatingStatus(false);
      }
    },
    [changeStatus, ticket],
  );

  const handleAddService = useCallback(
    async (service: AddTicketAdditionalServiceInput['service']) => {
      if (!ticket) return;
      setManagingService(true);
      try {
        const updated = await addAdditionalService.execute({ ticketId: ticket.id, service });
        if (updated) {
          setTicket(updated);
          setError(null);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Não foi possível salvar o serviço adicional.';
        setError(message);
        throw err;
      } finally {
        setManagingService(false);
      }
    },
    [addAdditionalService, ticket],
  );

  const handleRemoveService = useCallback(
    async (serviceId: string) => {
      if (!ticket) return;
      setManagingService(true);
      try {
        const updated = await removeAdditionalService.execute({ ticketId: ticket.id, serviceId });
        if (updated) {
          setTicket(updated);
          setError(null);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Não foi possível remover o serviço adicional.';
        setError(message);
        throw err;
      } finally {
        setManagingService(false);
      }
    },
    [removeAdditionalService, ticket],
  );

  return {
    ticket,
    loading,
    updatingStatus,
    managingService,
    error,
    totals,
    handleStatusChange,
    handleAddService,
    handleRemoveService,
  };
}
