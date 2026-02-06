import { Component, computed, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/configuration/config-service';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-screen-saver',
  standalone: false,
  templateUrl: './screen-saver.component.html',
  styleUrls: ['./screen-saver.component.scss'],
})
export class ScreenSaverComponent implements OnInit {
  constructor(private configService: ConfigService) {}

  ngOnInit() {}

  screenSaverData = computed(
    () => this.configService.configData()?.screenSaver,
  );

  screenSaverStatus = computed(
    () => this.configService.configData()?.screenSaver?.screenSaverStatus,
  );

  screenSaverType = computed(
    () => this.configService.configData()?.screenSaver?.screenSaverType,
  );
}
