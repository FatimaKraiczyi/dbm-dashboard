import type { Client } from '@/domain/models';

export interface ClientStore {
  listClients(): Promise<Client[]>;
}
