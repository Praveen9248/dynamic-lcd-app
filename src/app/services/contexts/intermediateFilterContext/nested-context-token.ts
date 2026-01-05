import { InjectionToken, Signal } from '@angular/core';

export const NESTED_CONTEXT = new InjectionToken<Signal<any>>('NESTED_CONTEXT');
