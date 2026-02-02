import { AfterViewInit, Component, effect, HostListener } from '@angular/core';
import { ConfigService } from './services/configuration/config-service';
import { Router } from '@angular/router';
import { PreferenceService } from './services/storage/preference-service';

const BASE_A = {
  BASE_WIDTH: 1920,
  BASE_HEIGHT: 540,
};

const BASE_B = {
  BASE_WIDTH: 1920,
  BASE_HEIGHT: 1080,
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements AfterViewInit {
  constructor(
    private preferenceService: PreferenceService,
    private router: Router,
    private configService: ConfigService,
  ) {
    effect(() => {
      const configured = preferenceService.isConfigured();

      if (configured === null) return;

      if (configured) {
        this.configService.currentPageKey.set('home');

        if (this.router.url !== '/home') {
          this.router.navigateByUrl('/home', { replaceUrl: true });
        }
      } else {
        this.configService.currentPageKey.set('configuration');

        if (this.router.url !== '/configuration') {
          this.router.navigateByUrl('/configuration', { replaceUrl: true });
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.scaleToFit();
  }

  @HostListener('window:resize')
  scaleToFit() {
    const scaleX = window.innerWidth / BASE_A.BASE_WIDTH;
    const scaleY = window.innerHeight / BASE_A.BASE_HEIGHT;

    const scale = Math.min(scaleX, scaleY);

    const app = document.getElementById('lcd-app');
    if (app) {
      app.style.transform = `scale(${scale})`;
    }
  }
}
