import type { Ticket, TicketStatus } from '@/domain/models';

export interface TicketRepository {
  listTickets(): Promise<Ticket[]>;
  getTicket(id: string): Promise<Ticket | undefined>;
  updateTicketStatus(id: string, status: TicketStatus): Promise<Ticket | undefined>;
}
