import { Navigate, useLocation } from 'react-router-dom';
import type { UserRole } from '@/domain/models';
import { useApiContext } from '@/presentation/hooks';
import { getDefaultPathForRole } from '@/presentation/navigation';
import { App } from './app';

interface PrivateRouteProps {
  allowedRoles?: UserRole[];
}

export function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  const { getCurrentUser } = useApiContext();
  const user = getCurrentUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  const isAuthorized = !allowedRoles || allowedRoles.includes(user.role);

  if (!isAuthorized) {
    const fallbackPath = getDefaultPathForRole(user.role);
    return <Navigate to={fallbackPath} replace state={{ from: location }} />;
  }

  return <App />;
}
