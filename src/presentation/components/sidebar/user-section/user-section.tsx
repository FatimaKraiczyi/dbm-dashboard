import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Avatar, Box, ButtonBase, Divider, ListItemIcon, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useState, type MouseEvent } from 'react';
import { useSession } from '@/presentation/contexts';
import { useLogout } from '@/presentation/hooks';

export function SidebarUserSection() {
  const { user, availableUsers, switchUser } = useSession();
  const logout = useLogout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (!user) {
    return null;
  }

  const handleToggle = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl((current) => (current ? null : event.currentTarget));
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelectUser = (id: string) => {
    switchUser(id);
    handleClose();
  };

  const menuId = 'sidebar-user-menu';

  return (
    <Box sx={{ p: 1, borderTop: '1px solid #1E2024' }}>
      <ButtonBase
        id={`${menuId}-button`}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleToggle}
        sx={{
          width: '100%',
          textAlign: 'left',
          borderRadius: '10px',
          display: 'block',
          p: 1,
          backgroundColor: open ? '#1E2024' : 'transparent',
          transition: 'background-color 0.2s ease',
          '&:hover': { backgroundColor: '#1E2024' },
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '100%' }}>
          <Avatar>
            {user.initials}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant='subtitle2'>
              {user.name}
            </Typography>
            <Typography variant='body2'>
              {user.email}
            </Typography>
          </Box>
        </Stack>
      </ButtonBase>

      <Menu
        anchorEl={anchorEl}
        id={menuId}
        open={open}
        onClose={handleClose}
        MenuListProps={{ sx: { p: 0 } }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              ml: 1,
              bgcolor: '#151619',
              border: '1px solid #F4EFFA',
              borderRadius: '10px',
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                left: -5,
                bottom: 25,
                height: 10,
                width: 10,
                bgcolor: '#151619',
                borderLeft: '1px solid #F4EFFA',
                borderBottom: '1px solid #F4EFFA',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        transformOrigin={{ horizontal: 'left', vertical: 'center' }}
      >
        <Stack spacing={0.5}>

          {availableUsers.map((option) => {
            const isActive = option.id === user.id;
            return (
              <MenuItem
                key={option.id}
                onClick={() => handleSelectUser(option.id)}
                selected={isActive}
                sx={{
                  p: 1.5,
                  minWidth: 220,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                  color: '#E3E5E8',
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255,255,255,0.08)',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.08)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mt: 0.25 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#2E3DA3', fontSize: '12px' }}>
                    {option.initials}
                  </Avatar>
                </ListItemIcon>
                <Box sx={{ flex: 1 }}>
                  <Typography variant='subtitle2'>{option.name}</Typography>
                  <Typography variant='body2'>{option.email}</Typography>
                </Box>
              </MenuItem>
            );
          })}
        </Stack>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
        <MenuItem
          onClick={() => {
            logout();
            handleClose();
          }}
          sx={{
            p: 2,
            color: '#D03E3E',
            gap: 1.5,
            '&:hover': { backgroundColor: 'rgba(208,62,62,0.12)' },
          }}
        >
          <ListItemIcon sx={{ minWidth: 0 }}>
            <LogoutRoundedIcon sx={{ fontSize: 20, color: '#D03E3E' }} />
          </ListItemIcon>
          <Typography variant='h4' sx={{ color: '#D03E3E'  }}>Sair</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
