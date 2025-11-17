import { Box, CircularProgress, Stack } from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type {
  AddTicketAdditionalService,
  GetTicket,
  RemoveTicketAdditionalService,
  UpdateTicketStatus,
} from '@/domain/usecases/chamados';

import { useTicketDetail } from '@/presentation/hooks';
import { TicketAdditionalServiceDialog, TicketAdditionalServicesCard, TicketDetailHeader, TicketMainCard, TicketSummaryCard, type AdditionalServiceFormData } from './components';

interface ChamadoDetalhadoProps {
  loadTicket: GetTicket;
  changeStatus: UpdateTicketStatus;
  addAdditionalService: AddTicketAdditionalService;
  removeAdditionalService: RemoveTicketAdditionalService;
}

export function ChamadoDetalhadoPage({ loadTicket, changeStatus, addAdditionalService, removeAdditionalService }: ChamadoDetalhadoProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [serviceDialogVersion, setServiceDialogVersion] = useState(0);
  const { ticket, loading, updatingStatus, managingService, totals, handleStatusChange, handleAddService, handleRemoveService } =
    useTicketDetail({
      id,
      loadTicket,
      changeStatus,
      addAdditionalService,
      removeAdditionalService,
    });

  const additionalServices = ticket?.additionalServices ?? [];

  const handleOpenServiceDialog = useCallback(() => {
    setServiceDialogVersion((version) => version + 1);
    setServiceDialogOpen(true);
  }, []);

  const handleCloseServiceDialog = useCallback(() => {
    if (!managingService) {
      setServiceDialogOpen(false);
    }
  }, [managingService]);

  const handleServiceSubmit = useCallback(
    async (formData: AdditionalServiceFormData) => {
      await handleAddService(formData);
      setServiceDialogOpen(false);
    },
    [handleAddService],
  );

  if (loading) {
    return (
      <Box sx={{ p: 6, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 6 }}>
      <TicketDetailHeader
        onBack={() => navigate('/chamados')}
        onComplete={() => handleStatusChange('done')}
        onStart={() => handleStatusChange('progress')}
        disableComplete={updatingStatus || ticket?.status === 'done'}
        disableStart={updatingStatus || ticket?.status === 'progress'}
      />

      <Stack direction="row" spacing={3}>
        <Box sx={{ flex: 1, maxWidth: 480 }}>
          {ticket ? <TicketMainCard ticket={ticket} /> : null}
          <TicketAdditionalServicesCard
            services={additionalServices}
            onAdd={handleOpenServiceDialog}
            onRemove={(serviceId) => {
              void handleRemoveService(serviceId).catch(() => undefined);
            }}
            disabled={managingService}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          {ticket ? (
            <TicketSummaryCard
              ticket={ticket}
              additionalValue={totals.additionalValue}
              totalValue={totals.totalValue}
            />
          ) : null}
        </Box>
      </Stack>

      <TicketAdditionalServiceDialog
        key={serviceDialogVersion}
        open={serviceDialogOpen}
        loading={managingService}
        onClose={handleCloseServiceDialog}
        onSubmit={handleServiceSubmit}
      />
    </Box>
  );
}

export default ChamadoDetalhadoPage;
