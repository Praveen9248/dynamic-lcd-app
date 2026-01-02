import { Component, inject, OnInit } from '@angular/core';
import { HOME_CONTEXT } from 'src/app/services/contexts/home-context-token';

@Component({
  selector: 'app-header3-component',
  standalone: false,
  templateUrl: './header3-component.component.html',
  styleUrls: ['./header3-component.component.scss'],
})
export class Header3ComponentComponent {
  homeContext = inject(HOME_CONTEXT);
}
