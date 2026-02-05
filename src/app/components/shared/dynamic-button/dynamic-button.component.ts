import { Component, computed, Input, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/configuration/config-service';

@Component({
  selector: 'app-dynamic-button',
  standalone: false,
  templateUrl: './dynamic-button.component.html',
  styleUrls: ['./dynamic-button.component.scss'],
})
export class DynamicButtonComponent implements OnInit {
  constructor(private configService: ConfigService) {}
  @Input() buttonImageData?: any;

  buttonData = computed(() => this.configService.configData()?.button);
  ngOnInit() {}

  dynamicStyles = computed(() => {
    const btn = this.buttonData();
    if (!btn) return {};

    return {
      width: btn.width + 'px',
      height: btn.height + 'px',
      borderRadius: btn.borderRadius + 'px',
      borderWidth: btn.borderWidth + 'px',
      borderColor: btn.borderColor,
      borderStyle: 'solid',
      background:
        btn.buttonType === 'text-only' ? btn.backgroundColor : 'transparent',
    };
  });

  letterStyles = computed(() => {
    const btn = this.buttonData();
    if (!btn) return {};

    return {
      color: btn.textColor,
      fontSize: btn.fontSize + 'px',
      fontWeight: btn.fontWeight,
      lineHeight: btn.lineHeight,
      letterSpacing: btn.letterSpacing + 'px',
      fontFamily: btn.fontFamily,
    };
  });
}
