import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customized-button',
  standalone: false,
  templateUrl: './customized-button.component.html',
  styleUrls: ['./customized-button.component.scss'],
})
export class CustomizedButtonComponent implements OnInit {
  @Input() buttonConfig: {
    width: string;
    height: string;
    borderRadius: string;
    border: string;
    fontSize: string;
    color: string;
  } = {
    width: '300px',
    height: '200px',
    borderRadius: '100px',
    border: '4px solid white',
    color: 'red',
    fontSize: '30px',
  };
  @Input() buttonType!: any;
  @Input() buttonData!: any;
  @Input() hPos: 'left' | 'right' | 'center' = 'center';
  @Input() vPos: 'top' | 'bottom' | 'center' = 'center';

  ngOnInit() {}
}
