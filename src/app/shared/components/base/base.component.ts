import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-base',
    template: '',
})
export class BaseComponent implements OnDestroy {
    protected subscription = new Subscription();

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
