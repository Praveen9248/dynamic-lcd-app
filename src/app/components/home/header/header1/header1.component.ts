import { Component, computed, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/configuration/config-service';

@Component({
  selector: 'app-header1',
  standalone: false,
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.scss'],
})
export class Header1Component implements OnInit {
  constructor(private configService: ConfigService) {}

  headerData = computed(() => this.configService.configData()?.header);

  ngOnInit() {}
}
