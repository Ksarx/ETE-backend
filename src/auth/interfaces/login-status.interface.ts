import { User } from 'src/user/entities/user.entity';

export interface LoginStatus {
  user: User;
  accessToken: any;
  expiresIn: any;
}
