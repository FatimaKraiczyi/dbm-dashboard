import { createContext } from 'react';
import type { BaseUser } from '@/domain/models';

export interface ApiContextValue {
  setCurrentUser: (user: BaseUser | null) => void;
  getCurrentUser: () => BaseUser | null;
}

export const ApiContext = createContext<ApiContextValue | null>(null);
