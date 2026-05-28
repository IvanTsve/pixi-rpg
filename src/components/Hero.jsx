import {
    Assets,
    Texture,
    Sprite,
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
import { defaultPosition, keyActions, defaultScale, FRAME_WIDTH, FRAME_DURATION } from '../lib/constants';
import { calculateHeroMovement, generateTexture } from './helpers/hero';
extend({ Sprite });

export const Hero = () => {
    const [heroTexture, setHeroTexture] = useState(Texture.EMPTY);
    const positionRef = useRef({ ...defaultPosition });
    const keysPressed = useRef(new Set());
    const heroRef = useRef(null);
    const frameIndex = useRef(0);
    const maxFrames = useRef(0);
    const sheetRef = useRef(null); 
    const animationTimer = useRef(0);
    const wasMoving = useRef(false);
    const frameTextures = useRef([]);

    useEffect(() => {
        Assets.load(import.meta.env.VITE_PIXI_HERO_URL).then((result) => {
            sheetRef.current = result;
            maxFrames.current = Math.floor(result.width / FRAME_WIDTH);
            heroRef.current.x = defaultPosition.x;
            heroRef.current.y = defaultPosition.y;
            for (let i = 0; i < maxFrames.current; i++) {
                frameTextures.current[i] = generateTexture(result.source, i);
            }
            setHeroTexture(frameTextures.current[0]);
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
        const {x,y, isMoving, scaleX} = calculateHeroMovement(positionRef.current.x, positionRef.current.y, delta, keysPressed, keyActions, defaultScale);
        if (isMoving) {
            wasMoving.current = true;
            positionRef.current = {x,y};
            heroRef.current.x = x;
            heroRef.current.y = y;
            heroRef.current.scale.x = scaleX;
            animationTimer.current += delta.deltaMS;

            if (animationTimer.current >= FRAME_DURATION) {
                animationTimer.current -= FRAME_DURATION;
                frameIndex.current = (frameIndex.current + 1) % maxFrames.current;
                heroRef.current.texture = frameTextures.current[frameIndex.current];
            }
        } else if (wasMoving.current) {
            wasMoving.current = false;
            frameIndex.current = 0;
            heroRef.current.texture = frameTextures.current[frameIndex.current];
        }
    });

    return (
        <pixiSprite ref={heroRef} texture={heroTexture} anchor={0.5} scale={defaultScale} />
    
    );
};
