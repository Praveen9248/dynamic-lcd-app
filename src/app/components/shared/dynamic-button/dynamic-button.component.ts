import { Component, computed, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/configuration/config-service';

@Component({
  selector: 'app-dynamic-button',
  standalone: false,
  templateUrl: './dynamic-button.component.html',
  styleUrls: ['./dynamic-button.component.scss'],
})
export class DynamicButtonComponent implements OnInit {
  constructor(private configService: ConfigService) {}

  buttonData = computed(() => this.configService.configData()?.button);
  ngOnInit() {}

  dynamicStyles = computed(() => {
    const btn = this.buttonData();
    if (!btn) return {};
    return {
      width: this.buttonData()?.width + 'px',
      height: this.buttonData()?.height + 'px',
      'border-radius': this.buttonData()?.borderRadius + 'px',
      'border-width': 10 + 'px',
      'border-color': this.buttonData()?.borderColor,
      'border-style': 'solid',
      color: this.buttonData()?.textColor,

      background:
        this.buttonData().buttonType === 'text-only'
          ? this.buttonData().backgroundColor
          : 'transparent',
    };
  });

  letterStyles = computed(() => {
    return {
      color: '#ffffff',
      'font-size': '48px',
      'font-weight': 800,
      'line-height': 1.05,
      'letter-spacing': '-0.5px',
      'font-family': 'Inter',
    };
  });
}
