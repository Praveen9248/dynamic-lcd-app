import { Injectable, NgZone } from '@angular/core';
import { PreferenceService } from '../storage/preference-service';

@Injectable({
    providedIn: 'root',
})
export class GestureService {
    //variables for tracking the tap count and timeout
    private tapCount = 0;
    private tapTimeout: any;

    //constants for tap limit, tap window and corner size
    private readonly TAP_LIMIT = 7;
    private readonly TAP_WINDOW = 4000;
    private readonly CORNER_SIZE = 150;

    constructor(
        private preferenceService: PreferenceService,
        private ngZone: NgZone
    ) {
        this.initListener();
    }

    //methods for initializing the listeners
    private initListener() {
        //executed outside the zone to prevent unecessary change detection cycle
        this.ngZone.runOutsideAngular(() => {
            window.addEventListener('click', this.onScreenTap.bind(this));
            window.addEventListener('touchstart', this.onScreenTap.bind(this));
        });
    }

    //methods for handling the screen tap
    private onScreenTap(event: MouseEvent | TouchEvent) {
        if (!this.preferenceService.isConfigured()) return;

        const x = 'touches' in event
            ? (event as TouchEvent).touches[0].clientX
            : (event as MouseEvent).clientX;

        const y = 'touches' in event
            ? (event as TouchEvent).touches[0].clientY
            : (event as MouseEvent).clientY;

        const screenWidth = window.innerWidth;

        const isTopRight =
            x > screenWidth - this.CORNER_SIZE &&
            y < this.CORNER_SIZE;

        if (!isTopRight) return;

        this.tapCount++;

        clearTimeout(this.tapTimeout);

        this.tapTimeout = setTimeout(() => {
            this.tapCount = 0;
        }, this.TAP_WINDOW);

        if (this.tapCount === this.TAP_LIMIT) {
            this.ngZone.run(() => {
                this.resetConfiguration();
            });
            this.tapCount = 0;
        }
    }

    //methods for resetting the configuration
    private async resetConfiguration() {
        console.log('Configuration Reset Triggered 🔧');
        await this.preferenceService.clearPreferences();
        window.location.reload();
    }
}
