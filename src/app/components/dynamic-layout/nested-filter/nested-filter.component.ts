import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';

@Component({
  selector: 'app-nested-filter',
  standalone: false,
  templateUrl: './nested-filter.component.html',
  styleUrls: ['./nested-filter.component.scss'],
})
export class NestedFilterComponent {
  pageFlowService = inject(PageFlowService);

  filters = ['mens', 'womens', 'kids', 'old-age', 'baby-clothes'];

  handleClick() {
    this.pageFlowService.goToNextPage();
  }
}
