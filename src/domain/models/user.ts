export interface BaseUser {
  id: string;
  name: string;
  email: string;
  initials: string;
}

export type Client = BaseUser;
export type Technician = BaseUser;
