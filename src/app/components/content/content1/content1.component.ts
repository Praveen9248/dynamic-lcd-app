import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-content1',
  standalone: false,
  templateUrl: './content1.component.html',
  styleUrls: ['./content1.component.scss'],
})
export class Content1Component implements OnInit {
  slides = [
    {
      img: 'https://picsum.photos/id/1/1280/700',
    },
    {
      img: 'https://picsum.photos/id/2/1280/700',
    },
    {
      img: 'https://picsum.photos/id/3/1280/700',
    },
    {
      img: 'https://picsum.photos/id/4/1280/700',
    },
    {
      img: 'https://picsum.photos/id/5/1280/700',
    },
  ];

  ngOnInit() {}
}
