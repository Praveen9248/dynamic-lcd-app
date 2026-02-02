import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiData = signal<any>(null);

  primaryFeatureData = signal<any[]>([]);
  secondaryFeatureData = signal<any[]>([]);
  tertiaryFeatureData = signal<any[]>([]);
  quaternaryFeatureData = signal<any[]>([]);

  intermediateDataTrack = signal<any[]>([]);

  filteredProducts = signal<any[]>([]);

  constructor(private httpClient: HttpClient) {}

  getApiData() {
    return this.httpClient.get<any>('assets/api/data.json');
  }

  loadPrimaryFeature(type: 'CATEGORY' | 'ETC') {
    if (!this.apiData() || !this.apiData().labelList) return;

    if (type === 'CATEGORY') {
      const data = [
        ...new Set(
          this.apiData()
            .labelList.map((item: any) => item?.category1)
            .filter(Boolean),
        ),
      ];
      this.primaryFeatureData.set(data);
    } else {
      const data = [
        ...new Set(
          this.apiData()
            .labelList.map((item: any) => item?.etc0)
            .filter(Boolean),
        ),
      ];
      this.primaryFeatureData.set(data);
    }
    this.filteredProducts.set(this.apiData().labelList);
  }
}
