import { Component, inject } from '@angular/core';
import { HOME_CONTEXT } from 'src/app/services/contexts/home-context-token';

@Component({
  selector: 'app-header2-component',
  standalone: false,
  templateUrl: './header2-component.component.html',
  styleUrls: ['./header2-component.component.scss'],
})
export class Header2ComponentComponent {
  homeContext = inject(HOME_CONTEXT);
}
