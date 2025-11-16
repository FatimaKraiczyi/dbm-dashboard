import type { Ticket, TicketStatus } from '@/domain/models';

export interface UpdateTicketStatus {
  execute(params: { id: string; status: TicketStatus }): Promise<Ticket | undefined>;
}
