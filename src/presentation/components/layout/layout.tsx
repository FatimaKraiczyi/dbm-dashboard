import { Box } from '@mui/material';
import { useMemo, type PropsWithChildren } from 'react';
import { getNavItemsForRole } from '@/presentation/navigation';
import { useSession } from '@/presentation/contexts';
import { Sidebar } from '../sidebar/sidebar';

export function Layout({ children }: PropsWithChildren) {
  const { user } = useSession();
  const items = useMemo(() => (user ? getNavItemsForRole(user.role) : []), [user]);

  if (!user) {
    return null;
  }

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
