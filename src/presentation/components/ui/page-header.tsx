import { Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  action?: ReactNode;
}

export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <Stack spacing={0.5} sx={{ mb: 3 }}>
      <Stack direction="row" alignItems="flex-end" spacing={2}>
        <Typography variant="h1" sx={{ flex: 1 }}>
          {title}
        </Typography>
        {action ?? null}
      </Stack>
    </Stack>
  );
}
