import { Component } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user-model';
import { AppService } from 'src/app/shared/services/app.service';
import { ApiService } from 'src/app/shared/services/api.service/api.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
    public user: UserModel;
    public oldPassword = '';
    public newPassword = '';
    public confirmPassword = '';

    public get canSubmit(): boolean {
        if (this.oldPassword.length && this.newPassword.length && this.newPassword === this.confirmPassword) {
            return true;
        }
        return false
    }

    constructor(private appService: AppService, private apiService: ApiService) {
        this.user = appService.userInfo;
    }

    public submit() {
        this.apiService.userService.updateItem({
            user: this.user,
            password: this.newPassword,
            oldPassword: this.oldPassword
        }).subscribe(d => {
            this.appService.userInfo = this.user;
        });
    }
}
