import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Attendance } from '@/domain/models';

interface TicketContextValue {
  queue: Attendance[];
  toggleStatus: (id: string) => void;
  remove: (id: string) => void;
  add: (attendance: Attendance) => void;
}

const TicketContext = createContext<TicketContextValue | null>(null);

export function TicketProvider({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState<Attendance[]>([]);

  function toggleStatus(id: string) {
    setQueue((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: item.status === 'Pendente' ? 'Resolvido' : 'Pendente' } : item,
      ),
    );
  }

  function remove(id: string) {
    setQueue((prev) => prev.filter((item) => item.id !== id));
  }

  function add(attendance: Attendance) {
    setQueue((prev) => [...prev, attendance]);
  }

  return (
    <TicketContext.Provider value={{ queue, toggleStatus, remove, add }}>
      {children}
    </TicketContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTicketContext() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTicketContext deve ser usado dentro de um TicketProvider');
  }
  return context;
}
