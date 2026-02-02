import {
  Component,
  computed,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { ApiService } from 'src/app/services/api/api-service';
import { ConfigService } from 'src/app/services/configuration/config-service';

@Component({
  selector: 'app-dynamic',
  standalone: false,
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss'],
})
export class DynamicComponent implements OnInit {
  @Output() action = new EventEmitter<any>();

  constructor(
    private configService: ConfigService,
    private apiDataService: ApiService,
  ) {}

  ngOnInit(): void {}

  currentIdx = computed(() => this.configService.currentIntermediateIdx());

  flowType = computed(() => this.configService.flowType());

  currentPageAttributes = computed(
    () => this.apiDataService.intermediateDataTrack()[this.currentIdx()],
  );

  handleFilter(attribute: any) {
    const idx = this.currentIdx();
    const products = this.apiDataService.filteredProducts();
    console.log(products);

    if (this.flowType() === 'CATEGORY') {
      const filterKey = `category${idx + 2}`;
      const nextKey = `category${idx + 3}`;

      const filtered = products.filter((p: any) => p[filterKey] === attribute);
      console.log(filtered);

      this.apiDataService.filteredProducts.set(filtered);

      const data = [
        ...new Set(
          filtered.map((item: any) => item?.[nextKey]).filter(Boolean),
        ),
      ];
      this.apiDataService.intermediateDataTrack.update((prev) => [
        ...prev,
        data,
      ]);
      this.configService.intermediateAttributeStatus.set(data.length > 0);
    } else {
      const filterKey = `etc${idx + 1}`;
      const nextKey = `etc${idx + 2}`;

      const filtered = products.filter((p: any) => p[filterKey] === attribute);

      console.log(filtered);

      this.apiDataService.filteredProducts.set(filtered);
      const data = [
        ...new Set(
          filtered.map((item: any) => item?.[nextKey]).filter(Boolean),
        ),
      ];

      this.apiDataService.tertiaryFeatureData.set(data);
      this.apiDataService.intermediateDataTrack.update((prev) => [
        ...prev,
        data,
      ]);
      this.configService.intermediateAttributeStatus.set(data.length > 0);
    }

    this.action.emit({
      type: 'Filter Selected',
      payload: attribute,
    });
  }
}
