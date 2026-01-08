import {
  Component,
  computed,
  inject,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  effect,
  Injector,
} from '@angular/core';

import { FilterCodeMap } from 'src/app/mappings/filterCodeMap';
import { ApiDataService } from 'src/app/services/api/api-data-service';
import { ProductsContextService } from 'src/app/services/contexts/productsContext/products-context-service';
import { PRODUCTS_CONTEXT } from 'src/app/services/contexts/productsContext/products-context-token';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';
import { UiConfigService } from 'src/app/services/uiConfig/ui-config-service';

@Component({
  selector: 'app-dynamic-page',
  standalone: false,
  templateUrl: './dynamic-page.page.html',
  styleUrls: ['./dynamic-page.page.scss'],
})
export class DynamicPagePage {
  pageFlowService = inject(PageFlowService);
  productsContextService = inject(ProductsContextService);
  injector = inject(Injector);
  apiDataService = inject(ApiDataService);

  @ViewChild('dynamicView', {
    read: ViewContainerRef,
    static: true,
  })
  vcr!: ViewContainerRef;

  private componentRef?: ComponentRef<any>;

  currentAttributePageKey = computed(
    () =>
      this.productsContextService.selectedCategoryAttributes()[
        this.pageFlowService.currentIntermediateIdx()
      ]
  );

  currentAttributePageComponent = computed(() => {
    let code = 'F0001';
    return FilterCodeMap[code];
  });

  constructor() {
    effect(() => {
      const component = this.currentAttributePageComponent();
      if (component) {
        this.loadComponent(component);
      }
    });

    effect(() => {
      if (!this.productsContextService.selectedCategoryAttributes()) {
        return;
      }

      let idx = this.pageFlowService.currentIntermediateIdx();
      let attributeContext = this.productsContextService.attributesContext(); //array of attribute objects full info
      let attributeKeys =
        this.productsContextService.selectedCategoryAttributes(); //ids of attributes

      if (!attributeContext || !attributeKeys?.length) {
        return;
      }

      let currentAttributeKey = attributeKeys[idx];

      if (!currentAttributeKey) {
        return;
      }

      let currentAttributeData = attributeContext.find(
        (att: any) => att.id === currentAttributeKey
      );
      this.productsContextService.setcurrentAttributePageData(
        currentAttributeData
      );
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

  private loadComponent(component: any) {
    this.vcr.clear();
    this.componentRef = this.vcr.createComponent(component, {
      injector: this.createContextInjector(),
    });

    if (this.componentRef.instance.action) {
      this.componentRef.instance.action.subscribe((action: any) => {
        this.handleFilterNavigate(action);
      });
    }
  }

  goNextStep() {
    if (
      this.pageFlowService.currentIntermediateIdx() <
      this.productsContextService.selectedCategoryAttributes().length - 1
    ) {
      this.pageFlowService.currentIntermediateIdx.update((i) => i + 1);
    } else {
      this.pageFlowService.goToNextPage();
    }
  }

  handleFilterNavigate(action: any) {
    this.productsContextService.attributeFilterList.update((ele) => [
      ...ele,
      action.payload,
    ]);
    this.goNextStep();
  }

  goToPrevPage() {
    if (this.productsContextService.attributeFilterList().length > 0) {
      this.productsContextService.attributeFilterList().pop();
    }
    this.pageFlowService.goToPrevPage();
  }

  goToHome() {
    this.productsContextService.attributeFilterList.set([]);
    this.pageFlowService.goToHomePage();
  }
}
