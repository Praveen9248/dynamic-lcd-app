import { computed, Injectable, signal } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class PreferenceService {
  //variables for storing the config status and file path
  private readonly _isConfigured = signal<boolean | null>(null);
  private readonly _filePath = signal<string | null>(null);

  //computed variables for accessing the config status and file path
  readonly isConfigured = computed(() => this._isConfigured());
  readonly filePath = computed(() => this._filePath());

  constructor() {
    this.loadPreference();
  }

  //method for loading the preferences
  private async loadPreference() {
    const { value } = await Preferences.get({ key: 'isConfigured' });
    this._isConfigured.set(value === 'true');

    const { value: filePath } = await Preferences.get({ key: 'filePath' });
    this._filePath.set(filePath);
  }

  //method for setting the config status
  async setConfigured(value: boolean) {
    await Preferences.set({
      key: 'isConfigured',
      value: String(value),
    });
    this._isConfigured.set(value);
  }

  //method for setting the file path
  async setFilePath(value: string) {
    await Preferences.set({
      key: 'filePath',
      value: value,
    });
    this._filePath.set(value);
  }

  //method for clearing the preferences
  async clearPreferences() {
    await this.setConfigured(false)
    await Preferences.remove({ key: 'filePath' });
    this._filePath.set(null);
  }
}
