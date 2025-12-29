import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  slides = [
    {
      imgUrl: 'https://picsum.photos/id/30/1920/480',
    },
    {
      imgUrl: 'https://picsum.photos/id/29/1920/480',
    },
    {
      imgUrl: 'https://picsum.photos/id/20/1920/480',
    },
    {
      imgUrl: 'https://picsum.photos/id/24/1920/480',
    },
    {
      imgUrl: 'https://picsum.photos/id/25/1920/480',
    },
    {
      imgUrl: 'https://picsum.photos/id/26/1920/480',
    },
  ];

  onStart() {
    this.pageFlowService.goToNextPage();
  }
}
