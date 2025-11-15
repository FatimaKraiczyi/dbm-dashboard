import type { Ticket } from '@/domain/models';
import type { TicketRepository } from '@/domain/repositories';
import type { GetTicket } from '@/domain/usecases';

export class LoadTicketById implements GetTicket {
  private readonly repository: TicketRepository;

  constructor(repository: TicketRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<Ticket | undefined> {
    return this.repository.getTicket(id);
  }
}
