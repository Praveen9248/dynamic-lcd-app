import { Component, computed, inject } from '@angular/core';
import { ApiDataService } from 'src/app/services/api/api-data-service';

@Component({
  selector: 'app-header4-component',
  standalone: false,
  templateUrl: './header4-component.component.html',
  styleUrls: ['./header4-component.component.scss'],
})
export class Header4ComponentComponent {
  apiDataService = inject(ApiDataService);

  headerSourceData = computed(() => this.apiDataService.homeHeaderData());
}
