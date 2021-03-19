import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { ToolbarModule } from 'primeng/toolbar';
import { FieldsetModule } from 'primeng/fieldset';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { DeferModule } from 'primeng/defer';

import { LightboxComponent } from './lightbox/lightbox.component';
import { BusyIndicatorComponent } from './busy-indicator/busy-indicator.component';
import { ImageViewerComponent } from './lightbox/image-viewer/image-viewer.component';
import { DynamicDialogConfig, DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { UserRoleDropdownComponent } from './user-role-dropdown/user-role-dropdown.component';
import { VideoViewerComponent } from './lightbox/video-viewer/video-viewer.component';
import { DetailViewerComponent } from './lightbox/detail-viewer/detail-viewer.component';

@NgModule({
    declarations: [
        LightboxComponent,
        DetailViewerComponent,
        ImageViewerComponent,
        VideoViewerComponent,
        BusyIndicatorComponent,
        UserRoleDropdownComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,

        BlockUIModule,
        ProgressSpinnerModule,
        DynamicDialogModule,
        DropdownModule,
        InputTextModule,
        PasswordModule,
        FileUploadModule,
        CheckboxModule,
        ToastModule,
        CalendarModule,
        ButtonModule,
        AccordionModule,
        ToolbarModule,
        FieldsetModule,
        ToggleButtonModule,
        ConfirmDialogModule,
        MultiSelectModule,
        TableModule,
        DataViewModule,
        DeferModule
    ],
    exports: [
        LightboxComponent,
        BusyIndicatorComponent,
        UserRoleDropdownComponent,

        BlockUIModule,
        ProgressSpinnerModule,
        DynamicDialogModule,
        DropdownModule,
        InputTextModule,
        PasswordModule,
        FileUploadModule,
        CheckboxModule,
        ToastModule,
        CalendarModule,
        ButtonModule,
        AccordionModule,
        ToolbarModule,
        FieldsetModule,
        ToggleButtonModule,
        ConfirmDialogModule,
        MultiSelectModule,
        TableModule,
        DataViewModule,
        DeferModule
    ],
    providers: [
        DialogService,
        DynamicDialogConfig,
        DynamicDialogRef,
        MessageService,
        ConfirmationService,
    ]
})
export class AppComponentsModule { }
