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
import { IntermediateContextService } from 'src/app/services/contexts/intermediateFilterContext/nested-context-service';
import { NESTED_CONTEXT } from 'src/app/services/contexts/intermediateFilterContext/nested-context-token';
import { DataService } from 'src/app/services/data/data-service';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';

@Component({
  selector: 'app-dynamic-page',
  standalone: false,
  templateUrl: './dynamic-page.page.html',
  styleUrls: ['./dynamic-page.page.scss'],
})
export class DynamicPagePage {
  pageFlowService = inject(PageFlowService);
  dataService = inject(DataService);
  intermediateContextService = inject(IntermediateContextService);
  injector = inject(Injector);

  @ViewChild('dynamicView', {
    read: ViewContainerRef,
    static: true,
  })
  vcr!: ViewContainerRef;

  private componentRef?: ComponentRef<any>;

  IntermediatePages = computed(
    () => this.pageFlowService.flowConfig()?.flow?.intermediate?.pages ?? []
  );

  currentPage = computed(
    () =>
      this.IntermediatePages()[this.pageFlowService.currentIntermediateIdx()]
  );

  currentComponent = computed(() => {
    let code = this.currentPage()?.data?.code;
    return FilterCodeMap[code];
  });

  intermediatePageData = computed(
    () => this.dataService.dataConfig()?.intermediatePage
  );

  constructor() {
    effect(() => {
      const component = this.currentComponent();
      if (component) {
        this.loadComponent(component);
      }
    });

    effect(() => {
      if (!this.intermediatePageData()) {
        return;
      }
      let code = this.pageFlowService.currentIntermediateIdx();
      this.intermediateContextService.setIntermediateContext({
        data: this.intermediatePageData()?.data[code],
        style: this.intermediatePageData()?.style,
      });
    });
  }

  private createContextInjector() {
    return Injector.create({
      providers: [
        {
          provide: NESTED_CONTEXT,
          useValue: this.intermediateContextService.context,
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

    this.componentRef.instance.title = this.currentPage()?.data?.title;

    if (this.componentRef.instance.action) {
      this.componentRef.instance.action.subscribe((action: any) => {
        this.handleFilterNavigate(action);
      });
    }
  }

  goNextStep() {
    if (
      this.pageFlowService.currentIntermediateIdx() <
      this.IntermediatePages().length - 1
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
