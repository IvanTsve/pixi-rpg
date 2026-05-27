import {
    Texture,
    Rectangle,
} from 'pixi.js';

export const calculateHeroMovement = ({x, y}, delta, keysPressed, keyActions, defaultScale) => {
    let isMoving = false;
    let position = {
     x: x,
     y: y,
    };
    let action = null;
    for (const key of keysPressed.current) {
        action = keyActions[key];
        
        if (action) {
            position.x += action.dx * delta.deltaTime;
            position.y += action.dy * delta.deltaTime;
            isMoving = true;
        }
    }
   return { position, isMoving, scaleX: action ? action.scaleX : defaultScale };
}

export const generateTexture = (sheetSource, frameIndex, FRAME_WIDTH, FRAME_HEIGHT) => {
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