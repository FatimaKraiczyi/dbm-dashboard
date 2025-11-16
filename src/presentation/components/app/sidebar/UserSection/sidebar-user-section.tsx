import { Avatar, Box, MenuItem, Select, Stack, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useCurrentUser } from '@/presentation/contexts';

export function SidebarUserSection() {
  const { user, availableUsers, switchUser } = useCurrentUser();

  const handleChange = (event: SelectChangeEvent<string>) => {
    switchUser(event.target.value as string);
  };

  return (
    <Box sx={{ p: 2, borderTop: '1px solid #1E2024' }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar
          sx={{
            bgcolor: '#2E3DA3',
            width: 40,
            height: 40,
            fontSize: '12px',
            fontWeight: 700,
          }}
        >
          {user.initials}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#F9FAFA',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {user.name}
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: 400,
              color: '#858B99',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {user.email}
          </Typography>
        </Box>
      </Stack>
      <Select
        size="small"
        value={user.id}
        onChange={handleChange}
        fullWidth
        sx={{
          mt: 1.5,
          bgcolor: '#1E2024',
          color: '#F9FAFA',
          '& .MuiSelect-icon': { color: '#858B99' },
        }}
      >
        {availableUsers.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
