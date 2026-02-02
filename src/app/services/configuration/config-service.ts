import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  configData = signal<any>(null);

  flowType = signal<'CATEGORY' | 'ETC'>('CATEGORY');

  currentPageKey = signal<
    'home' | 'intermediate' | 'result' | 'configuration' | null
  >(null);

  currentIntermediateIdx = signal(0);

  intermediateAttributeStatus = signal<any>(null);

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  getConfig() {
    return this.httpClient.get<any>('assets/configuration/layoutConfig.json');
  }

  goToNextPage() {
    let nextPageKey = this.configData()?.flow[this.currentPageKey()!]?.nextPage;
    console.log(nextPageKey);
    console.log(!this.intermediateAttributeStatus());
    if (!this.intermediateAttributeStatus()) {
      this.router.navigate(['result']);
      this.currentPageKey.set('result');
      return;
    }

    if (nextPageKey === 'intermediate') {
      if (this.configData()?.flow[nextPageKey]?.enabled === false) {
        this.router.navigate(['result']);
        this.currentPageKey.set('result');
        return;
      }
    }
    this.router.navigate([nextPageKey]);
    this.currentPageKey.set(nextPageKey);
  }

  goToPrevPage() {
    const currentPage = this.currentPageKey();

    if (currentPage === 'intermediate') {
      if (this.currentIntermediateIdx() > 0) {
        this.currentIntermediateIdx.update((i) => i - 1);
        return;
      }
      this.goToHomePage();
      return;
    }

    if (currentPage === 'result') {
      if (
        !this.intermediateAttributeStatus() ||
        this.configData()?.flow['intermediate']?.enabled === false
      ) {
        this.goToHomePage();
        return;
      }
      this.router.navigate(['intermediate']);
      this.currentPageKey.set('intermediate');
      return;
    }
  }

  goToHomePage() {
    this.currentIntermediateIdx.set(0);
    this.router.navigate(['home']);
    this.currentPageKey.set('home');
  }
}
