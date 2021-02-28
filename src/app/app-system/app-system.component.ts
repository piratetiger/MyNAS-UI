import { Component, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-system',
    templateUrl: './app-system.component.html',
    styleUrls: ['./app-system.component.scss']
})
export class AppSystemComponent {
    constructor(private router: Router) { }

    public updateRoute(path: string) {
        this.router.navigateByUrl('/' + path);
    }
}
