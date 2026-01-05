import { Component, inject } from '@angular/core';
import { HOME_CONTEXT } from 'src/app/services/contexts/home-context-token';

@Component({
  selector: 'app-header4-component',
  standalone: false,
  templateUrl: './header4-component.component.html',
  styleUrls: ['./header4-component.component.scss'],
})
export class Header4ComponentComponent {
  homeContext = inject(HOME_CONTEXT);
}
