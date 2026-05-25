export const useHeroPosition = ({x, y}, delta, keysPressed, keyActions) => {
    let isMoving = false;
    let position = {
     x: x,
     y: y,
    };
    for (const key of keysPressed.current) {
        const action = keyActions[key];
        
        if (action) {
            position.x += action.dx * delta.deltaTime;
            position.y += action.dy * delta.deltaTime;
            isMoving = true;
        }
    }
   return { position, isMoving };
}