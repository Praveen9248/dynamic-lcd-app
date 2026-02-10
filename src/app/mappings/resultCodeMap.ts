import { Result1Component } from '../components/result/result1/result1.component';
import { Result2Component } from '../components/result/result2/result2.component';
import { Result3Component } from '../components/result/result3/result3.component';
import { Result4Component } from '../components/result/result4/result4.component';

export const ResultComponentCodeMap: Record<any, any> = {
  R0001: Result1Component,
  R0010: Result2Component,
  R0100: Result3Component,
  R1000: Result4Component,
};
