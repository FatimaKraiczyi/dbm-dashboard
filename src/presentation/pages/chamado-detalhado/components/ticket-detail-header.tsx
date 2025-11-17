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
  isDone: boolean;
}

export function TicketDetailHeader({ onBack, onComplete, onStart, disableComplete, disableStart, isDone }: TicketDetailHeaderProps) {
  return (
    <Stack direction="row" alignItems="flex-end" spacing={2} mb={3}>
      <Box flex={1}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{
            color: '#535964',
            fontSize: '12px',
            fontWeight: 700
          }}
        >
          Voltar
        </Button>
        <Typography variant="h1">
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
          }}
          disabled={disableComplete || isDone}
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
          }}
          disabled={disableStart || isDone}
          onClick={onStart}
        >
          Iniciar atendimento
        </Button>
      </Stack>
    </Stack>
  );
}
