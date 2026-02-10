import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Filesystem, Encoding } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  //config data store
  configData = signal<any>(null);

  //mode of application
  mode = signal<'CATEGORY' | 'ETC'>('CATEGORY');

  //key of the current page
  currentPageKey = signal<
    'home' | 'intermediate' | 'result' | 'configuration' | null
  >(null);

  //tracking variables for intermediate page
  currentIntermediateIdx = signal(1);

  //status variable for which denotes whether navigator for intermediate page is enabled or not
  navigatorStatus = signal<boolean>(false);

  //path of the config file
  configFilePath = signal<any>(null);

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  //method for loading the received file from file system
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

  //just for the development purpose
  // loadConfigFromAssets() {
  //   return this.http.get<any>('assets/configuration/layoutConfig.json');
  // }

  //method for navigating to home page
  goToHomePage() {
    this.currentIntermediateIdx.set(1);
    this.currentPageKey.set('home');
    this.router.navigate(['home']);
  }

  //method for navigating to intermediate page
  goToIntermediatePage() {
    this.currentPageKey.set('intermediate');
    this.router.navigate(['intermediate']);
  }

  //method for navigating to result page
  goToResultPage() {
    this.currentPageKey.set('result');
    this.router.navigate(['result']);
  }

  //method for navigating to next page
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

  //method for navigating to previous page
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
