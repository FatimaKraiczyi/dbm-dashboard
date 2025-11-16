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
        <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#858B99' }}>
          Serviços adicionais
        </Typography>
        <Tooltip title="Adicionar serviço">
          <span>
            <IconButton
              size="small"
              sx={{ bgcolor: '#1E2024', color: '#F9FAFA' }}
              onClick={onAdd}
              disabled={disabled}
            >
              <AddIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>

      {services.length > 0 ? (
        <Stack spacing={1}>
          {services.map((service, index) => (
            <Box key={service.id}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#1E2024' }}>
                    {service.name}
                  </Typography>
                  <Typography sx={{ fontSize: '11px', color: '#535964' }}>{service.value}</Typography>
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
        <Typography sx={{ fontSize: '12px', color: '#858B99', fontStyle: 'italic' }}>
          Nenhum serviço adicional
        </Typography>
      )}
    </Paper>
  );
}
