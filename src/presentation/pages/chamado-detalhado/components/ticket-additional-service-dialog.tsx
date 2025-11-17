import CloseIcon from '@mui/icons-material/Close';
import {
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
import theme from '@/presentation/styles/theme';

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

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onSubmit({ id: service?.id, name, value });
    onClose();
    
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: (theme) => ({
          borderRadius: '10px',
          padding: 0,
          border: `1px solid ${theme.palette.grey[500]}`,
          backgroundColor: theme.palette.background.paper,
        }),
      }}
    >
      <DialogTitle
        sx={(theme) => ({
          p: '20px 28px',
          borderBottom: `1px solid ${theme.palette.grey[300]}`,
          bgcolor: theme.palette.grey[100],
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
        })}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h3">Serviço Adicional</Typography>
          <IconButton size="small" onClick={handleClose} disabled={loading}>
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ p: '28px 28px 32px', gap: '20px', borderBottom: `1px solid ${theme.palette.grey[300]}`,
        }}>
          <Stack sx={{ gap: '16px' }}>
            <Box display="flex" flexDirection="column" gap='8px'>
              <Typography variant='caption'>
                Descrição
              </Typography>
              <TextField
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex: Suporte premium"
                size="small"
                fullWidth
                required
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: (theme) => ({
                    borderRadius: 0,
                    borderBottom: `1px solid ${theme.palette.grey[500]}`,
                    '&:focus-within': {
                      borderBottomColor: theme.palette.primary.main,
                    },
                  }),
                }}
              />
            </Box>
            <Box display="flex" flexDirection="column" gap='8px'>
              <Typography variant='caption'>
                Valor
              </Typography>
              <TextField
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="R$ 100,00"
                size="small"
                fullWidth
                required
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: (theme) => ({
                    borderRadius: 0,
                    borderBottom: `1px solid ${theme.palette.grey[500]}`,
                    '&:focus-within': {
                      borderBottomColor: theme.palette.primary.main,
                    },
                  }),
                }}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ padding: '24px 28px', gap: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              bgcolor: '#1E2024',
              color: theme.palette.background.paper,
              borderRadius: '5px',
              fontSize: '14px',
              fontWeight: 400
            }}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
