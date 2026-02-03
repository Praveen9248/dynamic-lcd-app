import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  //api data response
  apiData = signal<any>(null);

  //api call
  getApiData() {
    return this.httpClient.get<any>('assets/api/data.json');
  }

  //selected values
  selectedValues: Record<number, string> = {};

  //filter parameters
  categorySteps = ['category1', 'category2', 'category3', 'category4'];
  etcSteps = ['etc0', 'etc1', 'etc2', 'etc3'];

  //setting up the steps for the application
  getSteps(mode: string) {
    return mode === 'CATEGORY' ? this.categorySteps : this.etcSteps;
  }

  //extraction of options available for index of getSteps array
  getOptionsForStep(stepIdx: number, mode: string): any[] {
    const steps = this.getSteps(mode);

    return [
      ...new Set(
        this.apiData()
          ?.labelList.filter((item: any) => {
            for (let i = 0; i < stepIdx; i++) {
              const key = steps[i];
              if (
                this.selectedValues[i] &&
                item[key] !== this.selectedValues[i]
              ) {
                return false;
              }
            }
            return true;
          })
          .map((item: any) => item[steps[stepIdx]])
          .filter((v: any) => v && v.trim() !== ''),
      ),
    ];
  }
}
