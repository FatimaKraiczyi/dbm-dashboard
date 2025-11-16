import { Box } from '@mui/material';
import { useEffect, useMemo, type PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getNavItemsForRole } from '@/presentation/navigation';
import { useCurrentUser } from '@/presentation/contexts';
import { Sidebar } from '../sidebar/sidebar';

export function Layout({ children }: PropsWithChildren) {
  const { user } = useCurrentUser();
  const items = useMemo(() => getNavItemsForRole(user.role), [user.role]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const hasAccess = items.some((item) => {
      const path = item.path;
      if (location.pathname === path) {
        return true;
      }
      return location.pathname.startsWith(`${path}/`);
    });

    if (!hasAccess) {
      navigate(items[0].path, { replace: true });
    }
  }, [items, location.pathname, navigate]);

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
