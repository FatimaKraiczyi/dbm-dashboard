import { Box, Paper, Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { navItems, type NavItem } from '@/presentation/navigation';
import { SidebarHeader } from './header/header';
import { SidebarNavItem } from './nav-item/nav-item';
import { SidebarUserSection } from './user-section/user-section';

interface SidebarProps {
  items?: NavItem[];
}

export function Sidebar({ items = navItems }: SidebarProps) {
  const location = useLocation();

  return (
    <Paper
      elevation={0}
      sx={{
        width: 200,
        flexShrink: 0,
        bgcolor: '#151619',
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #1E2024',
      }}
    >
      <SidebarHeader />
      <Box sx={{ p: 1, flex: 1 }}>
        <Stack spacing={0.5}>
          {items.map((item) => (
            <SidebarNavItem key={item.path} item={item} active={location.pathname === item.path} />
          ))}
        </Stack>
      </Box>
      <SidebarUserSection />
    </Paper>
  );
}
