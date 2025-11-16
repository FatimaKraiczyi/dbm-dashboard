import { AccessDeniedError } from '@/domain/errors';
import { useLogout } from './use-logout';

type CallbackType = (error: Error) => void;

type ResultType = CallbackType;

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const handleLogout = useLogout();

  return (error: Error) => {
    if (error instanceof AccessDeniedError) {
      handleLogout();
      return;
    }

    callback(error);
  };
};
