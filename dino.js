import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty
} from "./updateCustomProperty.js";

const dinoEl = document.querySelector('[data-dino]');

const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;

export function setupDino() {
  isJumping = false;
  dinoFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  setCustomProperty(dinoEl, '--bottom', 0);
  document.removeEventListener('keydown', onJump);
  document.addEventListener('keydown', onJump);
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

export function getDinoRect() {
  return dinoEl.getBoundingClientRect();
}

export function setDinoLose() {
  dinoEl.src = 'img/dino-lose.png';
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoEl.src = 'img/dino-stationary.png';
    return;
  }
  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    dinoEl.src = `img/dino-run-${dinoFrame}.png`;
    currentFrameTime -= FRAME_TIME;
  }
  currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
  if (!isJumping) return;

  incrementCustomProperty(dinoEl, '--bottom', yVelocity * delta);

  if (getCustomProperty(dinoEl, '--bottom') <= 0) {
    setCustomProperty(dinoEl, '--bottom', 0);
    isJumping = false;
  }

  yVelocity -= GRAVITY * delta;
}

function onJump(e) {
  if (e.code !== 'Space' || isJumping) return;

  yVelocity = JUMP_SPEED;
  isJumping = true;
}