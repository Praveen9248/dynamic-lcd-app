import { computed, Injectable, signal } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class PreferenceService {
  private readonly _isConfigured = signal<boolean | null>(null);

  readonly isConfigured = computed(() => this._isConfigured());

  constructor() {
    this.loadPreference();
  }

  private async loadPreference() {
    const { value } = await Preferences.get({ key: 'isConfigured' });
    this._isConfigured.set(value === 'true');
  }

  async setConfigured(value: boolean) {
    await Preferences.set({
      key: 'isConfigured',
      value: String(value),
    });
    this._isConfigured.set(value);
  }
}
