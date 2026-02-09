import { Component, computed, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/configuration/config-service';

@Component({
  selector: 'app-header2',
  standalone: false,
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss'],
})
export class Header2Component implements OnInit {
  constructor(private configService: ConfigService) { }

  headerData = computed(() => this.configService.configData()?.header);

  logoSrc = computed(() => {
    const logo = this.headerData()?.logoUrl;
    if (logo && typeof logo === 'object' && logo.data) {
      return `data:${logo.mime};${logo.encoding},${logo.data}`;
    }
    return logo;
  });

  ngOnInit() { }
}
