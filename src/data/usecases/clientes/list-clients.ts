import type { ClientStore } from '@/data/protocols';
import type { ListClients } from '@/domain';
import type { Client } from '@/domain/models';

export class LoadClients implements ListClients {
  private readonly store: ClientStore;

  constructor(store: ClientStore) {
    this.store = store;
  }

  async execute(): Promise<Client[]> {
    return this.store.listClients();
  }
}
