import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeContextService {
  private _context = signal<any>(null);
  context = this._context.asReadonly();

  setHomeContext(homePage: any) {
    this._context.set({
      headerData: homePage.headerContainer,
      contentData: homePage.contentContainer,
    });
  }

  clear() {
    this._context.set(null);
  }
}
