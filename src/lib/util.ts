import * as confetti from 'canvas-confetti';

interface ConfettiOptions {
  duration?: number,
  zIndex?: number,
  blinkSpeed?: number,
  particleCount?: number,
  startVelocity?: number,
  spread?: number,
  fontFamily?: string,
  fontSize?: string,
  messageColor?: string,
}

const DEFAULT_CONFETTI_DURATION = 4000;
const DEFAULT_CONFETTI_Z_INDEX = 1000;
const DEFAULT_CONFETTI_MESSAGE_BLINK_SPEED = 400;
const DEFAULT_CONFETTI_PARTICLE_COUNT = 50;
const DEFAULT_CONFETTI_PARTICLE_START_VELOCITY = 30;
const DEFAULT_CONFETTI_PARTICLE_SPREAD = 360;
const DEFAULT_CONFETTI_FONT_FAMILY = 'impact, Arial Narrow Bold, Arial Narrow, sans-serif';
const DEFAULT_CONFETTI_FONT_SIZE = '5em';
const DEFAULT_CONFETTI_MESSAGE_COLOR = 'white';

export default abstract class Util {

  static confetti(id: string, message: string, options: ConfettiOptions = {}) {
    const diamondContents = document.getElementById(id);
    if (diamondContents) {
      const el = document.createElement('canvas');
      el.setAttribute('style', `z-index: ${options.zIndex || DEFAULT_CONFETTI_Z_INDEX}; width: 100%; height: 100%; position: absolute; top: 0; left: 0; display: block;`);
      diamondContents.appendChild(el);
      const c = confetti.create(el, {
        resize: true,
        useWorker: true,
      });

      const textContainer = document.createElement('div');
      textContainer.setAttribute('style', `z-index: ${(options.zIndex || DEFAULT_CONFETTI_Z_INDEX) + 1}; width: 100%; height: 100%; position: absolute; top: 0; left: 0; display: table`);
      const text = document.createElement('div')
      text.setAttribute('style',
        'width: 100%; ' +
        'height: 100%; ' +
        `font-family: ${options.fontFamily || DEFAULT_CONFETTI_FONT_FAMILY}; ` +
        `font-size: ${options.fontSize || DEFAULT_CONFETTI_FONT_SIZE}; ` +
        `color: ${options.messageColor || DEFAULT_CONFETTI_MESSAGE_COLOR}; ` +
        'text-shadow: 1px 0 0 black, 0 1px 0 black, -1px 0 0 black, 0 -1px 0 black; ' +
        'display: table-cell; ' +
        'text-align: center; ' +
        'vertical-align: middle;'
      );

      textContainer.appendChild(text);
      diamondContents.appendChild(textContainer);

      // otherwise the divs aren't initialized yet
      setTimeout(() => {
        let on = true;
        const blink = setInterval(() => {
          if (on) {
            text.innerHTML = message;
          } else {
            text.innerHTML = '';
          }
          on = !on;
        }, options.blinkSpeed || DEFAULT_CONFETTI_MESSAGE_BLINK_SPEED);

        c({
          particleCount: options.particleCount || DEFAULT_CONFETTI_PARTICLE_COUNT,
          startVelocity: options.startVelocity || DEFAULT_CONFETTI_PARTICLE_START_VELOCITY,
          spread: options.spread || DEFAULT_CONFETTI_PARTICLE_SPREAD,
        });

        setTimeout(() => {
          clearInterval(blink);
          text.remove();
          textContainer.remove();
          el.remove();
        }, options.duration || DEFAULT_CONFETTI_DURATION);
      }, 200);
    } else {
      console.warn(`unable to locate element with id=diamond-${id}`);
    }
  }
}