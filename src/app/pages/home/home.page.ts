import {
  Component,
  ComponentRef,
  computed,
  effect,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { ContentCodeMap } from 'src/app/mappings/contentCodeMap';
import { HeaderCodeMap } from 'src/app/mappings/headerCodeMap';

import { ApiService } from 'src/app/services/api/api-service';
import { ConfigService } from 'src/app/services/configuration/config-service';
import { ScreenSaverService } from 'src/app/services/screen-saver/screen-saver-service';
import { PreferenceService } from 'src/app/services/storage/preference-service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild('headerHost', { read: ViewContainerRef })
  headerVcr!: ViewContainerRef;

  @ViewChild('contentHost', { read: ViewContainerRef })
  contentVcr!: ViewContainerRef;

  private headerRef?: ComponentRef<any>;
  private contentRef?: ComponentRef<any>;
  private isDestroyed = false;

  mode = computed(() => this.configService.mode());

  constructor(
    private configService: ConfigService,
    private apiDataService: ApiService,
    private screenSaverService: ScreenSaverService,
    private preferenceService: PreferenceService,
    private router: Router
  ) {
    effect(async () => {
      const isConfigured = this.preferenceService.isConfigured();
      const path = this.preferenceService.filePath();

      if (isConfigured && path) {
        try {
          const config = await this.configService.loadConfigFromFilePath(path);
          this.setConfig(config);
        } catch (error) {
          console.error('Error loading config from file:', error);
          this.router.navigate(['configuration']);
        }
      } else if (isConfigured === false) {
        this.router.navigate(['configuration']);
      }
    });

    effect(() => {
      const headerCode = this.configService.configData()?.header?.headerType;
      const contentCode = this.configService.configData()?.content?.contentType;

      if (!headerCode || !contentCode) {
        return;
      }
      this.renderHeader(headerCode);
      this.renderContent(contentCode);
    });
  }

  ngOnInit() {
    this.apiDataService.getApiData().subscribe({
      next: (res) => {
        this.apiDataService.apiData.set(res);
        console.log(res);
      },
    });
  }

  ngOnDestroy() {
    this.isDestroyed = true;
    this.screenSaverService.disable();
  }

  setConfig(res: any) {
    if (this.isDestroyed) return;

    this.configService.configData.set(res);
    console.log(res);

    this.configService.mode.set(res?.template?.flowType);
    if (res?.screenSaver) {
      this.screenSaverService.configure(
        res.screenSaver.screenSaverStatus,
        res.screenSaver.timeout
      );
    }
  }

  renderHeader(code: any) {
    let headerComponent = HeaderCodeMap[code];
    this.headerVcr.clear();
    this.headerRef = this.headerVcr.createComponent(headerComponent);
  }

  renderContent(code: any) {
    let contentComponent = ContentCodeMap[code];
    this.contentVcr.clear();
    this.contentRef = this.contentVcr.createComponent(contentComponent);
  }
}
