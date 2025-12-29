import { Component, inject } from '@angular/core';
import { PageFlowService } from 'src/app/services/pageFlow/page-flow-service';

@Component({
  selector: 'app-content3-component',
  standalone: false,
  templateUrl: './content3-component.component.html',
  styleUrls: ['./content3-component.component.scss'],
})
export class Content3ComponentComponent {
  pageFlowService = inject(PageFlowService);

  Options = [
    {
      name: 'Traditional wear',
      imageUrl:
        'https://image2url.com/r2/bucket2/images/1766731243257-963043f4-d400-482d-8f82-b50e22d5a5e2.png',
    },
    {
      name: 'Formal wear',
      imageUrl:
        'https://image2url.com/r2/bucket2/images/1766731480219-b3f3d999-67ca-4e2a-ab08-23a62110fca6.png',
    },
    {
      name: 'Modern wear',
      imageUrl:
        'https://image2url.com/r2/bucket2/images/1766731243257-963043f4-d400-482d-8f82-b50e22d5a5e2.png',
    },
    {
      name: 'Casual wear',
      imageUrl:
        'https://image2url.com/r2/bucket2/images/1766731480219-b3f3d999-67ca-4e2a-ab08-23a62110fca6.png',
    },
    {
      name: 'Function wear',
      imageUrl:
        'https://image2url.com/r2/bucket2/images/1766731243257-963043f4-d400-482d-8f82-b50e22d5a5e2.png',
    },
    {
      name: 'Foot wear',
      imageUrl:
        'https://image2url.com/r2/bucket2/images/1766731480219-b3f3d999-67ca-4e2a-ab08-23a62110fca6.png',
    },
    {
      name: 'Shoes',
      imageUrl:
        'https://image2url.com/r2/bucket2/images/1766731480219-b3f3d999-67ca-4e2a-ab08-23a62110fca6.png',
    },
    {
      name: 'Shoes',
      imageUrl:
        'https://image2url.com/r2/bucket2/images/1766731480219-b3f3d999-67ca-4e2a-ab08-23a62110fca6.png',
    },
    {
      name: 'Shoes',
      imageUrl:
        'https://image2url.com/r2/bucket2/images/1766731480219-b3f3d999-67ca-4e2a-ab08-23a62110fca6.png',
    },
  ];

  onFilter() {
    this.pageFlowService.goToNextPage();
  }
}
