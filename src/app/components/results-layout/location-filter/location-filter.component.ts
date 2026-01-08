import { Component, computed, inject } from '@angular/core';
import { ProductsContextService } from 'src/app/services/contexts/productsContext/products-context-service';

@Component({
  selector: 'app-location-filter',
  standalone: false,
  templateUrl: './location-filter.component.html',
  styleUrls: ['./location-filter.component.scss'],
})
export class LocationFilterComponent {
  productsContextService = inject(ProductsContextService);

  results = computed(() => this.productsContextService.resultProducts());
  filters = computed(() => this.productsContextService.attributeFilterList());
  categoryData = computed(() =>
    this.productsContextService
      .categoryContext()
      .find(
        (cat: any) => cat.id === this.productsContextService.selectedCategory()
      )
  );
}
