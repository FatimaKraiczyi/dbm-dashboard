import type { Ticket } from '@/domain/models';

export interface ListTickets {
  execute(): Promise<Ticket[]>;
}
