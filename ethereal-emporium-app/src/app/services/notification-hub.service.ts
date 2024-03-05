import { Inject, Injectable } from '@angular/core';
import { SignalRService } from './signal-r.service';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class NotificationHubService extends SignalRService {
  static ProductsImportSuccess = 'ImportSuccess';
  constructor(@Inject(API_URL) private api: string) {
    super(api);
  }

  init(): void {
    this.start('notifications');
  }
}
