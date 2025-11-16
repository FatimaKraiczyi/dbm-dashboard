import { useContext } from 'react';
import { ApiContext, type ApiContextValue } from '@/presentation/contexts';

export function useApiContext(): ApiContextValue {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiContext must be used within the AppProvider');
  }

  return context;
}
