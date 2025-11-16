import type { ClientStore } from '@/data/protocols';
import type { Client, Technician } from '@/domain/models';

const STORAGE_KEY = 'dbm-dashboard:clients';

const defaultClients: Client[] = [
  { id: '1', name: 'André Costa', email: 'andre.costa@client.com', initials: 'AC' },
  { id: '2', name: 'Julia Maria', email: 'julia.maria@client.com', initials: 'JM' },
  { id: '3', name: 'Aline Souza', email: 'aline.souza@client.com', initials: 'AS' },
  { id: '4', name: 'Marcelo Andrade', email: 'marcelo.andrade@client.com', initials: 'MA' },
  { id: '5', name: 'Suzane Moura', email: 'suzane.moura@client.com', initials: 'SM' },
];

const techniciansDB: Technician[] = [
  { id: 't1', name: 'Carlos Silva', email: 'carlos.silva@tech.com', initials: 'CS' },
  { id: 't2', name: 'Ana Oliveira', email: 'ana.oliveira@tech.com', initials: 'AO' },
];

export class LocalStorageClientStore implements ClientStore {
  async listClients(): Promise<Client[]> {
    await delay(120);
    return clone(readClients());
  }
}

export async function listTechnicians(): Promise<Technician[]> {
  await delay(100);
  return clone(techniciansDB);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

let runtimeClients: Client[] = clone(defaultClients);

function readClients(): Client[] {
  if (typeof window === 'undefined') {
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
