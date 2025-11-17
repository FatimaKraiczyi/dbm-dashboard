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
            width: 44,
            height: 44,
          }}
        >
          {user.initials}
        </Avatar>
        <Box>
          <Typography variant='h2'>
            HelpDesk
          </Typography>
          <Typography
            variant='caption'
            sx={{ color: '#8996EB'}}
          >
            {user.role.toUpperCase()}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
