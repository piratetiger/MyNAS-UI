import { Component } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user-model';
import { UserRole } from 'src/app/shared/models/user-role';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminApiService } from '../../services/admin-api.service';

@Component({
    selector: 'admin-add-user',
    templateUrl: './admin-add-user.component.html',
    styleUrls: ['./admin-add-user.component.scss']
})
export class AdminAddUserComponent {
    public user: UserModel;

    constructor(private adminApi: AdminApiService, private ref: DynamicDialogRef) {
        this.user = new UserModel();
        this.user.role = UserRole.User;
    }

    public submit() {
        this.adminApi.createUser({
            user: this.user,
            password: this.user.password
        }).subscribe(d => {
            this.ref.close();
        });
    }
}
