import { Component, inject, signal } from '@angular/core';
import { RESULTS_CONTEXT } from 'src/app/services/contexts/resultsContext/results-context-token';

@Component({
  selector: 'app-list-filter',
  standalone: false,
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss'],
})
export class ListFilterComponent {
  resultContext = inject(RESULTS_CONTEXT);
  filterData = signal<any>(null);

  ngOnInit() {
    this.filterData.set(this.resultContext()?.resultsData?.results);
  }

  onFilter(parameter: any) {
    this.filterData.set(
      this.resultContext()?.resultsData?.results.filter(
        (product: any) => product.origin === parameter
      )
    );
  }
}
