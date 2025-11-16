import { useNavigate } from 'react-router-dom';
import { useApiContext } from './use-api-context';

type ResultType = () => void;

export const useLogout = (): ResultType => {
  const navigate = useNavigate();
  const { setCurrentUser } = useApiContext();

  return () => {
    setCurrentUser(null);
    navigate('/login', { replace: true });
  };
};
