import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HOME_CONTEXT } from 'src/app/services/contexts/home-context-token';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';

@Component({
  selector: 'app-content4-component',
  standalone: false,
  templateUrl: './content4-component.component.html',
  styleUrls: ['./content4-component.component.scss'],
})
export class Content4ComponentComponent {
  pageFlowService = inject(PageFlowService);
  homeContext = inject(HOME_CONTEXT);

  handleClick() {
    this.pageFlowService.goToNextPage();
  }
}
