import {
  Component,
  ComponentRef,
  computed,
  effect,
  inject,
  Injector,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ContentCodeMap } from 'src/app/mappings/contentCodeMap';
import { HeaderCodeMap } from 'src/app/mappings/headerCodeMap';
import { HomeContextService } from 'src/app/services/contexts/home-context-service';
import { HOME_CONTEXT } from 'src/app/services/contexts/home-context-token';
import { DataService } from 'src/app/services/data/data-service';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage {
  pageFlowService = inject(PageFlowService);
  dataService = inject(DataService);
  homeContextService = inject(HomeContextService);
  injector = inject(Injector);

  @ViewChild('headerHost', { read: ViewContainerRef })
  headerVcr!: ViewContainerRef;

  @ViewChild('contentHost', { read: ViewContainerRef })
  contentVcr!: ViewContainerRef;

  private headerRef?: ComponentRef<any>;
  private contentRef?: ComponentRef<any>;

  homePageData = computed(() => this.dataService.dataConfig()?.homePage);

  constructor() {
    effect(() => {
      if (!this.homePageData()) {
        // console.log('this is running as per my assumption');
        return;
      }

      this.homeContextService.setHomeContext(this.homePageData());
    });

    effect(() => {
      const headerCode = this.pageFlowService.homeHeaderCode();
      const contentCode = this.pageFlowService.homeContentCode();

      if (!headerCode || !contentCode) {
        return;
      }
      this.renderHeader(headerCode);
      this.renderContent(contentCode);
    });
  }

  private createContextInjector() {
    return Injector.create({
      providers: [
        { provide: HOME_CONTEXT, useValue: this.homeContextService.context },
      ],
      parent: this.injector,
    });
  }

  renderHeader(code: any) {
    let headerComponent = HeaderCodeMap[code];
    this.headerVcr.clear();
    this.headerRef = this.headerVcr.createComponent(headerComponent, {
      injector: this.createContextInjector(),
    });
  }

  renderContent(code: any) {
    let contentComponent = ContentCodeMap[code];
    this.contentVcr.clear();
    this.contentRef = this.contentVcr.createComponent(contentComponent, {
      injector: this.createContextInjector(),
    });
  }
}
