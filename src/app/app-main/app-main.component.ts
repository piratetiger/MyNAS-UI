import { Component, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './app-main.component.html',
    styleUrls: ['./app-main.component.scss']
})
export class AppMainComponent {
    constructor(private router: Router) { }

    public updateRoute(path: string) {
        this.router.navigateByUrl('/' + path);
    }
}
