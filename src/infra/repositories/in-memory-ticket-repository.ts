import type { Ticket, TicketStatus } from '@/domain/models';
import type { TicketRepository } from '@/domain/repositories';
import { getTicket, listTickets, updateTicketStatus as persistTicketStatus } from '@/infra/datasources/ticket-datasource';

export class InMemoryTicketRepository implements TicketRepository {
  async listTickets(): Promise<Ticket[]> {
    return listTickets();
  }

  async getTicket(id: string): Promise<Ticket | undefined> {
    return getTicket(id);
  }

  async updateTicketStatus(id: string, status: TicketStatus): Promise<Ticket | undefined> {
    return persistTicketStatus(id, status);
  }
}
