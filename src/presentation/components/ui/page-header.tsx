import { Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <Stack spacing={0.5} sx={{ mb: 3 }}>
      <Stack direction="row" alignItems="flex-end" spacing={2}>
        <Typography variant="h1" sx={{ color: 'primary.main', flex: 1 }}>
          {title}
        </Typography>
        {action ?? null}
      </Stack>
      {description && (
        <Typography sx={{ color: '#535964', fontSize: '14px' }}>{description}</Typography>
      )}
    </Stack>
  );
}
