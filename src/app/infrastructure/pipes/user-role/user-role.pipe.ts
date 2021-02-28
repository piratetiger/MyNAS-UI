import { PipeTransform, Pipe } from '@angular/core';
import { UserRole } from '../../models/user-role';

@Pipe({ name: 'userRole' })
export class UserRolePipe implements PipeTransform {
    transform(value: any) {
        return UserRole[value];
    }
}
