import { createContext } from 'react';
import type { BaseUser } from '@/domain/models';

export interface CurrentUserContextValue {
  user: BaseUser | null;
  availableUsers: BaseUser[];
  switchUser: (id: string) => void;
}

export const CurrentUserContext = createContext<CurrentUserContextValue | undefined>(undefined);

