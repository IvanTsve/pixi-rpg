import { extend } from '@pixi/react'
import { Assets, Sprite, Texture } from "pixi.js"
extend({ Sprite })

import { useEffect, useState, useRef } from 'react'

function Map() {
    const mapUrl = import.meta.env.VITE_PIXI_MAP_URL

    const [texture, setTexture] = useState(Texture.EMPTY)
    useEffect(() => {
        if (texture === Texture.EMPTY) {
            Assets.load(mapUrl)
            .then((result) => {
                setTexture(result)
            });
        }
        
    }, [texture]);
    
    return (
        <pixiSprite 
            texture={texture}
            x={-300}
            y={-300} 
         />
    )
}

export default Map