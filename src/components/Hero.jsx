import {
    Assets,
    Texture,
    Sprite,
    Rectangle,
} from 'pixi.js';
import {
    useEffect,
    useState,
} from 'react';

import {
    extend,
} from '@pixi/react';
extend({ Sprite });

export const Hero = () => {
    const [heroTexture, setHeroTexture] = useState(Texture.EMPTY);

    useEffect(() => {
        Assets.load(import.meta.env.VITE_PIXI_HERO_URL).then((result) => {
            const frame = new Rectangle(0, 0, 200, 150);
            const heroTexture = new Texture({
                source: result,
                frame,
            });
            setHeroTexture(heroTexture);
        });
    }, []);

    return (
        <pixiSprite texture={heroTexture} x={400} y={280} anchor={0.5} />
    );
};
