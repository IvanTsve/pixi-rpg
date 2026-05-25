import { extend, useTick } from '@pixi/react'
import { Assets, Sprite, Texture } from "pixi.js"
extend({ Sprite });
import { useEffect, useState, useRef } from 'react'


const SPEED = 5;
const keyActions = {
  w: { dx: 0, dy: -SPEED, scaleX: 1 },
  s: { dx: 0, dy: SPEED, scaleX: 1 },
  a: { dx: -SPEED, dy: 0, scaleX: -1 },
  d: { dx: SPEED, dy: 0, scaleX: 1 },
};
function Hero() {
  const keysPressed = useRef(new Set());

    const heroUrl = import.meta.env.VITE_PIXI_HERO_URL
    const heroRef = useRef(null)
    const [texture, setTexture] = useState(Texture.EMPTY)
    useEffect(() => {
        if (texture === Texture.EMPTY) {
            Assets.load(heroUrl)
            .then((result) => {
                setTexture(result);
            });
        }

    }, [texture]);

    useEffect(() => {
        const onDown = (e: KeyboardEvent) => keysPressed.current.add(e.key.toLowerCase());
        const onUp = (e: KeyboardEvent) => keysPressed.current.delete(e.key.toLowerCase());
        window.addEventListener("keydown", onDown);
        window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
    }, []);

    useTick((delta) => {
        if (!heroRef.current) return;
        let isMoving = false;
        for (const key of keysPressed.current) {
            const action = keyActions[key as keyof typeof keyActions];
            if (action) {
                heroRef.current!.x += action.dx * delta.deltaTime;
                heroRef.current!.y += action.dy * delta.deltaTime;
                isMoving = true;
            }
        }
   

        
    });

    return (
            <pixiSprite 
                texture={texture}
                ref={heroRef}
                x={heroRef.current ? heroRef.current.x : -100}
                y={heroRef.current ? heroRef.current.y : -400} 
                />
    )
}

export default Hero