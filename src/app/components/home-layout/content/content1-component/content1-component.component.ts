import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-content1-component',
  standalone: false,
  templateUrl: './content1-component.component.html',
  styleUrls: ['./content1-component.component.scss'],
})
export class Content1ComponentComponent {
  slides = [
    {
      imgUrl: 'https://picsum.photos/id/1/1200/700',
    },
    {
      imgUrl: 'https://picsum.photos/id/2/1200/700',
    },
    {
      imgUrl: 'https://picsum.photos/id/3/1200/700',
    },
    {
      imgUrl: 'https://picsum.photos/id/4/1200/700',
    },
    {
      imgUrl: 'https://picsum.photos/id/5/1200/700',
    },
    {
      imgUrl: 'https://picsum.photos/id/6/1200/700',
    },
  ];
}
