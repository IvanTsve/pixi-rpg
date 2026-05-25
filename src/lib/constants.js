export const mapWalls = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

export const defaultPosition = {
    x: 300,
    y: 280,
}

export const SPEED = 5;
export const defaultScale = 0.7;
export const keyActions = {
  w: { dx: 0, dy: -SPEED, scaleX: defaultScale },
  s: { dx: 0, dy: SPEED, scaleX: defaultScale },
  a: { dx: -SPEED, dy: 0, scaleX: -defaultScale },
  d: { dx: SPEED, dy: 0, scaleX: defaultScale },
};

export const FRAME_WIDTH = 200;
export const FRAME_HEIGHT = 150;
export const FRAME_DURATION = 100;