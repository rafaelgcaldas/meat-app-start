import { EventEmitter } from "@angular/core";

export class NotificationService {
    public notifier = new EventEmitter<string>();

    public notify(message: string) {
        this.notifier.emit(message);
    }
}