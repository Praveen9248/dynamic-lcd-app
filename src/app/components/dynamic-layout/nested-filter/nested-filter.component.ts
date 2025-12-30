import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';

@Component({
  selector: 'app-nested-filter',
  standalone: false,
  templateUrl: './nested-filter.component.html',
  styleUrls: ['./nested-filter.component.scss'],
})
export class NestedFilterComponent {
  pageFlowService = inject(PageFlowService);
  @Input() title!: string;
  @Output() action = new EventEmitter<any>();

  filters = ['mens', 'womens', 'kids', 'old-age', 'baby-clothes'];

  handleFilter(filter: any) {
    this.action.emit({
      type: 'filter selected',
      payload: filter,
    });
  }
}
