import { Inject, Injectable } from '@angular/core';
import { SignalRService } from './signal-r.service';
import { API_URL } from '../app.config';
import { take } from 'rxjs';

enum NotificationType {
  ImportSuccess = 'ImportSuccess',
}

@Injectable({
  providedIn: 'root',
})
export class NotificationHubService extends SignalRService {
  constructor(@Inject(API_URL) private api: string) {
    super(api);
  }

  init(): void {
    this.hubInitiated.pipe(take(1)).subscribe(() => {
      this.listenNotifications();
    });
    this.start('notifications');
  }

  listenNotifications() {
    console.log('Listening for notifications');
    this.on(NotificationType.ImportSuccess, (notification) => {
      console.log('New notification', notification);
    });
  }
}
