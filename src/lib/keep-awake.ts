import { registerWebPlugin, WebPlugin } from '@capacitor/core';

declare module '@capacitor/core' {
  interface PluginRegistry {
    KeepAwake: KeepAwakePlugin;
  }
}

export interface KeepAwakePlugin {
  keepAwake(): Promise<void>;
  allowSleep(): Promise<void>;
}

export class KeepAwakeWeb extends WebPlugin implements KeepAwakePlugin {
  constructor() {
    super({
      name: 'KeepAwake',
      platforms: ['web'],
    });
  }
  async keepAwake(): Promise<void> {
    console.log('KeepAwake does not support web');
    return Promise.resolve();
  }

  async allowSleep(): Promise<void> {
    console.log('KeepAwake does not support web');
    return Promise.resolve();
  }
}

const KeepAwake = new KeepAwakeWeb();

export { KeepAwake };

registerWebPlugin(KeepAwake);