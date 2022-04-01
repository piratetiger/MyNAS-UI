import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[base]'
})
export class BaseDirective implements OnDestroy {
    protected subscription = new Subscription();

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
