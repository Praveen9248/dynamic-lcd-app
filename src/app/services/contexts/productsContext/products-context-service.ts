import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductsContextService {
  _categoryContext = signal<any>(null);
  categoryContext = this._categoryContext.asReadonly();

  _attributesContext = signal<any>(null);
  attributesContext = this._attributesContext.asReadonly();

  _productsContext = signal<any>(null);
  productsContext = this._productsContext.asReadonly();

  selectedCategory = signal<any>(null);

  selectedCategoryAttributes = signal<any>(null);

  currentAttributePageData = signal<any>(null);

  setCategoryContext(data: any) {
    this._categoryContext.set(data);
  }

  setAttributesContext(data: any) {
    this._attributesContext.set(data);
  }

  setProductsContext(data: any) {
    this._productsContext.set(data);
  }

  setcurrentAttributePageData(data: any) {
    this.currentAttributePageData.set(data);
  }
}
