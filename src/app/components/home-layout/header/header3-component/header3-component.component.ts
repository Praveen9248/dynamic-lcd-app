import { Component, computed, inject } from '@angular/core';
import { ApiDataService } from 'src/app/services/api/api-data-service';

@Component({
  selector: 'app-header3-component',
  standalone: false,
  templateUrl: './header3-component.component.html',
  styleUrls: ['./header3-component.component.scss'],
})
export class Header3ComponentComponent {
  apiDataService = inject(ApiDataService);

  headerDataSource = computed(() => this.apiDataService.homeHeaderData());
}
