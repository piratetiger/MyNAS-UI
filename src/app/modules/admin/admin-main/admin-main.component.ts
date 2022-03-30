import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'admin-main',
    templateUrl: './admin-main.component.html',
    styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent {
    constructor(private router: Router, private route: ActivatedRoute) { }

    public navigate(path: string) {
        this.router.navigate([path], {
            relativeTo: this.route
        });
    }
}
