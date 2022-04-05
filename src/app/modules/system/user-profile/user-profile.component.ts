import { Component } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user-model';
import { AppService } from 'src/app/shared/services/app.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent extends BaseComponent {
    public user: UserModel;
    public oldPassword = '';
    public newPassword = '';
    public confirmPassword = '';

    public get canSubmit(): boolean {
        if (
            this.oldPassword.length &&
            this.newPassword.length &&
            this.newPassword === this.confirmPassword
        ) {
            return true;
        }
        return false;
    }

    constructor(private service: AppService, private api: ApiService) {
        super();
        this.subscription.add(
            this.service.refreshUserInfo$.subscribe((user) => {
                this.user = user;
            })
        );
    }

    public submit() {
        this.api.user
            .updateItem({
                user: this.user,
                password: this.newPassword,
                oldPassword: this.oldPassword,
            })
            .subscribe((d) => {
                this.service.refreshUserInfo(this.user);
            });
    }
}
