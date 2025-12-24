import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageFlowService {
  httpClient = inject(HttpClient);

  getConfig() {
    return this.httpClient.get<any>(
      'assets/configuration/layoutConfiguration.json'
    );
  }
}
