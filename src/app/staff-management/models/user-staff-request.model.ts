export interface UserStaffRequest {
  id?: string;
  userName: string;
  name: string;
  familyName: string;
  normalizedUserName?: string;
  givenName?: string;
  email: string;
  normalizedEmail?: string;
  emailConfirmed?: string;
  role?: string;
  password: string;
  phoneNumber: number;
  phoneNumberConfirmed?: number;
  referenceStoreId?: string;
  country?: string;
  lockoutEnd?: string;
  isEnabled?: boolean;
}
