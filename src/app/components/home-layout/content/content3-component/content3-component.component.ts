import { Component, computed, inject } from '@angular/core';

import { ProductsContextService } from 'src/app/services/contexts/productsContext/products-context-service';
import { PRODUCTS_CONTEXT } from 'src/app/services/contexts/productsContext/products-context-token';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';
import { UiConfigService } from 'src/app/services/uiConfig/ui-config-service';

@Component({
  selector: 'app-content3-component',
  standalone: false,
  templateUrl: './content3-component.component.html',
  styleUrls: ['./content3-component.component.scss'],
})
export class Content3ComponentComponent {
  pageFlowService = inject(PageFlowService);
  productsContext = inject<ProductsContextService>(PRODUCTS_CONTEXT);
  uiConfigDataService = inject(UiConfigService);

  contentUiData = computed(
    () => this.uiConfigDataService.uiConfigData()?.home?.content?.uiConfig
  );

  contentButtonConfigData = computed(
    () => this.uiConfigDataService.uiConfigData()?.home?.content?.buttonConfig
  );

  categories = computed(() => this.productsContext.categoryContext() ?? []);

  onFilter(category: string) {
    this.productsContext.selectedCategory.set(category);
    let categoryInfo = this.productsContext
      .categoryContext()
      .find((cat: any) => cat.id === category);
    this.productsContext.selectedCategoryAttributes.set(
      categoryInfo?.attributes
    );
    this.pageFlowService.intermediateAttributeStatus.set(
      categoryInfo?.attributes?.length ? true : false
    );
    this.productsContext.categoryFilter.set(category);
    this.pageFlowService.goToNextPage();
  }
}
