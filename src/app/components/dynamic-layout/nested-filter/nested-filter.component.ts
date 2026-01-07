import {
  Component,
  computed,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { ApiDataService } from 'src/app/services/api/api-data-service';
import { ProductsContextService } from 'src/app/services/contexts/productsContext/products-context-service';
import { PRODUCTS_CONTEXT } from 'src/app/services/contexts/productsContext/products-context-token';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';

@Component({
  selector: 'app-nested-filter',
  standalone: false,
  templateUrl: './nested-filter.component.html',
  styleUrls: ['./nested-filter.component.scss'],
})
export class NestedFilterComponent {
  pageFlowService = inject(PageFlowService);
  apiDataService = inject(ApiDataService);
  productsContext = inject<ProductsContextService>(PRODUCTS_CONTEXT);
  @Output() action = new EventEmitter<any>();

  attributes = computed(
    () => this.productsContext.currentAttributePageData()?.options
  );

  intermediateDataSource = computed(() =>
    this.apiDataService.intermediateData()
  );

  handleFilter(filter: any) {
    this.action.emit({
      type: 'filter selected',
      payload: filter,
    });
  }
}
