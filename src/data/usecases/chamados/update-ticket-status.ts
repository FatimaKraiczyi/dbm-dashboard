import type { TicketStore } from '@/data/protocols';
import type { Ticket, TicketStatus } from '@/domain/models';
import type { UpdateTicketStatus } from '@/domain/usecases/chamados';

export class UpdateTicketStatusImpl implements UpdateTicketStatus {
  private readonly store: TicketStore;

  constructor(store: TicketStore) {
    this.store = store;
  }

  async execute(params: { id: string; status: TicketStatus }): Promise<Ticket | undefined> {
    return this.store.updateTicketStatus(params.id, params.status);
  }
}
