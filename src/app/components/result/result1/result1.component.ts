import { Component, computed, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api-service';
import { ConfigService } from 'src/app/services/configuration/config-service';

@Component({
  selector: 'app-result1',
  standalone: false,
  templateUrl: './result1.component.html',
  styleUrls: ['./result1.component.scss'],
})
export class Result1Component implements OnInit {
  constructor(
    private configService: ConfigService,
    private apiService: ApiService,
  ) {}

  CATEGORY_KEYS = ['category1', 'category2', 'category3', 'category4'];
  ETC_KEYS = ['etc0', 'etc1', 'etc2', 'etc3'];

  ngOnInit() {
    this.filterData();
  }

  filterData = computed(() => {
    const keys =
      this.configService.mode() === 'CATEGORY'
        ? this.CATEGORY_KEYS
        : this.ETC_KEYS;
    const result = this.mapIndexSelections(
      this.apiService.selectedValues,
      keys,
    );
    return this.labels().filter((label: any) =>
      Object.entries(result).every(([key, value]) => label[key] === value),
    );
  });

  selectedOptions = computed(() =>
    Object.values(this.apiService.selectedValues),
  );

  labels = computed(() => this.apiService.apiData()?.labelList);

  mapIndexSelections(
    selected: Record<number, string>,
    keys: string[],
  ): Record<string, string> {
    const result: Record<string, string> = {};

    Object.keys(selected)
      .map(Number)
      .sort((a, b) => a - b)
      .forEach((index) => {
        const key = keys[index];
        const value = selected[index];

        if (key && value) {
          result[key] = value;
        }
      });

    return result;
  }
}
