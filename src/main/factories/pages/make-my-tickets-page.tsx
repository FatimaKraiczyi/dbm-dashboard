import { makeLoadTickets } from '@/main/factories/usecases';
import { MeusChamadosPage } from '@/presentation/pages/meus-chamados';

export function makeMyTicketsPage() {
  const listTickets = makeLoadTickets();
  return <MeusChamadosPage listTickets={listTickets} />;
}
