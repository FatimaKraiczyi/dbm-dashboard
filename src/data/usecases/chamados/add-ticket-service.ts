import type { TicketStore } from '@/data/protocols';
import type { Ticket } from '@/domain/models';
import type { AddTicketAdditionalService, AddTicketAdditionalServiceInput } from '@/domain/usecases/chamados';

export class AddTicketAdditionalServiceUseCase implements AddTicketAdditionalService {
  private readonly store: TicketStore;

  constructor(store: TicketStore) {
    this.store = store;
  }

  execute(input: AddTicketAdditionalServiceInput): Promise<Ticket | undefined> {
    return this.store.addAdditionalService({
      ...input,
      service: {
        ...input.service,
        name: input.service.name.trim(),
      },
    });
  }
}
