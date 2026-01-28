import { Component, inject, signal } from '@angular/core';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';
import {
  ErrorEvent,
  LanTransfer,
  ProgressEvent,
  ReceiveCompleteEvent,
  StatusEvent,
} from 'capacitor-lan-transfer';

@Component({
  selector: 'app-layout-setup',
  standalone: false,
  templateUrl: './layout-setup.page.html',
  styleUrls: ['./layout-setup.page.scss'],
})
export class LayoutSetupPage {
  pageFlowService = inject(PageFlowService);
  serverStatus = signal<boolean>(false);
  serverInfo = signal<any>(null);
  uiConnectionUpdate = signal<any[]>([]);
  receiveProgress = signal<number>(0);

  private statusListener?: { remove: () => Promise<void> };
  private progressListener?: { remove: () => Promise<void> };
  private receiveListener?: { remove: () => Promise<void> };
  private errorListener?: { remove: () => Promise<void> };

  async ngOnInit() {
    this.registerEventListeners();
  }

  async registerEventListeners() {
    this.statusListener = await LanTransfer.addListener(
      'status',
      (e: StatusEvent) => {
        if (e.role !== 'server') return;

        switch (e.status) {
          case 'server_started':
            this.serverStatus.set(true);
            this.pushUIMessage(e.status);
            break;

          case 'server_stopped':
            this.serverStatus.set(false);
            this.pushUIMessage(e.status);
            break;

          case 'connection_accepted':
            this.receiveProgress.set(0);
            this.pushUIMessage('Client Connected');
            break;

          case 'client_disconnected':
            this.pushUIMessage('Client Disconnected');
            break;

          case 'connection_closed':
            this.pushUIMessage('Connection Closed');
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
      (e: ReceiveCompleteEvent) => {
        if (e.role !== 'server') return;
        this.receiveProgress.set(100);
        this.pushUIMessage(`File received (${e.totalBytes}) bytes`);
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

        this.pushUIMessage(`Error : ${e.message}`);
      },
    );
  }

  async onStartServer() {
    this.uiConnectionUpdate.set([]);
    await LanTransfer.initialize({
      role: 'server',
      port: 0,
      receiveMode: 'file',
      receiveFileName: 'configuration.json',
    });
    let info = await LanTransfer.getServerInfo();
    this.serverInfo.set(info);
  }

  async onStopServer() {
    await LanTransfer.stopServer();
    this.serverInfo.set(null);
  }

  pushUIMessage(message: any) {
    if (!message) return;
    this.uiConnectionUpdate.update((prev) => [...prev, message]);
  }

  async ngOnDestroy() {
    await this.statusListener?.remove();
    await this.errorListener?.remove();
    await this.progressListener?.remove();
    await this.receiveListener?.remove();
  }
}
