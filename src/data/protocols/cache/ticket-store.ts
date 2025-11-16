import type { Ticket, TicketStatus } from '@/domain/models';
import type { AddTicketAdditionalServiceInput, RemoveTicketAdditionalServiceInput } from '@/domain/usecases/chamados';

export interface TicketStore {
  listTickets(): Promise<Ticket[]>;
  getTicket(id: string): Promise<Ticket | undefined>;
  updateTicketStatus(id: string, status: TicketStatus): Promise<Ticket | undefined>;
  addAdditionalService(input: AddTicketAdditionalServiceInput): Promise<Ticket | undefined>;
  removeAdditionalService(input: RemoveTicketAdditionalServiceInput): Promise<Ticket | undefined>;
}
