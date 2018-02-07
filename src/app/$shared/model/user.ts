import { UserRole } from '@genesis/$shared/constant/user-role';

export class User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
