import { RemoveTicketAdditionalServiceUseCase } from '@/data/usecases';
import type { RemoveTicketAdditionalService } from '@/domain/usecases/chamados';
import { LocalStorageTicketStore } from '@/infra/cache';

export function makeRemoveTicketAdditionalService(): RemoveTicketAdditionalService {
  const store = new LocalStorageTicketStore();
  return new RemoveTicketAdditionalServiceUseCase(store);
}
