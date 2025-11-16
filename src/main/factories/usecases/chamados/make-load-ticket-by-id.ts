import { LoadTicketById } from '@/data/usecases';
import type { GetTicket } from '@/domain/usecases/chamados';
import { LocalStorageTicketStore } from '@/infra/cache';

export function makeLoadTicketById(): GetTicket {
  const store = new LocalStorageTicketStore();
  return new LoadTicketById(store);
}
