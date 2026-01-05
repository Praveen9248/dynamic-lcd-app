import { Component, inject } from '@angular/core';
import { HOME_CONTEXT } from 'src/app/services/contexts/home-context-token';

@Component({
  selector: 'app-header1-component',
  standalone: false,
  templateUrl: './header1-component.component.html',
  styleUrls: ['./header1-component.component.scss'],
})
export class Header1ComponentComponent {
  homeContext = inject(HOME_CONTEXT);
}
