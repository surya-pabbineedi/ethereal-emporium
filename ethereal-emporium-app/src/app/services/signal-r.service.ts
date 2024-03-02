import { EventEmitter, Inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  hubConnection!: signalR.HubConnection;
  hubInitiated = new EventEmitter<void>();

  constructor(@Inject(API_URL) private apiURL: string) {}

  start(endpoint: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.apiURL}/${endpoint}`)
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log(`Connection established to ${this.apiURL}/${endpoint}`);
        this.hubInitiated.emit();
      })
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  on(eventName: string, callback: (data: any) => void) {
    this.hubConnection.on(eventName, callback);
  }

  stop() {
    this.hubConnection.stop();
  }
}
