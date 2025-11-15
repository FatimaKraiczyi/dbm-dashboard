import type { Ticket } from '@/domain/models';

const ticketsDB: Ticket[] = [
  {
    id: '00003',
    createdAt: '2025-04-13T18:30:00',
    date: '2025-04-13T20:56:00',
    title: 'Rede lenta',
    description: 'A conexão de rede está apresentando lentidão extrema. Velocidade abaixo do esperado.',
    service: 'Instalação de Rede',
    value: 'R$ 180,00',
    client: { name: 'André Costa', initials: 'AC', email: 'andre.costa@client.com' },
    technician: { name: 'Carlos Silva', initials: 'CS', email: 'carlos.silva@tech.com' },
    status: 'open',
    statusLabel: 'Aberto',
  },
  {
    id: '00004',
    createdAt: '2025-04-12T09:12:00',
    date: '2025-04-12T15:20:00',
    title: 'Backup não está funcionando',
    description: 'O sistema de backup automático parou de funcionar. Última execução bem-sucedida foi há uma semana.',
    service: 'Recuperação de Dados',
    value: 'R$ 200,00',
    additionalServices: [
      { id: 'as1', name: 'Assinatura de backup', value: 'R$ 120,00' },
      { id: 'as2', name: 'Formatação do PC', value: 'R$ 75,00' },
    ],
    client: { name: 'André Costa', initials: 'AC', email: 'andre.costa@client.com' },
    technician: { name: 'Carlos Silva', initials: 'CS', email: 'carlos.silva@tech.com' },
    status: 'open',
    statusLabel: 'Aberto',
  },
  {
    id: '00001',
    createdAt: '2025-04-12T08:45:00',
    date: '2025-04-12T09:01:00',
    title: 'Computador não liga',
    description: 'Equipamento não inicializa. LED de energia não acende.',
    service: 'Manutenção de Hardware',
    value: 'R$ 150,00',
    client: { name: 'Aline Souza', initials: 'AS', email: 'aline.souza@client.com' },
    technician: { name: 'Carlos Silva', initials: 'CS', email: 'carlos.silva@tech.com' },
    status: 'progress',
    statusLabel: 'Em atendimento',
  },
  {
    id: '00002',
    createdAt: '2025-04-10T09:00:00',
    date: '2025-04-10T10:15:00',
    title: 'Instalação de software de gestão',
    description: 'Necessário instalar e configurar software ERP para gestão empresarial.',
    service: 'Suporte de Software',
    value: 'R$ 200,00',
    client: { name: 'Julia Maria', initials: 'JM', email: 'julia.maria@client.com' },
    technician: { name: 'Ana Oliveira', initials: 'AO', email: 'ana.oliveira@tech.com' },
    status: 'done',
    statusLabel: 'Encerrado',
  },
  {
    id: '00005',
    createdAt: '2025-04-11T14:00:00',
    date: '2025-04-11T15:16:00',
    title: 'Meu fone não conecta no computador',
    description: 'Headset não é reconhecido pelo sistema operacional.',
    service: 'Suporte de Software',
    value: 'R$ 80,00',
    client: { name: 'Suzane Moura', initials: 'SM', email: 'suzane.moura@client.com' },
    technician: { name: 'Ana Oliveira', initials: 'AO', email: 'ana.oliveira@tech.com' },
    status: 'done',
    statusLabel: 'Encerrado',
  },
];

export async function listTickets(): Promise<Ticket[]> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return ticketsDB;
}

export async function getTicket(id: string): Promise<Ticket | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return ticketsDB.find((ticket) => ticket.id === id);
}
