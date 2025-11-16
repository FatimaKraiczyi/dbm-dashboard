import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState, type FormEvent } from 'react';
import type { AdditionalService } from '@/domain/models';

export interface AdditionalServiceFormData {
  id?: string;
  name: string;
  value: string;
}

interface TicketAdditionalServiceDialogProps {
  open: boolean;
  service?: AdditionalService;
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: AdditionalServiceFormData) => Promise<void>;
}

export function TicketAdditionalServiceDialog({ open, service, loading, onClose, onSubmit }: TicketAdditionalServiceDialogProps) {
  const [name, setName] = useState(() => service?.name ?? '');
  const [value, setValue] = useState(() => service?.value ?? '');
  const [error, setError] = useState<string | null>(null);

  const title = service ? 'Editar serviço adicional' : 'Adicionar serviço adicional';

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !value.trim()) {
      setError('Preencha o nome e o valor do serviço.');
      return;
    }

    setError(null);
    try {
      await onSubmit({ id: service?.id, name, value });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar o serviço.');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#1E2024' }}>{title}</Typography>
          <IconButton size="small" onClick={handleClose} disabled={loading}>
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ py: 3 }}>
          <Stack spacing={2}>
            {error && (
              <Alert severity="error" sx={{ fontSize: '12px' }}>
                {error}
              </Alert>
            )}
            <Box>
              <Typography sx={{ fontSize: '10px', fontWeight: 700, color: '#535964', textTransform: 'uppercase', mb: 0.5 }}>
                Nome do serviço
              </Typography>
              <TextField
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex: Suporte premium"
                size="small"
                fullWidth
                required
              />
            </Box>
            <Box>
              <Typography sx={{ fontSize: '10px', fontWeight: 700, color: '#535964', textTransform: 'uppercase', mb: 0.5 }}>
                Valor
              </Typography>
              <TextField
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="R$ 100,00"
                size="small"
                fullWidth
                required
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            variant="text"
            onClick={handleClose}
            sx={{ textTransform: 'none', fontSize: '14px', fontWeight: 500 }}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{
              bgcolor: '#1E2024',
              color: '#F9FAFA',
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 500,
              '&:disabled': {
                bgcolor: '#9CA3AF',
                color: '#E5E7EB',
              },
            }}
          >
            {loading ? 'Salvando...' : 'Salvar serviço'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
