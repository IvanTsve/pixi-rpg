import { Texture, Sprite } from 'pixi.js';
import { useEffect, useState, useRef } from 'react';
import { extend, useTick } from '@pixi/react';
import { defaultPosition, keyActions, defaultScale } from '../lib/constants';
import { calculateHeroMovement } from './helpers/hero';
import { loadSpriteFrames } from './helpers/spriteSheet';
import { createAnimationState, startAttack, updateCharacterAnimation } from './helpers/spriteAnimator';

extend({ Sprite });

export const Hero = () => {
    const [heroTexture, setHeroTexture] = useState(Texture.EMPTY);
    const positionRef = useRef({ ...defaultPosition });
    const keysPressed = useRef(new Set());
    const heroRef = useRef(null);
    const walkTextures = useRef([]);
    const attackTextures = useRef([]);
    const animState = useRef(createAnimationState());

    useEffect(() => {
        loadSpriteFrames(import.meta.env.VITE_PIXI_HERO_URL).then(({ textures }) => {
            walkTextures.current = textures;
            heroRef.current.x = defaultPosition.x;
            heroRef.current.y = defaultPosition.y;
            setHeroTexture(textures[0]);
        });

        loadSpriteFrames(import.meta.env.VITE_PIXI_HERO_ATTACK_URL).then(({ textures }) => {
            attackTextures.current = textures;
        });

        const onUp = (e) => keysPressed.current.delete(e.key.toLowerCase());
        const onDown = (e) => {
            keysPressed.current.add(e.key.toLowerCase());
            if (e.keyCode === 32) {
                startAttack(animState.current, heroRef.current, attackTextures.current);
            }
        };

        window.addEventListener('keydown', onDown);
        window.addEventListener('keyup', onUp);
        return () => {
            window.removeEventListener('keydown', onDown);
            window.removeEventListener('keyup', onUp);
        };
    }, []);

    useTick((delta) => {
        if (!heroRef.current || !walkTextures.current.length) return;

        const { x, y, isMoving, scaleX } = calculateHeroMovement(
            positionRef.current.x,
            positionRef.current.y,
            delta,
            keysPressed,
            keyActions,
            defaultScale
        );

        positionRef.current = { x, y };
        heroRef.current.x = x;
        heroRef.current.y = y;
        heroRef.current.scale.x = scaleX;

        updateCharacterAnimation(animState.current, {
            deltaMS: delta.deltaMS,
            isMoving,
            sprite: heroRef.current,
            walkTextures: walkTextures.current,
            attackTextures: attackTextures.current,
        });
    });

    return (
        <pixiSprite ref={heroRef} texture={heroTexture} anchor={0.5} scale={defaultScale} />
    );
};
