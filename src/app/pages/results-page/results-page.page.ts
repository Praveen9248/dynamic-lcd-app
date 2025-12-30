import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ResultComponentCodeMap } from 'src/app/mappings/resultComponentCodeMap';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';

@Component({
  selector: 'app-results-page',
  standalone: false,
  templateUrl: './results-page.page.html',
  styleUrls: ['./results-page.page.scss'],
})
export class ResultsPagePage {
  pageFlowService = inject(PageFlowService);

  resultComponent = computed(() => {
    let code =
      this.pageFlowService.flowConfig()?.flow?.result?.data?.resultCode;
    return code ? ResultComponentCodeMap[code] : null;
  });

  goPrevPage() {
    this.pageFlowService.goToPrevPage();
  }

  goHome() {
    this.pageFlowService.goToHomePage();
  }
}
