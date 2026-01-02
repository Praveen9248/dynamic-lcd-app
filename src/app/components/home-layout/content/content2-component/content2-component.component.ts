import { Component, inject } from '@angular/core';
import { HOME_CONTEXT } from 'src/app/services/contexts/home-context-token';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';

@Component({
  selector: 'app-content2-component',
  standalone: false,
  templateUrl: './content2-component.component.html',
  styleUrls: ['./content2-component.component.scss'],
})
export class Content2ComponentComponent {
  pageFlowService = inject(PageFlowService);
  homeContext = inject(HOME_CONTEXT);

  onFilter() {
    this.pageFlowService.goToNextPage();
  }
}
