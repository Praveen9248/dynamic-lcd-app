import { Component, computed, inject } from '@angular/core';
import { UiConfigService } from 'src/app/services/uiConfig/ui-config-service';

@Component({
  selector: 'app-header2-component',
  standalone: false,
  templateUrl: './header2-component.component.html',
  styleUrls: ['./header2-component.component.scss'],
})
export class Header2ComponentComponent {
  uiConfigDataService = inject(UiConfigService);

  headerData = computed(
    () => this.uiConfigDataService.uiConfigData()?.home?.header?.data
  );

  headerUiData = computed(
    () => this.uiConfigDataService.uiConfigData()?.home?.header?.uiConfig
  );
}
