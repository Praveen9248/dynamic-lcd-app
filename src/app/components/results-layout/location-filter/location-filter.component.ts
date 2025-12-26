import { Component } from '@angular/core';

@Component({
  selector: 'app-location-filter',
  standalone: false,
  templateUrl: './location-filter.component.html',
  styleUrls: ['./location-filter.component.scss'],
})
export class LocationFilterComponent {
  products = [
    {
      id: 1,
      name: 'abc1',
      imageUrl: 'https://picsum.photos/500',
      category: 'sectionA',
    },
    {
      id: 2,
      name: 'abc2',
      imageUrl: 'https://picsum.photos/500',
      category: 'sectionB',
    },
    {
      id: 3,
      name: 'abc3',
      imageUrl: 'https://picsum.photos/500',
      category: 'sectionA',
    },
    {
      id: 4,
      name: 'abc4',
      imageUrl: 'https://picsum.photos/500',
      category: 'sectionB',
    },
    {
      id: 5,
      name: 'abc5',
      imageUrl: 'https://picsum.photos/500',
      category: 'sectionB',
    },
    {
      id: 6,
      name: 'abc6',
      imageUrl: 'https://picsum.photos/500',
      category: 'sectionA',
    },
    {
      id: 7,
      name: 'abc7',
      imageUrl: 'https://picsum.photos/500',
      category: 'sectionA',
    },
    {
      id: 8,
      name: 'abc8',
      imageUrl: 'https://picsum.photos/500',
      category: 'sectionB',
    },
    {
      id: 9,
      name: 'abc9',
      imageUrl: 'https://picsum.photos/500',
      category: 'sectionA',
    },
    {
      id: 10,
      name: 'abc10',
      imageUrl: 'https://picsum.photos/500',
      category: 'sectionB',
    },
    {
      id: 11,
      name: 'abc11',
      imageUrl: 'https://picsum.photos/500',
      category: 'sectionA',
    },
    {
      id: 12,
      name: 'abc12',
      imageUrl: 'https://picsum.photos/500',
      category: 'sectionB',
    },
    {
      id: 13,
      name: 'abc13',
      imageUrl: 'https://picsum.photos/500',
      category: 'sectionA',
    },
    {
      id: 14,
      name: 'abc14',
      imageUrl: 'https://picsum.photos/500',
      category: 'sectionB',
    },
    {
      id: 15,
      name: 'abc15',
      imageUrl: 'https://picsum.photos/500',
      category: 'sectionB',
    },
  ];

  get sectionAProducts() {
    return this.products.filter((product) => product.category === 'sectionA');
  }

  get sectionBProducts() {
    return this.products.filter((product) => product.category === 'sectionB');
  }
}
