import { InjectionToken, Signal } from '@angular/core';

export const RESULTS_CONTEXT = new InjectionToken<Signal<any>>(
  'RESULTS_CONTEXT'
);
