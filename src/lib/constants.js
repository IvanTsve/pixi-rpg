export const mapWalls = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

export const defaultPosition = {
    x: 200,
    y: 280,
};

/** Walk speed in world pixels per second (applied with delta.deltaMS). */
export const HERO_SPEED_PX_PER_SEC = 300;

export const defaultScale = 0.55;

/** Unit direction per key; scaled by HERO_SPEED_PX_PER_SEC at runtime. */
export const keyActions = {
  w: { dx: 0, dy: -1, scaleX: defaultScale },
  s: { dx: 0, dy: 1, scaleX: defaultScale },
  a: { dx: -1, dy: 0, scaleX: -defaultScale },
  d: { dx: 1, dy: 0, scaleX: defaultScale },
  arrowup: { dx: 0, dy: -1, scaleX: defaultScale },
  arrowdown: { dx: 0, dy: 1, scaleX: defaultScale },
  arrowleft: { dx: -1, dy: 0, scaleX: -defaultScale },
  arrowright: { dx: 1, dy: 0, scaleX: defaultScale },
};

/** Hero spritesheet frame size (px). */
export const SPRITE_FRAME_WIDTH = 200;
export const SPRITE_FRAME_HEIGHT = 150;

/** Collision grid cell size in world pixels (mapWalls layout, not sprite art). */
export const TILE_WIDTH = 54;
export const TILE_HEIGHT = 45;

/** Tiles to subtract when mapping world Y into mapWalls row index. */
export const MAP_GRID_ROW_OFFSET = 1;

export const FRAME_DURATION = 100;
