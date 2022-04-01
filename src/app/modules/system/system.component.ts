import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.scss'],
})
export class SystemComponent {
    constructor(private router: Router, private route: ActivatedRoute) {}

    public navigate(path: string) {
        this.router.navigate([path], {
            relativeTo: this.route,
        });
    }
}
