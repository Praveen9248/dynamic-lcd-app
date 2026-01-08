import {
  Component,
  computed,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { ProductsContextService } from 'src/app/services/contexts/productsContext/products-context-service';
import { PRODUCTS_CONTEXT } from 'src/app/services/contexts/productsContext/products-context-token';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';
import { UiConfigService } from 'src/app/services/uiConfig/ui-config-service';

@Component({
  selector: 'app-nested-filter',
  standalone: false,
  templateUrl: './nested-filter.component.html',
  styleUrls: ['./nested-filter.component.scss'],
})
export class NestedFilterComponent {
  pageFlowService = inject(PageFlowService);
  productsContext = inject<ProductsContextService>(PRODUCTS_CONTEXT);
  uiConfigDataService = inject(UiConfigService);
  @Output() action = new EventEmitter<any>();

  contentUiData = computed(
    () => this.uiConfigDataService.uiConfigData()?.intermediate?.uiConfig
  );

  contentButtonConfigData = computed(
    () => this.uiConfigDataService.uiConfigData()?.intermediate?.buttonConfig
  );

  attributes = computed(
    () => this.productsContext.currentAttributePageData()?.options
  );

  handleFilter(attribute: any) {
    this.action.emit({
      type: 'filter selected',
      payload: attribute,
    });
  }
}
