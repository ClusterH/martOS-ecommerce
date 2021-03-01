import { UserStore } from './user-store.model';

export interface UserStaff {
  id: string;
  name: string;
  userName: string;
  familyName: string;
  email: string;
  role: null;
  phoneNumber: number;
  password: null;
  lockoutEnd: string;
  stores?: UserStore[];
  isEnabled: boolean;
}
