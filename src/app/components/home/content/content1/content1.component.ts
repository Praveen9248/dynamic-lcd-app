import { Component, computed, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api-service';
import { ConfigService } from 'src/app/services/configuration/config-service';

@Component({
  selector: 'app-content1',
  standalone: false,
  templateUrl: './content1.component.html',
  styleUrls: ['./content1.component.scss'],
})
export class Content1Component implements OnInit {
  constructor(
    private apiDataService: ApiService,
    private configService: ConfigService,
  ) { }

  contentData = computed(() => this.configService.configData()?.content);

  categoryImages = computed(() => this.configService.configData()?.images[0]);

  categories = computed(() =>
    this.apiDataService.getOptionsForStep(0, this.mode()),
  );

  mode = computed(() => this.configService.mode());

  get backgroundStyle(): string | null {
    const data = this.contentData();
    if (!data) return null;

    if (data.backgroundStyle === 'gradient' && data.backgroundGradient) {
      return `linear-gradient(
      ${data.backgroundGradient.angle}deg,
      ${data.backgroundGradient.startColor},
      ${data.backgroundGradient.endColor}
    )`;
    }

    if (data.backgroundImage?.data) {
      return `url(data:${data.backgroundImage.mime};base64,${data.backgroundImage.data})`;
    }

    if (data.backgroundColor) {
      return data.backgroundColor;
    }

    return null;
  }


  ngOnInit() { }

  onFilter(filter: any) {
    this.apiDataService.selectedValues = { 0: filter };
    const nextOptions = this.apiDataService.getOptionsForStep(1, this.mode());
    nextOptions.length > 0
      ? this.configService.navigatorStatus.set(true)
      : this.configService.navigatorStatus.set(false);
    this.configService.goToNextPage();
  }
}
