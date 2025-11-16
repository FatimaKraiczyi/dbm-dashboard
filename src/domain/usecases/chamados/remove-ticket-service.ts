import type { Ticket } from '@/domain/models';

export interface RemoveTicketAdditionalService {
  execute(input: RemoveTicketAdditionalServiceInput): Promise<Ticket | undefined>;
}

export interface RemoveTicketAdditionalServiceInput {
  ticketId: string;
  serviceId: string;
}
