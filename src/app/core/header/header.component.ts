import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { AppService } from 'src/app/shared/services/app.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent {
    public user;

    constructor(private service: AppService, private router: Router) {
        super();
        this.subscription.add(
            this.service.refreshUserInfo$.subscribe((user) => {
                this.user = user;
            })
        );
    }

    public logout() {
        this.service.refreshUserInfo(null);
        this.router.navigate(['/login']);
    }
}
