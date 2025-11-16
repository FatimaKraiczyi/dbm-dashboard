import { Box, CircularProgress, Paper, Stack, Typography } from '@mui/material';
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
  const { ticket, loading, updatingStatus, managingService, error, totals, handleStatusChange, handleAddService, handleRemoveService } =
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

  if (!ticket) {
    return (
      <Box sx={{ p: 6 }}>
        <Typography variant="h1" sx={{ color: 'primary.main', mb: 2 }}>
          Chamado não encontrado
        </Typography>
        <TicketDetailHeader
          onBack={() => navigate('/chamados')}
          onComplete={() => undefined}
          onStart={() => undefined}
          disableComplete
          disableStart
        />
      </Box>
    );
  }
  return (
    <Box sx={{ p: 6 }}>
      <TicketDetailHeader
        onBack={() => navigate('/chamados')}
        onComplete={() => handleStatusChange('done')}
        onStart={() => handleStatusChange('progress')}
        disableComplete={updatingStatus || ticket.status === 'done'}
        disableStart={updatingStatus || ticket.status === 'progress'}
      />

      {error && (
        <Paper sx={{ p: 2, mb: 3, bgcolor: '#FCE8E8', border: '1px solid #F6C1C1' }}>
          <Typography sx={{ fontSize: '12px', color: '#A11B1B' }}>{error}</Typography>
        </Paper>
      )}

      <Stack direction="row" spacing={3}>
        <Box sx={{ flex: 1, maxWidth: 480 }}>
          <TicketMainCard ticket={ticket} />
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
          <TicketSummaryCard
            ticket={ticket}
            additionalValue={totals.additionalValue}
            totalValue={totals.totalValue}
          />
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
