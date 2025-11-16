import type { Ticket, TicketStatus } from '@/domain/models';
import type { TicketRepository } from '@/domain/repositories';
import type { UpdateTicketStatus } from '@/domain/usecases';

export class UpdateTicketStatusImpl implements UpdateTicketStatus {
  private readonly repository: TicketRepository;

  constructor(repository: TicketRepository) {
    this.repository = repository;
  }

  async execute(params: { id: string; status: TicketStatus }): Promise<Ticket | undefined> {
    return this.repository.updateTicketStatus(params.id, params.status);
  }
}
