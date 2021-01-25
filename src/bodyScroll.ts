import { initializeScrollSpeedWatcher } from './scrollSpeed';
import { createSpring } from './spring';
import { createBlurSvg } from './svg';

export function initializeBodyScrollMotionBlur() {
  const bodyBlur = createBlurSvg();

  const blurXSpring = createSpring(0, { damping: 30, stiffness: 1000 });
  const blurYSpring = createSpring(0, { damping: 30, stiffness: 1000 });

  initializeScrollSpeedWatcher(document.documentElement, (speed) => {
    bodyBlur.setBlur({ x: 0, y: Math.abs(speed.y / 2) });
    blurXSpring.transitionTo(speed.x);
    blurYSpring.transitionTo(speed.y);
  });

  blurYSpring.onUpdate((value) => {
    // bodyBlur.setBlur({ x: 0, y: Math.floor(Math.abs(value / 2)) });
  });

  bodyBlur.applyTo(document.body);

  console.log(bodyBlur);
}
