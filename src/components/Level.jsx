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
    const [texture, setTexture] = useState(Texture.EMPTY);
    useEffect(() => {
        Assets.load(import.meta.env.VITE_PIXI_MAP_URL).then((result) => {
            setTexture(result);
        });
    }, []);
  return (
   <pixiSprite texture={texture} x={0} y={100} />
  )
}
export default Level;