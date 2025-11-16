import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Box, Button, Stack, Typography } from '@mui/material';

interface TicketDetailHeaderProps {
  onBack: () => void;
  onComplete: () => void;
  onStart: () => void;
  disableComplete: boolean;
  disableStart: boolean;
}

export function TicketDetailHeader({ onBack, onComplete, onStart, disableComplete, disableStart }: TicketDetailHeaderProps) {
  return (
    <Stack direction="row" alignItems="flex-end" spacing={2} mb={3}>
      <Box flex={1}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{
            color: '#535964',
            textTransform: 'none',
            fontSize: '12px',
            fontWeight: 700,
            mb: 1,
            p: 0,
          }}
        >
          Voltar
        </Button>
        <Typography variant="h1" sx={{ color: 'primary.main' }}>
          Chamado detalhado
        </Typography>
      </Box>
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          startIcon={<CheckCircleIcon />}
          sx={{
            bgcolor: '#E3E5E8',
            color: '#1E2024',
            border: 'none',
            textTransform: 'none',
            px: 2,
          }}
          disabled={disableComplete}
          onClick={onComplete}
        >
          Encerrar
        </Button>
        <Button
          variant="contained"
          startIcon={<ScheduleIcon />}
          sx={{
            bgcolor: '#1E2024',
            color: '#F9FAFA',
            textTransform: 'none',
            px: 2,
          }}
          disabled={disableStart}
          onClick={onStart}
        >
          Iniciar atendimento
        </Button>
      </Stack>
    </Stack>
  );
}
