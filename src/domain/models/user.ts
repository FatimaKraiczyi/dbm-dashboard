export type UserRole = 'admin' | 'técnico' | 'cliente';

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: UserRole;
}

export type Client = BaseUser;
