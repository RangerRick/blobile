import * as confetti from 'canvas-confetti';

interface MessageOptions {
  blinkSpeed?: number,
  duration?: number,
  fontFamily?: string,
  fontSize?: string,
  messageColor?: string,
  zIndex?: number,
}

interface ConfettiOptions extends MessageOptions {
  particleCount?: number,
  startVelocity?: number,
  spread?: number,
}

const BASE_Z_INDEX = 1000;

const DEFAULT_DURATION = 4000;
const DEFAULT_FONT_FAMILY = 'impact, Arial Narrow Bold, Arial Narrow, sans-serif';
const DEFAULT_FONT_SIZE = '4em';
const DEFAULT_MESSAGE_BLINK_SPEED = 400;
const DEFAULT_MESSAGE_COLOR = 'white';
const DEFAULT_CONFETTI_PARTICLE_COUNT = 50;
const DEFAULT_CONFETTI_PARTICLE_START_VELOCITY = 30;
const DEFAULT_CONFETTI_PARTICLE_SPREAD = 360;

export default abstract class Util {

  static message(id: string, message: string, options: MessageOptions = {}) {
    const diamondContents = document.getElementById(id);
    if (diamondContents) {
      const textContainer = document.createElement('div');
      textContainer.setAttribute('style',
        `z-index: ${options.zIndex || (BASE_Z_INDEX + 1)}; ` +
        'width: 100%; ' +
        'height: 100%; ' +
        'position: absolute; ' +
        'top: 0; ' +
        'left: 0; ' +
        'display: table'
      );

      const text = document.createElement('div')
      text.setAttribute('style',
        'width: 100%; ' +
        'height: 100%; ' +
        `font-family: ${options.fontFamily || DEFAULT_FONT_FAMILY}; ` +
        `font-size: ${options.fontSize || DEFAULT_FONT_SIZE}; ` +
        `color: ${options.messageColor || DEFAULT_MESSAGE_COLOR}; ` +
        'text-shadow: 1px 0 0 black, 0 1px 0 black, -1px 0 0 black, 0 -1px 0 black; ' +
        'display: table-cell; ' +
        'text-align: center; ' +
        'vertical-align: middle;'
      );

      textContainer.appendChild(text);
      diamondContents.appendChild(textContainer);

      let blink: number;

      setTimeout(() => {
        if (options.blinkSpeed !== 0) {
          let on = true;
          blink = setInterval(() => {
            if (on) {
              text.innerHTML = message;
            } else {
              text.innerHTML = '';
            }
            on = !on;
          }, options.blinkSpeed || DEFAULT_MESSAGE_BLINK_SPEED) as unknown as number;

          setTimeout(() => {
            if (blink) {
              clearInterval(blink);
            }
            text.remove();
            textContainer.remove();
          }, options.duration || DEFAULT_DURATION);
        }
      }, 200);
    }
  }

  static confetti(id: string, message: string, options: ConfettiOptions = {}) {
    const diamondContents = document.getElementById(id);
    if (diamondContents) {
      const el = document.createElement('canvas');
      el.setAttribute('style', `z-index: ${options.zIndex || BASE_Z_INDEX}; width: 100%; height: 100%; position: absolute; top: 0; left: 0; display: block;`);
      diamondContents.appendChild(el);
      const c = confetti.create(el, {
        resize: true,
        useWorker: true,
      });

      // otherwise the divs aren't initialized yet
      setTimeout(() => {
        Util.message(id, message, options);

        c({
          particleCount: options.particleCount || DEFAULT_CONFETTI_PARTICLE_COUNT,
          startVelocity: options.startVelocity || DEFAULT_CONFETTI_PARTICLE_START_VELOCITY,
          spread: options.spread || DEFAULT_CONFETTI_PARTICLE_SPREAD,
        });

        setTimeout(() => {
          el.remove();
        }, options.duration || DEFAULT_DURATION);
      }, 200);
    } else {
      console.warn(`unable to locate element with id=diamond-${id}`);
    }
  }
}