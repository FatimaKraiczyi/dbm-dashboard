import type { Client } from '@/domain/models';

export interface ListClients {
  execute(): Promise<Client[]>;
}
