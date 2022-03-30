import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppService } from './shared/services/app.service/app.service';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                SharedModule
            ],
            declarations: [
                AppComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle busy', () => {
        const service: AppService = TestBed.get(AppService);

        fixture.detectChanges();
        expect(component.isBusy).toBeFalsy();
        service.busyIndicator.emit(true);
        fixture.detectChanges();
        expect(component.isBusy).toBeTruthy();
    });

    it('should toggle header', () => {
        const service: AppService = TestBed.get(AppService);

        fixture.detectChanges();
        const element = fixture.nativeElement;
        expect(element.querySelector('app-header')).toBeTruthy();
        service.showHeader.emit(false);
        fixture.detectChanges();
        expect(element.querySelector('app-header')).toBeFalsy();
    });

    it('should toggle footer', () => {
        const service: AppService = TestBed.get(AppService);

        fixture.detectChanges();
        const element = fixture.nativeElement;
        expect(element.querySelector('app-footer')).toBeTruthy();
        service.showFooter.emit(false);
        fixture.detectChanges();
        expect(element.querySelector('app-footer')).toBeFalsy();
    });
});
