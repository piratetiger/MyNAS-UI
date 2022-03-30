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

import { BusyIndicatorComponent } from './busy-indicator/busy-indicator.component';
import { DynamicDialogConfig, DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { UserRoleDropdownComponent } from './user-role-dropdown/user-role-dropdown.component';
import { MediaToolbarComponent } from './media-list/media-toolbar/media-toolbar.component';
import { MediaListComponent } from './media-list/media-list/media-list.component';
import { LightboxComponent } from './media-list/lightbox/lightbox.component';

import { MediaListService } from './media-list/media-list-services/media-list.service';

import { AppDirectivesModule } from '../directives/app-directives.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        MediaToolbarComponent,
        MediaListComponent,
        LightboxComponent,
        BusyIndicatorComponent,
        UserRoleDropdownComponent,
    ],
    imports: [
        CommonModule,
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
        DeferModule,

        AppDirectivesModule
    ],
    exports: [
        MediaToolbarComponent,
        MediaListComponent,
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
        DeferModule,

        AppDirectivesModule
    ],
    providers: [
        DialogService,
        DynamicDialogConfig,
        DynamicDialogRef,
        MessageService,
        ConfirmationService,

        MediaListService
    ]
})
export class AppComponentsModule { }
