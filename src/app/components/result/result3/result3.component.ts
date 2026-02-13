import { Component, computed, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api-service';
import { ConfigService } from 'src/app/services/configuration/config-service';

@Component({
  selector: 'app-result3',
  standalone: false,
  templateUrl: './result3.component.html',
  styleUrls: ['./result3.component.scss'],
})
export class Result3Component implements OnInit {
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
  outputStyle = computed(() => {
    const styleData = this.configService.configData()?.result?.output;
    const res = styleData.backgroundStyle === 'gradient' ? `linear-gradient(${styleData.backgroundGradient.angle}deg,${styleData.backgroundGradient.startColor},${styleData.backgroundGradient.endColor})` : styleData.backgroundColor;
    return res;
  })


  goToOptions(index: number) {
    if (index === 0) {
      this.configService.goToHomePage();
      return;
    }

    this.configService.currentIntermediateIdx.set(index);
    this.configService.goToIntermediatePage();
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
