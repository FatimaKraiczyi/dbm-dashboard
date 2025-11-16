import type { TicketStore } from '@/data/protocols';
import type { Ticket } from '@/domain/models';
import type { RemoveTicketAdditionalService, RemoveTicketAdditionalServiceInput } from '@/domain/usecases/chamados';

export class RemoveTicketAdditionalServiceUseCase implements RemoveTicketAdditionalService {
  private readonly store: TicketStore;

  constructor(store: TicketStore) {
    this.store = store;
  }

  execute(input: RemoveTicketAdditionalServiceInput): Promise<Ticket | undefined> {
    return this.store.removeAdditionalService(input);
  }
}
