import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { UserRole } from '@/domain/models';
import { useCurrentUser } from '@/presentation/contexts';
import { getDefaultPathForRole } from '@/presentation/navigation';

interface RoleProtectedRouteProps {
  allowedRoles?: UserRole[];
  children: ReactNode;
}

export function RoleProtectedRoute({ allowedRoles, children }: RoleProtectedRouteProps) {
  const { user } = useCurrentUser();
  const location = useLocation();

  const isAuthorized = !allowedRoles || allowedRoles.includes(user.role);

  if (isAuthorized) {
    return <>{children}</>;
  }

  const fallbackPath = getDefaultPathForRole(user.role);
  return <Navigate to={fallbackPath} replace state={{ from: location }} />;
}
