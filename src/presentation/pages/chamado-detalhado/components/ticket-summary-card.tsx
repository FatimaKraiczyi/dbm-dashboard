import { Avatar, Box, Divider, Paper, Stack, Typography } from '@mui/material';
import type { Ticket } from '@/domain/models';

interface TicketSummaryCardProps {
  ticket: Ticket;
  additionalValue: number;
  totalValue: number;
}

export function TicketSummaryCard({ ticket, additionalValue, totalValue }: TicketSummaryCardProps) {
  const formattedAdditional = additionalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const formattedTotal = totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <Paper sx={{ p: 3, border: '1px solid #E3E5E8' }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant='body1' sx={{ color: '#858B99', mb: 1 }}>
            Técnico responsável
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar>{ticket.technician.initials}</Avatar>
            <Box flex={1}>
              <Typography sx={{ color: '#1E2024' }} variant='subtitle2'>{ticket.technician.name}</Typography>
              <Typography sx={{ color: '#535964' }} variant='body2'>{ticket.technician.email}</Typography>
            </Box>
          </Stack>
        </Box>

        <Box>
          <Typography variant='body1' sx={{ color: '#858B99', mb: 1 }}>
            Valores
          </Typography>
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography  sx={{ color: '#1E2024' }} variant='body2'>Preço base</Typography>
              <Typography sx={{ color: '#1E2024' }} variant='body2'>{ticket.value}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ color: '#1E2024' }} variant='body2'>Adicionais</Typography>
              <Typography sx={{ color: '#1E2024' }} variant='body2'>{formattedAdditional}</Typography>
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant='subtitle1' sx={{ color: '#1E2024' }}>Total</Typography>
              <Typography variant='subtitle1' sx={{ color: '#1E2024' }}>{formattedTotal}</Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
