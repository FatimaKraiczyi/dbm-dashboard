export type TicketStatus = 'open' | 'progress' | 'done';

export interface AdditionalService {
  id: string;
  name: string;
  value: string;
}

export interface Person {
  name: string;
  initials: string;
  email: string;
}

export interface Ticket {
  id: string;
  createdAt: string;
  date: string;
  title: string;
  description: string;
  service: string;
  value: string;
  additionalServices?: AdditionalService[];
  client: Person;
  technician: Person;
  status: TicketStatus;
  statusLabel: string;
}

export type { AdditionalService as TicketAdditionalService };
