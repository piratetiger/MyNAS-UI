import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../infrastructure/services/api.service/api.service';
import { AppService } from '../infrastructure/services/app.service/app.service';
import { head } from 'lodash-es';

@Component({
    selector: 'app-login',
    templateUrl: './app-login.component.html',
    styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent implements OnDestroy {
    public username: string;
    public password: string;

    public get canSubmit() {
        return this.username && this.password;
    }

    constructor(private service: ApiService, private appService: AppService, private router: Router) {
        this.appService.showFooter.emit(false);
    }

    ngOnDestroy() {
        this.appService.showFooter.emit(true);
    }

    public keyPress(event) {
        if (event.keyCode === 13) {
            this.submit();
        }
    }

    public submit() {
        if (this.canSubmit) {
            this.service.login({
                username: this.username,
                password: this.password
            }).subscribe(d => {
                var user = head(d.data);
                if (user) {
                    this.appService.userInfo = user;
                    this.router.navigateByUrl('/');
                } else {
                    this.password = '';
                }
            });
        }
    }
}
