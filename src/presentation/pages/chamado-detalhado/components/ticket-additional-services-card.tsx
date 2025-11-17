import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Divider, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import type { AdditionalService } from '@/domain/models';

interface TicketAdditionalServicesCardProps {
  services: AdditionalService[];
  onAdd: () => void;
  onRemove: (serviceId: string) => void;
  disabled?: boolean;
}

export function TicketAdditionalServicesCard({ services, onAdd, onRemove, disabled }: TicketAdditionalServicesCardProps) {
  return (
    <Paper sx={{ p: 3, border: '1px solid #E3E5E8' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="body1" sx={{ color: '#858B99' }}>
          Serviços adicionais
        </Typography>
        <Tooltip title="Adicionar serviço">
          <IconButton
            size="small"
            sx={{    
              width: 32,
              height: 32,
              borderRadius: 1,  
              bgcolor: (theme) => theme.palette.grey[500],
              color: (theme) => theme.palette.grey[300], }}
            onClick={onAdd}
          >
            <AddIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </Stack>

      {services.length > 0 ? (
        <Stack spacing={1}>
          {services.map((service, index) => (
            <Box key={service.id}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body1" sx={{ color: '#1E2024' }}>
                    {service.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#535964' }}>{service.value}</Typography>
                </Box>
                <Tooltip title="Remover">
                  <span>
                    <IconButton size="small" sx={{ color: '#D03E3E' }} onClick={() => onRemove(service.id)} disabled={disabled}>
                      <DeleteIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </span>
                </Tooltip>
              </Stack>
              {index < services.length - 1 && <Divider sx={{ my: 1 }} />}
            </Box>
          ))}
        </Stack>
      ) : (
        <Typography variant='body2'>
          Nenhum serviço adicional
        </Typography>
      )}
    </Paper>
  );
}
