import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PageFlowService {
  private flowConfig = signal<any>(null);
  router = inject(Router);
  httpClient = inject(HttpClient);
  currentPageKey = signal<
    'home' | 'intermediate' | 'result' | 'layout-setup' | null
  >(null);

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
    this.router.navigate([nextPageKey]);
    this.currentPageKey.set(nextPageKey);
  }
}
