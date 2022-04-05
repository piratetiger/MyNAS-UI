import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AppService } from 'src/app/shared/services/app.service';
import { head } from 'lodash-es';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnDestroy {
    public username: string;
    public password: string;

    public get canSubmit() {
        return this.username && this.password;
    }

    constructor(
        private api: ApiService,
        private service: AppService,
        private router: Router
    ) {
        super();
        this.service.showFooter(false);
    }

    ngOnDestroy() {
        this.service.showFooter(true);
        super.ngOnDestroy();
    }

    public keyPress(event) {
        if (event.keyCode === 13) {
            this.submit();
        }
    }

    public submit() {
        if (this.canSubmit) {
            this.api
                .login({
                    username: this.username,
                    password: this.password,
                })
                .subscribe((d) => {
                    var user = head(d.data);
                    if (user) {
                        this.service.refreshUserInfo(user);
                        this.router.navigate(['/']);
                    } else {
                        this.password = '';
                    }
                });
        }
    }
}
