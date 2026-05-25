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
export const keyActions = {
  w: { dx: 0, dy: -SPEED, scaleX: 1 },
  s: { dx: 0, dy: SPEED, scaleX: 1 },
  a: { dx: -SPEED, dy: 0, scaleX: -1 },
  d: { dx: SPEED, dy: 0, scaleX: 1 },
};