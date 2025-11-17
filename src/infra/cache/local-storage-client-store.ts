import type { ClientStore } from '@/data/protocols';
import type { Client } from '@/domain/models';

const STORAGE_KEY = 'dbm-dashboard:clients';

const defaultClients: Client[] = [
  { id: '1', name: 'André Costa', email: 'andre.costa@client.com', initials: 'AC', role: 'cliente' },
  { id: '2', name: 'Julia Maria', email: 'julia.maria@client.com', initials: 'JM', role: 'cliente' },
  { id: '3', name: 'Aline Souza', email: 'aline.souza@client.com', initials: 'AS', role: 'cliente' },
  { id: '4', name: 'Marcelo Andrade', email: 'marcelo.andrade@client.com', initials: 'MA', role: 'cliente' },
  { id: '5', name: 'Suzane Moura', email: 'suzane.moura@client.com', initials: 'SM', role: 'cliente' },
];

export class LocalStorageClientStore implements ClientStore {
  async listClients(): Promise<Client[]> {
    await delay(120);
    return clone(readClients());
  }
}

let runtimeClients: Client[] = clone(defaultClients);

function readClients(): Client[] {
  if (!isBrowser()) {
    return runtimeClients;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(runtimeClients));
    return runtimeClients;
  }

  try {
    runtimeClients = JSON.parse(stored) as Client[];
  } catch {
    runtimeClients = clone(defaultClients);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(runtimeClients));
  }

  return runtimeClients;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isBrowser() {
  return typeof window !== 'undefined';
}
