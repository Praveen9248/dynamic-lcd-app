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
import { ResultsContextService } from 'src/app/services/contexts/resultsContext/results-context-service';
import { RESULTS_CONTEXT } from 'src/app/services/contexts/resultsContext/results-context-token';
import { DataService } from 'src/app/services/data/data-service';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';

@Component({
  selector: 'app-results-page',
  standalone: false,
  templateUrl: './results-page.page.html',
  styleUrls: ['./results-page.page.scss'],
})
export class ResultsPagePage {
  pageFlowService = inject(PageFlowService);
  dataService = inject(DataService);
  resultsContextService = inject(ResultsContextService);
  injector = inject(Injector);

  @ViewChild('resultHost', { read: ViewContainerRef, static: true })
  resultsVcr!: ViewContainerRef;

  resultsRef!: ComponentRef<any>;

  resultComponent = computed(() => {
    let code =
      this.pageFlowService.flowConfig()?.flow?.result?.data?.resultCode;
    return ResultComponentCodeMap[code];
  });

  ResultPageData = computed(() => this.dataService.dataConfig()?.resultPage);

  constructor() {
    effect(() => {
      if (!this.resultComponent()) {
        return;
      }
      this.loadComponent(this.resultComponent());
    });

    effect(() => {
      if (!this.ResultPageData()) return;

      this.resultsContextService.setResultsContext(this.ResultPageData()?.data);
    });
  }

  createContextInjector() {
    return Injector.create({
      providers: [
        {
          provide: RESULTS_CONTEXT,
          useValue: this.resultsContextService.context,
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
    this.pageFlowService.goToPrevPage();
  }

  goHome() {
    this.pageFlowService.goToHomePage();
  }
}
