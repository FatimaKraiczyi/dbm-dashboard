import type { Ticket } from '@/domain/models';

export interface GetTicket {
  execute(id: string): Promise<Ticket | undefined>;
}
