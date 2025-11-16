import type { BaseUser } from '@/domain/models';

const STORAGE_KEY = 'dbm-dashboard:current-user';

const AVAILABLE_USERS: BaseUser[] = [
  {
    id: 'admin-1',
    name: 'Usuário Adm',
    email: 'user.adm@test.com',
    initials: 'UA',
    role: 'admin',
  },
  {
    id: 'tech-1',
    name: 'Carlos Silva',
    email: 'carlos.silva@tech.com',
    initials: 'CS',
    role: 'técnico',
  },
];

let runtimeUser: BaseUser | null = null;

export function getCurrentUser(): BaseUser {
  const user = ensureCurrentUser();
  return cloneUser(user);
}

export function listAvailableUsers(): BaseUser[] {
  return AVAILABLE_USERS.map(cloneUser);
}

export function setCurrentUser(id: string): BaseUser {
  const nextUser = AVAILABLE_USERS.find((user) => user.id === id) ?? AVAILABLE_USERS[0];
  runtimeUser = nextUser;
  persistCurrentUser(nextUser.id);
  return cloneUser(nextUser);
}

function ensureCurrentUser(): BaseUser {
  if (runtimeUser) {
    return runtimeUser;
  }

  const storedId = readStoredUserId();
  const resolved = AVAILABLE_USERS.find((user) => user.id === storedId) ?? AVAILABLE_USERS[0];
  runtimeUser = resolved;
  persistCurrentUser(resolved.id);
  return resolved;
}

function readStoredUserId(): string | null {
  if (typeof window === 'undefined') {
    return runtimeUser?.id ?? null;
  }

  return window.localStorage.getItem(STORAGE_KEY);
}

function persistCurrentUser(id: string) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, id);
  }
}

function cloneUser(user: BaseUser): BaseUser {
  return { ...user } satisfies BaseUser;
}
