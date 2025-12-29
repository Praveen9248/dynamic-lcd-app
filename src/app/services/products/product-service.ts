import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsList = signal<any[]>([]);
  categoryList = signal<any[]>([]);
  httpClient = inject(HttpClient);

  constructor() {
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts() {
    this.httpClient.get<any[]>('https://fakestoreapi.com/products').subscribe({
      next: (res) => {
        this.productsList.set(res);
      },
    });
  }

  fetchCategories() {
    this.httpClient
      .get<any[]>('https://fakestoreapi.com/products')
      .pipe(map((products) => [...new Set(products.map((p) => p.category))]))
      .subscribe({
        next: (res) => {
          this.categoryList.set(res);
        },
      });
  }

  get products() {
    return this.productsList();
  }
}
