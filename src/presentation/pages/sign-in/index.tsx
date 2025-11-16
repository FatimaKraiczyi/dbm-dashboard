import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { BaseUser } from '@/domain/models';
import { useCurrentUser } from '@/presentation/contexts';
import { getDefaultPathForRole } from '@/presentation/navigation';

export function SignInPage() {
  const { availableUsers, switchUser } = useCurrentUser();
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
            <Typography sx={{ color: '#F9FAFA', fontSize: 24, fontWeight: 700 }}>HelpDesk</Typography>
            <Typography sx={{ color: '#D2D6DF', fontSize: 14 }}>
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
                  <Typography sx={{ fontWeight: 600 }}>{user.name}</Typography>
                  <Typography sx={{ fontSize: 12, color: '#A7ADBA' }}>{user.email}</Typography>
                </Box>
                <Typography sx={{ fontSize: 12, color: '#8996EB', fontWeight: 600, textTransform: 'uppercase' }}>
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
