import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductsContextService {
  _categoryContext = signal<any>(null);
  categoryContext = this._categoryContext.asReadonly();

  _attributesContext = signal<any>(null);
  attributesContext = this._attributesContext.asReadonly();

  _productsContext = signal<any>(null);
  productsContext = this._productsContext.asReadonly();

  setCategoryContext(data: any) {
    this._categoryContext.set(data);
  }

  setAttributesContext(data: any) {
    this._attributesContext.set(data);
  }

  setProductsContext(data: any) {
    this._productsContext.set(data);
  }

  selectedCategory = signal<any>(null); //wine

  selectedCategoryAttributes = signal<any>(null); //[country,body,sweetness]

  currentAttributePageData = signal<any>(null); //country

  setcurrentAttributePageData(data: any) {
    this.currentAttributePageData.set(data); //setting country attribute options
  }

  attributeFilterList = signal<any>([]);

  categoryFilter = signal<any>(null);

  resultProducts = signal<any>(null);

  applyNestedFilter() {
    this.resultProducts.set(
      this.productsContext().filter((prod: any) => {
        if (this.categoryFilter() && this.categoryFilter() !== prod.category) {
          return false;
        }
        if (this.attributeFilterList().length > 0 && prod.attributes) {
          const productAttributeValues = Object.values(prod.attributes);

          return this.attributeFilterList().every((filterValue: any) =>
            productAttributeValues.includes(filterValue)
          );
        }
        return true;
      })
    );
  }
}
