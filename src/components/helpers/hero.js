import { HERO_SPEED_PX_PER_SEC } from '../../lib/constants';
import { canPlayerMove } from './collision';

export const calculateHeroMovement = (x, y, delta, keysPressed, keyActions, defaultScale) => {
    let isMoving = false;
    let action = null;
    const step = HERO_SPEED_PX_PER_SEC * (delta.deltaMS / 1000);

    for (const key of keysPressed.current) {
        action = keyActions[key];
        if (!action) continue;

        const nextX = x + action.dx * step;
        const nextY = y + action.dy * step;

        if (canPlayerMove(nextX, nextY)) {
            x = nextX;
            y = nextY;
            isMoving = true;
        }
    }
    return { x, y, isMoving, scaleX: action ? action.scaleX : defaultScale };
};
