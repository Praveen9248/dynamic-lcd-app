import { Component, computed, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from 'src/app/services/configuration/config-service';
import { LanTransferService } from 'src/app/services/LanTranfer/lan-transfer-service';
import { ScreenSaverService } from 'src/app/services/screen-saver/screen-saver-service';
import { PreferenceService } from 'src/app/services/storage/preference-service';

@Component({
  selector: 'app-configuration',
  standalone: false,
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit, OnDestroy {
  constructor(
    private LanService: LanTransferService,
    private configService: ConfigService,
    private preferenceService: PreferenceService,
    private router: Router,
    private screenSaverService: ScreenSaverService,

  ) { }

  serverStatus = computed(() => this.LanService.serverStatus());

  successLogs = computed(() => this.LanService.successLogs());

  errorLogs = computed(() => this.LanService.errorLogs());

  serverInfo = computed(() => this.LanService.serverInfo());

  receivedProgress = computed(() => this.LanService.receiveProgress());

  ngOnInit(): void {

    this.screenSaverService.disable();

    this.LanService.initOnce();
  }

  async onStartServer() {
    await this.LanService.onStartServer();
  }

  async onStopServer() {
    await this.LanService.onStopServer();
  }

  async activateConfiguration() {
    const path = this.LanService.receivedFilePath();
    if (!path) {
      this.LanService.show('No file path available yet, Try again');
      return;
    }
    try {

      const config = await this.configService.loadConfigFromFilePath(path);
      this.configService.configData.set(config);

      await this.onStopServer();
      this.preferenceService.setConfigured(true);
      this.preferenceService.setFilePath(path);
      await this.router.navigate(['home']);
    } catch (error) {
      console.error('Error loading received configuration:', error);
      this.LanService.pushErrorMessage(`Failed to activate config: ${(error as Error).message}`);
    }
  }

  ngOnDestroy(): void {
    this.LanService.destroyOnce();
  }
}
