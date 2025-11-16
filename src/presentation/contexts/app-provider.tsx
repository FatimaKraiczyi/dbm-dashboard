/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { BaseUser } from '@/domain/models';
import { clearCurrentUser, getCurrentUser, listAvailableUsers, setCurrentUser } from '@/infra/cache';

interface SessionContextValue {
  user: BaseUser | null;
  availableUsers: BaseUser[];
  switchUser: (id: string) => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<BaseUser | null>(() => getCurrentUser());
  const [availableUsers] = useState<BaseUser[]>(() => listAvailableUsers());

  const switchUser = useCallback((id: string) => {
    const next = setCurrentUser(id);
    setUser(next);
  }, []);

  const logout = useCallback(() => {
    clearCurrentUser();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      availableUsers,
      switchUser,
      logout,
    }),
    [user, availableUsers, switchUser, logout],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within the SessionProvider');
  }

  return context;
}
