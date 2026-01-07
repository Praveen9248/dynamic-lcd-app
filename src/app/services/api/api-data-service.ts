import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProductsContextService } from '../contexts/productsContext/products-context-service';
import { PRODUCTS_CONTEXT } from '../contexts/productsContext/products-context-token';

@Injectable({
  providedIn: 'root',
})
export class ApiDataService {
  httpClient = inject(HttpClient);
  homeHeaderData = signal<any>(null);
  homeContentData = signal<any>(null);
  intermediateData = signal<any>(null);

  selectedCategoryAttributes = signal<any>(null);

  getHomeHeader() {
    return this.httpClient.get<any>('assets/templates/home/header.json');
  }

  getHomeContent() {
    return this.httpClient.get<any>('assets/templates/home/content.json');
  }

  getCategories(url: string) {
    return this.httpClient.get<any>(url);
  }

  getIntermediateData() {
    return this.httpClient.get<any>(
      'assets/templates/intermediate/filters.json'
    );
  }

  getAttributes(url: string) {
    return this.httpClient.get<any>(url);
  }
}
