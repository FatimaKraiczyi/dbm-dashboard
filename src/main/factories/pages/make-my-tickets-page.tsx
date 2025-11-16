import { makeLoadTickets, makeUpdateTicketStatus } from '@/main/factories/usecases';
import { MeusChamadosPage } from '@/presentation/pages/meus-chamados';

export function makeMyTicketsPage() {
  const listTickets = makeLoadTickets();
  const changeStatus = makeUpdateTicketStatus();
  return <MeusChamadosPage listTickets={listTickets} changeStatus={changeStatus} />;
}
