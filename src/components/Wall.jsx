
import { extend } from '@pixi/react'
import { Assets, Sprite, Texture } from "pixi.js"
extend({ Sprite })

import { useEffect, useState, useRef } from 'react'

function Wall() {
    const wallUrl = import.meta.env.VITE_PIXI_WALL_URL

    const [texture, setTexture] = useState(Texture.EMPTY)
    useEffect(() => {
        if (texture === Texture.EMPTY) {
            Assets.load(wallUrl)
            .then((result) => {
                setTexture(result)
                console.log(result);
                
                console.log(result.source.height, '---22222');
                
            });
        }
        
    }, [texture]);
    
    return (
        <>
        {[1,2,3,4,5,6].map((item, index) => (
            <pixiSprite 
                key={item}
                texture={texture}
                x={-200}
                y={-500 + (index * 50)} 
            />
        ))}
        </>
    )
}

export default Wall