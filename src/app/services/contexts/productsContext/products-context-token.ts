import { InjectionToken } from '@angular/core';
import { ProductsContextService } from './products-context-service';

export const PRODUCTS_CONTEXT = new InjectionToken<ProductsContextService>(
  'PRODUCTS_CONTEXT'
);
