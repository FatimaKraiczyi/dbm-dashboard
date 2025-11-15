import type { Ticket } from '@/domain/models';

export interface TicketRepository {
  listTickets(): Promise<Ticket[]>;
  getTicket(id: string): Promise<Ticket | undefined>;
}
