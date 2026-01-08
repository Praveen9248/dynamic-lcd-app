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
import { ResultComponentCodeMap } from 'src/app/mappings/resultComponentCodeMap';
import { ApiDataService } from 'src/app/services/api/api-data-service';
import { ProductsContextService } from 'src/app/services/contexts/productsContext/products-context-service';
import { PRODUCTS_CONTEXT } from 'src/app/services/contexts/productsContext/products-context-token';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';

@Component({
  selector: 'app-results-page',
  standalone: false,
  templateUrl: './results-page.page.html',
  styleUrls: ['./results-page.page.scss'],
})
export class ResultsPagePage {
  pageFlowService = inject(PageFlowService);
  productsContextService = inject(ProductsContextService);
  apiDataService = inject(ApiDataService);
  injector = inject(Injector);

  @ViewChild('resultHost', { read: ViewContainerRef, static: true })
  resultsVcr!: ViewContainerRef;

  resultsRef!: ComponentRef<any>;

  resultComponent = computed(() => {
    let code =
      this.pageFlowService.flowConfig()?.flow?.result?.data?.resultCode;
    return ResultComponentCodeMap[code];
  });

  constructor() {
    this.productsContextService.applyNestedFilter();
    effect(() => {
      if (!this.resultComponent()) {
        return;
      }
      this.loadComponent(this.resultComponent());
    });
  }

  createContextInjector() {
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

  loadComponent(component: any) {
    this.resultsVcr.clear();
    // console.log(component);
    this.resultsRef = this.resultsVcr.createComponent(component, {
      injector: this.createContextInjector(),
    });
  }

  goPrevPage() {
    if (this.productsContextService.attributeFilterList().length > 0) {
      this.productsContextService.attributeFilterList().pop();
    }
    this.pageFlowService.goToPrevPage();
  }

  goHome() {
    this.productsContextService.attributeFilterList.set([]);
    this.pageFlowService.goToHomePage();
  }
}
