import { AppImagesComponent } from './app-images.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppInfrastructureModule } from '../infrastructure/app-infrastructure.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppHeaderComponent', () => {
    let component: AppImagesComponent;
    let fixture: ComponentFixture<AppImagesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'login', component: AppImagesComponent },
                ]),
                HttpClientTestingModule,
                AppInfrastructureModule
            ],
            declarations: [
                AppImagesComponent,
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppImagesComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
