import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { UserRole } from '@/domain/models';
import { Layout } from '@/presentation/components';
import { useSession } from '@/presentation/contexts';
import { getDefaultPathForRole } from '@/presentation/navigation';

interface PrivateRouteProps {
  allowedRoles?: UserRole[];
}

export function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  const { user } = useSession();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const isAuthorized = !allowedRoles || allowedRoles.includes(user.role);

  if (!isAuthorized) {
    const fallbackPath = getDefaultPathForRole(user.role);
    return <Navigate to={fallbackPath} replace state={{ from: location }} />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}