import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class VoiceService {
  constructor(
    private platform: Platform,
    private settings: SettingsService,
  ) {
    this.init();
  }

  async init() {
    await this.platform.ready();
    await this.settings.ready;

    console.debug('VoiceService initializing.');

    if (!window.speechSynthesis) {
      return;
    }

    // just to prime default setting
    this.voice();
  }

  async voice(uri?: string) {
    await this.settings.ready;
    const voices = this.voices();

    if (uri) {
      return voices.find((voice: SpeechSynthesisVoice) => voice.voiceURI === uri);
    }

    let configuredVoice = voices.find((voice: SpeechSynthesisVoice) => {
      return voice.voiceURI === this.settings.voice();
    });
    console.debug('VoiceService.voice(): found configured voice:', configuredVoice);

    if (!configuredVoice) {
      configuredVoice = voices.find((voice: SpeechSynthesisVoice) => voice.default);
      if (configuredVoice) {
        console.debug('VoiceService.voice(): configured voice not found, resetting to default.');
        this.settings.setVoice(configuredVoice.voiceURI);
      }
    }

    return configuredVoice;
  }

  voices() {
    if (!window.speechSynthesis) {
      return [];
    }

    return window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith('en'));
  }

  async say(message: string, options?: {
    force?: boolean,
    voice?: SpeechSynthesisVoice,
  }) {
    if (!window.speechSynthesis) {
      return;
    }
    if (this.settings.speech() || options?.force) {
      try {
        const msg = new SpeechSynthesisUtterance(message);
        msg.volume = this.settings.volume();
        msg.voice = options?.voice || await this.voice();
        window.speechSynthesis.speak(msg);
      } catch (err) {
        // just eat it
        console.error('Failed to talk:', err);
      }

    }
  }
}
