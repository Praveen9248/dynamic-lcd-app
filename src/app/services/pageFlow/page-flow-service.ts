import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PageFlowService {
  flowConfig = signal<any>(null);

  router = inject(Router);

  httpClient = inject(HttpClient);

  currentPageKey = signal<
    'home' | 'intermediate' | 'result' | 'layout-setup' | null
  >(null);

  currentIntermediateIdx = signal(0);

  layoutConfigurationStatus = computed(
    () => this.flowConfig()?.layoutConfigured
  );

  homeHeaderCode = computed(
    () => this.flowConfig()?.flow?.home?.data?.headerCode
  );

  homeContentCode = computed(
    () => this.flowConfig()?.flow?.home?.data?.contentCode
  );

  constructor() {
    this.getPageFlow();
    effect(() => {
      if (this.layoutConfigurationStatus()) {
        this.router.navigate(['']);
        this.currentPageKey.set('home');
      } else {
        this.router.navigate(['layout-setup']);
        this.currentPageKey.set('layout-setup');
      }
    });
  }

  getPageFlow() {
    this.httpClient
      .get<any>('assets/configuration/layoutConfiguration.json')
      .subscribe({
        next: (res) => this.flowConfig.set(res),
      });
  }

  goToNextPage() {
    let nextPageKey = this.flowConfig()?.flow[this.currentPageKey()!]?.nextPage;
    console.log(nextPageKey);
    if (nextPageKey === 'intermediate') {
      if (this.flowConfig()?.flow[nextPageKey]?.enabled === false) {
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
      if (this.flowConfig()?.flow['intermediate']?.enabled === false) {
        this.router.navigate(['home']);
        this.currentPageKey.set('home');
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
