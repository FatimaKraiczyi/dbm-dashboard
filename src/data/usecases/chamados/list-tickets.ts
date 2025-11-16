import type { TicketStore } from '@/data/protocols';
import type { Ticket } from '@/domain/models';
import type { ListTickets } from '@/domain/usecases/chamados';

export class LoadTickets implements ListTickets {
  private readonly store: TicketStore;

  constructor(store: TicketStore) {
    this.store = store;
  }

  async execute(): Promise<Ticket[]> {
    return this.store.listTickets();
  }
}
