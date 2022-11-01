const ScaleParameters = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const EffectSettings = {
  'effect-none': {
    effect: ['none', '']
  },
  'effect-chrome': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    effect: ['grayscale', ''],
  },
  'effect-sepia': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    effect: ['sepia', '']
  },
  'effect-marvin': {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    effect: ['invert', '%']
  },
  'effect-phobos': {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    effect: ['blur', 'px']
  },
  'effect-heat': {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    effect: ['brightness', '']
  },
};

const getScaleParameters = () => ScaleParameters;
const getEffectSettings = () => EffectSettings;

export {getScaleParameters, getEffectSettings};
