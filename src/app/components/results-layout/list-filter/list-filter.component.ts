import { Component, computed, inject } from '@angular/core';
import { ProductsContextService } from 'src/app/services/contexts/productsContext/products-context-service';

@Component({
  selector: 'app-list-filter',
  standalone: false,
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss'],
})
export class ListFilterComponent {
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
