import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { BaseUser } from '@/domain/models';
import { useSession } from '@/presentation/contexts';
import { getDefaultPathForRole } from '@/presentation/navigation';

export function SignInPage() {
  const { availableUsers, switchUser } = useSession();
  const navigate = useNavigate();

  const handleSelect = (user: BaseUser) => {
    switchUser(user.id);
    navigate(getDefaultPathForRole(user.role), { replace: true });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#151619', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          bgcolor: '#1E2024',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 4,
          p: 4,
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography sx={{ color: '#F9FAFA' }} variant='h1'>HelpDesk</Typography>
            <Typography sx={{ color: '#D2D6DF' }} variant='subtitle2'>
              Escolha um perfil para acessar o painel.
            </Typography>
          </Stack>

          <Stack spacing={2}>
            {availableUsers.map((user) => (
              <Button
                key={user.id}
                onClick={() => handleSelect(user)}
                sx={{
                  justifyContent: 'space-between',
                  bgcolor: '#2B2E33',
                  color: '#F9FAFA',
                  py: 2,
                  px: 3,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: 14,
                  '&:hover': { bgcolor: '#3A3E44' },
                }}
                fullWidth
              >
                <Box>
                  <Typography variant='subtitle2'>{user.name}</Typography>
                  <Typography variant='body2'>{user.email}</Typography>
                </Box>
                <Typography variant='caption'
                  sx={{ color: '#8996EB'}}>
                  {user.role}
                </Typography>
              </Button>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
