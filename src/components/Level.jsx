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
export const Level = () => {
    const [mapTexture, setMapTexture] = useState(Texture.EMPTY);
    const [wallTexture, setWallTexture] = useState(Texture.EMPTY);
    useEffect(() => {
        Assets.load(import.meta.env.VITE_PIXI_MAP_URL).then((result) => {
            setMapTexture(result);
        });
        Assets.load(import.meta.env.VITE_PIXI_WALL_URL).then((result) => {
            setWallTexture(result);
        });
    }, []);
  return (
    <>
        <pixiSprite texture={mapTexture} x={0} y={100} />
        {Array.from({length: 6}).map((_, index) => (
            <pixiSprite texture={wallTexture} x={150}  y={-100 + (index * 50)}  />
        ))}

    </>
  )
}
export default Level;