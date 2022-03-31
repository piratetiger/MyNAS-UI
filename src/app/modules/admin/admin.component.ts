import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'admin-main',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
    constructor(private router: Router, private route: ActivatedRoute) { }

    public navigate(path: string) {
        this.router.navigate([path], {
            relativeTo: this.route
        });
    }
}
