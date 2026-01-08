import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiDataService {
  httpClient = inject(HttpClient);
  pagesData = signal<any>(null);

  fetchData() {
    return this.httpClient.get<any>('assets/PagesData/data.json');
  }

  getIntermediateData() {
    return this.httpClient.get<any>(
      'assets/templates/intermediate/filters.json'
    );
  }
}
