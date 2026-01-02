import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dataConfig = signal<any>(null);

  constructor(private httpClient: HttpClient) {
    this.loadDataStore();
  }

  loadDataStore() {
    this.httpClient.get<any>('assets/configuration/dataStore.json').subscribe({
      next: (data) => this.dataConfig.set(data),
      error: (err) => console.log(err),
      complete: () => console.log('completed'),
    });
  }
}
