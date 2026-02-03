import { Component, computed, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/configuration/config-service';

@Component({
  selector: 'app-header2',
  standalone: false,
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss'],
})
export class Header2Component implements OnInit {
  constructor(private configService: ConfigService) {}

  headerData = computed(() => this.configService.configData()?.header);

  ngOnInit() {}
}
