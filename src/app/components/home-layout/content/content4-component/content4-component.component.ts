import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content4-component',
  standalone: false,
  templateUrl: './content4-component.component.html',
  styleUrls: ['./content4-component.component.scss'],
})
export class Content4ComponentComponent {
  constructor(private router: Router) {}

  handleClick() {
    this.router.navigate(['dynamic-page']);
  }
}
