import AssignmentIcon from '@mui/icons-material/Assignment';
import BusinessIcon from '@mui/icons-material/Business';
import HandymanIcon from '@mui/icons-material/Handyman';
import type { ReactNode } from 'react';
import type { UserRole } from '@/domain/models';

export interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
  role?: UserRole[];
}

const baseNavItems: NavItem[] = [
  { label: 'Chamados', icon: <AssignmentIcon />, path: '/chamados', role: ['admin'] },
  { label: 'Clientes', icon: <BusinessIcon />, path: '/clientes', role: ['admin'] },
  { label: 'Meus chamados', icon: <HandymanIcon />, path: '/meus-chamados', role: ['técnico'] },
];

export function getNavItemsForRole(role: UserRole): NavItem[] {
  return baseNavItems.filter((item) => {
    if (!item.role || item.role.length === 0) {
      return true;
    }

    return item.role.includes(role);
  });
}

export const navItems = baseNavItems;

export function getDefaultPathForRole(role: UserRole): string {
  const allowedItems = getNavItemsForRole(role);
  if (allowedItems.length > 0) {
    return allowedItems[0].path;
  }
  return '/';
}
