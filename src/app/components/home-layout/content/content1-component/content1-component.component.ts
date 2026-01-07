import { Component, computed, inject, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/services/api/api-data-service';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-content1-component',
  standalone: false,
  templateUrl: './content1-component.component.html',
  styleUrls: ['./content1-component.component.scss'],
})
export class Content1ComponentComponent {
  pageFlowService = inject(PageFlowService);
  apiDataService = inject(ApiDataService);

  contentDataSource = computed(() => this.apiDataService.homeContentData());

  onStart() {
    this.pageFlowService.goToNextPage();
  }
}
