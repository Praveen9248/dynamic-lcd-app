import {
  Component,
  ComponentRef,
  effect,
  inject,
  Injector,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { ContentCodeMap } from 'src/app/mappings/contentCodeMap';
import { HeaderCodeMap } from 'src/app/mappings/headerCodeMap';

import { ProductsContextService } from 'src/app/services/contexts/productsContext/products-context-service';
import { PRODUCTS_CONTEXT } from 'src/app/services/contexts/productsContext/products-context-token';

import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';
import { ApiDataService } from 'src/app/services/api/api-data-service';
import { UiConfigService } from 'src/app/services/uiConfig/ui-config-service';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage {
  pageFlowService = inject(PageFlowService);
  apiDataService = inject(ApiDataService);
  productsContextService = inject(ProductsContextService);
  uiConfigDataService = inject(UiConfigService);
  injector = inject(Injector);

  @ViewChild('headerHost', { read: ViewContainerRef })
  headerVcr!: ViewContainerRef;

  @ViewChild('contentHost', { read: ViewContainerRef })
  contentVcr!: ViewContainerRef;

  private headerRef?: ComponentRef<any>;
  private contentRef?: ComponentRef<any>;

  constructor() {
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

  ngOnInit() {
    this.uiConfigDataService.fetchUiConfigData().subscribe({
      next: (res) => this.uiConfigDataService.uiConfigData.set(res),
    });

    this.apiDataService.fetchData().subscribe({
      next: (res) => {
        this.productsContextService.setCategoryContext(res.categories);
        this.productsContextService.setAttributesContext(res.attributes);
        this.productsContextService.setProductsContext(res.products);
      },
    });
  }

  private createContextInjector() {
    return Injector.create({
      providers: [
        {
          provide: PRODUCTS_CONTEXT,
          useValue: this.productsContextService,
        },
      ],
      parent: this.injector,
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
    this.contentRef = this.contentVcr.createComponent(contentComponent, {
      injector: this.createContextInjector(),
    });
  }
}
