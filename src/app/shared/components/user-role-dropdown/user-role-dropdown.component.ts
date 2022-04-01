import { Component, Input, forwardRef } from '@angular/core';
import { UserRole } from '../../models/user-role';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'user-role-dropdown',
    templateUrl: './user-role-dropdown.component.html',
    styleUrls: ['./user-role-dropdown.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UserRoleDropdownComponent),
            multi: true,
        },
    ],
})
export class UserRoleDropdownComponent implements ControlValueAccessor {
    public roles = [];

    private _value;
    @Input() set value(v) {
        if (v !== this._value) {
            this._value = v;
            this.onChangeCallback(v);
        }
    }

    get value() {
        return this._value;
    }

    private onTouchedCallback = () => {};
    private onChangeCallback = (v) => {};

    constructor() {
        for (const key of Object.keys(UserRole)) {
            const value = parseInt(key, 10);
            if (!isNaN(value)) {
                this.roles.push({ label: UserRole[value], value: value });
            }
        }
    }

    writeValue(value: any): void {
        if (value !== this._value) {
            this._value = value;
        }
    }

    onBlur() {
        this.onTouchedCallback();
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }
}
