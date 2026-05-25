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

import { defaultPosition, keyActions, defaultScale, 
    FRAME_WIDTH, FRAME_HEIGHT, FRAME_DURATION } from '../lib/constants';
import { calculateHeroMovement } from './helpers/hero';

export const Hero = () => {
    const [heroTexture, setHeroTexture] = useState(Texture.EMPTY);
    const positionRef = useRef({ ...defaultPosition });
    const keysPressed = useRef(new Set());
    const heroRef = useRef(null);
    const frameIndex = useRef(0);
    const maxFrames = useRef(0);
    const sheetRef = useRef(null); 
    const animationTimer = useRef(0);

    useEffect(() => {
        Assets.load(import.meta.env.VITE_PIXI_HERO_URL).then((result) => {
            sheetRef.current = result;
            const frame = new Rectangle(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
            maxFrames.current = Math.floor(result.width / frame.width);
            const firstFrame = new Texture({
                source: result.source,  // use .source for sub-textures
                frame,
            });
            setHeroTexture(firstFrame);
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

        if (!heroRef.current || !sheetRef.current) {
            return;
        }
        const {position, isMoving, scaleX} = calculateHeroMovement(positionRef.current, delta, keysPressed, keyActions, defaultScale);
        const sheetSource = sheetRef.current.source;
        if (isMoving) {
            positionRef.current = position;
            heroRef.current.x = position.x;
            heroRef.current.y = position.y;
            heroRef.current.scale.x = scaleX;
            animationTimer.current += delta.deltaMS;

            if (animationTimer.current >= FRAME_DURATION) {
                animationTimer.current -= FRAME_DURATION;
                frameIndex.current = (frameIndex.current + 1) % maxFrames.current;
                heroRef.current.texture = new Texture({
                    source: sheetSource,
                    frame: new Rectangle(
                        frameIndex.current * FRAME_WIDTH,
                        0,
                        FRAME_WIDTH,
                        FRAME_HEIGHT
                    ),
                });
            }
        } 
    });

    return (
        <pixiSprite ref={heroRef} texture={heroTexture} x={defaultPosition.x} y={defaultPosition.y} anchor={0.5} scale={defaultScale} />
    
    );
};
