import { mapWalls, TILE_WIDTH, TILE_HEIGHT, MAP_GRID_ROW_OFFSET } from '../../lib/constants';

export const canPlayerMove = (x, y) => {
    const row = Math.floor(y / TILE_HEIGHT) - MAP_GRID_ROW_OFFSET;
    const col = Math.floor(x / TILE_WIDTH);

    if (row < 0 || row >= mapWalls.length || col < 0 || col >= mapWalls[0].length) {
        return false;
    }

    return mapWalls[row][col] === 0;
};
