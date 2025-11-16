import { AddTicketAdditionalServiceUseCase } from '@/data/usecases';
import type { AddTicketAdditionalService } from '@/domain/usecases/chamados';
import { LocalStorageTicketStore } from '@/infra/cache';

export function makeAddTicketAdditionalService(): AddTicketAdditionalService {
  const store = new LocalStorageTicketStore();
  return new AddTicketAdditionalServiceUseCase(store);
}
