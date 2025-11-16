import { useContext } from 'react';
import type { BaseUser } from '@/domain/models';
import { CurrentUserContext } from './current-user-context';

interface UseCurrentUserValue {
  user: BaseUser;
  availableUsers: BaseUser[];
  switchUser: (id: string) => void;
}

export function useCurrentUser(): UseCurrentUserValue {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error('useCurrentUser must be used within a CurrentUserProvider');
  }
  return context;
}
