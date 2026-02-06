import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenSaverService {
  private timeoutId: any;
  private listeners: (() => void)[] = [];
  private isStarted = false;

  // Signals for reactive state
  isEnabled = signal(false);
  isActive = signal(false);
  IDLE_TIME = signal<number>(10000); // Default 10 seconds

  /**
   * Configure and enable the screen saver
   * Call this when you want to set up the screen saver (e.g., on home page)
   */
  configure(enabled: boolean, idleTimeMs: number) {
    this.isEnabled.set(enabled);
    this.IDLE_TIME.set(idleTimeMs);

    if (enabled) {
      this.start();
    } else {
      this.stop();
    }
  }

  /**
   * Start listening for user activity
   * Only works if screen saver is enabled
   */
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

  /**
   * Stop and disable the screen saver completely
   * Call this when entering pages that shouldn't have screen saver
   */
  stop() {
    clearTimeout(this.timeoutId);
    this.isActive.set(false);
    this.isStarted = false;
    this.listeners.forEach((remove) => remove());
    this.listeners = [];
  }

  /**
   * Disable and stop - convenience method for pages that shouldn't have screen saver
   */
  disable() {
    this.isEnabled.set(false);
    this.stop();
  }

  /**
   * Reset the idle timer (called on user activity)
   */
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
