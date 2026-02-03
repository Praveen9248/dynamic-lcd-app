import { Component, computed, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/configuration/config-service';

@Component({
  selector: 'app-header3',
  standalone: false,
  templateUrl: './header3.component.html',
  styleUrls: ['./header3.component.scss'],
})
export class Header3Component implements OnInit {
  constructor(private configService: ConfigService) {}

  headerData = computed(() => this.configService.configData()?.header);

  ngOnInit() {}
}
