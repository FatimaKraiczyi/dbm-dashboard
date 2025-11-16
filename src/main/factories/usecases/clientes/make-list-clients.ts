import { LoadClients } from '@/data/usecases';
import type { ListClients } from '@/domain/usecases/clientes';
import { LocalStorageClientStore } from '@/infra/cache';

export function makeListClients(): ListClients {
  const store = new LocalStorageClientStore();
  return new LoadClients(store);
}
