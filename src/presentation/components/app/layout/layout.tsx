import { Box } from '@mui/material';
import { useMemo, type PropsWithChildren } from 'react';
import { getNavItemsForRole } from '@/presentation/navigation';
import { useCurrentUser } from '@/presentation/contexts';
import { Sidebar } from '../sidebar/sidebar';

export function Layout({ children }: PropsWithChildren) {
  const { user } = useCurrentUser();
  const items = useMemo(() => getNavItemsForRole(user.role), [user.role]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#151619' }}>
      <Sidebar items={items} />
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          bgcolor: '#F9FAFA',
          borderRadius: '20px 0 0 0',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
