import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { NgToastModule, NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    NgToastModule,
    HttpClientModule,
    CommonModule,
    RouterOutlet,
    MatDialogModule,

  ],
})
export class AppComponent {
  protected tAlert = inject(NgToastService);
  title = 'Moto Entregada';

  private socket!: WebSocket;

  constructor() {
    this.startWebSocket();
  }
  startWebSocket() {
    this.socket = new WebSocket('ws://localhost:3000/socket'); // URL do seu WebSocket

    this.socket.onmessage = (event) => {
      this.showNotification('Nova mensagem', event.data);
    };

    this.socket.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
    };
  }

  showNotification(title: string, message: any) {
    console.log('title',title);
    console.log('message',message);
    //const  [type,message] = message

    let msg = JSON.parse(message)
    console.log('msg',msg);

    this.tAlert.info({
      detail: msg.type,
      summary: msg.message,
      duration: 5000,
    });


    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(msg.type, { body: msg.message });
    } else if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(msg.type, { body: msg.message });
        }
      });
    }
  }
}
