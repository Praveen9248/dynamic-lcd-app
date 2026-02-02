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
  ) {}

  categories = computed(() => this.apiDataService.primaryFeatureData());

  contentData = computed(() => this.configService.configData()?.content);

  flowType = computed(() => this.configService.flowType());

  ngOnInit() {}

  onFilter(filter: any) {
    let filtered: any[] = [];

    if (this.flowType() === 'CATEGORY') {
      filtered = this.apiDataService
        .filteredProducts()
        .filter((product: any) => product.category1 === filter);
      this.apiDataService.filteredProducts.set(filtered);

      const data = [
        ...new Set(
          filtered.map((item: any) => item?.category2).filter(Boolean),
        ),
      ];
      this.apiDataService.intermediateDataTrack.update((prev) => [
        ...prev,
        data,
      ]);
      this.configService.intermediateAttributeStatus.set(data.length > 0);
    } else {
      filtered = this.apiDataService
        .filteredProducts()
        .filter((product: any) => product.etc0 === filter);
      this.apiDataService.filteredProducts.set(filtered);
      const data = [
        ...new Set(filtered.map((item: any) => item?.etc1).filter(Boolean)),
      ];

      this.apiDataService.intermediateDataTrack.update((prev) => [
        ...prev,
        data,
      ]);
      this.configService.intermediateAttributeStatus.set(data.length > 0);
    }
    this.configService.goToNextPage();
  }
}
