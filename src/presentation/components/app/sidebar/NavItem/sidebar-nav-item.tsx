import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import type { NavItem } from '@/presentation/navigation';

interface SidebarNavItemProps {
  item: NavItem;
  active?: boolean;
}

export function SidebarNavItem({ item, active = false }: SidebarNavItemProps) {
  return (
    <Link to={item.path} style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          p: 1.5,
          borderRadius: '5px',
          bgcolor: active ? '#2E3DA3' : '#151619',
          color: active ? '#F9FAFA' : '#858B99',
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            bgcolor: active ? '#2E3DA3' : '#1E2024',
          },
        }}
      >
        {item.icon}
        <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>{item.label}</Typography>
      </Box>
    </Link>
  );
}
