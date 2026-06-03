import { mapWalls, FRAME_WIDTH, FRAME_HEIGHT, defaultScale } from '../../lib/constants';

export const canPlayerMove = (x, y, delta) => {

    let row = Math.floor((y / (FRAME_HEIGHT * 0.3)) - 1);
    let col = Math.floor(x  / (FRAME_WIDTH * 0.27));

    return mapWalls[row][col] == 1;  // 0 = walk, 1 = wall
};