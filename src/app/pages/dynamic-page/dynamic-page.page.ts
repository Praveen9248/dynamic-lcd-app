import {
  Component,
  computed,
  inject,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  effect,
} from '@angular/core';

import { FilterCodeMap } from 'src/app/mappings/filterCodeMap';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';

@Component({
  selector: 'app-dynamic-page',
  standalone: false,
  templateUrl: './dynamic-page.page.html',
  styleUrls: ['./dynamic-page.page.scss'],
})
export class DynamicPagePage {
  pageFlowService = inject(PageFlowService);

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

  constructor() {
    effect(() => {
      const component = this.currentComponent();
      if (component) {
        this.loadComponent(component);
      }
    });
  }

  private loadComponent(component: any) {
    this.vcr.clear();

    this.componentRef = this.vcr.createComponent(component);

    // this.componentRef.instance.title = this.currentPage()?.data?.title;

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
    // console.log(action);
    this.goNextStep();
  }

  goToPrevPage() {
    this.pageFlowService.goToPrevPage();
  }

  goToHome() {
    this.pageFlowService.goToHomePage();
  }
}
