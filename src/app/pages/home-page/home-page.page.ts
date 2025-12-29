import { Component, computed, inject } from '@angular/core';
import { ContentCodeMap } from 'src/app/mappings/contentCodeMap';
import { HeaderCodeMap } from 'src/app/mappings/headerCodeMap';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage {
  pageFlowService = inject(PageFlowService);

  headerComponent = computed(() => {
    const code = this.pageFlowService.homeHeaderCode();
    return code ? HeaderCodeMap[code] : null;
  });

  contentComponent = computed(() => {
    const code = this.pageFlowService.homeContentCode();
    return code ? ContentCodeMap[code] : null;
  });
}
