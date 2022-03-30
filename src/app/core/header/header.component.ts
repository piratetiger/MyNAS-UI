import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service/app.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public get user() {
        return this.service.userInfo;
    }

    constructor(private service: AppService, private router: Router) { }

    public logout() {
        this.service.userInfo = null;
        this.router.navigate(['/login']);
    }
}
