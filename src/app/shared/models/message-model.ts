export enum MessageType {
    Success,
    Info,
    Warn,
    Error
}

export class MessageModel {
    public type: MessageType;
    private _title: string;
    public get title(): string {
        if (this._title) {
            return this._title;
        }

        return MessageType[this.type] + ' Message';
    }
    public set title(value: string) {
        this._title = value;
    }
    public message: string;
}
