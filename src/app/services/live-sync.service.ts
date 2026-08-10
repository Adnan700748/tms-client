import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel
} from '@microsoft/signalr';
import { Subject } from 'rxjs';

export interface EnrollmentStatusEvent {
  id: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

@Injectable({
  providedIn: 'root'
})
export class LiveSyncService {
  private platformId = inject(PLATFORM_ID);

  private connection: HubConnection | null = null;

  private eventsSubject = new Subject<EnrollmentStatusEvent>();

  // Components/stores subscribe to this stream.
  readonly events$ = this.eventsSubject.asObservable();

  // Allows the UI to display SignalR connection status.
  readonly connectionState = signal<
    'connected' | 'reconnecting' | 'disconnected'
  >('disconnected');

  connect(): void {
    // Prevent duplicate SignalR connections.
    if (this.connection) {
      return;
    }

    // SignalR's browser WebSocket connection should not run during SSR.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.connection = new HubConnectionBuilder()
      .withUrl('/hubs/tms')
      .withAutomaticReconnect([0, 2000, 10000, 30000])
      .configureLogging(LogLevel.Information)
      .build();

    // Backend:
    // ITmsHubClient.ReceiveEnrollmentStatusUpdated(...)
    //
    // SignalR exposes the C# method name as the client event name.
    this.connection.on(
      'ReceiveEnrollmentStatusUpdated',
      (
        enrollmentId: string,
        status: 'Pending' | 'Approved' | 'Rejected'
      ) => {
        this.eventsSubject.next({
          id: enrollmentId,
          status
        });
      }
    );

    this.connection.onreconnecting(() => {
      this.connectionState.set('reconnecting');
    });

    this.connection.onreconnected(() => {
      this.connectionState.set('connected');
    });

    this.connection.onclose(() => {
      this.connectionState.set('disconnected');
    });

    this.connection
      .start()
      .then(() => {
        this.connectionState.set('connected');
        console.log('SignalR connected to /hubs/tms');
      })
      .catch(err => {
        this.connectionState.set('disconnected');
        console.error('SignalR connection error:', err);
      });
  }
}