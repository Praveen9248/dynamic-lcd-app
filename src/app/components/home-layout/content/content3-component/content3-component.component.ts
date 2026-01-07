import { Component, computed, inject } from '@angular/core';
import { ApiDataService } from 'src/app/services/api/api-data-service';
import { ProductsContextService } from 'src/app/services/contexts/productsContext/products-context-service';
import { PRODUCTS_CONTEXT } from 'src/app/services/contexts/productsContext/products-context-token';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';

@Component({
  selector: 'app-content3-component',
  standalone: false,
  templateUrl: './content3-component.component.html',
  styleUrls: ['./content3-component.component.scss'],
})
export class Content3ComponentComponent {
  pageFlowService = inject(PageFlowService);
  apiDataService = inject(ApiDataService);
  productsContext = inject<ProductsContextService>(PRODUCTS_CONTEXT);

  contentDataSource = computed(() => this.apiDataService.homeContentData());

  filters = computed(
    () => this.productsContext.categoryContext()?.categories ?? []
  );

  onFilter() {
    this.pageFlowService.goToNextPage();
  }
}
