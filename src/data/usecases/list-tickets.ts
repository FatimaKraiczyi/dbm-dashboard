import type { Ticket } from '@/domain/models';
import type { TicketRepository } from '@/domain/repositories';
import type { ListTickets } from '@/domain/usecases';

export class LoadTickets implements ListTickets {
  private readonly repository: TicketRepository;

  constructor(repository: TicketRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Ticket[]> {
    return this.repository.listTickets();
  }
}
