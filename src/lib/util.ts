import * as confetti from 'canvas-confetti';

export interface MessageOptions {
  blink?: boolean;
  duration?: number;
  fontFamily?: string;
  fontSize?: string;
  messageColor?: string;
  zIndex?: number;
  classes?: { [id: string]: string };
  reduceMotion?: boolean;
}

export interface ConfettiOptions extends MessageOptions {
  particleCount?: number;
  startVelocity?: number;
  spread?: number;
}

const BASE_Z_INDEX = 1000;

const DEFAULT_DURATION = 3500;
const DEFAULT_FONT_FAMILY = 'impact, Arial Narrow Bold, Arial Narrow, sans-serif';
const DEFAULT_FONT_SIZE = '4em';
const DEFAULT_MESSAGE_COLOR = 'white';
const DEFAULT_CONFETTI_PARTICLE_COUNT = 50;
const DEFAULT_CONFETTI_PARTICLE_START_VELOCITY = 30;
const DEFAULT_CONFETTI_PARTICLE_SPREAD = 360;

export default abstract class Util {
  static trackById(item: any) {
    if (item && item.id) {
      return item.id;
    }
    return item;
  }

  static message(id: string, message: string, options: MessageOptions = {}) {
    const containerId = id + '-message-container';
    if (document.getElementById(containerId) !== null) {
      // there's still an effect showing
      return;
    }
    console.debug(`Util.message(): id=${id}, message=${message}`);

    const diamondContents = document.getElementById(id);
    if (diamondContents) {
      console.debug('Util.message(): contents=', diamondContents);
      const textContainer = document.createElement('div');
      textContainer.setAttribute('id', containerId);
      textContainer.setAttribute('class', 'bl-message-container');
      textContainer.setAttribute('style',
        `z-index: ${options.zIndex || (BASE_Z_INDEX + 1)}; ` +
        `font-family: ${options.fontFamily || DEFAULT_FONT_FAMILY}; ` +
        `font-size: ${options.fontSize || DEFAULT_FONT_SIZE}; ` +
        `color: ${options.messageColor || DEFAULT_MESSAGE_COLOR}; `,
      );

      const text = document.createElement('div');
      text.setAttribute('class', `bl-message-text ${options.blink !== false ? 'bl-blink' : ''}`);

      textContainer.setAttribute('data-text', message);
      textContainer.appendChild(text);
      diamondContents.appendChild(textContainer);

      const classes = options.classes || {};
      for (const c of Object.keys(classes)) {
        const elem = document.getElementById(c);
        elem.classList.add(classes[c]);
      }
      text.innerHTML = message;

      setTimeout(() => {
        for (const c of Object.keys(classes)) {
          const elem = document.getElementById(c);
          elem.classList.remove(classes[c]);
        }

        text.remove();
        textContainer.remove();
      }, options.duration || DEFAULT_DURATION);
    }
  }

  static confetti(id: string, message: string, options: ConfettiOptions = {}) {
    const containerId = id + '-confetti-container';
    if (document.getElementById(containerId) !== null) {
      // there's still an effect showing
      return;
    }

    const diamondContents = document.getElementById(id);
    if (diamondContents) {
      const el = document.createElement('canvas');
      el.setAttribute('id', containerId);
      el.setAttribute('style', `z-index: ${options.zIndex || BASE_Z_INDEX}; width: 100%; height: 100%; position: absolute; top: 0; left: 0; display: block;`);
      diamondContents.appendChild(el);
      const c = confetti.create(el, {
        resize: true,
        useWorker: true,
      });

      // give it a little bit, or else the divs aren't initialized yet
      setTimeout(() => {
        Util.message(id, message, options);

        if (!options.reduceMotion) {
          c({
            particleCount: options.particleCount || DEFAULT_CONFETTI_PARTICLE_COUNT,
            startVelocity: options.startVelocity || DEFAULT_CONFETTI_PARTICLE_START_VELOCITY,
            spread: options.spread || DEFAULT_CONFETTI_PARTICLE_SPREAD,
          });
        }

        setTimeout(() => {
          el.remove();
        }, options.duration || DEFAULT_DURATION);
      }, 200);
    } else {
      console.warn(`unable to locate element with id=diamond-${id}`);
    }
  }
}
