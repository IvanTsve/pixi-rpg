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
import { defaultPosition, keyActions, defaultScale, FRAME_WIDTH, FRAME_HEIGHT, FRAME_DURATION } from '../lib/constants';
import { calculateHeroMovement } from './helpers/hero';
import { generateTexture } from './helpers/hero';
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

    useEffect(() => {
        Assets.load(import.meta.env.VITE_PIXI_HERO_URL).then((result) => {
            sheetRef.current = result;
            const frame = new Rectangle(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
            maxFrames.current = Math.floor(result.width / frame.width);
            const firstFrame = generateTexture(result.source, frameIndex.current, FRAME_WIDTH, FRAME_HEIGHT)
            setHeroTexture(firstFrame);
            heroRef.current.x = defaultPosition.x;
            heroRef.current.y = defaultPosition.y;
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
            wasMoving.current = true;
            positionRef.current = position;
            heroRef.current.x = position.x;
            heroRef.current.y = position.y;
            heroRef.current.scale.x = scaleX;
            animationTimer.current += delta.deltaMS;

            if (animationTimer.current >= FRAME_DURATION) {
                animationTimer.current -= FRAME_DURATION;
                frameIndex.current = (frameIndex.current + 1) % maxFrames.current;
                heroRef.current.texture = generateTexture(sheetSource, frameIndex.current, FRAME_WIDTH, FRAME_HEIGHT)
            }
        } else if (wasMoving.current) {
            wasMoving.current = false;
            frameIndex.current = 0;
            heroRef.current.texture = generateTexture(sheetSource, frameIndex.current, FRAME_WIDTH, FRAME_HEIGHT)
        }
    });

    return (
        <pixiSprite ref={heroRef} texture={heroTexture} anchor={0.5} scale={defaultScale} />
    
    );
};
