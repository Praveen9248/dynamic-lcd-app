import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nested-filter',
  standalone: false,
  templateUrl: './nested-filter.component.html',
  styleUrls: ['./nested-filter.component.scss'],
})
export class NestedFilterComponent {
  constructor(private router: Router) {}
  filters = ['mens', 'womens', 'kids', 'old-age', 'baby-clothes'];

  handleClick() {
    this.router.navigate(['results-page']);
  }
}
