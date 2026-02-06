import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Filesystem, Encoding } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  configData = signal<any>(null);

  mode = signal<'CATEGORY' | 'ETC'>('CATEGORY');

  currentPageKey = signal<
    'home' | 'intermediate' | 'result' | 'configuration' | null
  >(null);

  currentIntermediateIdx = signal(1);

  navigatorStatus = signal<boolean>(false);

  configFilePath = signal<any>(null);

  constructor(
    private router: Router,
  ) { }


  async loadConfigFromFilePath(filePath: string) {
    try {
      const contents = await Filesystem.readFile({
        path: filePath,
        encoding: Encoding.UTF8,
      });
      console.log(contents);
      console.log(JSON.parse(contents.data as string));

      return JSON.parse(contents.data as string);
    } catch (error) {
      console.error('Error reading config file:', error);
      throw error;
    }
  }

  goToHomePage() {
    this.currentIntermediateIdx.set(1);
    this.currentPageKey.set('home');
    this.router.navigate(['home']);
  }

  goToIntermediatePage() {
    this.currentPageKey.set('intermediate');
    this.router.navigate(['intermediate']);
  }

  goToResultPage() {
    this.currentPageKey.set('result');
    this.router.navigate(['result']);
  }

  goToNextPage() {
    const current = this.currentPageKey();
    if (!current) return;

    const nextPageKey = this.configData()?.flow?.[current]?.nextPage;
    console.log(nextPageKey);

    if (
      nextPageKey === 'intermediate' &&
      this.configData()?.flow?.intermediate?.enabled === false
    ) {
      this.goToResultPage();
      return;
    }

    if (nextPageKey === 'intermediate' && !this.navigatorStatus()) {
      this.goToResultPage();
      return;
    }

    this.currentPageKey.set(nextPageKey);
    this.router.navigate([nextPageKey]);
  }

  goToPrevPage() {
    const current = this.currentPageKey();

    if (current === 'intermediate') {
      if (this.currentIntermediateIdx() > 1) {
        this.currentIntermediateIdx.update((i) => i - 1);
        return;
      }

      this.goToHomePage();
      return;
    }

    if (current === 'result') {
      if (
        this.configData()?.flow?.intermediate?.enabled === false ||
        !this.navigatorStatus()
      ) {
        this.goToHomePage();
        return;
      }

      this.goToIntermediatePage();
      return;
    }
  }
}
