import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ResultsContextService {
  private _context = signal<any>(null);

  context = this._context.asReadonly();

  setResultsContext(data: any) {
    this._context.set({
      resultsData: data,
    });
  }

  clear() {
    this._context.set(null);
  }
}
