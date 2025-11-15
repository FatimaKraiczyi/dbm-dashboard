import AssignmentIcon from '@mui/icons-material/Assignment';
import BusinessIcon from '@mui/icons-material/Business';
import type { ReactNode } from 'react';

export interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
}

export const navItems: NavItem[] = [
  { label: 'Chamados', icon: <AssignmentIcon />, path: '/chamados' },
  { label: 'Clientes', icon: <BusinessIcon />, path: '/clientes' },
];
