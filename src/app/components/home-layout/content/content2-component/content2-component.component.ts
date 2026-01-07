import { Component, computed, inject } from '@angular/core';
import { ApiDataService } from 'src/app/services/api/api-data-service';
import { ProductsContextService } from 'src/app/services/contexts/productsContext/products-context-service';
import { PRODUCTS_CONTEXT } from 'src/app/services/contexts/productsContext/products-context-token';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';

@Component({
  selector: 'app-content2-component',
  standalone: false,
  templateUrl: './content2-component.component.html',
  styleUrls: ['./content2-component.component.scss'],
})
export class Content2ComponentComponent {
  pageFlowService = inject(PageFlowService);
  apiDataService = inject(ApiDataService);
  productsContext = inject<ProductsContextService>(PRODUCTS_CONTEXT);

  sourceData = computed(() => this.apiDataService.homeContentData());

  categories = computed(
    () => this.productsContext.categoryContext()?.categories ?? []
  );

  onFilter(category: string) {
    this.productsContext.selectedCategory.set(category);
    let categoryInfo = this.productsContext
      .categoryContext()
      .categories.find((cat: any) => cat.id === category);
    this.productsContext.selectedCategoryAttributes.set(
      categoryInfo?.attributes
    );
    this.pageFlowService.goToNextPage();
  }
}
