import { Component, computed, inject } from '@angular/core';
import { ApiDataService } from 'src/app/services/api/api-data-service';

@Component({
  selector: 'app-header2-component',
  standalone: false,
  templateUrl: './header2-component.component.html',
  styleUrls: ['./header2-component.component.scss'],
})
export class Header2ComponentComponent {
  apiDataService = inject(ApiDataService);

  headerSourceData = computed(() => this.apiDataService.homeHeaderData());
}
