import { Component, inject } from '@angular/core';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';

@Component({
  selector: 'app-layout-setup',
  standalone: false,
  templateUrl: './layout-setup.page.html',
  styleUrls: ['./layout-setup.page.scss'],
})
export class LayoutSetupPage {
  pageFlowService = inject(PageFlowService);
}
