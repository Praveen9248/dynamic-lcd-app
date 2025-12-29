import { Component } from '@angular/core';

@Component({
  selector: 'app-list-filter',
  standalone: false,
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss'],
})
export class ListFilterComponent {
  category = ['random', 'clothing', 'drinks', 'foodies'];
  brands = ['z', 'y', 'x', 'w'];
  items = ['random', 'clothing', 'drinks', 'foodies', 'games', 'kids-wear'];
}
