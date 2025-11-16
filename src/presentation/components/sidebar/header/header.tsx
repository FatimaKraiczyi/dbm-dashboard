import { useSession } from '@/presentation/contexts';
import { Avatar, Box, Stack, Typography } from '@mui/material';

export function SidebarHeader() {
  const { user } = useSession();
  if (!user) {
    return null;
  }
  
  return (
    <Box sx={{ p: 3, borderBottom: '1px solid #1E2024' }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar
          sx={{
            bgcolor: '#2E3DA3',
            width: 44,
            height: 44,
            fontSize: '14px',
            fontWeight: 700,
          }}
        >
          {user.initials}
        </Avatar>
        <Box>
          <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#F9FAFA' }}>
            HelpDesk
          </Typography>
          <Typography
            sx={{
              fontSize: '10px',
              fontWeight: 700,
              color: '#8996EB',
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
            }}
          >
            {user.role.toUpperCase()}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
