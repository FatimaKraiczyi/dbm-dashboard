import { useNavigate } from 'react-router-dom';
import { useSession } from '@/presentation/contexts';

type ResultType = () => void;

export const useLogout = (): ResultType => {
  const navigate = useNavigate();
  const { logout } = useSession();

  return () => {
    logout();
    navigate('/login', { replace: true });
  };
};
