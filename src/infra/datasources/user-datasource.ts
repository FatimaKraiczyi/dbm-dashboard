import type { BaseUser, Client, Technician } from '@/domain/models';

const clientsDB: Client[] = [
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

const currentUser: BaseUser = {
  id: 'admin-1',
  name: 'Usuário Adm',
  email: 'user.adm@test.com',
  initials: 'UA',
};

export async function listClients(): Promise<Client[]> {
  await new Promise((resolve) => setTimeout(resolve, 120));
  return clientsDB;
}

export async function listTechnicians(): Promise<Technician[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return techniciansDB;
}

export async function getClient(id: string): Promise<Client | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return clientsDB.find((client) => client.id === id);
}

export function getCurrentUser(): BaseUser {
  return currentUser;
}
