import { CheckCircleOutline, ErrorOutline, InfoOutline } from '@mui/icons-material';
import { Chip } from '@mui/material';

export type StatusType = 'open' | 'progress' | 'done';

interface StatusBadgeProps {
  status: StatusType;
  label: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const statusConfig = {
    open: {
      icon: ErrorOutline,
      bgcolor: 'rgba(204, 61, 106, 0.20)',
      color: '#CC3D6A',
    },
    progress: {
      icon: InfoOutline,
      bgcolor: 'rgba(53, 94, 197, 0.20)',
      color: '#355EC5',
    },
    done: {
      icon: CheckCircleOutline,
      bgcolor: 'rgba(80, 139, 38, 0.20)',
      color: '#508B26',
    },
  } as const;

  const config = statusConfig[status];

  return (
    <Chip
      icon={<config.icon sx={{color: config.bgcolor}} />}
      label={label}
      sx={{
        bgcolor: config.bgcolor,
        fontFamily: 'Lato, sans-serif',
        color: config.color,
        fontWeight: 700,
        fontSize: '12px',
        border: 'none',
      }}
    />
  );
}
