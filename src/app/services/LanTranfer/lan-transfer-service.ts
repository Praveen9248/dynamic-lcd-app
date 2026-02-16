import { inject, Injectable, signal } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import {
  ErrorEvent,
  LanTransfer,
  ProgressEvent,
  ReceiveCompleteEvent,
  StatusEvent,
} from 'capacitor-lan-transfer';

@Injectable({
  providedIn: 'root',
})
export class LanTransferService {

  //variables for tracking the server status and other details
  serverStatus = signal<boolean>(false);
  serverInfo = signal<any>(null);
  successLogs = signal<any[]>([]);
  errorLogs = signal<any[]>([]);
  receiveProgress = signal<number>(0);
  receivedFilePath = signal<any>(null);


  //listeners for tracking the events
  private statusListener?: { remove: () => Promise<void> };
  private progressListener?: { remove: () => Promise<void> };
  private receiveListener?: { remove: () => Promise<void> };
  private errorListener?: { remove: () => Promise<void> };

  //method for initializing the listeners
  initOnce() {
    this.registerEventListeners();
  }

  loadingController = inject(LoadingController);

  private loader = signal<HTMLIonLoadingElement | null>(null);

  async show(message: string = "Please wait...") {
    if (this.loader()) return;
    this.loader.set(await this.loadingController.create({
      message,
      spinner: 'crescent',
      backdropDismiss: false,
    }));
    await this.loader()?.present();
  }

  async hide() {
    await this.loader()?.dismiss();
    this.loader.set(null);
  }

  //method for registering the event listeners
  async registerEventListeners() {
    this.statusListener = await LanTransfer.addListener(
      'status',
      (e: StatusEvent) => {
        if (e.role !== 'server') return;

        switch (e.status) {
          case 'server_started':
            this.serverStatus.set(true);
            this.pushSuccessMessage(e.status);
            break;

          case 'server_stopped':
            this.serverStatus.set(false);
            this.pushSuccessMessage(e.status);
            break;

          case 'connection_accepted':
            this.receiveProgress.set(0);
            this.pushSuccessMessage('Client Connected');
            break;

          case 'receive_started':
            this.show('Receiving file...');
            break;

          case 'client_disconnected':
            this.pushSuccessMessage('Client Disconnected');
            break;

          case 'connection_closed':
            this.pushSuccessMessage('Connection Closed');
            break;
        }
      },
    );

    this.progressListener = await LanTransfer.addListener(
      'progress',
      (e: ProgressEvent) => {
        if (e.role !== 'server' || e.direction !== 'receive') return;
        this.receiveProgress.set(e.percent);
      },
    );

    this.receiveListener = await LanTransfer.addListener(
      'receiveComplete',
      async (e: ReceiveCompleteEvent) => {
        if (e.role !== 'server') return;
        this.receiveProgress.set(100);
        this.hide();
        this.pushSuccessMessage(`File received (${e.totalBytes}) bytes`);
        this.receivedFilePath.set(e.filePath);
      },
    );

    this.errorListener = await LanTransfer.addListener(
      'error',
      (e: ErrorEvent) => {
        if (
          e.role !== 'server' &&
          e.code === 'SERVER_ERROR' &&
          e.message?.includes('Socket')
        )
          return;
        this.hide();
        this.pushErrorMessage(`Error : ${e.message}`);
      },
    );
  }

  //method for starting the server
  async onStartServer() {
    this.errorLogs.set([]);
    this.successLogs.set([]);
    await LanTransfer.initialize({
      role: 'server',
      port: 0,
      receiveMode: 'file',
      receiveFileName: 'configuration.json',
    });
    let info = await LanTransfer.getServerInfo();
    this.pushSuccessMessage(`Server started on ${info.ip} and ${info.port}`);
    this.serverInfo.set(info);
  }

  //method for stopping the server
  async onStopServer() {
    await LanTransfer.stopServer();
    this.serverInfo.set(null);
    this.serverStatus.set(false)
  }

  //method for pushing the success messages
  pushSuccessMessage(message: any) {
    if (!message) return;
    this.successLogs.update((prev) => [message, ...prev]);
  }

  //method for pushing the error messages
  pushErrorMessage(message: any) {
    if (!message) return;
    this.errorLogs.update((prev) => [message, ...prev]);
  }

  //method for destroying the listeners
  async destroyOnce() {
    await this.statusListener?.remove();
    await this.errorListener?.remove();
    await this.progressListener?.remove();
    await this.receiveListener?.remove();
  }
}
