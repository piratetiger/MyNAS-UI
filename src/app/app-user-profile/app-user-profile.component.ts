import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/api';
import { UserModel } from '../infrastructure/models/user-model';
import { AppService } from '../infrastructure/services/app.service/app.service';
import { ApiService } from '../infrastructure/services/api.service/api.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './app-user-profile.component.html',
    styleUrls: ['./app-user-profile.component.scss']
})
export class AppUserProfileComponent {
    public user: UserModel;
    public oldPassword = '';
    public newPassword = '';
    public confirmPassword = '';

    public get canSubmit(): boolean {
        if ((this.newPassword !== this.confirmPassword) || (this.oldPassword.length === 0 && this.newPassword.length !== 0)) {
            return false;
        }
        return true;
    }

    constructor(private appService: AppService, private apiService: ApiService) {
        this.user = appService.userInfo;
    }

    public submit() {
        this.apiService.updateUser({
            user: this.user,
            password: this.newPassword,
            oldPassword: this.oldPassword
        }).subscribe(d => {
            this.appService.userInfo = this.user;
        });
    }
}
