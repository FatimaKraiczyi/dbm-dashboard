import { useCallback, useMemo, useState, type ReactNode } from 'react';
import type { BaseUser } from '@/domain/models';
import { clearCurrentUser, getCurrentUser, listAvailableUsers, setCurrentUser } from '@/infra/cache';
import { ApiContext } from './api-context';
import { CurrentUserContext } from './current-user-context';

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<BaseUser | null>(() => getCurrentUser());
  const [availableUsers] = useState<BaseUser[]>(() => listAvailableUsers());

  const handleSwitchUser = useCallback((id: string) => {
    const next = setCurrentUser(id);
    setUser(next);
  }, []);

  const handleSetCurrentUser = useCallback((next: BaseUser | null) => {
    if (next) {
      const updated = setCurrentUser(next.id);
      setUser(updated);
      return;
    }

    clearCurrentUser();
    setUser(null);
  }, []);

  const handleGetCurrentUser = useCallback(() => user, [user]);

  const apiValue = useMemo(
    () => ({
      setCurrentUser: handleSetCurrentUser,
      getCurrentUser: handleGetCurrentUser,
    }),
    [handleSetCurrentUser, handleGetCurrentUser],
  );

  const currentUserValue = useMemo(
    () => ({
      user,
      availableUsers,
      switchUser: handleSwitchUser,
    }),
    [user, availableUsers, handleSwitchUser],
  );

  return (
    <ApiContext.Provider value={apiValue}>
      <CurrentUserContext.Provider value={currentUserValue}>{children}</CurrentUserContext.Provider>
    </ApiContext.Provider>
  );
}
