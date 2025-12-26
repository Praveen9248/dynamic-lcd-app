import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-button',
  standalone: false,
  templateUrl: './dynamic-button.component.html',
  styleUrls: ['./dynamic-button.component.scss'],
})
export class DynamicButtonComponent {
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
    borderRadius: '40px',
    border: '4px solid white',
    color: 'red',
    fontSize: '60px',
  };
  @Input() buttonType!: any;
  @Input() buttonData!: any;
  @Input() hPos: 'left' | 'right' | 'center' = 'center';
  @Input() vPos: 'top' | 'bottom' | 'center' = 'center';

  get dynamicStyles() {
    return {
      width: this.buttonConfig.width,
      height: this.buttonConfig.height,
      'border-radius': this.buttonConfig.borderRadius,
      border: this.buttonConfig.border,
      color: this.buttonConfig.color,
      background:
        this.buttonType === 'text-only'
          ? this.buttonData.background
          : 'transparent',
    };
  }
}
