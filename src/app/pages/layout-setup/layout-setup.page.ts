import { Component, inject, signal } from '@angular/core';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';
import {
  ConnectionInfo,
  LanTransfer,
  ServerInfo,
} from 'capacitor-lan-transfer';

@Component({
  selector: 'app-layout-setup',
  standalone: false,
  templateUrl: './layout-setup.page.html',
  styleUrls: ['./layout-setup.page.scss'],
})
export class LayoutSetupPage {
  pageFlowService = inject(PageFlowService);
  serverStatus = signal<any>(null);

  async onStartServer() {
    const info = await LanTransfer.initialize({
      role: 'server',
      port: 0,
      receiveMode: 'file',
      receiveFileName: `incoming_${Date.now()}.json`,
    });
    this.serverStatus.set(info);

    await LanTransfer.addListener('receiveComplete', (e) => {
      this.serverStatus.set(e.filePath);
    });
  }

  async onStopServer() {
    await LanTransfer.stopServer();
    this.serverStatus.set(null);
  }
}
