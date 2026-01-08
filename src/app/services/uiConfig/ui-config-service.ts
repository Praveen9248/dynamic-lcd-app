import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiConfigService {
  httpClient = inject(HttpClient);

  uiConfigData = signal<any>(null);

  fetchUiConfigData() {
    return this.httpClient.get<any>('assets/LayoutData/layoutConfigData.json');
  }
}
