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
import { switchMap, tap } from 'rxjs';

import { FilterCodeMap } from 'src/app/mappings/filterCodeMap';
import { ApiDataService } from 'src/app/services/api/api-data-service';
import { ProductsContextService } from 'src/app/services/contexts/productsContext/products-context-service';
import { PRODUCTS_CONTEXT } from 'src/app/services/contexts/productsContext/products-context-token';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';

@Component({
  selector: 'app-dynamic-page',
  standalone: false,
  templateUrl: './dynamic-page.page.html',
  styleUrls: ['./dynamic-page.page.scss'],
})
export class DynamicPagePage {
  pageFlowService = inject(PageFlowService);
  apiDataService = inject(ApiDataService);
  productsContextService = inject(ProductsContextService);
  injector = inject(Injector);

  @ViewChild('dynamicView', {
    read: ViewContainerRef,
    static: true,
  })
  vcr!: ViewContainerRef;

  private componentRef?: ComponentRef<any>;

  selectedCategoryAttributes = computed(() =>
    this.productsContextService.selectedCategoryAttributes()
  );

  currentAttributePageKey = computed(
    () =>
      this.selectedCategoryAttributes()[
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
      if (!this.selectedCategoryAttributes()) {
        return;
      }

      let idx = this.pageFlowService.currentIntermediateIdx();
      let attributeContext = this.productsContextService.attributesContext();
      let attributeKeys = this.selectedCategoryAttributes();

      if (!attributeContext || !attributeKeys?.length) {
        return;
      }

      let selectedAttributeKey = attributeKeys[idx];

      if (!selectedAttributeKey) {
        return;
      }

      let attributeData = attributeContext[selectedAttributeKey];
      this.productsContextService.setcurrentAttributePageData(attributeData);
    });
  }

  ngOnInit() {
    this.apiDataService
      .getIntermediateData()
      .pipe(
        tap((res) => this.apiDataService.intermediateData.set(res)),
        switchMap((res) =>
          this.apiDataService.getAttributes(res.dataSource.url)
        ),
        tap((attributes) =>
          this.productsContextService.setAttributesContext(attributes)
        )
      )
      .subscribe();
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
      this.selectedCategoryAttributes().length - 1
    ) {
      this.pageFlowService.currentIntermediateIdx.update((i) => i + 1);
    } else {
      this.pageFlowService.goToNextPage();
    }
  }

  handleFilterNavigate(action: any) {
    this.goNextStep();
  }

  goToPrevPage() {
    this.pageFlowService.goToPrevPage();
  }

  goToHome() {
    this.pageFlowService.goToHomePage();
  }
}
