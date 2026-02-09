import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenSaverService {
  private timeoutId: any;
  private listeners: (() => void)[] = [];
  private isStarted = false;

  isEnabled = signal(false);
  isActive = signal(false);
  IDLE_TIME = signal<number>(10000);

  configure(enabled: boolean, idleTimeMs: number) {
    this.isEnabled.set(enabled);
    this.IDLE_TIME.set(idleTimeMs);

    if (enabled) {
      this.start();
    } else {
      this.stop();
    }
  }

  start() {
    if (!this.isEnabled() || this.isStarted) return;

    this.isStarted = true;
    this.reset();

    const events = ['click', 'touchstart', 'mousemove', 'keydown'];

    events.forEach((eventName) => {
      const handler = () => this.reset();
      window.addEventListener(eventName, handler);
      this.listeners.push(() => window.removeEventListener(eventName, handler));
    });
  }

  stop() {
    clearTimeout(this.timeoutId);
    this.isActive.set(false);
    this.isStarted = false;
    this.listeners.forEach((remove) => remove());
    this.listeners = [];
  }

  disable() {
    this.isEnabled.set(false);
    this.stop();
  }

  reset() {
    if (!this.isEnabled()) return;

    clearTimeout(this.timeoutId);
    this.isActive.set(false);

    this.timeoutId = setTimeout(() => {
      if (this.isEnabled()) {
        this.isActive.set(true);
      }
    }, this.IDLE_TIME());
  }
}
