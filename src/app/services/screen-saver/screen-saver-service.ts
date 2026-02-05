import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenSaverService {
  private timeoutId: any;
  isActive = signal(false);

  private IDLE_TIME = 30000; // 30 sec

  start() {
    this.reset();
    console.log('working');
    ['click', 'touchstart', 'mousemove', 'keydown'].forEach((e) =>
      window.addEventListener(e, () => this.reset()),
    );
  }

  reset() {
    clearTimeout(this.timeoutId);
    console.log('working2');
    this.isActive.set(false);

    this.timeoutId = setTimeout(() => {
      this.isActive.set(true);
    }, this.IDLE_TIME);
  }
}
