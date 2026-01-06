import { Component, inject } from '@angular/core';
import { RESULTS_CONTEXT } from 'src/app/services/contexts/resultsContext/results-context-token';

@Component({
  selector: 'app-location-filter',
  standalone: false,
  templateUrl: './location-filter.component.html',
  styleUrls: ['./location-filter.component.scss'],
})
export class LocationFilterComponent {
  resultsContext = inject(RESULTS_CONTEXT);

  get sectionAProducts() {
    return this.resultsContext()?.resultsData?.results?.filter(
      (product: any) => product.origin === 'India'
    );
  }

  get sectionBProducts() {
    return this.resultsContext()?.resultsData?.results?.filter(
      (product: any) => product.origin === 'USA'
    );
  }
}
