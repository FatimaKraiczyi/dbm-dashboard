import { makeListClients } from '@/main/factories/usecases';
import { ClientesPage } from '@/presentation/pages/clientes';

export function makeClientsPage() {
  const listClients = makeListClients();
  return <ClientesPage listClients={listClients} />;
}
