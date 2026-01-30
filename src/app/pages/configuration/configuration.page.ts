import { Component, computed, OnDestroy, OnInit } from '@angular/core';
import { LanTransferService } from 'src/app/services/LanTranfer/lan-transfer-service';

@Component({
  selector: 'app-configuration',
  standalone: false,
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit, OnDestroy {
  constructor(private LanService: LanTransferService) {}

  serverStatus = computed(() => this.LanService.serverStatus());

  successLogs = computed(() => this.LanService.successLogs());

  errorLogs = computed(() => this.LanService.errorLogs());

  serverInfo = computed(() => this.LanService.serverInfo());

  receivedProgress = computed(() => this.LanService.receiveProgress());

  ngOnInit(): void {
    this.LanService.initOnce();
  }

  onStartServer() {
    this.LanService.onStartServer();
  }

  onStopServer() {
    this.LanService.onStopServer();
  }

  ngOnDestroy(): void {
    this.LanService.destroyOnce();
  }
}
