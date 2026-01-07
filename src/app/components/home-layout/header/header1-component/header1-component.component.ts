import { Component, computed, inject } from '@angular/core';
import { ApiDataService } from 'src/app/services/api/api-data-service';

@Component({
  selector: 'app-header1-component',
  standalone: false,
  templateUrl: './header1-component.component.html',
  styleUrls: ['./header1-component.component.scss'],
})
export class Header1ComponentComponent {
  apiDataService = inject(ApiDataService);

  headerSourceData = computed(() => this.apiDataService.homeHeaderData());
}
