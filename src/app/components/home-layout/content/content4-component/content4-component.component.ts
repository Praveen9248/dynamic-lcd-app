import { Component, computed, inject } from '@angular/core';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';
import { UiConfigService } from 'src/app/services/uiConfig/ui-config-service';

@Component({
  selector: 'app-content4-component',
  standalone: false,
  templateUrl: './content4-component.component.html',
  styleUrls: ['./content4-component.component.scss'],
})
export class Content4ComponentComponent {
  pageFlowService = inject(PageFlowService);
  uiConfigDataService = inject(UiConfigService);

  contentUiData = computed(
    () => this.uiConfigDataService.uiConfigData()?.home?.content?.uiConfig
  );

  contentButtonConfigData = computed(
    () => this.uiConfigDataService.uiConfigData()?.home?.content?.buttonConfig
  );

  handleClick() {
    this.pageFlowService.goToNextPage();
  }
}
