import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppInfrastructureModule } from '../infrastructure/app-infrastructure.module';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { AppHeaderComponent } from './app-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from '../infrastructure/services/app.service/app.service';
import { UserModel } from '../infrastructure/models/user-model';
import { Router } from '@angular/router';

@Component({
    template: ''
})
export class AppLoginComponent {
}

describe('AppHeaderComponent', () => {
    let component: AppHeaderComponent;
    let fixture: ComponentFixture<AppHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'login', component: AppLoginComponent },
                ]),
                AppInfrastructureModule
            ],
            declarations: [
                AppHeaderComponent,
                AppLoginComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppHeaderComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return user name', () => {
        const service = TestBed.get(AppService);
        const mockGetUser = jest.spyOn(service, 'userInfo', 'get');

        mockGetUser.mockReturnValue(<UserModel>{ nickName: 'testNick', userName: 'testUser' });
        fixture.detectChanges();
        const element = fixture.nativeElement;
        const user = element.querySelector('.app-header-user span');
        expect(user.textContent).toEqual('testNick');

        mockGetUser.mockReturnValue(<UserModel>{ nickName: null, userName: 'testUser' });
        fixture.detectChanges();
        expect(user.textContent).toEqual('testUser');
    });

    it('should logout', () => {
        const service = TestBed.get(AppService);
        const mockGetUser = jest.spyOn(service, 'userInfo', 'get');
        const mockSetUser = jest.spyOn(service, 'userInfo', 'set');
        const router = TestBed.get(Router);
        const mockRouter = jest.spyOn(router, 'navigate');
        let userInfo: UserModel = <UserModel>{ nickName: 'testNick', userName: 'testUser' };

        mockGetUser.mockImplementation(() => {
            return userInfo;
        });
        mockSetUser.mockImplementation(u => {
            userInfo = u;
        });
        fixture.detectChanges();
        const element = fixture.nativeElement;
        expect(element.querySelector('.app-header-user')).toBeTruthy();

        component.logout();
        fixture.detectChanges();
        expect(element.querySelector('.app-header-user')).toBeFalsy();
        expect(mockRouter).toHaveBeenCalledWith(['/login']);
    });
});
