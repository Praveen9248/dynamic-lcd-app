import { Component, computed, inject } from '@angular/core';
import { ApiDataService } from 'src/app/services/api/api-data-service';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';

@Component({
  selector: 'app-content4-component',
  standalone: false,
  templateUrl: './content4-component.component.html',
  styleUrls: ['./content4-component.component.scss'],
})
export class Content4ComponentComponent {
  pageFlowService = inject(PageFlowService);
  apiDataService = inject(ApiDataService);

  contentDataSource = computed(() => this.apiDataService.homeContentData());

  handleClick() {
    this.pageFlowService.goToNextPage();
  }
}
