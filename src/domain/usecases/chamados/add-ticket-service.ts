import type { Ticket } from '@/domain/models';

export interface AddTicketAdditionalService {
  execute(input: AddTicketAdditionalServiceInput): Promise<Ticket | undefined>;
}

export interface AddTicketAdditionalServiceInput {
  ticketId: string;
  service: {
    id?: string;
    name: string;
    value: string;
  };
}
