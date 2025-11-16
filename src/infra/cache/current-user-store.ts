import type { BaseUser } from '@/domain/models';

const currentUser: BaseUser = {
  id: 'admin-1',
  name: 'Usuário Adm',
  email: 'user.adm@test.com',
  initials: 'UA',
};

export function getCurrentUser(): BaseUser {
  return currentUser;
}
