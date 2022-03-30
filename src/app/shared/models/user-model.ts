import { UserRole } from './user-role';

export class UserModel {
    public userName: string;
    public nickName: string;
    public password: string;
    public role: UserRole;
    public token: string;
}
