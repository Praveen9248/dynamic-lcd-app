import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IntermediateContextService {
  private _context = signal<any>(null);
  context = this._context.asReadonly();

  setIntermediateContext(intermediateObj: any) {
    this._context.set({
      intermediateData: intermediateObj.data,
      intermediateStyle: intermediateObj.style,
    });
  }

  clear() {
    this._context.set(null);
  }
}
