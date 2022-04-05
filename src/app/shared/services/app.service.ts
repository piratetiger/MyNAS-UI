import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as store from 'store';
import { MessageModel } from '../models/message-model';
import { UserModel } from '../models/user-model';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    private showMessageSubject = new BehaviorSubject<MessageModel>(null);
    public showMessage$ = this.showMessageSubject.asObservable();
    public showMessage(message: MessageModel) {
        this.showMessageSubject.next(message);
    }

    private isHeaderDisplay = true;
    private showHeaderSubject = new BehaviorSubject<boolean>(
        this.isHeaderDisplay
    );
    public showHeader$ = this.showHeaderSubject.asObservable();
    public showHeader(display: boolean) {
        this.isHeaderDisplay = display;
        this.showHeaderSubject.next(this.isHeaderDisplay);
    }

    private isFooterDisplay = true;
    private showFooterSubject = new BehaviorSubject<boolean>(
        this.isFooterDisplay
    );
    public showFooter$ = this.showFooterSubject.asObservable();
    public showFooter(display: boolean) {
        this.isFooterDisplay = display;
        this.showFooterSubject.next(this.isFooterDisplay);
    }

    private busyIndicatorCounter = 0;
    private busyIndicatorSubject = new BehaviorSubject<boolean>(false);
    public busyIndicator$ = this.busyIndicatorSubject.asObservable();
    public increaseBusyIndicator() {
        this.busyIndicatorCounter++;
        this.updateBusyIndicator();
    }
    public decreaseBusyIndicator() {
        this.busyIndicatorCounter--;
        this.updateBusyIndicator();
    }
    public resetBusyIndicator() {
        this.busyIndicatorCounter = 0;
        this.updateBusyIndicator();
    }
    private updateBusyIndicator() {
        this.busyIndicatorSubject.next(this.busyIndicatorCounter > 0);
    }

    private refreshUserInfoSubject = new BehaviorSubject<UserModel>(null);
    public refreshUserInfo$ = this.refreshUserInfoSubject.asObservable();
    public refreshUserInfo(user: UserModel) {
        store.set('loginInfo', user);
        this.refreshUserInfoSubject.next(user);
    }

    constructor() {
        const user = store.get('loginInfo');
        this.refreshUserInfo(user);
    }
}
