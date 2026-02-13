import { Component, computed, OnInit, signal } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api-service';
import { ConfigService } from 'src/app/services/configuration/config-service';

@Component({
  selector: 'app-result4',
  standalone: false,
  templateUrl: './result4.component.html',
  styleUrls: ['./result4.component.scss'],
})
export class Result4Component implements OnInit {
  constructor(
    private configService: ConfigService,
    private apiService: ApiService,
    private alertController: AlertController
  ) { }

  CATEGORY_KEYS = ['category1', 'category2', 'category3', 'category4'];
  ETC_KEYS = ['etc0', 'etc1', 'etc2', 'etc3'];

  ngOnInit() {
    this.filterData();
  }

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

  columns = computed(() => {
    const selectedCount = Object.keys(this.apiService.selectedValues).length;
    const cols = [];

    for (let i = 0; i < selectedCount; i++) {
      const options = this.apiService.getOptionsForStep(i, this.configService.mode());
      cols.push({
        stepIndex: i,
        options: options,
        selectedValue: this.apiService.selectedValues[i]
      });
    }

    return cols;
  });

  goToOptions(index: number) {
    if (index === 0) {
      this.configService.goToHomePage();
      return;
    }
    this.configService.currentIntermediateIdx.set(index);
    this.configService.goToIntermediatePage();
  }

  isSelected(stepIndex: number, option: string): boolean {
    return this.apiService.selectedValues[stepIndex] === option;
  }

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

  async onBlink(labelCode: string) {
    const alert = await this.alertController.create({
      header: 'Blink LED',
      subHeader: 'LED will blink for 30 seconds',
      message: 'Label ' + labelCode + ' LED is Blinking',
      buttons: [
        {
          text: 'TAKE ME HOME',
          cssClass: 'alert-button-confirm',
          handler: () => {
            console.log('Confirm clicked');
            this.configService.goToHomePage();
          }
        }
      ],
    });
    await alert.present();
  }

}
