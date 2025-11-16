import { makeLoadTickets } from '@/main/factories/usecases';
import ChamadosPage from '@/presentation/pages/chamados';

export function makeTicketListPage() {
  const listTickets = makeLoadTickets();
  return <ChamadosPage listTickets={listTickets} />;
}
