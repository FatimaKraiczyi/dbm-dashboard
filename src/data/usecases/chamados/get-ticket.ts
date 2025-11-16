import type { TicketStore } from '@/data/protocols';
import type { Ticket } from '@/domain/models';
import type { GetTicket } from '@/domain/usecases/chamados';

export class LoadTicketById implements GetTicket {
  private readonly store: TicketStore;

  constructor(store: TicketStore) {
    this.store = store;
  }

  async execute(id: string): Promise<Ticket | undefined> {
    return this.store.getTicket(id);
  }
}
