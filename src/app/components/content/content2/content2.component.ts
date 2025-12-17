import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content2',
  standalone: false,
  templateUrl: './content2.component.html',
  styleUrls: ['./content2.component.scss'],
})
export class Content2Component implements OnInit {
  filters = [
    { name: 'Traditional wear' },
    { name: 'Modern wear' },
    { name: 'Function wear' },
    { name: 'Formal wear' },
    { name: 'Casual wear' },
    { name: 'Foot wear' },
    { name: 'Shoes' },
  ];
  ngOnInit() {}
}
