import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../infrastructure/services/app.service/app.service';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {
    public get user() {
        return this.service.userInfo;
    }

    constructor(private service: AppService, private router: Router) { }

    public logout() {
        this.service.userInfo = null;
        this.router.navigate(['/login']);
    }
}
