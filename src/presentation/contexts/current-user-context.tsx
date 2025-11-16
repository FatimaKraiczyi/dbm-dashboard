/* eslint-disable react-refresh/only-export-components */
import { createContext, useMemo, useState, type ReactNode, useCallback } from 'react';
import type { BaseUser } from '@/domain/models';
import { getCurrentUser, listAvailableUsers, setCurrentUser } from '@/infra/cache';

interface CurrentUserContextValue {
  user: BaseUser;
  availableUsers: BaseUser[];
  switchUser: (id: string) => void;
}

export const CurrentUserContext = createContext<CurrentUserContextValue | undefined>(undefined);

export function CurrentUserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<BaseUser>(() => getCurrentUser());
  const [availableUsers] = useState<BaseUser[]>(() => listAvailableUsers());

  const handleSwitchUser = useCallback((id: string) => {
    const next = setCurrentUser(id);
    setUser(next);
  }, []);

  const value = useMemo(() => ({ user, availableUsers, switchUser: handleSwitchUser }), [user, availableUsers, handleSwitchUser]);

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
}

