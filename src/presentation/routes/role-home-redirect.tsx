import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '@/presentation/contexts';
import { getDefaultPathForRole } from '@/presentation/navigation';

export function RoleHomeRedirect() {
  const { user } = useCurrentUser();
  const target = getDefaultPathForRole(user.role);
  return <Navigate to={target} replace />;
}
