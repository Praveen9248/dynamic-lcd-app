import { Component, computed, inject } from '@angular/core';
import { ApiDataService } from 'src/app/services/api/api-data-service';
import { UiConfigService } from 'src/app/services/uiConfig/ui-config-service';

@Component({
  selector: 'app-header3-component',
  standalone: false,
  templateUrl: './header3-component.component.html',
  styleUrls: ['./header3-component.component.scss'],
})
export class Header3ComponentComponent {
  uiConfigDataService = inject(UiConfigService);

  headerData = computed(
    () => this.uiConfigDataService.uiConfigData()?.home?.header?.data
  );

  headerUiData = computed(
    () => this.uiConfigDataService.uiConfigData()?.home?.header?.uiConfig
  );
}
