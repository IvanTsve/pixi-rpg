import {
    Assets,
    Texture,
    Sprite,
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
            setHeroTexture(result);
        });
    }, []);

    return (
        <pixiSprite texture={heroTexture} x={400} y={280} anchor={0.5} />
    );
};
