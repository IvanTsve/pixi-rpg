import { Assets, Texture, Rectangle } from 'pixi.js';
import { SPRITE_FRAME_WIDTH, SPRITE_FRAME_HEIGHT } from '../../lib/constants';

export const generateTexture = (sheetSource, frameIndex) => {
    return new Texture({
        source: sheetSource,
        frame: new Rectangle(
            frameIndex * SPRITE_FRAME_WIDTH,
            0,
            SPRITE_FRAME_WIDTH,
            SPRITE_FRAME_HEIGHT
        ),
    });
};

export const createTexturesFromSheet = (sheet) => {
    const frameCount = Math.floor(sheet.width / SPRITE_FRAME_WIDTH);
    const textures = [];
    for (let i = 0; i < frameCount; i++) {
        textures[i] = generateTexture(sheet.source, i);
    }
    return { sheet, textures, frameCount };
};

export const loadSpriteFrames = async (url) => {
    const sheet = await Assets.load(url);
    return createTexturesFromSheet(sheet);
};
