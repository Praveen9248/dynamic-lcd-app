import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content3',
  standalone: false,
  templateUrl: './content3.component.html',
  styleUrls: ['./content3.component.scss'],
})
export class Content3Component implements OnInit {
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
