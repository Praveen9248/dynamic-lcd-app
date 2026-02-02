import {
  Component,
  ComponentRef,
  computed,
  effect,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ContentCodeMap } from 'src/app/mappings/contentCodeMap';
import { HeaderCodeMap } from 'src/app/mappings/headerCodeMap';

import { ApiService } from 'src/app/services/api/api-service';
import { ConfigService } from 'src/app/services/configuration/config-service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('headerHost', { read: ViewContainerRef })
  headerVcr!: ViewContainerRef;

  @ViewChild('contentHost', { read: ViewContainerRef })
  contentVcr!: ViewContainerRef;

  private headerRef?: ComponentRef<any>;
  private contentRef?: ComponentRef<any>;

  flowType = computed(() => this.configService.flowType());

  primaryData = computed(() => this.apiDataService.primaryFeatureData());

  constructor(
    private configService: ConfigService,
    private apiDataService: ApiService,
  ) {
    effect(() => {
      const type = this.flowType();
      const apiData = this.apiDataService.apiData();
      if (!type || !apiData) return;
      this.apiDataService.loadPrimaryFeature(type);
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
    this.configService.getConfig().subscribe({
      next: (res) => {
        this.configService.configData.set(res);
        this.configService.flowType.set(res.flowType);
      },
    });

    this.apiDataService.getApiData().subscribe({
      next: (res) => {
        this.apiDataService.apiData.set(res);
        console.log(res);
      },
    });
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
