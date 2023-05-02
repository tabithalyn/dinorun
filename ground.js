import { getCustomProperty, incrementCustomProperty, setCustomProperty } from './updateCustomProperty.js';

const SPEED = .05;
const groundEls = document.querySelectorAll('[data-ground]');

export function setupGround() {
  setCustomProperty(groundEls[0], '--left', 0);
  setCustomProperty(groundEls[1], '--left', 300);
}

export function updateGround(delta) {
  groundEls.forEach(ground => {
    incrementCustomProperty(ground, "--left", delta * SPEED * -1);

    if (getCustomProperty(ground, '--left') <= -300) {
      incrementCustomProperty(ground, '--left', 600);
    }
  });
}