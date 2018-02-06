import { UserRole } from '@genesis/$shared/constant/user-role';

export class User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}
