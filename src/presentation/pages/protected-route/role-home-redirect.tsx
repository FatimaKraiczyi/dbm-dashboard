import { Navigate } from 'react-router-dom';
import { useApiContext } from '@/presentation/hooks';
import { getDefaultPathForRole } from '@/presentation/navigation';

export function RoleHomeRedirect() {
  const { getCurrentUser } = useApiContext();
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const target = getDefaultPathForRole(user.role);
  return <Navigate to={target} replace />;
}
