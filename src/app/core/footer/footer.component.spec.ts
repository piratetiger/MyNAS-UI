import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterComponent } from './footer.component';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    template: ''
})
export class AppImagesComponent {
}

@Component({
    template: ''
})
export class AppVideosComponent {
}

@Component({
    template: ''
})
export class AppFilesComponent {
}

@Component({
    template: ''
})
export class AppSystemComponent {
}

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;
    let location: Location;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'images', component: AppImagesComponent },
                    { path: 'videos', component: AppVideosComponent },
                    { path: 'files', component: AppFilesComponent },
                    { path: 'system', component: AppSystemComponent },
                ]),
                SharedModule
            ],
            declarations: [
                FooterComponent,
                AppImagesComponent,
                AppVideosComponent,
                AppFilesComponent,
                AppSystemComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        location = TestBed.get(Location);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate images', () => {
        fixture.detectChanges();
        const element = fixture.nativeElement;
        const imagesIcon = element.querySelectorAll('.app-footer-item a')[0];
        expect(imagesIcon.textContent).toEqual('Images');
        imagesIcon.click();
        fixture.detectChanges();
        expect(location.path()).toEqual('/images');
    });

    it('should navigate videos', () => {
        fixture.detectChanges();
        const element = fixture.nativeElement;
        const imagesIcon = element.querySelectorAll('.app-footer-item a')[1];
        expect(imagesIcon.textContent).toEqual('Videos');
        imagesIcon.click();
        fixture.detectChanges();
        expect(location.path()).toEqual('/videos');
    });

    it('should navigate files', () => {
        fixture.detectChanges();
        const element = fixture.nativeElement;
        const imagesIcon = element.querySelectorAll('.app-footer-item a')[2];
        expect(imagesIcon.textContent).toEqual('Files');
        imagesIcon.click();
        fixture.detectChanges();
        expect(location.path()).toEqual('/files');
    });

    it('should navigate system', () => {
        fixture.detectChanges();
        const element = fixture.nativeElement;
        const imagesIcon = element.querySelectorAll('.app-footer-item a')[3];
        expect(imagesIcon.textContent).toEqual('System');
        imagesIcon.click();
        fixture.detectChanges();
        expect(location.path()).toEqual('/system');
    });
});
