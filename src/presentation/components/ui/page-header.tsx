import { Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  action?: ReactNode;
}

export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <Stack direction="row" alignItems="flex-end" spacing={2} sx={{ mb: 3 }}>
      <Typography variant="h1" sx={{ color: 'primary.main', flex: 1 }}>
        {title}
      </Typography>
      {action ?? null}
    </Stack>
  );
}
