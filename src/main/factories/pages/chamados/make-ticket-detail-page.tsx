import {
  makeAddTicketAdditionalService,
  makeLoadTicketById,
  makeRemoveTicketAdditionalService,
  makeUpdateTicketStatus,
} from '@/main/factories/usecases';
import { ChamadoDetalhadoPage } from '@/presentation/pages/chamado-detalhado';

export function makeTicketDetailPage() {
  const loadTicket = makeLoadTicketById();
  const changeStatus = makeUpdateTicketStatus();
  const addAdditionalService = makeAddTicketAdditionalService();
  const removeAdditionalService = makeRemoveTicketAdditionalService();

  return (
    <ChamadoDetalhadoPage
      loadTicket={loadTicket}
      changeStatus={changeStatus}
      addAdditionalService={addAdditionalService}
      removeAdditionalService={removeAdditionalService}
    />
  );
}
