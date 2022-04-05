import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user-model';
import { DialogService } from 'primeng/dynamicdialog';
import { AdminApiService } from '../services/admin-api.service';
import { ConfirmationService } from 'primeng/api';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';

@Component({
    selector: 'admin-user-config',
    templateUrl: './admin-user-config.component.html',
    styleUrls: ['./admin-user-config.component.scss'],
})
export class AdminUserConfigComponent implements OnInit {
    public users: UserModel[];
    public clonedUsers: { [s: string]: UserModel } = {};

    constructor(
        private adminApi: AdminApiService,
        private dialogService: DialogService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.refreshUsers();
    }

    public refreshUsers() {
        this.adminApi.getUserList().subscribe((d) => {
            this.users = [];
            if (d.data.length) {
                this.users = d.data;
            }
        });
    }

    public newUser() {
        const ref = this.dialogService.open(AdminAddUserComponent, {
            header: 'New User',
            width: '70%',
            height: '70%',
        });

        ref.onClose.subscribe((d) => {
            this.refreshUsers();
        });
    }

    public rowEditInit(user: UserModel) {
        this.clonedUsers[user.userName] = { ...user };
    }

    public rowEditSave(user: UserModel) {
        this.adminApi
            .updateUser({
                user: user,
                password: user.password,
            })
            .subscribe((d) => {});
    }

    public rowEditCancel(user: UserModel, index: number) {
        this.users[index] = this.clonedUsers[user.userName];
        delete this.clonedUsers[user.userName];
    }

    public rowDelete(user: UserModel, index: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this user?',
            accept: () => {
                this.adminApi
                    .deleteUser({
                        user: user,
                    })
                    .subscribe((d) => {
                        this.users.splice(index, 1);
                        delete this.clonedUsers[user.userName];
                    });
            },
        });
    }
}
