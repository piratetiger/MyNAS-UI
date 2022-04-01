import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';
import { UserModel } from '../../models/user-model';
import { UserRole } from '../../models/user-role';
import { BaseDirective } from '../base/base.directive';

@Directive({
    selector: '[dataAdminPermission]',
})
export class DataAdminPermissionDirective extends BaseDirective {
    private user: UserModel;

    constructor(
        private template: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private service: AppService
    ) {
        super();
        this.subscription.add(
            this.service.refreshUserInfo$.subscribe((user) => {
                this.user = user;
                this.updateView();
            })
        );
    }

    private updateView() {
        if (this.checkPermission()) {
            this.viewContainer.createEmbeddedView(this.template);
        } else {
            this.viewContainer.clear();
        }
    }

    private checkPermission(): boolean {
        if (this.user) {
            const role = this.user.role;
            if ([UserRole.DataAdmin, UserRole.SystemAdmin].indexOf(role) > -1) {
                return true;
            }
        }

        return false;
    }
}
