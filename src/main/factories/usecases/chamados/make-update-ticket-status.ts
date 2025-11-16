import { UpdateTicketStatusImpl } from '@/data/usecases';
import type { UpdateTicketStatus } from '@/domain/usecases/chamados';
import { LocalStorageTicketStore } from '@/infra/cache';

export function makeUpdateTicketStatus(): UpdateTicketStatus {
  const store = new LocalStorageTicketStore();
  return new UpdateTicketStatusImpl(store);
}
