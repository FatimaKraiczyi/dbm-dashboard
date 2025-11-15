import type { Ticket } from '@/domain/models';
import type { TicketRepository } from '@/domain/repositories';
import { getTicket, listTickets } from '@/infra/datasources/ticket-datasource';

export class InMemoryTicketRepository implements TicketRepository {
  async listTickets(): Promise<Ticket[]> {
    return listTickets();
  }

  async getTicket(id: string): Promise<Ticket | undefined> {
    return getTicket(id);
  }
}
