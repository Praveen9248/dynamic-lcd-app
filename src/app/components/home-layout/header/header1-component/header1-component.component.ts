import { Component, computed, inject } from '@angular/core';
import { ApiDataService } from 'src/app/services/api/api-data-service';
import { UiConfigService } from 'src/app/services/uiConfig/ui-config-service';

@Component({
  selector: 'app-header1-component',
  standalone: false,
  templateUrl: './header1-component.component.html',
  styleUrls: ['./header1-component.component.scss'],
})
export class Header1ComponentComponent {
  uiConfigDataService = inject(UiConfigService);

  headerData = computed(
    () => this.uiConfigDataService.uiConfigData()?.home?.header?.data
  );

  headerUiData = computed(
    () => this.uiConfigDataService.uiConfigData()?.home?.header?.uiConfig
  );
}
