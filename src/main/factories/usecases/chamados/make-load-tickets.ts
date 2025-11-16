import { LoadTickets } from '@/data/usecases';
import type { ListTickets } from '@/domain/usecases/chamados';
import { LocalStorageTicketStore } from '@/infra/cache';

export function makeLoadTickets(): ListTickets {
  const store = new LocalStorageTicketStore();
  return new LoadTickets(store);
}
