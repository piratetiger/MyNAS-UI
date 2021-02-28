import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-main',
    templateUrl: './admin-main.component.html',
    styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent {
    constructor(private router: Router) { }

    public updateRoute(path: string) {
        this.router.navigateByUrl('/' + path);
    }
}
