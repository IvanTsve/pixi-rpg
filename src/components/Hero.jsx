import {
    Assets,
    Texture,
    Sprite,
    Rectangle,
} from 'pixi.js';
import {
    useEffect,
    useState,
    useRef,
} from 'react';
import {
    extend,
    useTick,
} from '@pixi/react';
extend({ Sprite });

import { defaultPosition, keyActions } from '../lib/constants';
import { useHeroPosition } from './helpers/hero';

export const Hero = () => {
    const [heroTexture, setHeroTexture] = useState(Texture.EMPTY);
    const [ heroPosition, setHeroPosition ] = useState(defaultPosition);
    const keysPressed = useRef(new Set());
    const heroRef = useRef(null);
    useEffect(() => {
        Assets.load(import.meta.env.VITE_PIXI_HERO_URL).then((result) => {
            const frame = new Rectangle(0, 0, 200, 150);
            const heroTexture = new Texture({
                source: result,
                frame,
            });
            setHeroTexture(heroTexture);
        });

        const onUp = (e) => keysPressed.current.delete(e.key.toLowerCase());
        const onDown = (e) => keysPressed.current.add(e.key.toLowerCase());
        window.addEventListener("keydown", onDown);
        window.addEventListener("keyup", onUp);
        return () => {
            window.removeEventListener("keydown", onDown);
            window.removeEventListener("keyup", onUp);
        };
    }, []);

    useTick((delta) => {

        if (!heroRef.current) {
            return;
        }
        const {position, isMoving} = useHeroPosition(heroPosition, delta, keysPressed, keyActions);
        if (isMoving) {
            setHeroPosition(position);
        }
        
        
    });

    return (
        <pixiSprite ref={heroRef} texture={heroTexture} position={heroPosition} anchor={0.5} scale={0.7} />
    );
};
