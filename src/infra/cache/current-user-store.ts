import type { BaseUser } from '@/domain/models';

const STORAGE_KEY = 'dbm-dashboard:current-user';
const LOGGED_OUT_KEY = '__none__';

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

let runtimeUser: BaseUser | null | undefined = undefined;

export function getCurrentUser(): BaseUser | null {
  const user = resolveCurrentUser();
  return cloneNullableUser(user);
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

export function clearCurrentUser(): void {
  runtimeUser = null;
  persistCurrentUser(null);
}

function resolveCurrentUser(): BaseUser | null {
  if (typeof runtimeUser !== 'undefined') {
    return runtimeUser;
  }

  const storedId = readStoredUserId();

  if (storedId === null) {
    runtimeUser = null;
    return runtimeUser;
  }

  if (!storedId) {
    const fallback = AVAILABLE_USERS[0];
    runtimeUser = fallback;
    persistCurrentUser(fallback.id);
    return fallback;
  }

  const resolved = AVAILABLE_USERS.find((user) => user.id === storedId);

  if (!resolved) {
    const fallback = AVAILABLE_USERS[0];
    runtimeUser = fallback;
    persistCurrentUser(fallback.id);
    return fallback;
  }

  runtimeUser = resolved;
  return resolved;
}

function readStoredUserId(): string | null | undefined {
  if (!isBrowser()) {
    return typeof runtimeUser === 'undefined' ? undefined : runtimeUser?.id ?? null;
  }

  const value = window.localStorage.getItem(STORAGE_KEY);

  if (value === null) {
    return undefined;
  }

  if (value === LOGGED_OUT_KEY) {
    return null;
  }

  return value;
}

function persistCurrentUser(id: string | null) {
  if (!isBrowser()) {
    return;
  }

  if (id === null) {
    window.localStorage.setItem(STORAGE_KEY, LOGGED_OUT_KEY);
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, id);
}

function cloneUser(user: BaseUser): BaseUser {
  return { ...user } satisfies BaseUser;
}

function cloneNullableUser(user: BaseUser | null): BaseUser | null {
  return user ? cloneUser(user) : null;
}

function isBrowser() {
  return typeof window !== 'undefined';
}
