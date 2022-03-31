import { Directive, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';
import { UserRole } from '../../models/user-role';

@Directive({
    selector: '[systemAdminPermission]'
})
export class SystemAdminPermissionDirective implements OnInit {
    constructor(private template: TemplateRef<any>, private viewContainer: ViewContainerRef, private service: AppService) { }

    ngOnInit() {
        this.updateView();
    }

    private updateView() {
        if (this.checkPermission()) {
            this.viewContainer.createEmbeddedView(this.template);
        } else {
            this.viewContainer.clear();
        }
    }

    private checkPermission(): boolean {
        const user = this.service.userInfo;

        if (user) {
            const role = user.role;
            if (UserRole.SystemAdmin === role) {
                return true;
            }
        }

        return false;
    }
}
