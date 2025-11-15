// Fonte única de dados mock para tickets (simula um "banco" local)
// Facilita futura troca por chamadas HTTP (ex: fetch/axios) mantendo contrato.

export type TicketStatus = 'open' | 'progress' | 'done';

export interface Ticket {
  id: string;
  date: string; // ISO ou formato exibido
  title: string;
  service: string;
  value: string; // manter string porque já vem formatado (poderia ser number)
  client: { name: string; initials: string };
  technician: { name: string; initials: string };
  status: TicketStatus;
  statusLabel: string; // texto amigável
}

export const ticketsDB: Ticket[] = [
  {
    id: '00003',
    date: '2025-04-13T20:56:00',
    title: 'Rede lenta',
    service: 'Instalação de Rede',
    value: 'R$ 180,00',
    client: { name: 'André Costa', initials: 'AC' },
    technician: { name: 'Carlos Silva', initials: 'CS' },
    status: 'open',
    statusLabel: 'Aberto',
  },
  {
    id: '00004',
    date: '2025-04-12T15:20:00',
    title: 'Backup não está funcionando',
    service: 'Recuperação de Dados',
    value: 'R$ 200,00',
    client: { name: 'André Costa', initials: 'AC' },
    technician: { name: 'Carlos Silva', initials: 'CS' },
    status: 'open',
    statusLabel: 'Aberto',
  },
  {
    id: '00001',
    date: '2025-04-12T09:01:00',
    title: 'Computador não liga',
    service: 'Manutenção de Hardware',
    value: 'R$ 150,00',
    client: { name: 'Aline Souza', initials: 'AS' },
    technician: { name: 'Carlos Silva', initials: 'CS' },
    status: 'progress',
    statusLabel: 'Em atendimento',
  },
  {
    id: '00002',
    date: '2025-04-10T10:15:00',
    title: 'Instalação de software de gestão',
    service: 'Suporte de Software',
    value: 'R$ 200,00',
    client: { name: 'Julia Maria', initials: 'JM' },
    technician: { name: 'Ana Oliveira', initials: 'AO' },
    status: 'done',
    statusLabel: 'Encerrado',
  },
  {
    id: '00005',
    date: '2025-04-11T15:16:00',
    title: 'Meu fone não conecta no computador',
    service: 'Suporte de Software',
    value: 'R$ 80,00',
    client: { name: 'Suzane Moura', initials: 'SM' },
    technician: { name: 'Ana Oliveira', initials: 'AO' },
    status: 'done',
    statusLabel: 'Encerrado',
  },
];

// Funções utilitárias simulando acesso assíncrono
export async function listTickets(): Promise<Ticket[]> {
  // Simula latência de rede mínima
  await new Promise((r) => setTimeout(r, 150));
  return ticketsDB;
}

export async function getTicket(id: string): Promise<Ticket | undefined> {
  await new Promise((r) => setTimeout(r, 100));
  return ticketsDB.find((t) => t.id === id);
}
