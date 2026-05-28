import {
    Texture,
    Rectangle,
} from 'pixi.js';
import { FRAME_WIDTH, FRAME_HEIGHT } from '../../lib/constants';

export const calculateHeroMovement = (x, y, delta, keysPressed, keyActions, defaultScale) => {
    let isMoving = false;
    
    let action = null;
    for (const key of keysPressed.current) {
        action = keyActions[key];
        
        if (action) {
            x += action.dx * delta.deltaTime;
            y += action.dy * delta.deltaTime;
            isMoving = true;
        }
    }
   return { x, y, isMoving, scaleX: action ? action.scaleX : defaultScale };
}

export const generateTexture = (sheetSource, frameIndex) => {
    return new Texture({
        source: sheetSource,
        frame: new Rectangle(
            frameIndex * FRAME_WIDTH,
            0,
            FRAME_WIDTH,
            FRAME_HEIGHT
        ),
    });
};