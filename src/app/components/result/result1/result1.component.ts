import { Component, computed, OnInit, signal } from '@angular/core';
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
    public configService: ConfigService,
    public apiService: ApiService,
  ) { }

  CATEGORY_KEYS = ['category1', 'category2', 'category3', 'category4'];
  ETC_KEYS = ['etc0', 'etc1', 'etc2', 'etc3'];
  selectedValuesMini = signal<Record<number, string>>({});

  containerStyle = computed(() => {
    const styleData = this.configService.configData()?.result?.container;
    const res = styleData.backgroundStyle === 'gradient' ? `linear-gradient(${styleData.backgroundGradient.angle}deg,${styleData.backgroundGradient.startColor},${styleData.backgroundGradient.endColor})` : styleData.backgroundColor;
    return res;
  })
  activeStyle = computed(() => {
    const styleData = this.configService.configData()?.result?.active;
    const res = styleData.backgroundStyle === 'gradient' ? `linear-gradient(${styleData.backgroundGradient.angle}deg,${styleData.backgroundGradient.startColor},${styleData.backgroundGradient.endColor})` : styleData.backgroundColor;
    return res;
  })
  inactiveStyle = computed(() => {
    const styleData = this.configService.configData()?.result?.inactive;
    const res = styleData.backgroundStyle === 'gradient' ? `linear-gradient(${styleData.backgroundGradient.angle}deg,${styleData.backgroundGradient.startColor},${styleData.backgroundGradient.endColor})` : styleData.backgroundColor;
    return res;
  })
  outputStyle = computed(() => {
    const styleData = this.configService.configData()?.result?.output;
    const res = styleData.backgroundStyle === 'gradient' ? `linear-gradient(${styleData.backgroundGradient.angle}deg,${styleData.backgroundGradient.startColor},${styleData.backgroundGradient.endColor})` : styleData.backgroundColor;
    return res;
  })

  selectedStep1 = signal<string | null>(null);
  selectedStep2 = signal<string | null>(null);
  selectedStep3 = signal<string | null>(null);

  ngOnInit() {
    const existingValues = { ...this.apiService.selectedValues };
    this.selectedValuesMini.set(existingValues);

    if (existingValues[1]) this.selectedStep1.set(existingValues[1]);
    if (existingValues[2]) this.selectedStep2.set(existingValues[2]);
    if (existingValues[3]) this.selectedStep3.set(existingValues[3]);
  }

  currentStep = signal(1);

  column1Options = computed(() =>
    this.apiService.getOptionsForStep(1, this.configService.mode())
  );

  column2Options = computed(() => {
    if (!this.selectedStep1()) return null;
    const options = this.apiService.getOptionsForStep(2, this.configService.mode());
    if (!(options.length > 0)) return null;
    return options;
  });

  column3Options = computed(() => {
    if (!this.selectedStep2()) return null;
    const options = this.apiService.getOptionsForStep(3, this.configService.mode());
    if (!(options.length > 0)) return null;
    return options;
  })


  selectOption1(opt: string) {
    this.selectedStep1.set(opt);
    this.selectedStep2.set(null);
    this.selectedStep3.set(null);
    this.selectedValuesMini.set({ 1: opt });
  }

  selectOption2(opt: string) {
    this.selectedStep2.set(opt);
    this.selectedStep3.set(null);
    const current = { ...this.selectedValuesMini() };
    current[2] = opt;
    delete current[3];
    this.selectedValuesMini.set(current);

  }

  selectOption3(opt: string) {
    this.selectedStep3.set(opt);
    const current = { ...this.selectedValuesMini() };
    current[3] = opt;
    this.selectedValuesMini.set(current);
  }

  filterData = computed(() => {
    console.log("worked on init only");
    const keys = this.configService.mode() === 'CATEGORY'
      ? this.CATEGORY_KEYS
      : this.ETC_KEYS;

    const selectedValues = this.selectedValuesMini();
    console.log(selectedValues)
    const labels = this.labels();

    if (!labels || labels.length === 0) return [];

    const result = this.mapIndexSelections(selectedValues, keys);

    if (Object.keys(result).length === 0) return labels;

    return labels.filter((label: any) =>
      Object.entries(result).every(([key, value]) => label[key] === value)
    );
  });

  labels = computed(() => this.apiService.apiData()?.labelList || []);

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
